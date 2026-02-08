import React, { useState, useEffect, useMemo } from 'react';
import associationsData from '../data/associationsBase.json';
import { FirebaseService } from '../services/firebaseService';

interface WordRecord {
  id: string;
  "Слово"?: string;
  "Перевод"?: string;
  "Транскрипция"?: string;
  "Часть речи"?: string;
  "Тема"?: string[]; // Темы из колонки K
  "Темы"?: string[]; // Старое поле (для обратной совместимости)
  "Мнемо якоря"?: string;
  "Ассоциации"?: string;
  "Примеры"?: string;
  "Формы глагола (Inf – Prät – Perf)"?: string;
  "Спряжение (Präsens)"?: string;
  "Родственные слова"?: string;
  "Изображение"?: string; // Путь к локальному изображению
}

interface AssociationsBaseProps {
  onBack: () => void;
  user?: { telegramId: string } | null;
  onWordsChange?: () => void;
}

const AssociationsBase: React.FC<AssociationsBaseProps> = ({ onBack, user, onWordsChange }) => {
  const [records, setRecords] = useState<WordRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<WordRecord | null>(null);
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [studyWords, setStudyWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadData = async () => {
      try {
        // Загружаем данные из локального JSON файла
        const data = associationsData as WordRecord[];
        setRecords(data);
      } catch (err) {
        console.error("Failed to load associations data:", err);
        setError("Не удалось загрузить данные.");
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // Загружаем слова в изучении из Firebase или localStorage
    const loadStudyWords = async () => {
      if (user && user.telegramId) {
        try {
          const firebaseWords = await FirebaseService.loadStudyWords(user.telegramId);
          if (firebaseWords) {
            const wordIds = firebaseWords.map((sw: any) => sw.wordId);
            setStudyWords(new Set(wordIds));
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
          const wordIds = parsed.map((sw: any) => sw.wordId);
          setStudyWords(new Set(wordIds));
        } catch (e) {
          console.error('Failed to load study words:', e);
        }
      }
    };
    
    loadStudyWords();
  }, [user]);


  // Получаем список всех уникальных тем из поля "Тема" (колонка K)
  const allThemes = useMemo(() => {
    const themesSet = new Set<string>();
    records.forEach(record => {
      // Используем поле "Тема" (из колонки K), если есть, иначе "Темы" (старое поле)
      const themes = record["Тема"] || record["Темы"] || [];
      if (Array.isArray(themes)) {
        themes.forEach(theme => {
          if (theme && typeof theme === 'string') {
            themesSet.add(theme);
          }
        });
      }
    });
    return Array.from(themesSet).sort();
  }, [records]);

  const filtered = useMemo(() => {
    let result = records;

    // Фильтр по поисковому запросу
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(record => {
        const word = record["Слово"]?.toLowerCase() || '';
        const translation = record["Перевод"]?.toLowerCase() || '';
        const transcription = record["Транскрипция"]?.toLowerCase() || '';
        return word.includes(query) || translation.includes(query) || transcription.includes(query);
      });
    }

    // Фильтр по теме
    if (selectedTheme) {
      result = result.filter(record => {
        // Используем поле "Тема" (из колонки K), если есть, иначе "Темы" (старое поле)
        const themes = record["Тема"] || record["Темы"] || [];
        if (!Array.isArray(themes) || themes.length === 0) return false;
        return themes.includes(selectedTheme);
      });
    }

    return result;
  }, [records, searchQuery, selectedTheme]);

  const WordInfoRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value || value === "-") return null;
    return (
      <div className="py-6 border-b border-slate-50 last:border-0">
        <dt className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">{label}</dt>
        <dd className="text-slate-700 font-semibold text-lg leading-relaxed whitespace-pre-wrap">{value}</dd>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-lg border-b border-gray-200" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: 'white' }}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="w-11 h-11 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
              >
                <i className="fas fa-arrow-left text-lg"></i>
              </button>
              <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                <i className="fas fa-brain text-lg"></i>
              </div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">База Ассоциаций</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl">
              <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">{filtered.length}</span>
            </div>
          </div>
          
          {/* Поиск и фильтры */}
          <div className="mt-4 space-y-3">
            {/* Поиск по слову */}
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по слову, переводу или транскрипции..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 font-medium"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            
            {/* Фильтр по теме */}
            {allThemes.length > 0 && (
              <div className="relative">
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 font-medium appearance-none cursor-pointer"
                >
                  <option value="">Все темы</option>
                  {allThemes.map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                {selectedTheme && (
                  <button
                    onClick={() => setSelectedTheme('')}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times text-sm"></i>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer для fixed header - компенсирует высоту хедера */}
      <div style={{ height: '220px' }} aria-hidden="true"></div>
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-10" style={{ position: 'relative', zIndex: 0 }}>
        {error && <div className="mb-10 p-5 bg-red-50 text-red-600 rounded-2xl font-bold">{error}</div>}

        {/* Sequential List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%] animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map(r => (
              <div 
                key={r.id} 
                onClick={() => setSelected(r)}
                className="bg-white rounded-2xl p-4 cursor-pointer flex flex-col items-center gap-3 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:scale-105 transition-all"
              >
                {r["Изображение"] && r["Изображение"].trim() !== '' && (
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                    {/* Placeholder пока загружается */}
                    <div className="placeholder absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center z-0">
                      <i className="fas fa-image text-slate-300 text-2xl"></i>
                    </div>
                    <picture>
                      <source 
                        srcSet={r["Изображение"]?.replace(/\.(jpg|jpeg|png)$/i, '.webp')} 
                        type="image/webp" 
                      />
                      <img 
                        src={r["Изображение"]} 
                        alt={r["Слово"] || ''}
                        className="w-full h-full object-cover relative z-10"
                        loading="lazy"
                        decoding="async"
                        style={{ 
                          maxWidth: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                        onLoad={(e) => {
                          // Скрываем placeholder когда изображение загрузилось
                          const placeholder = e.currentTarget.closest('div')?.querySelector('.placeholder') as HTMLElement;
                          if (placeholder) {
                            placeholder.style.display = 'none';
                          }
                        }}
                        onError={(e) => {
                          // Если WebP не загрузился, пробуем оригинал
                          const img = e.currentTarget;
                          if (img.src.includes('.webp')) {
                            const originalSrc = img.src.replace('.webp', img.src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg');
                            img.src = originalSrc;
                          } else {
                            // Если и оригинал не загрузился, скрываем контейнер
                            img.parentElement!.parentElement!.style.display = 'none';
                          }
                        }}
                      />
                    </picture>
                  </div>
                )}
                <div className="text-center w-full relative">
                  {studyWords.has(r.id) && (
                    <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                      <i className="fas fa-check"></i>
                    </div>
                  )}
                  <h3 className="text-lg font-extrabold text-slate-800 tracking-tight mb-1">{r["Слово"]}</h3>
                  <p className="text-slate-500 font-bold text-sm">{r["Перевод"]}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-32 text-center text-slate-300 font-bold uppercase tracking-widest">Ничего не найдено</div>
        )}
      </main>

      {/* Word Details Modal */}
      {selected && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          style={{ zIndex: 200 }}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col relative animate-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{selected["Слово"]}</h2>
                  {selected["Транскрипция"] && (
                    <p className="text-indigo-500 font-mono text-xl">{selected["Транскрипция"]}</p>
                  )}
                </div>
                <button 
                  onClick={() => setSelected(null)}
                  className="p-3 bg-slate-100 text-slate-400 hover:text-slate-900 rounded-full transition-colors"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>

              {/* Fully Visible Image */}
              {selected["Изображение"] && selected["Изображение"].trim() !== '' && (
                <div 
                  className="mb-3 group relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 cursor-zoom-in max-w-md mx-auto" 
                  onClick={() => setFullscreenImg(selected["Изображение"]!)}
                >
                  {/* Placeholder */}
                  <div className="placeholder absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
                    <i className="fas fa-image text-slate-300 text-3xl"></i>
                  </div>
                  <picture>
                    <source 
                      srcSet={selected["Изображение"]?.replace(/\.(jpg|jpeg|png)$/i, '.webp')} 
                      type="image/webp" 
                    />
                    <img 
                      src={selected["Изображение"]} 
                      alt={selected["Слово"] || ''}
                      className="w-full h-auto max-h-[250px] object-contain mx-auto relative z-10"
                      loading="eager"
                      decoding="async"
                      style={{ 
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                      onLoad={(e) => {
                        // Скрываем placeholder когда изображение загрузилось
                        const placeholder = e.currentTarget.closest('div')?.querySelector('.placeholder') as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'none';
                        }
                      }}
                      onError={(e) => {
                        // Если WebP не загрузился, пробуем оригинал
                        const img = e.currentTarget;
                        if (img.src.includes('.webp')) {
                          const originalSrc = img.src.replace('.webp', img.src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg');
                          img.src = originalSrc;
                        } else {
                          e.currentTarget.parentElement!.parentElement!.style.display = 'none';
                        }
                      }}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <i className="fas fa-expand text-lg"></i>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4 items-center">
                {selected["Часть речи"] && (
                  <span className="px-5 py-2.5 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                    {selected["Часть речи"]}
                  </span>
                )}
                {((selected["Тема"] || selected["Темы"]) || []).map((t, i) => (
                  <span key={i} className="px-5 py-2.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                    {t}
                  </span>
                ))}
                <button
                  onClick={async () => {
                    const isInStudy = studyWords.has(selected.id);
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
                      const filtered = existing.filter((sw: any) => sw.wordId !== selected.id);
                      localStorage.setItem('promnemo_study_words', JSON.stringify(filtered));
                      setStudyWords(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(selected.id);
                        return newSet;
                      });
                      
                      // Сохраняем в Firebase только если пользователь существует
                      if (user && user.telegramId) {
                        try {
                          const userExists = await FirebaseService.userExists(user.telegramId);
                          if (userExists) {
                            await FirebaseService.saveStudyWords(user.telegramId, filtered);
                            console.log('✅ Word removed from study in Firebase (AssociationsBase)');
                          } else {
                            console.log('⚠️ User does not exist in Firebase, skipping save (AssociationsBase)');
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
                        wordId: selected.id,
                        addedAt: now,
                        nextReview: endOfDay.getTime(), // Конец текущего дня - доступно для первого повторения
                        interval: 0, // Пока не повторяли
                        easeFactor: 2.5, // Оставляем для совместимости, но не используем
                        repetitions: 0 // Начинаем с 0 повторений
                      };
                      
                      existing.push(newWord);
                      localStorage.setItem('promnemo_study_words', JSON.stringify(existing));
                      setStudyWords(prev => new Set(prev).add(selected.id));
                      
                      // Сохраняем в Firebase только если пользователь существует
                      console.log('🔍 Attempting to save to Firebase:', {
                        hasUser: !!user,
                        telegramId: user?.telegramId,
                        wordsCount: existing.length
                      });
                      if (user && user.telegramId) {
                        try {
                          const userExists = await FirebaseService.userExists(user.telegramId);
                          if (userExists) {
                            await FirebaseService.saveStudyWords(user.telegramId, existing);
                            console.log('✅ Word added to study in Firebase (AssociationsBase)');
                          } else {
                            console.log('⚠️ User does not exist in Firebase, skipping save (AssociationsBase)');
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
                  }}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    studyWords.has(selected.id)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {studyWords.has(selected.id) ? (
                    <>
                      <i className="fas fa-check mr-1"></i>
                      В учебе
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-1"></i>
                      Учить
                    </>
                  )}
                </button>
              </div>

              {/* Sequential Fields */}
              <div className="flex flex-col">
                {/* Перевод и Мнемо-якоря в одну строку */}
                <div className="py-6 border-b border-slate-50 flex flex-row gap-6">
                  {selected["Перевод"] && selected["Перевод"] !== "-" && (
                    <div className="flex-1">
                      <dt className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Перевод</dt>
                      <dd className="text-slate-700 font-semibold text-lg leading-relaxed whitespace-pre-wrap">{selected["Перевод"]}</dd>
                    </div>
                  )}
                  {selected["Мнемо якоря"] && selected["Мнемо якоря"] !== "-" && (
                    <div className="flex-1">
                      <dt className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Мнемо-якоря</dt>
                      <dd className="text-slate-700 font-semibold text-lg leading-relaxed whitespace-pre-wrap">{selected["Мнемо якоря"]}</dd>
                    </div>
                  )}
                </div>
                <WordInfoRow label="Ассоциация" value={selected["Ассоциации"]} />
                <WordInfoRow label="Примеры" value={selected["Примеры"]} />
                {/* Показываем поля глагола только если часть речи - глагол */}
                {(selected["Часть речи"]?.toLowerCase() === 'глагол' || selected["Часть речи"]?.toLowerCase() === 'verb') && (
                  <>
                    <WordInfoRow label="Формы глагола" value={selected["Формы глагола (Inf – Prät – Perf)"]} />
                    <WordInfoRow label="Спряжение (Präsens)" value={selected["Спряжение (Präsens)"]} />
                  </>
                )}
                <WordInfoRow label="Родственные слова" value={selected["Родственные слова"]} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Overlay */}
      {fullscreenImg && (
        <div 
          className="fixed inset-0 z-[250] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          style={{ zIndex: 250 }}
          onClick={() => setFullscreenImg(null)}
        >
          <img 
            src={fullscreenImg} 
            className="max-w-full max-h-full object-contain"
            loading="eager"
            decoding="async"
            style={{ 
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          />
          <button 
            className="absolute top-10 right-10 text-white opacity-50 hover:opacity-100 transition-opacity p-3"
            onClick={() => setFullscreenImg(null)}
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default AssociationsBase;

