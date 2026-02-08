
import React, { useState, useEffect } from 'react';
import { Topic, Word } from '../types';
import { playWordAudio, unlockAudio } from '../services/audioService';
import { playTextWithOpenAITTS } from '../services/openaiTtsService';
import { FirebaseService } from '../services/firebaseService';
import associationsData from '../data/associationsBase.json';

interface FlashcardsProps {
  topic: Topic;
  onComplete?: () => void;
  user?: { telegramId: string } | null;
  wordsToReviewCount?: number;
  onWordsChange?: () => void;
}

// Функция перемешивания массива
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Flashcards: React.FC<FlashcardsProps> = ({ topic, onComplete, user, wordsToReviewCount = 0, onWordsChange }) => {
  // Инициализируем с перемешанными индексами
  const [activeIndices, setActiveIndices] = useState<number[]>(() => {
    const indices = topic.words.map((_, i) => i);
    return shuffleArray(indices);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'de-ru' | 'ru-de'>('ru-de'); // По умолчанию ru-de
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [sessionFinished, setSessionFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [studyWords, setStudyWords] = useState<Set<string>>(new Set());

  const currentWordIndex = activeIndices[currentIndex];
  const currentWord = topic.words[currentWordIndex];

  // Разблокируем аудио при монтировании компонента
  useEffect(() => {
    unlockAudio().catch((err) => {
      console.warn("⚠️ Failed to unlock audio on mount:", err);
    });
  }, []);

  // Загружаем слова в изучении
  useEffect(() => {
    const loadStudyWords = async () => {
      if (user && user.telegramId) {
        try {
          const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
          if (firebaseWords) {
            const wordIds = firebaseWords.map((sw: any) => sw.wordId);
            setStudyWords(new Set(wordIds));
            return;
          }
        } catch (error) {
          console.error('Error loading study words from Firebase:', error);
        }
      }
      
      // Fallback на localStorage
      const saved = localStorage.getItem('promnemo_study_words');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const wordIds = parsed.map((sw: any) => sw.wordId);
          setStudyWords(new Set(wordIds));
        } catch (e) {
          console.error('Failed to load study words:', e);
        }
      }
    };
    
    loadStudyWords();
  }, [user]);

  // Функция для поиска слова в базе ассоциаций
  const findWordInAssociations = (word: Word): string => {
    const associations = associationsData as any[];
    
    // Сначала ищем по id
    const byId = associations.find(w => w.id === word.id);
    if (byId) return byId.id;
    
    // Нормализуем слово из карточки: убираем артикль и приводим к нижнему регистру
    const normalizeWord = (w: string): string => {
      return w
        .replace(/^(der|die|das)\s+/i, '') // Убираем артикль в начале
        .replace(/\s*\(der|die|das\)/i, '') // Убираем артикль в скобках в конце
        .replace(/[.,!?;:]/g, '') // Убираем знаки препинания
        .trim()
        .toLowerCase();
    };
    
    const wordFromCard = normalizeWord(word.de);
    
    // Ищем точное совпадение нормализованных слов
    const exactMatch = associations.find(w => {
      const wordInBase = (w["Слово"] || '').trim();
      const normalizedBase = normalizeWord(wordInBase);
      return normalizedBase === wordFromCard;
    });
    if (exactMatch) return exactMatch.id;
    
    // Ищем частичное совпадение (если одно слово содержит другое)
    const partialMatch = associations.find(w => {
      const wordInBase = (w["Слово"] || '').trim();
      const normalizedBase = normalizeWord(wordInBase);
      // Проверяем, что одно слово содержит другое (для сложных слов)
      // Но только если длина совпадения больше 3 символов
      if (normalizedBase.length < 3 || wordFromCard.length < 3) return false;
      return normalizedBase.includes(wordFromCard) || wordFromCard.includes(normalizedBase);
    });
    if (partialMatch) return partialMatch.id;
    
    // Если слово не найдено, создаем временный ID на основе самого слова
    // Это позволит добавлять любые слова в изучение, даже если их нет в базе
    return `temp_${wordFromCard.replace(/[^a-z0-9]/g, '_')}`;
  };

  // Функция для добавления/удаления слова в изучение
  const toggleStudyWord = async (word: Word) => {
    const wordIdInBase = findWordInAssociations(word);
    // Теперь wordIdInBase всегда возвращает значение (либо ID из базы, либо временный ID)

    const isInStudy = studyWords.has(wordIdInBase);
    const saved = localStorage.getItem('promnemo_study_words');
    let existing = [];
    if (saved) {
      try {
        existing = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse study words:', e);
      }
    }

    if (isInStudy) {
      // Удаляем из изучения
      const filtered = existing.filter((sw: any) => sw.wordId !== wordIdInBase);
      localStorage.setItem('promnemo_study_words', JSON.stringify(filtered));
      setStudyWords(prev => {
        const newSet = new Set(prev);
        newSet.delete(wordIdInBase);
        return newSet;
      });

      // Сохраняем в Firebase только если пользователь существует
      if (user && user.telegramId) {
        try {
          const userExists = await FirebaseService.userExists(user.telegramId);
          if (userExists) {
            await FirebaseService.saveStudyWords(user.telegramId, filtered);
            console.log('✅ Word removed from study in Firebase (Flashcards)');
          } else {
            console.log('⚠️ User does not exist in Firebase, skipping save (Flashcards)');
          }
        } catch (error) {
          console.error('❌ Error saving to Firebase:', error);
        }
      }
      
      // Уведомляем об изменении
      if (onWordsChange) onWordsChange();
    } else {
      // Добавляем в изучение
      const now = Date.now();
      // Устанавливаем nextReview на конец текущего дня, чтобы было доступно только один раз в день добавления
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const newWord = {
        wordId: wordIdInBase,
        addedAt: now,
        nextReview: endOfDay.getTime(), // Конец текущего дня - доступно для первого повторения
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0
      };

      existing.push(newWord);
      localStorage.setItem('promnemo_study_words', JSON.stringify(existing));
      setStudyWords(prev => new Set(prev).add(wordIdInBase));

      // Сохраняем в Firebase только если пользователь существует
      console.log('🔍 Attempting to save to Firebase (Flashcards):', {
        hasUser: !!user,
        telegramId: user?.telegramId,
        wordsCount: existing.length
      });
      if (user && user.telegramId) {
        try {
          const userExists = await FirebaseService.userExists(user.telegramId);
          if (userExists) {
            await FirebaseService.saveStudyWords(user.telegramId, existing);
            console.log('✅ Word added to study in Firebase (Flashcards)');
          } else {
            console.log('⚠️ User does not exist in Firebase, skipping save (Flashcards)');
          }
        } catch (error) {
          console.error('❌ Error saving to Firebase:', error);
        }
      } else {
        console.warn('⚠️ Not saving to Firebase - user not authenticated');
      }
      
      // Уведомляем об изменении
      if (onWordsChange) onWordsChange();
    }
  };

  const handleAudioClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Блокируем повторные нажатия
    if (isSpeaking) {
      console.log("⏸️ Already speaking, ignoring click");
      return;
    }
    
    console.log("🔊 Flashcards: handleAudioClick called", { 
      word: currentWord.de, 
      wordId: currentWord.id,
      topicId: topic.id 
    });
    
    setIsSpeaking(true);
    
    try {
      // Убеждаемся, что аудио разблокировано
      await unlockAudio();
      console.log("✅ Audio unlocked before speaking");
      
      // OpenAI TTS (модуль загружен статически — без задержки на import)
      try {
        const wordText = currentWord.de.replace(/^(der|die|das)\s+/i, '').trim();
        await playTextWithOpenAITTS(wordText, 'de');
        console.log("✅ OpenAI TTS played successfully");
      } catch (openaiError) {
        console.warn("⚠️ [TTS Engine: OpenAI] Failed, trying WAV file:", openaiError);
        // Fallback на WAV файл
        try {
          await playWordAudio(topic.id, currentWord.id, currentWord.de, 'de');
          console.log("✅ WAV audio played successfully");
        } catch (wavError) {
          console.warn("⚠️ WAV file not found, using browser speech synthesis");
          // Fallback на SpeechSynthesis уже обработан в playWordAudio
        }
      }
      
      // Пауза после воспроизведения
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error("❌ Error in handleAudioClick:", error);
      // Пауза даже при ошибке
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSpeaking(false);
    }
  };

  const markResult = (isCorrect: boolean) => {
    const newResults = { ...results, [currentWordIndex]: isCorrect };
    setResults(newResults);

    if (currentIndex + 1 < activeIndices.length) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 150);
    } else {
      setSessionFinished(true);
      if (onComplete) onComplete();
    }
  };

  const restartAll = () => {
    const indices = topic.words.map((_, i) => i);
    setActiveIndices(shuffleArray(indices)); // Перемешиваем при перезапуске
    setCurrentIndex(0);
    setResults({});
    setSessionFinished(false);
    setIsFlipped(false);
  };

  const retryErrors = () => {
    const errors = activeIndices.filter(idx => !results[idx]);
    setActiveIndices(shuffleArray(errors)); // Перемешиваем ошибки
    setCurrentIndex(0);
    setResults({});
    setSessionFinished(false);
    setIsFlipped(false);
  };

  const correctCount = Object.values(results).filter(Boolean).length;
  const errorCount = activeIndices.length - correctCount;

  if (sessionFinished) {
    return (
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
          <i className="fas fa-flag-checkered"></i>
        </div>
        <h3 className="text-3xl font-black text-gray-800 mb-3">Готово!</h3>
        <p className="text-lg text-gray-500 mb-8 font-medium">Результат: {correctCount} / {activeIndices.length}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 p-5 rounded-[1.8rem] border border-green-100">
            <p className="text-2xl font-black text-green-600">{correctCount}</p>
            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mt-1">Знаю</p>
          </div>
          <div className="bg-red-50 p-5 rounded-[1.8rem] border border-red-100">
            <p className="text-2xl font-black text-red-600">{errorCount}</p>
            <p className="text-[10px] font-black text-red-700 uppercase tracking-widest mt-1">Ошибки</p>
          </div>
        </div>

        <div className="space-y-3">
          {errorCount > 0 && (
            <button 
              onClick={retryErrors}
              className="w-full py-5 bg-indigo-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl"
            >
              Повторить ошибки
            </button>
          )}
          <button onClick={restartAll} className="w-full py-4 bg-gray-100 text-gray-600 rounded-[1.8rem] font-black">
            Начать заново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto min-h-[85vh] sm:min-h-[75vh] py-1 sm:py-2">
      <div className="w-full px-2 mb-3 sm:mb-6">
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{currentIndex + 1} / {activeIndices.length}</span>
        </div>
        <div className="h-1 sm:h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${((currentIndex+1)/activeIndices.length)*100}%` }}></div>
        </div>
      </div>

      <div className="flex bg-gray-200/40 p-1.5 rounded-[1.2rem] mb-4 sm:mb-8 relative z-30">
        <button 
          onClick={(e) => { e.stopPropagation(); setDirection('de-ru'); setIsFlipped(false); }}
          className={`px-8 py-3 rounded-xl text-xs sm:text-[10px] font-black transition-all ${direction === 'de-ru' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          DE → RU
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setDirection('ru-de'); setIsFlipped(false); }}
          className={`px-8 py-3 rounded-xl text-xs sm:text-[10px] font-black transition-all ${direction === 'ru-de' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          RU → DE
        </button>
      </div>

      <div 
        className="card-flip w-full px-2 flex-1 flex items-center justify-center mb-1 sm:mb-2"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`card-inner relative w-full h-[260px] sm:h-[380px] ${isFlipped ? 'card-flipped' : ''}`}>
          <div className="card-face absolute w-full h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 sm:p-8 border border-gray-50">
            <span className="absolute top-4 sm:top-8 text-[8px] sm:text-[10px] font-black text-blue-200 uppercase tracking-[0.4em]">
              {direction === 'de-ru' ? 'Deutsch' : 'Русский'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-center text-gray-800 leading-tight px-2 break-words mt-2 sm:mt-4">
              {direction === 'de-ru' ? currentWord.de : currentWord.ru}
            </h2>
            
            {direction === 'de-ru' ? (
              <button 
                onClick={handleAudioClick}
                disabled={isSpeaking}
                className={`mt-4 sm:mt-12 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-inner transition-transform relative z-20 ${
                  isSpeaking 
                    ? 'bg-blue-200 text-blue-400 cursor-not-allowed' 
                    : 'bg-blue-50 text-blue-600 active:scale-110'
                }`}
              >
                <i className={`fas ${isSpeaking ? 'fa-spinner fa-spin' : 'fa-volume-up'} text-lg sm:text-2xl`}></i>
              </button>
            ) : (
              <div className="mt-4 sm:mt-12 h-12 sm:h-16"></div>
            )}
            
            <span className="absolute bottom-4 sm:bottom-8 text-[7px] sm:text-[9px] font-bold text-gray-300 uppercase tracking-widest">Перевернуть</span>
          </div>
          
          <div className="card-face card-back absolute w-full h-full bg-blue-600 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 sm:p-8 text-white relative">
            <span className="absolute top-4 sm:top-8 text-[8px] sm:text-[10px] font-black text-blue-100 uppercase tracking-[0.4em]">
              {direction === 'de-ru' ? 'Русский' : 'Deutsch'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-center leading-tight px-2 break-words mt-2 sm:mt-4">
              {direction === 'de-ru' ? currentWord.ru : currentWord.de}
            </h2>

            {direction === 'ru-de' ? (
              <button 
                onClick={handleAudioClick}
                disabled={isSpeaking}
                className={`mt-4 sm:mt-12 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-transform relative z-20 ${
                  isSpeaking 
                    ? 'bg-white/5 text-white/50 border-white/10 cursor-not-allowed' 
                    : 'bg-white/10 text-white border-white/20 active:scale-110'
                }`}
              >
                <i className={`fas ${isSpeaking ? 'fa-spinner fa-spin' : 'fa-volume-up'} text-lg sm:text-2xl`}></i>
              </button>
            ) : (
              <div className="mt-4 sm:mt-12 h-12 sm:h-16"></div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full px-2 mb-0">
        <button 
          onClick={(e) => { e.stopPropagation(); markResult(false); }}
          className="py-3 sm:py-4 bg-white text-red-500 border-2 border-red-50 rounded-[1.5rem] sm:rounded-[2rem] font-extrabold uppercase text-xs sm:text-[10px] flex flex-col items-center gap-1 sm:gap-1.5 active:bg-red-50"
        >
          <i className="fas fa-times text-xl sm:text-2xl"></i>
          Трудно
        </button>
        {(() => {
          const wordIdInBase = findWordInAssociations(currentWord);
          const isInStudy = studyWords.has(wordIdInBase);
          const isTempId = wordIdInBase.startsWith('temp_');
          return (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleStudyWord(currentWord);
              }}
              className={`py-3 sm:py-4 rounded-[1.5rem] sm:rounded-[2rem] font-extrabold uppercase text-xs sm:text-[10px] flex flex-col items-center gap-1 sm:gap-1.5 transition-all ${
                isInStudy
                  ? 'bg-green-500 text-white shadow-lg'
                  : isTempId
                  ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
              }`}
              title={isTempId ? 'Слово не найдено в базе ассоциаций, но можно добавить в изучение' : ''}
            >
              {isInStudy ? (
                <>
                  <i className="fas fa-check text-xl sm:text-2xl"></i>
                  <span className="text-[8px] sm:text-[9px]">В учебе</span>
                  {wordsToReviewCount > 0 && (
                    <span className="bg-white/30 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                      {wordsToReviewCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <i className="fas fa-plus text-xl sm:text-2xl"></i>
                  <span className="text-[8px] sm:text-[9px]">Учить</span>
                </>
              )}
            </button>
          );
        })()}
        <button 
          onClick={(e) => { e.stopPropagation(); markResult(true); }}
          className="py-3 sm:py-4 bg-white text-green-500 border-2 border-green-50 rounded-[1.5rem] sm:rounded-[2rem] font-extrabold uppercase text-xs sm:text-[10px] flex flex-col items-center gap-1 sm:gap-1.5 shadow-lg shadow-green-100/30 active:bg-green-50"
        >
          <i className="fas fa-check text-xl sm:text-2xl"></i>
          Знаю
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
