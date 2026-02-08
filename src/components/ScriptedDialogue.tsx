import React, { useState, useEffect, useRef } from 'react';
import { Topic } from '../types';
import { unlockAudio, playTextWithSpeechSynthesis } from '../services/audioService';
import { playTextWithOpenAITTS } from '../services/openaiTtsService';

interface ScriptedDialogueProps {
  topic: Topic;
  onComplete?: () => void;
}

// Нормализация для сравнения: нижний регистр, без лишних пробелов, без точки в конце
function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\.$/, '')
    .replace(/\s+/g, ' ');
}

// Проверка: совпадает ли сказанное с эталоном (допускаем небольшие отличия)
function isMatch(spoken: string, expected: string): boolean {
  const a = normalize(spoken);
  const b = normalize(expected);
  if (a === b) return true;
  // Эталон содержится в сказанном (пользователь мог добавить "э" и т.д.)
  if (b.length >= 5 && a.includes(b)) return true;
  if (a.length >= 5 && b.includes(a)) return true;
  // Простая проверка по словам: больше половины слов эталона есть в сказанном
  const wordsB = b.split(/\s+/).filter((w) => w.length > 1);
  const wordsA = a.split(/\s+/);
  const matchCount = wordsB.filter((wb) => wordsA.some((wa) => wa === wb || wa.includes(wb) || wb.includes(wa))).length;
  return wordsB.length > 0 && matchCount >= Math.ceil(wordsB.length * 0.7);
}

const ScriptedDialogue: React.FC<ScriptedDialogueProps> = ({ topic, onComplete }) => {
  const turns = topic.dialogueExercise || [];
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [finished, setFinished] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const playSeller = async (text: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await unlockAudio();
      try {
        await playTextWithOpenAITTS(text, 'de');
      } catch {
        await playTextWithSpeechSynthesis(text, 'de');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPlaying(false);
    }
  };

  // При смене реплики сразу озвучиваем фразу приложения (продавца)
  useEffect(() => {
    if (turns.length === 0 || finished) return;
    const turn = turns[currentTurn];
    playSeller(turn.seller.de);
  }, [currentTurn, finished]);

  const startListening = () => {
    const SR = (window as unknown as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) {
      alert('Распознавание речи не поддерживается в этом браузере. Используйте Chrome или Edge.');
      return;
    }
    const recognition = new SR();
    recognition.lang = 'de-DE';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setUserTranscript(transcript);
      const expected = turns[currentTurn].user.de;
      setIsCorrect(isMatch(transcript, expected));
      setShowResult(true);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setShowResult(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    setUserTranscript(null);
    setShowResult(false);
    setShowCorrectAnswer(false);
    setIsListening(true);
    recognition.start();
  };

  const goNext = () => {
    setUserTranscript(null);
    setShowResult(false);
    setShowCorrectAnswer(false);
    if (currentTurn + 1 >= turns.length) {
      setFinished(true);
      onComplete?.();
    } else {
      setCurrentTurn(currentTurn + 1);
    }
  };

  if (turns.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 text-center">
        <p className="text-gray-600 font-bold">В этой теме нет диалога.</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 text-center animate-in zoom-in mx-2">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          <i className="fas fa-handshake"></i>
        </div>
        <h3 className="text-3xl font-black text-gray-800 mb-3">Диалог пройден!</h3>
        <p className="text-lg text-gray-500 mb-8 font-medium">Вы прошли все {turns.length} реплик.</p>
        <button
          onClick={() => {
            setCurrentTurn(0);
            setFinished(false);
            setUserTranscript(null);
            setShowResult(false);
          }}
          className="w-full py-4 bg-amber-500 text-white rounded-[1.8rem] font-black"
        >
          Начать заново
        </button>
      </div>
    );
  }

  const turn = turns[currentTurn];

  return (
    <div className="max-w-lg mx-auto px-2 py-4">
      <div className="mb-4">
        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
          Реплика {currentTurn + 1} из {turns.length}
        </span>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentTurn + 1) / turns.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Реплика приложения (продавец) — только текст, озвучка при открытии уже была */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-5 border border-gray-100">
        <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-2">Продавец</p>
        <p className="text-lg font-black text-gray-800 mb-1">{turn.seller.de}</p>
        <p className="text-sm text-gray-500">{turn.seller.ru}</p>
        <button
          type="button"
          onClick={() => playSeller(turn.seller.de)}
          disabled={isPlaying}
          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-amber-600 border border-amber-200 rounded-lg disabled:opacity-50"
        >
          <i className={`fas ${isPlaying ? 'fa-spinner fa-spin' : 'fa-volume-up'}`} />
          Ещё раз
        </button>
      </div>

      {/* Твой ответ — только на русском */}
      <div className="bg-amber-50 rounded-2xl p-5 mb-4 border border-amber-100">
        <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider mb-2">Твой ответ</p>
        <p className="text-base text-gray-700 mb-4">{turn.user.ru}</p>

        {!showResult && (
          <button
            type="button"
            onClick={startListening}
            disabled={isListening}
            className="w-full py-4 bg-amber-500 text-white rounded-xl font-black flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <i className={`fas ${isListening ? 'fa-microphone-alt fa-spin' : 'fa-microphone-alt'} text-xl`} />
            {isListening ? 'Говорите…' : 'Говорить'}
          </button>
        )}

        {showResult && userTranscript !== null && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <span className="font-bold">Вы сказали:</span> {userTranscript}
            </p>
            {isCorrect ? (
              <div className="p-3 bg-green-100 text-green-800 rounded-xl">
                <p className="font-black">Верно!</p>
                <p className="text-sm mt-1">Правильный ответ: {turn.user.de}</p>
              </div>
            ) : (
              <div className="p-3 bg-red-50 text-red-800 rounded-xl">
                <p className="font-black">Попробуй ещё раз</p>
                {showCorrectAnswer ? (
                  <p className="text-sm mt-1">Правильный ответ: {turn.user.de}</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowCorrectAnswer(true)}
                    className="mt-2 text-sm font-bold underline"
                  >
                    Посмотреть правильный ответ
                  </button>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={goNext}
              className="w-full py-3 bg-amber-500 text-white rounded-xl font-black flex items-center justify-center gap-2"
            >
              Следующая фраза
              <i className="fas fa-arrow-right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptedDialogue;
