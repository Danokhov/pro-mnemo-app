import React, { useState, useEffect, useMemo } from 'react';
import associationsData from '../data/associationsBase.json';
import { FirebaseService } from '../services/firebaseService';

interface WordRecord {
  id: string;
  "Слово"?: string;
  "Перевод"?: string;
  "Транскрипция"?: string;
  "Часть речи"?: string;
  "Тема"?: string[];
  "Темы"?: string[];
  "Мнемо якоря"?: string;
  "Ассоциации"?: string;
  "Примеры"?: string;
  "Формы глагола (Inf – Prät – Perf)"?: string;
  "Спряжение (Präsens)"?: string;
  "Родственные слова"?: string;
  "Изображение"?: string;
}

interface StudyWord {
  wordId: string;
  addedAt: number; // timestamp
  nextReview: number; // timestamp следующего повторения
  interval: number; // интервал в днях
  easeFactor: number; // фактор легкости (по умолчанию 2.5)
  repetitions: number; // количество успешных повторений
  lastReview?: number; // timestamp последнего повторения
}

interface SpacedRepetitionProps {
  onBack: () => void;
  user?: { telegramId: string } | null;
  onWordsChange?: () => void;
}

// Интервалы повторения (в днях)
// После первого повторения (в день добавления): 1 день
// После второго повторения: 1 день
// После третьего повторения: 3 дня
// После четвертого повторения: 7 дней
// После пятого повторения: 14 дней
// После шестого повторения: 30 дней
// После седьмого повторения: 90 дней
// После восьмого и далее: 90 дней
const INTERVALS = [1, 1, 3, 7, 14, 30, 90]; // Интервалы после повторений 1-7
const DEFAULT_INTERVAL = 90; // Для 8-го и далее повторений

// Функция для получения конца текущего дня (23:59:59.999)
const getEndOfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
};

const SpacedRepetition: React.FC<SpacedRepetitionProps> = ({ onBack, user, onWordsChange }) => {
  const [studyWords, setStudyWords] = useState<StudyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'de-ru' | 'ru-de'>('de-ru');
  const [wordsData, setWordsData] = useState<WordRecord[]>([]);

  useEffect(() => {
    // Загружаем слова из базы
    const data = associationsData as WordRecord[];
    setWordsData(data);

    // Загружаем слова для изучения из Firebase или localStorage
    const loadStudyWords = async () => {
      if (user && user.telegramId) {
        try {
          const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
          if (firebaseWords) {
            setStudyWords(firebaseWords);
            // Синхронизируем с localStorage
            localStorage.setItem('promnemo_study_words', JSON.stringify(firebaseWords));
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
          setStudyWords(parsed);
        } catch (e) {
          console.error('Failed to load study words:', e);
        }
      }
    };
    
    loadStudyWords();
  }, [user]);

  // Сохраняем слова для изучения в Firebase и localStorage
  useEffect(() => {
    if (studyWords.length > 0) {
      localStorage.setItem('promnemo_study_words', JSON.stringify(studyWords));
      
      // Сохраняем в Firebase только если пользователь существует
      if (user && user.telegramId) {
        FirebaseService.userExists(user.telegramId).then(exists => {
          if (exists) {
            FirebaseService.saveStudyWords(user.telegramId, studyWords).catch(error => {
              console.error('Error saving study words to Firebase:', error);
            });
          } else {
            console.log('⚠️ User does not exist in Firebase, skipping save from SpacedRepetition');
          }
        });
      }
    }
    
    // Уведомляем родительский компонент об изменении
    if (onWordsChange) {
      onWordsChange();
    }
  }, [studyWords, user, onWordsChange]);

  // Получаем слова, которые нужно повторить сегодня
  const wordsToReview = useMemo(() => {
    const now = Date.now();
    // Получаем конец текущего дня для проверки
    const endOfToday = getEndOfDay(now);
    // Начало текущего дня (00:00:00.000)
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTodayMs = startOfToday.getTime();
    
    // Убираем дубликаты по wordId (оставляем последнее вхождение)
    const uniqueStudyWords = studyWords.reduce((acc, sw) => {
      const existingIndex = acc.findIndex(item => item.wordId === sw.wordId);
      if (existingIndex >= 0) {
        // Если слово уже есть, заменяем его (берем более свежее)
        acc[existingIndex] = sw;
      } else {
        acc.push(sw);
      }
      return acc;
    }, [] as StudyWord[]);
    
    return uniqueStudyWords
      .filter(sw => {
        const wordData = wordsData.find(w => w.id === sw.wordId);
        if (!wordData) return false;
        
        // Показываем слово, если nextReview находится в пределах текущего дня
        // Это включает:
        // - Слова, добавленные сегодня (nextReview на конец дня)
        // - Слова, которые нужно повторить сегодня (nextReview <= now)
        // - Слова после первого правильного ответа, если nextReview остался на конец дня
        return sw.nextReview <= endOfToday && sw.nextReview >= startOfTodayMs;
      })
      .map(sw => {
        const wordData = wordsData.find(w => w.id === sw.wordId);
        return { ...sw, wordData };
      })
      .filter(item => item.wordData) as (StudyWord & { wordData: WordRecord })[];
  }, [studyWords, wordsData]);

  // Обновляем currentIndex, если он стал невалидным после обновления списка
  useEffect(() => {
    if (wordsToReview.length === 0) {
      // Если список пуст, сбрасываем индекс
      setCurrentIndex(0);
    } else if (currentIndex >= wordsToReview.length) {
      // Если индекс вышел за границы, сбрасываем на 0
      setCurrentIndex(0);
    }
  }, [wordsToReview.length, currentIndex]);

  const currentWord = wordsToReview[currentIndex];

  /**
   * Обработка ответа пользователя на карточку
   * @param quality - 0 = неправильный ответ (Трудно), 4 = правильный ответ (Знаю)
   * 
   * Логика интервалов:
   * - При неправильном ответе: сброс на конец текущего дня (можно повторить сегодня еще раз)
   * - При правильном ответе:
   *   После 1-го повторения (в день добавления): 1 день
   *   После 2-го повторения: 1 день
   *   После 3-го повторения: 3 дня
   *   После 4-го повторения: 7 дней
   *   После 5-го повторения: 14 дней
   *   После 6-го повторения: 30 дней
   *   После 7-го повторения: 90 дней
   *   После 8-го и далее: 90 дней
   */
  const handleAnswer = (quality: number) => {
    if (!currentWord) return;

    const now = Date.now();
    let newInterval = 0;
    let newRepetitions = currentWord.repetitions;

    // quality: 0 = неправильный ответ (Трудно), 4 = правильный ответ (Знаю)
    if (quality === 0) {
      // Неправильный ответ - сброс счетчика, устанавливаем на конец текущего дня
      newRepetitions = 0;
      newInterval = 0;
    } else {
      // Правильный ответ - увеличиваем счетчик повторений
      newRepetitions += 1;
      
      // Определяем интервал на основе номера повторения
      // После 1-го повторения (newRepetitions = 1) -> INTERVALS[0] = 1 день
      // После 2-го повторения (newRepetitions = 2) -> INTERVALS[1] = 1 день
      // После 3-го повторения (newRepetitions = 3) -> INTERVALS[2] = 3 дня
      // и т.д.
      if (newRepetitions <= INTERVALS.length) {
        newInterval = INTERVALS[newRepetitions - 1];
      } else {
        // Для 8-го и далее повторений используем дефолтный интервал (90 дней)
        newInterval = DEFAULT_INTERVAL;
      }
    }

    // Вычисляем timestamp следующего повторения
    let nextReviewTime: number;
    if (quality === 0) {
      // При неправильном ответе - конец текущего дня (чтобы можно было повторить сегодня)
      nextReviewTime = getEndOfDay(now);
    } else {
      // При правильном ответе - через интервал (даже если это первое повторение)
      // После первого правильного ответа слово не показывается снова в тот же день
      nextReviewTime = now + newInterval * 24 * 60 * 60 * 1000;
    }

    const updatedWord: StudyWord = {
      ...currentWord,
      nextReview: nextReviewTime,
      interval: newInterval,
      repetitions: newRepetitions,
      lastReview: now
    };

    setStudyWords(prev => prev.map(sw => 
      sw.wordId === currentWord.wordId ? updatedWord : sw
    ));

    // Переходим к следующему слову
    setIsFlipped(false);
    // Обновляем индекс после обновления списка
    // Используем функцию обновления, чтобы получить актуальное значение
    setCurrentIndex(prevIndex => {
      // После обновления studyWords список wordsToReview пересчитается
      // Если текущий индекс все еще валиден, переходим к следующему слову
      // Иначе сбрасываем на 0
      // Но мы не можем получить актуальный wordsToReview здесь, поэтому просто увеличиваем индекс
      // useEffect выше позаботится о корректировке, если индекс станет невалидным
      return prevIndex + 1;
    });
  };

  const removeFromStudy = (wordId: string) => {
    setStudyWords(prev => prev.filter(sw => sw.wordId !== wordId));
    if (currentIndex >= wordsToReview.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  if (wordsToReview.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="w-11 h-11 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
                >
                  <i className="fas fa-arrow-left text-lg"></i>
                </button>
                <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-green-100">
                  <i className="fas fa-redo text-lg"></i>
                </div>
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Повтор</h1>
              </div>
            </div>
          </div>
        </header>
        <div style={{ height: '100px' }} aria-hidden="true"></div>
        <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-10">
          <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-lg border border-gray-100 mt-10">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check-circle text-green-500 text-5xl"></i>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3">Все слова изучены!</h2>
            <p className="text-slate-500 font-bold mb-6">
              На сегодня нет слов для повторения. Добавьте слова из базы ассоциаций для изучения.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-colors"
            >
              Вернуться на главный экран
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-11 h-11 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
              >
                <i className="fas fa-arrow-left text-lg"></i>
              </button>
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-green-100">
                <i className="fas fa-redo text-lg"></i>
              </div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Повтор</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-xl">
              <span className="text-xs font-black text-green-700 uppercase tracking-widest">
                {currentIndex + 1} / {wordsToReview.length}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div style={{ height: '100px' }} aria-hidden="true"></div>
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-10">
        {currentWord && (
          <div className="flex flex-col items-center w-full max-w-md mx-auto justify-center min-h-[calc(100vh-200px)] py-4">
            {/* Переключатель направления */}
            <div className="flex bg-gray-200/40 p-1.5 rounded-[1.2rem] mb-4 relative z-30 w-full max-w-xs">
              <button 
                onClick={(e) => { e.stopPropagation(); setDirection('de-ru'); setIsFlipped(false); }}
                className={`flex-1 px-8 py-3 rounded-xl text-xs sm:text-[10px] font-black transition-all ${direction === 'de-ru' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                DE → RU
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setDirection('ru-de'); setIsFlipped(false); }}
                className={`flex-1 px-8 py-3 rounded-xl text-xs sm:text-[10px] font-black transition-all ${direction === 'ru-de' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                RU → DE
              </button>
            </div>

            {/* Флеш-карта в стиле Flashcards - компактная */}
            <div 
              className="card-flip w-full px-2 flex items-center justify-center mb-4"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`card-inner relative w-full h-[220px] sm:h-[280px] ${isFlipped ? 'card-flipped' : ''}`}>
                {/* Лицевая сторона */}
                <div className="card-face absolute w-full h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 sm:p-6 border border-gray-50">
                  <span className="absolute top-3 sm:top-4 text-[8px] sm:text-[10px] font-black text-blue-200 uppercase tracking-[0.4em]">
                    {direction === 'de-ru' ? 'Deutsch' : 'Русский'}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-center text-gray-800 leading-tight px-2 break-words">
                    {direction === 'de-ru' ? currentWord.wordData["Слово"] : currentWord.wordData["Перевод"]}
                  </h2>
                  <span className="absolute bottom-3 sm:bottom-4 text-[7px] sm:text-[9px] font-bold text-gray-300 uppercase tracking-widest">Перевернуть</span>
                </div>
                
                {/* Обратная сторона */}
                <div className="card-face card-back absolute w-full h-full bg-blue-600 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 sm:p-6 text-white">
                  <span className="absolute top-3 sm:top-4 text-[8px] sm:text-[10px] font-black text-blue-100 uppercase tracking-[0.4em]">
                    {direction === 'de-ru' ? 'Русский' : 'Deutsch'}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-center leading-tight px-2 break-words">
                    {direction === 'de-ru' ? currentWord.wordData["Перевод"] : currentWord.wordData["Слово"]}
                  </h2>
                </div>
              </div>
            </div>

            {/* Кнопки оценки - всегда видны */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full px-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleAnswer(0); }}
                className="py-3 sm:py-4 bg-white text-red-500 border-2 border-red-50 rounded-[1.5rem] sm:rounded-[2rem] font-extrabold uppercase text-xs sm:text-[10px] flex flex-col items-center gap-1 sm:gap-1.5 active:bg-red-50"
              >
                <i className="fas fa-times text-xl sm:text-2xl"></i>
                Трудно
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleAnswer(4); }}
                className="py-3 sm:py-4 bg-white text-green-500 border-2 border-green-50 rounded-[1.5rem] sm:rounded-[2rem] font-extrabold uppercase text-xs sm:text-[10px] flex flex-col items-center gap-1 sm:gap-1.5 shadow-lg shadow-green-100/30 active:bg-green-50"
              >
                <i className="fas fa-check text-xl sm:text-2xl"></i>
                Знаю
              </button>
            </div>

            {/* Кнопка удаления из изучения */}
            <div className="mt-4 text-center">
              <button
                onClick={() => removeFromStudy(currentWord.wordId)}
                className="text-slate-400 hover:text-red-500 text-sm font-bold transition-colors"
              >
                <i className="fas fa-times mr-2"></i>
                Удалить из изучения
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SpacedRepetition;
