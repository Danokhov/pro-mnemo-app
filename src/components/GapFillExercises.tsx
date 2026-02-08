import React, { useState, useEffect } from 'react';
import { Topic } from '../types';
import { unlockAudio } from '../services/audioService';

interface GapFillExercisesProps {
  topic: Topic;
  onComplete?: () => void;
}

interface SavedProgress {
  currentExercise: number;
  score: number;
  wrongAnswers: number[];
  originalWrongAnswers: number[];
  exerciseIndices: number[];
  totalExercises: number;
  isCompleted: boolean;
}

const GapFillExercises: React.FC<GapFillExercisesProps> = ({ topic, onComplete }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [originalWrongAnswers, setOriginalWrongAnswers] = useState<number[]>([]);
  const [exerciseIndices, setExerciseIndices] = useState<number[]>([]);
  const [totalExercises, setTotalExercises] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const exercises = topic.exercises || [];
  const storageKey = `gapfill_progress_${topic.id}`;

  // Функция для сохранения прогресса
  const saveProgress = (updates: Partial<SavedProgress>) => {
    try {
      // Сохраняем прогресс с обновленными значениями
      const currentProgress: SavedProgress = {
        currentExercise: updates.currentExercise ?? currentExercise,
        score: updates.score ?? score,
        wrongAnswers: updates.wrongAnswers ?? wrongAnswers,
        originalWrongAnswers: updates.originalWrongAnswers ?? originalWrongAnswers,
        exerciseIndices: updates.exerciseIndices ?? exerciseIndices,
        totalExercises: updates.totalExercises ?? totalExercises,
        isCompleted: updates.isCompleted ?? isCompleted,
      };
      localStorage.setItem(storageKey, JSON.stringify(currentProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // Функция для загрузки прогресса
  const loadProgress = (): SavedProgress | null => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const progress: SavedProgress = JSON.parse(saved);
        // Проверяем, что сохраненный прогресс соответствует текущему количеству упражнений
        if (progress.totalExercises === exercises.length) {
          return progress;
        }
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
    return null;
  };

  // Функция для очистки прогресса
  const clearProgress = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Failed to clear progress:', error);
    }
  };

  // Инициализация индексов упражнений и загрузка сохраненного прогресса
  useEffect(() => {
    if (exercises.length > 0) {
      const savedProgress = loadProgress();
      
      if (savedProgress && !savedProgress.isCompleted) {
        // Восстанавливаем прогресс, если упражнения не были завершены
        setCurrentExercise(savedProgress.currentExercise);
        setScore(savedProgress.score);
        setWrongAnswers(savedProgress.wrongAnswers);
        setOriginalWrongAnswers(savedProgress.originalWrongAnswers);
        setExerciseIndices(savedProgress.exerciseIndices);
        setTotalExercises(savedProgress.totalExercises);
        setIsCompleted(false);
      } else {
        // Начинаем заново или если упражнения были завершены
        const indices = exercises.map((_, i) => i);
        setExerciseIndices(indices);
        setTotalExercises(exercises.length);
        if (savedProgress?.isCompleted) {
          // Если упражнения были завершены, показываем результаты
          setScore(savedProgress.score);
          setOriginalWrongAnswers(savedProgress.originalWrongAnswers);
          setIsCompleted(true);
        }
      }
      setIsLoading(false);
    }
  }, [exercises.length, topic.id]);

  useEffect(() => {
    unlockAudio().catch(() => {});
    if (!isLoading && exerciseIndices.length > 0 && currentExercise < exerciseIndices.length) {
      shuffleOptions();
    }
  }, [currentExercise, exerciseIndices, isLoading]);

  const shuffleOptions = () => {
    if (exerciseIndices.length > 0 && currentExercise < exerciseIndices.length) {
      const exerciseIndex = exerciseIndices[currentExercise];
      if (exercises[exerciseIndex]) {
        const options = [...exercises[exerciseIndex].options];
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        setShuffledOptions(options);
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const exerciseIndex = exerciseIndices[currentExercise];
    const isCorrect = option === exercises[exerciseIndex].options[0];
    
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      // Сохраняем прогресс после правильного ответа
      setTimeout(() => {
        saveProgress({ score: newScore });
      }, 0);
    } else {
      // Сохраняем индекс неправильного ответа
      const newWrongAnswers = [...wrongAnswers, exerciseIndex];
      setWrongAnswers(newWrongAnswers);
      // Сохраняем прогресс после неправильного ответа
      setTimeout(() => {
        saveProgress({ wrongAnswers: newWrongAnswers });
      }, 0);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentExercise + 1 < exerciseIndices.length) {
      const nextExercise = currentExercise + 1;
      setCurrentExercise(nextExercise);
      setSelectedOption(null);
      setShowExplanation(false);
      
      // Сохраняем прогресс при переходе к следующему упражнению
      setTimeout(() => {
        saveProgress({ currentExercise: nextExercise });
      }, 0);
    } else {
      // Упражнения завершены
      // Сохраняем оригинальный список неправильных ответов для отображения в результатах
      const finalWrongAnswers = [...wrongAnswers];
      setOriginalWrongAnswers(finalWrongAnswers);
      setIsCompleted(true);
      
      // Сохраняем финальный прогресс
      setTimeout(() => {
        saveProgress({
          isCompleted: true,
          originalWrongAnswers: finalWrongAnswers
        });
      }, 0);
      
      if (onComplete) onComplete();
    }
  };

  const handleRetryWrong = () => {
    if (originalWrongAnswers.length === 0) return;
    
    // Устанавливаем только неправильные упражнения для повторного прохождения
    // Создаем копию массива, чтобы не изменять оригинальный
    const wrongIndices = [...new Set(originalWrongAnswers)]; // Убираем дубликаты
    setExerciseIndices(wrongIndices);
    setCurrentExercise(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    // Очищаем wrongAnswers для нового прохождения
    setWrongAnswers([]);
    setIsCompleted(false);
    
    // Сохраняем новый прогресс для повторного прохождения
    setTimeout(() => {
      saveProgress({
        currentExercise: 0,
        score: 0,
        wrongAnswers: [],
        exerciseIndices: wrongIndices,
        isCompleted: false
      });
    }, 0);
  };

  const handleReset = () => {
    // Обнуляем все и начинаем заново
    const indices = exercises.map((_, i) => i);
    setExerciseIndices(indices);
    setCurrentExercise(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setWrongAnswers([]);
    setOriginalWrongAnswers([]);
    setIsCompleted(false);
    
    // Очищаем сохраненный прогресс
    clearProgress();
  };

  if (exercises.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md text-center">
        <p className="text-gray-600 font-bold">Упражнения пока не добавлены</p>
      </div>
    );
  }

  // Показываем загрузку пока восстанавливаем прогресс
  if (isLoading) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md text-center">
        <p className="text-gray-600 font-bold">Загрузка...</p>
      </div>
    );
  }

  // Экран результатов
  if (isCompleted) {
    const percentage = Math.round((score / totalExercises) * 100);
    // Используем оригинальный список неправильных ответов для отображения
    const wrongCount = originalWrongAnswers.length;
    const hasWrongAnswers = wrongCount > 0;

    return (
      <div className="space-y-6 pb-12">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-md border border-gray-100 text-center">
          <div className="mb-6">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-black mb-4 ${
              percentage >= 80 ? 'bg-green-500 text-white' :
              percentage >= 60 ? 'bg-yellow-500 text-white' :
              'bg-red-500 text-white'
            }`}>
              {percentage}%
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">Упражнения завершены!</h2>
            <p className="text-gray-600 font-bold text-lg">
              Правильно: {score} из {totalExercises}
            </p>
            {hasWrongAnswers && (
              <p className="text-red-600 font-bold mt-2">
                Неправильных ответов: {wrongCount}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {hasWrongAnswers && (
              <button
                onClick={handleRetryWrong}
                className="w-full py-4 bg-orange-500 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all hover:bg-orange-600"
              >
                <i className="fas fa-redo"></i>
                <span>Пройти еще раз неправильные ({wrongCount})</span>
              </button>
            )}
            <button
              onClick={handleReset}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all hover:bg-indigo-700"
            >
              <i className="fas fa-sync-alt"></i>
              <span>Обнулить и начать заново</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (exerciseIndices.length === 0 || currentExercise >= exerciseIndices.length) {
    return null;
  }

  const exerciseIndex = exerciseIndices[currentExercise];
  const exercise = exercises[exerciseIndex];
  const isCorrect = selectedOption === exercise.options[0];
  const isLast = currentExercise + 1 === exerciseIndices.length;

  return (
    <div className="space-y-3 pb-6">
      {/* Прогресс */}
      <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
            Упражнение {currentExercise + 1} / {exerciseIndices.length}
          </span>
          <span className="text-[10px] font-bold text-gray-500">
            Правильно: {score} / {currentExercise + (selectedOption ? 1 : 0)}
          </span>
        </div>
        <div className="flex gap-0.5">
          {exerciseIndices.map((exerciseIdx, i) => {
            const wasAnswered = i < currentExercise || (i === currentExercise && selectedOption);
            const wasCorrect = i < currentExercise 
              ? !wrongAnswers.includes(exerciseIdx)
              : (i === currentExercise && selectedOption && isCorrect);
            
            return (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  wasAnswered
                    ? wasCorrect
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : i === currentExercise
                    ? 'bg-indigo-500'
                    : 'bg-gray-100'
                }`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Упражнение */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
        {/* Русский перевод */}
        <div className="mb-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-gray-600 font-bold text-sm leading-snug break-words">{exercise.sentence_ru}</p>
        </div>

        {/* Немецкое предложение с пропуском */}
        <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-base font-bold text-gray-800 leading-snug break-words">
            {exercise.sentence.split('____').map((part, i, arr) => (
              <React.Fragment key={i}>
                <span className="break-words">{part}</span>
                {i < arr.length - 1 && (
                  <span className={`inline-block px-1.5 mx-0.5 border-b-2 ${
                    selectedOption 
                      ? (isCorrect ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700')
                      : 'border-indigo-400 border-dashed'
                  } min-w-[60px] text-center break-words`}>
                    {selectedOption ? (
                      <span className={`font-black text-sm break-words ${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {selectedOption}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">____</span>
                    )}
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Варианты ответов */}
        {!selectedOption && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {shuffledOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className="p-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-100 hover:border-indigo-300 transition-all active:scale-95 text-left break-words overflow-wrap-anywhere hyphens-auto"
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
              >
                <span className="break-words">{option}</span>
              </button>
            ))}
          </div>
        )}

        {/* Объяснение */}
        {showExplanation && (
          <div className={`p-3 rounded-lg border-2 mb-3 ${
            isCorrect
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-green-500' : 'bg-red-500'
              } text-white font-black text-xs`}>
                <i className={`fas ${isCorrect ? 'fa-check' : 'fa-times'} text-xs`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-black mb-1 text-sm break-words ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect ? 'Правильно!' : `Неверно. Правильный ответ: ${exercise.options[0]}`}
                </p>
                {isCorrect && (
                  <p className="text-gray-700 font-medium text-xs leading-snug break-words">{exercise.explanation}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Кнопка "Далее" */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <span>{isLast ? 'Завершить' : 'Следующее упражнение'}</span>
            <i className={`fas ${isLast ? 'fa-check-circle' : 'fa-arrow-right'} text-xs`}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default GapFillExercises;

