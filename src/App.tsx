import React, { useState, useEffect, useMemo } from 'react';
import { AuthService } from './services/authService';
import { TOPICS } from './constants';
import { Topic, ModuleType, User } from './types';

// Функция для форматирования названия темы: немецкое название с русским переводом под ним
const formatTopicTitle = (title: string, showRussian: boolean = true) => {
  // Парсим формат "Русское (Немецкое)" или просто "Название"
  const match = title.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    const russian = match[1].trim();
    const german = match[2].trim();
    return (
      <div className="flex flex-col">
        <span>{german}</span>
        {showRussian && (
          <span className="text-gray-500 text-xs font-normal mt-0.5">{russian}</span>
        )}
      </div>
    );
  }
  return title;
};
import ModuleCard from './components/ModuleCard';
import VideoAssociations from './components/VideoAssociations';
import DialogModule from './components/DialogModule';
import Flashcards from './components/Flashcards';
import Mantras from './components/Mantras';
import GapFillExercises from './components/GapFillExercises';
import ArticleExercises from './components/ArticleExercises';
import AssociationsBase from './components/AssociationsBase';
import SpacedRepetition from './components/SpacedRepetition';
import { unlockAudio } from './services/audioService';
import { AccessControlService } from './services/accessControlService';
import { FirebaseService } from './services/firebaseService';
import associationsData from './data/associationsBase.json';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);
  const [topicProgress, setTopicProgress] = useState<Record<string, string[]>>({});
  const [showAssociationsBase, setShowAssociationsBase] = useState(false);
  const [showSpacedRepetition, setShowSpacedRepetition] = useState(false);
  const [wordsToReviewCount, setWordsToReviewCount] = useState(0);
  
  // Отладочный вывод для проверки счетчика
  useEffect(() => {
    console.log('🔔 wordsToReviewCount changed:', wordsToReviewCount);
  }, [wordsToReviewCount]);

  useEffect(() => {
    const initApp = async () => {
      try {
        const loggedUser = await AuthService.autoLogin();
        console.log('👤 User logged in:', {
          id: loggedUser.id,
          telegramId: loggedUser.telegramId,
          name: loggedUser.name,
          isGuest: loggedUser.telegramId === '0'
        });
        setUser(loggedUser);
        
        // Загружаем прогресс из Firebase для всех пользователей (включая гостей)
        if (loggedUser.telegramId) {
          console.log('📥 Loading progress from Firebase for user:', loggedUser.telegramId);
          try {
            const firebaseProgress = await FirebaseService.loadTopicProgress(loggedUser.telegramId);
            if (firebaseProgress) {
              console.log('✅ Loaded progress from Firebase:', firebaseProgress);
              setTopicProgress(firebaseProgress);
              // Синхронизируем с localStorage
              localStorage.setItem('promnemo_progress', JSON.stringify(firebaseProgress));
            } else {
              console.log('⚠️ No progress found in Firebase, checking localStorage');
              // Fallback на localStorage - НЕ синхронизируем обратно в Firebase
              // Если данных нет в Firebase, значит пользователь был удален или это новый пользователь
              // В этом случае данные из localStorage остаются только локально
              const savedProgress = localStorage.getItem('promnemo_progress');
              if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                console.log('📥 Loaded progress from localStorage (not syncing to Firebase - user was deleted or is new):', parsed);
                setTopicProgress(parsed);
              } else {
                console.log('ℹ️ No progress found in localStorage either');
              }
            }
          } catch (firebaseError) {
            console.error('❌ Error loading from Firebase, using localStorage:', firebaseError);
            if (firebaseError instanceof Error) {
              console.error('❌ Error message:', firebaseError.message);
            }
            const savedProgress = localStorage.getItem('promnemo_progress');
            if (savedProgress) {
              console.log('📥 Using localStorage as fallback');
              setTopicProgress(JSON.parse(savedProgress));
            }
          }
        } else {
          console.log('⚠️ User has no telegramId, using localStorage only');
          // Для пользователей без telegramId используем только localStorage
          const savedProgress = localStorage.getItem('promnemo_progress');
          if (savedProgress) {
            console.log('📥 Loaded progress from localStorage');
            setTopicProgress(JSON.parse(savedProgress));
          }
        }
      } catch (error) {
        console.error("Critical Auth error:", error);
      } finally {
        setTimeout(() => setIsAuthenticating(false), 1200);
      }
    };
    initApp();
  }, []);

  // Вспомогательная функция для подсчета слов, готовых к повторению
  const countWordsToReview = (studyWords: any[]): number => {
    const now = Date.now();
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);
    const endOfTodayMs = endOfToday.getTime();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTodayMs = startOfToday.getTime();
    
    const wordsData = associationsData as any[];
    return studyWords.filter(sw => {
      const wordData = wordsData.find(w => w.id === sw.wordId);
      if (!wordData) return false;
      // Показываем слово, если nextReview находится в пределах текущего дня
      // (включая слова, добавленные сегодня с nextReview на конец дня)
      return sw.nextReview <= endOfTodayMs && sw.nextReview >= startOfTodayMs;
    }).length;
  };

  // Загружаем и считаем слова для повторения
  useEffect(() => {
    const loadWordsToReview = async () => {
      if (!user) return;

      let studyWords: any[] = [];
      
      if (user.telegramId) {
        try {
          const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
          if (firebaseWords) {
            studyWords = firebaseWords;
          }
        } catch (error) {
          console.error('Error loading study words:', error);
        }
      }
      
      // Fallback на localStorage
      if (studyWords.length === 0) {
        const saved = localStorage.getItem('promnemo_study_words');
        if (saved) {
          try {
            studyWords = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse study words:', e);
          }
        }
      }

      const readyToReview = countWordsToReview(studyWords);
      console.log('📊 Words to review count:', readyToReview, 'from', studyWords.length, 'total study words');
      setWordsToReviewCount(readyToReview);
    };

    loadWordsToReview();
    
    // Обновляем счетчик каждые 5 секунд для более быстрого обновления
    const interval = setInterval(loadWordsToReview, 5000);
    return () => clearInterval(interval);
  }, [user]);

  // Глобальный обработчик клика для разблокировки звука в Telegram
  const handleGlobalClick = () => {
    unlockAudio().catch(() => {});
  };

  const updateProgress = async (topicId: string, moduleId: string) => {
    console.log('📝 updateProgress called:', { topicId, moduleId, user: user ? { id: user.id, telegramId: user.telegramId } : null });
    
    setTopicProgress(prev => {
      const currentTopicModules = prev[topicId] || [];
      if (currentTopicModules.includes(moduleId)) {
        console.log('⚠️ Module already completed, skipping');
        return prev;
      }
      
      const newProgress = {
        ...prev,
        [topicId]: [...currentTopicModules, moduleId]
      };
      
      console.log('💾 Saving progress:', { topicId, moduleId, newProgress });
      
      // Сохраняем в localStorage
      localStorage.setItem('promnemo_progress', JSON.stringify(newProgress));
      
      // Сохраняем в Firebase только если пользователь существует
      const currentUser = user; // Сохраняем ссылку на user
      if (currentUser && currentUser.telegramId) {
        console.log('🔥 Saving to Firebase for user:', currentUser.telegramId);
        FirebaseService.userExists(currentUser.telegramId)
          .then(exists => {
            if (exists) {
              return FirebaseService.saveTopicProgress(currentUser.telegramId, newProgress);
            } else {
              console.log('⚠️ User does not exist in Firebase, skipping save from updateProgress');
              return Promise.resolve();
            }
          })
          .then(() => {
            console.log('✅ Progress saved to Firebase successfully');
          })
          .catch(error => {
            console.error('❌ Error saving progress to Firebase:', error);
            console.error('❌ Error details:', JSON.stringify(error, null, 2));
          });
      } else {
        console.warn('⚠️ User has no telegramId, skipping Firebase save');
      }
      
      return newProgress;
    });
  };

  const handleBack = () => {
    if (activeModule) {
      setActiveModule(null);
    } else if (selectedTopic) {
      setSelectedTopic(null);
    }
  };

  const getProgressPercentage = (topicId: string) => {
    const completed = topicProgress[topicId]?.length || 0;
    return Math.round((completed / 4) * 100);
  };

  // Фильтруем темы по доступу пользователя
  const availableTopics = useMemo(() => {
    return AccessControlService.filterTopicsByAccess(user, TOPICS);
  }, [user]);

  // Фильтр по уровню
  const [levelFilter, setLevelFilter] = useState<string>('all');
  
  const filteredTopics = useMemo(() => {
    const filtered = levelFilter === 'all' ? availableTopics : availableTopics.filter(topic => topic.level === levelFilter);
    return [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }, [availableTopics, levelFilter]);

  // Получаем уникальные уровни из доступных тем
  const availableLevels = useMemo(() => {
    const levels = new Set(availableTopics.map(t => t.level).filter(Boolean));
    return Array.from(levels).sort();
  }, [availableTopics]);

  if (isAuthenticating || !user) {
    return (
      <div className="h-full bg-indigo-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <div className="relative mb-12">
          <div className="w-40 h-40 bg-indigo-500 rounded-[3rem] flex items-center justify-center text-6xl animate-pulse-slow shadow-2xl">
            🇩🇪
          </div>
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tight">Pro Mnemo</h1>
        <p className="text-indigo-200 font-bold text-xl uppercase tracking-widest">Загрузка...</p>
      </div>
    );
  }

  const mainPadding = activeModule === 'text' ? 'px-2' : 'px-6';

  return (
    <div className="h-full flex flex-col bg-gray-50 relative" onClick={handleGlobalClick}>
      <main className={`flex-1 overflow-y-auto ${mainPadding} pt-6 pb-32 scroll-smooth`}>
        {showSpacedRepetition ? (
          <SpacedRepetition onBack={() => setShowSpacedRepetition(false)} user={user} onWordsChange={() => {
            // Обновляем счетчик при изменении слов
            const loadWordsToReview = async () => {
              if (!user) return;
              let studyWords: any[] = [];
              if (user.telegramId) {
                try {
                  const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
                  if (firebaseWords) studyWords = firebaseWords;
                } catch (error) {
                  console.error('Error loading study words:', error);
                }
              }
              if (studyWords.length === 0) {
                const saved = localStorage.getItem('promnemo_study_words');
                if (saved) {
                  try {
                    studyWords = JSON.parse(saved);
                  } catch (e) {}
                }
              }
              const readyToReview = countWordsToReview(studyWords);
              setWordsToReviewCount(readyToReview);
            };
            loadWordsToReview();
          }} />
        ) : showAssociationsBase ? (
          <AssociationsBase onBack={() => setShowAssociationsBase(false)} user={user} onWordsChange={() => {
            // Обновляем счетчик при изменении слов
            const loadWordsToReview = async () => {
              if (!user) return;
              let studyWords: any[] = [];
              if (user.telegramId) {
                try {
                  const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
                  if (firebaseWords) studyWords = firebaseWords;
                } catch (error) {
                  console.error('Error loading study words:', error);
                }
              }
              if (studyWords.length === 0) {
                const saved = localStorage.getItem('promnemo_study_words');
                if (saved) {
                  try {
                    studyWords = JSON.parse(saved);
                  } catch (e) {}
                }
              }
              const readyToReview = countWordsToReview(studyWords);
              setWordsToReviewCount(readyToReview);
            };
            loadWordsToReview();
          }} />
        ) : !selectedTopic ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-3xl font-black mb-1.5 leading-tight">Hallo, {user.name.split(' ')[0]}!</h2>
                 <p className="text-indigo-100 font-bold text-sm">Тема недели: Möbel kaufen</p>
               </div>
            </div>

            {/* Блок базы ассоциаций и повторения */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowAssociationsBase(true)}
                className="bg-white border-2 border-purple-200 text-purple-600 px-6 py-4 rounded-2xl font-black text-base shadow-md hover:shadow-lg hover:border-purple-300 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-brain text-lg"></i>
                База ассоциаций
              </button>
              <button
                onClick={() => setShowSpacedRepetition(true)}
                className="bg-white border-2 border-green-200 text-green-600 px-6 py-4 rounded-2xl font-black text-base shadow-md hover:shadow-lg hover:border-green-300 active:scale-95 transition-all flex items-center justify-center gap-2 relative"
                style={{ overflow: 'visible', position: 'relative' }}
              >
                <i className="fas fa-redo text-lg"></i>
                <span>Повтор</span>
                {wordsToReviewCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black rounded-full min-w-[20px] h-5 flex items-center justify-center shadow-lg px-1.5 z-[100] border-2 border-white"
                    style={{ 
                      lineHeight: '1',
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={`${wordsToReviewCount} слов для повторения`}
                  >
                    {wordsToReviewCount > 99 ? '99+' : wordsToReviewCount}
                  </span>
                )}
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-base font-black text-gray-400 uppercase tracking-[0.2em]">Выбери Тему</h3>
                {availableLevels.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-black text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Все уровни</option>
                      {availableLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {filteredTopics.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-md text-center">
                  <p className="text-gray-600 font-bold">У вас нет доступа ни к одной теме. Обратитесь к администратору.</p>
                </div>
              ) : (
              <div className="grid grid-cols-1 gap-5">
                {filteredTopics.map((topic) => {
                  const progress = getProgressPercentage(topic.id);
                  const isPlanned = topic.words.length === 0 && !topic.availableFrom;
                  const isAvailable = !isPlanned && (!topic.availableFrom || new Date(topic.availableFrom) <= new Date());
                  const availableDate = topic.availableFrom ? new Date(topic.availableFrom).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null;
                  
                  return (
                    <div 
                      key={topic.id}
                      onClick={() => {
                        if (isAvailable) {
                          // Диагностика для темы 2
                          if (topic.id === 'house-cleaning') {
                            console.log('🏠 Setting house-cleaning topic:', {
                              id: topic.id,
                              hasDialog: !!topic.dialog,
                              imageUrl: topic.dialog?.imageUrl,
                              textLength: topic.dialog?.text?.length,
                              audioUrl: topic.dialog?.audioUrl,
                              quizLength: topic.quiz?.length
                            });
                          }
                          setSelectedTopic(topic);
                        }
                        // Для недоступных тем ничего не делаем
                      }}
                      className={`group bg-white rounded-[2rem] p-4 border border-gray-100 shadow-md transition-all flex items-center gap-4 relative overflow-hidden ${
                        isAvailable ? 'hover:shadow-xl cursor-pointer' : 'cursor-pointer'
                      }`}
                    >
                      <div className={`w-10 h-10 ${topic.color} rounded-xl flex items-center justify-center text-white text-lg shadow-lg ${isAvailable ? 'group-hover:scale-110 transition-transform' : ''}`}>
                        <i className={`fas ${topic.icon}`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base font-black text-gray-800">{formatTopicTitle(topic.title)}</h3>
                          {topic.isNew && (
                            <span className="px-2 py-0.5 bg-green-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                              новое
                            </span>
                          )}
                          {topic.level && (
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                              {topic.level}
                            </span>
                          )}
                        </div>
                        {isAvailable ? (
                          <div className="flex items-center gap-3">
                             <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                             </div>
                             <span className="text-sm font-black text-gray-500">{progress}%</span>
                          </div>
                        ) : isPlanned ? (
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                            Планируется к публикации
                          </p>
                        ) : (
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                            Доступна с {availableDate}
                          </p>
                        )}
                      </div>
                      {!isAvailable && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                          <i className={`fas ${isPlanned ? 'fa-clock' : 'fa-lock'} text-gray-500 text-sm`}></i>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          </div>
        ) : !activeModule ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 px-2">
            {(() => {
              // Проверяем доступ к теме
              if (!AccessControlService.canAccessTopic(user, selectedTopic.id)) {
                return (
                  <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-lock text-red-500 text-3xl"></i>
                      </div>
                      <h2 className="text-2xl font-black text-gray-800 mb-2">Доступ ограничен</h2>
                      <p className="text-gray-600 font-bold">У вас нет доступа к этой теме.</p>
                      <p className="text-gray-500 text-sm mt-2">Обратитесь к администратору для получения доступа.</p>
                    </div>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-base shadow-lg hover:shadow-xl active:scale-95 transition-all"
                    >
                      Вернуться к списку тем
                    </button>
                  </div>
                );
              }
              
              const isTopicAvailable = !selectedTopic.availableFrom || new Date(selectedTopic.availableFrom) <= new Date();
              
              if (!isTopicAvailable) {
                const availableDate = selectedTopic.availableFrom ? new Date(selectedTopic.availableFrom).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null;
                return (
                  <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md text-center">
                    <div className={`w-20 h-20 ${selectedTopic.color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg mx-auto mb-6`}>
                      <i className={`fas ${selectedTopic.icon}`}></i>
                    </div>
                    <h2 className="text-xl font-black text-gray-800 mb-4">{formatTopicTitle(selectedTopic.title, false)}</h2>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <i className="fas fa-lock text-gray-400 text-4xl mb-4"></i>
                      <p className="text-lg font-bold text-gray-600 mb-2">Тема пока недоступна</p>
                      <p className="text-sm font-medium text-gray-500">
                        Доступна с {availableDate}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-colors"
                    >
                      Вернуться к темам
                    </button>
                  </div>
                );
              }
              
              return (
                <>
                  <div className="flex items-center gap-5">
                     <div className={`w-16 h-16 ${selectedTopic.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                        <i className={`fas ${selectedTopic.icon}`}></i>
                     </div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                         <h2 className="text-xl font-black text-gray-800 leading-tight">{formatTopicTitle(selectedTopic.title, false)}</h2>
                         {selectedTopic.level && (
                           <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-xl text-xs font-black uppercase tracking-wider">
                             {selectedTopic.level}
                           </span>
                         )}
                       </div>
                     </div>
                  </div>

            <div className="grid grid-cols-2 gap-4">
              <ModuleCard 
                title="Ассоциации" icon="fa-video" colorClass="bg-red-500" 
                isCompleted={topicProgress[selectedTopic.id]?.includes('video')}
                onClick={() => {
                  setActiveModule('video');
                  updateProgress(selectedTopic.id, 'video');
                }} 
              />
              <ModuleCard 
                title="Текст" icon="fa-book-open" colorClass="bg-blue-500" 
                isCompleted={topicProgress[selectedTopic.id]?.includes('text')}
                onClick={() => setActiveModule('text')} 
              />
              <ModuleCard 
                title="Карточки" icon="fa-clone" colorClass="bg-green-500" 
                isCompleted={topicProgress[selectedTopic.id]?.includes('flashcards')}
                onClick={() => setActiveModule('flashcards')} 
              />
              <ModuleCard 
                title="Мантры" icon="fa-comments" colorClass="bg-purple-500" 
                isCompleted={topicProgress[selectedTopic.id]?.includes('mantras')}
                onClick={() => setActiveModule('mantras')} 
              />
              <ModuleCard 
                title="Упражнения" icon="fa-pencil-alt" colorClass="bg-orange-500" 
                isCompleted={topicProgress[selectedTopic.id]?.includes('exercises')}
                onClick={() => setActiveModule('exercises')} 
              />
              <ModuleCard 
                title="Артикли" icon="fa-font" colorClass="bg-pink-500" 
                isCompleted={topicProgress[selectedTopic.id]?.includes('articles')}
                onClick={() => setActiveModule('articles')} 
              />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="w-full flex justify-between items-end mb-4">
                <h4 className="text-xl font-black text-gray-800">Прогресс темы</h4>
                <span className="text-sm font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                  {getProgressPercentage(selectedTopic.id)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full transition-all duration-1000" 
                  style={{ width: `${getProgressPercentage(selectedTopic.id)}%` }}
                ></div>
              </div>
            </div>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {(() => {
              const isTopicAvailable = !selectedTopic.availableFrom || new Date(selectedTopic.availableFrom) <= new Date();
              
              if (!isTopicAvailable) {
                const availableDate = selectedTopic.availableFrom ? new Date(selectedTopic.availableFrom).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null;
                return (
                  <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-md text-center">
                    <div className={`w-20 h-20 ${selectedTopic.color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg mx-auto mb-6`}>
                      <i className={`fas ${selectedTopic.icon}`}></i>
                    </div>
                    <h2 className="text-xl font-black text-gray-800 mb-4">{formatTopicTitle(selectedTopic.title, false)}</h2>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <i className="fas fa-lock text-gray-400 text-4xl mb-4"></i>
                      <p className="text-lg font-bold text-gray-600 mb-2">Тема пока недоступна</p>
                      <p className="text-sm font-medium text-gray-500">
                        Доступна с {availableDate}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTopic(null);
                        setActiveModule(null);
                      }}
                      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-colors"
                    >
                      Вернуться к темам
                    </button>
                  </div>
                );
              }
              
              return (
                <>
                  {activeModule === 'video' && <VideoAssociations topic={selectedTopic} user={user} wordsToReviewCount={wordsToReviewCount} onWordsChange={() => {
            // Обновляем счетчик при изменении слов
            const loadWordsToReview = async () => {
              if (!user) return;
              let studyWords: any[] = [];
              if (user.telegramId) {
                try {
                  const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
                  if (firebaseWords) studyWords = firebaseWords;
                } catch (error) {
                  console.error('Error loading study words:', error);
                }
              }
              if (studyWords.length === 0) {
                const saved = localStorage.getItem('promnemo_study_words');
                if (saved) {
                  try {
                    studyWords = JSON.parse(saved);
                  } catch (e) {}
                }
              }
              const readyToReview = countWordsToReview(studyWords);
              setWordsToReviewCount(readyToReview);
            };
            loadWordsToReview();
          }} />}
                  {activeModule === 'text' && <DialogModule topic={selectedTopic} onComplete={() => updateProgress(selectedTopic.id, 'text')} />}
                  {activeModule === 'flashcards' && <Flashcards topic={selectedTopic} onComplete={() => updateProgress(selectedTopic.id, 'flashcards')} user={user} wordsToReviewCount={wordsToReviewCount} onWordsChange={() => {
            // Обновляем счетчик при изменении слов
            const loadWordsToReview = async () => {
              if (!user) return;
              let studyWords: any[] = [];
              if (user.telegramId) {
                try {
                  const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
                  if (firebaseWords) studyWords = firebaseWords;
                } catch (error) {
                  console.error('Error loading study words:', error);
                }
              }
              if (studyWords.length === 0) {
                const saved = localStorage.getItem('promnemo_study_words');
                if (saved) {
                  try {
                    studyWords = JSON.parse(saved);
                  } catch (e) {}
                }
              }
              const readyToReview = countWordsToReview(studyWords);
              setWordsToReviewCount(readyToReview);
            };
            loadWordsToReview();
          }} />}
                  {activeModule === 'mantras' && <Mantras topic={selectedTopic} onComplete={() => updateProgress(selectedTopic.id, 'mantras')} />}
                  {activeModule === 'exercises' && <GapFillExercises topic={selectedTopic} onComplete={() => updateProgress(selectedTopic.id, 'exercises')} />}
                  {activeModule === 'articles' && <ArticleExercises topic={selectedTopic} onComplete={() => updateProgress(selectedTopic.id, 'articles')} />}
                </>
              );
            })()}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-5 flex items-center justify-between z-50 shadow-2xl">
        <div className="flex items-center gap-5">
          {(selectedTopic || activeModule) && (
            <button 
              onClick={handleBack} 
              className="w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-2xl active:scale-90 transition-all shadow-xl"
            >
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-tight">
              {activeModule ? (activeModule === 'video' ? 'Ассоциации' : activeModule === 'text' ? 'Текст' : activeModule === 'flashcards' ? 'Карточки' : activeModule === 'mantras' ? 'Мантры' : activeModule === 'exercises' ? 'Упражнения' : activeModule === 'articles' ? 'Артикли' : 'Модули') : selectedTopic ? 'Модули' : 'Pro Mnemo'}
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedTopic(null);
            setActiveModule(null);
          }}
          className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center active:scale-90 transition-all shadow-xl"
        >
          <i className="fas fa-home text-lg"></i>
        </button>
      </footer>

    </div>
  );
};

export default App;