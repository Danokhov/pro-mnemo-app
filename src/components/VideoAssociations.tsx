
import React, { useState, useEffect } from 'react';
import { Topic, Word } from '../types';
import { FirebaseService } from '../services/firebaseService';
import associationsData from '../data/associationsBase.json';

interface VideoAssociationsProps {
  topic: Topic;
  user?: { telegramId: string } | null;
  wordsToReviewCount?: number;
  onWordsChange?: () => void;
}

const VideoAssociations: React.FC<VideoAssociationsProps> = ({ topic, user, wordsToReviewCount = 0, onWordsChange }) => {
  const [studyWords, setStudyWords] = useState<Set<string>>(new Set());

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
            console.log('✅ Word removed from study in Firebase (VideoAssociations)');
          } else {
            console.log('⚠️ User does not exist in Firebase, skipping save (VideoAssociations)');
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
      if (user && user.telegramId) {
        try {
          const userExists = await FirebaseService.userExists(user.telegramId);
          if (userExists) {
            await FirebaseService.saveStudyWords(user.telegramId, existing);
            console.log('✅ Word added to study in Firebase (VideoAssociations)');
          } else {
            console.log('⚠️ User does not exist in Firebase, skipping save (VideoAssociations)');
          }
        } catch (error) {
          console.error('❌ Error saving to Firebase:', error);
        }
      }
      
      // Уведомляем об изменении
      if (onWordsChange) onWordsChange();
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-black aspect-video relative border-4 border-white">
        <iframe 
          src={topic.videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          title="Video Association"
        ></iframe>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-100">
        <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
          <i className="fas fa-tags text-blue-500"></i>
          Словарь урока
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {topic.words.map((word, idx) => {
            const wordIdInBase = findWordInAssociations(word);
            const isInStudy = studyWords.has(wordIdInBase);
            const isTempId = wordIdInBase.startsWith('temp_');
            
            return (
              <div 
                key={idx} 
                className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 border border-gray-100 transition-colors"
              >
                <div className="text-2xl font-black">
                  <span className="text-indigo-600">{word.de}</span>
                  <span className="mx-3 text-gray-300">—</span>
                  <span className="text-gray-600 font-bold">{word.ru}</span>
                </div>
                <button
                  onClick={() => toggleStudyWord(word)}
                  className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                    isInStudy
                      ? 'bg-green-500 text-white shadow-lg'
                      : isTempId
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                  title={isTempId ? 'Слово не найдено в базе ассоциаций, но можно добавить в изучение' : ''}
                >
                  {isInStudy ? (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      В учебе
                      {wordsToReviewCount > 0 && (
                        <span className="ml-2 bg-white/30 text-white text-[10px] px-2 py-0.5 rounded-full">
                          {wordsToReviewCount}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-2"></i>
                      Учить
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoAssociations;
