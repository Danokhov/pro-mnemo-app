import React, { useState, useEffect } from 'react';
import { Topic } from '../types';
import { playMantraAudio, unlockAudio, playTextWithSpeechSynthesis } from '../services/audioService';
import { playTextWithOpenAITTS } from '../services/openaiTtsService';

interface MantrasProps {
  topic: Topic;
  onComplete?: () => void;
}

const Mantras: React.FC<MantrasProps> = ({ topic, onComplete }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>(topic.mantras.map((_, i) => i));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'de-ru' | 'ru-de'>('de-ru');
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [sessionFinished, setSessionFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentMantraIndex = activeIndices[currentIndex];
  const currentMantra = topic.mantras[currentMantraIndex];

  // Разблокируем аудио при монтировании компонента
  useEffect(() => {
    unlockAudio().catch((err) => {
      console.warn("⚠️ Failed to unlock audio on mount:", err);
    });
  }, []);

  const handleAudioClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Блокируем повторные нажатия
    if (isSpeaking) {
      console.log("⏸️ Already speaking, ignoring click");
      return;
    }
    
    console.log("🔊 Mantras: handleAudioClick called", { 
      mantra: currentMantra.de, 
      mantraId: currentMantra.id,
      topicId: topic.id 
    });
    
    setIsSpeaking(true);
    
    try {
      // Убеждаемся, что аудио разблокировано
      await unlockAudio();
      console.log("✅ Audio unlocked before speaking");
      
      // OpenAI TTS (модуль уже загружен — без задержки на dynamic import)
      try {
        await playTextWithOpenAITTS(currentMantra.de, 'de');
      } catch (openaiError) {
        console.warn("⚠️ [TTS Engine: OpenAI] Failed, switching to fallback:", openaiError);
        await playTextWithSpeechSynthesis(currentMantra.de, 'de');
        console.log("✅ [TTS Engine: Browser Speech Synthesis] Fallback activated");
      }
      
      // Пауза после воспроизведения для защиты от повторных нажатий
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error("❌ Error in handleAudioClick:", error);
      // Не показываем alert пользователю, просто логируем
      // Пауза даже при ошибке, чтобы избежать спама запросов
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsSpeaking(false);
    }
  };

  const markResult = (isCorrect: boolean) => {
    const newResults = { ...results, [currentMantraIndex]: isCorrect };
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
    setActiveIndices(topic.mantras.map((_, i) => i));
    setCurrentIndex(0);
    setResults({});
    setSessionFinished(false);
    setIsFlipped(false);
  };

  const retryErrors = () => {
    const errors = activeIndices.filter(idx => !results[idx]);
    setActiveIndices(errors);
    setCurrentIndex(0);
    setResults({});
    setSessionFinished(false);
    setIsFlipped(false);
  };

  const correctCount = Object.values(results).filter(Boolean).length;
  const errorCount = activeIndices.length - correctCount;

  if (sessionFinished) {
    return (
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 text-center animate-in zoom-in mx-2">
        <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          <i className="fas fa-magic"></i>
        </div>
        <h3 className="text-3xl font-black text-gray-800 mb-3">Изучено!</h3>
        <p className="text-lg text-gray-500 mb-8 font-medium">{correctCount} из {activeIndices.length} верно</p>
        
        <div className="space-y-3">
          {errorCount > 0 && (
            <button 
              onClick={retryErrors}
              className="w-full py-5 bg-purple-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl"
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
          <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Фраза {currentIndex + 1} / {activeIndices.length}</span>
        </div>
        <div className="h-1 sm:h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${((currentIndex+1)/activeIndices.length)*100}%` }}></div>
        </div>
      </div>

      <div className="flex bg-gray-200/40 p-1.5 rounded-[1.2rem] mb-4 sm:mb-8 relative z-30">
        <button 
          onClick={(e) => { e.stopPropagation(); setDirection('de-ru'); setIsFlipped(false); }}
          className={`px-8 py-3 rounded-xl text-xs sm:text-[10px] font-black transition-all ${direction === 'de-ru' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}
        >
          DE → RU
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setDirection('ru-de'); setIsFlipped(false); }}
          className={`px-8 py-3 rounded-xl text-xs sm:text-[10px] font-black transition-all ${direction === 'ru-de' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}
        >
          RU → DE
        </button>
      </div>

      <div 
        className="card-flip w-full px-2 flex-1 flex items-center justify-center mb-4 sm:mb-10"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`card-inner relative w-full h-[260px] sm:h-[380px] ${isFlipped ? 'card-flipped' : ''}`}>
          <div className="card-face absolute w-full h-full bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 sm:p-8 border border-purple-50">
            <span className="absolute top-4 sm:top-8 text-[8px] sm:text-[10px] font-black text-purple-200 uppercase tracking-[0.4em]">
              {direction === 'de-ru' ? 'Deutsch' : 'Русский'}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-center text-gray-800 leading-snug px-2 mt-2 sm:mt-4 break-words">
              {direction === 'de-ru' ? currentMantra.de : currentMantra.ru}
            </h2>
            
            {direction === 'de-ru' ? (
              <button 
                onClick={handleAudioClick}
                disabled={isSpeaking}
                className={`mt-4 sm:mt-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-transform z-20 shadow-inner ${
                  isSpeaking 
                    ? 'bg-purple-200 text-purple-400 cursor-not-allowed' 
                    : 'bg-purple-50 text-purple-500 active:scale-110'
                }`}
              >
                <i className={`fas ${isSpeaking ? 'fa-spinner fa-spin' : 'fa-volume-up'} text-lg sm:text-2xl`}></i>
              </button>
            ) : (
              <div className="mt-4 sm:mt-8 h-12 sm:h-16"></div>
            )}
          </div>
          
          <div className="card-face card-back absolute w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 sm:p-8 text-white">
            <span className="absolute top-4 sm:top-8 text-[8px] sm:text-[10px] font-black text-purple-200 uppercase tracking-[0.4em]">
              {direction === 'de-ru' ? 'Русский' : 'Deutsch'}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-center leading-snug px-2 mt-2 sm:mt-4 break-words">
              {direction === 'de-ru' ? currentMantra.ru : currentMantra.de}
            </h2>

            {direction === 'ru-de' ? (
              <button 
                onClick={handleAudioClick}
                disabled={isSpeaking}
                className={`mt-4 sm:mt-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border transition-transform z-20 ${
                  isSpeaking 
                    ? 'bg-white/5 text-white/50 border-white/10 cursor-not-allowed' 
                    : 'bg-white/10 text-white border-white/20 active:scale-110'
                }`}
              >
                <i className={`fas ${isSpeaking ? 'fa-spinner fa-spin' : 'fa-volume-up'} text-lg sm:text-2xl`}></i>
              </button>
            ) : (
              <div className="mt-4 sm:mt-8 h-12 sm:h-16"></div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full px-2 mb-2">
        <button 
          onClick={(e) => { e.stopPropagation(); markResult(false); }}
          className="py-4 sm:py-6 bg-white text-red-500 border-2 border-red-50 rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-xs sm:text-[10px] flex flex-col items-center gap-2 sm:gap-2 active:bg-red-50"
        >
          <i className="fas fa-times text-xl sm:text-2xl"></i>
          Трудно
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); markResult(true); }}
          className="py-4 sm:py-6 bg-white text-green-500 border-2 border-green-50 rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase text-xs sm:text-[10px] flex flex-col items-center gap-2 sm:gap-2 shadow-lg shadow-green-100/30 active:bg-green-50"
        >
          <i className="fas fa-check text-xl sm:text-2xl"></i>
          Знаю
        </button>
      </div>
    </div>
  );
};

export default Mantras;
