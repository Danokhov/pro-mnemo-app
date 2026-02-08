import { unlockAudio } from './audioService';

/**
 * OpenAI TTS (озвучка текста).
 * Почему первый запуск может быть медленным:
 * - Запрос к api.openai.com (1–3 с в зависимости от длины текста и сети).
 * - Повторные воспроизведения быстрые: аудио берётся из кэша (IndexedDB).
 * Ускорения: статический импорт в компонентах (без задержки на подгрузку модуля),
 * переиспользование соединения с IndexedDB, кэш пишется в фоне (не блокирует воспроизведение).
 */

// Кэш в IndexedDB для хранения аудио
const DB_NAME = 'mnemo_audio_cache';
const DB_VERSION = 1;
const STORE_NAME = 'audio_cache';

interface CachedAudio {
  key: string;
  text: string;
  lang: string;
  audioBlob: Blob;
  timestamp: number;
}

// Переиспользуем одно соединение с БД — не открываем заново при каждом запросе (быстрее)
let dbInstance: IDBDatabase | null = null;

async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
}

// Генерация ключа для кэша
function getCacheKey(text: string, lang: string): string {
  return `${lang}:${text}`;
}

// Получение из кэша
async function getFromCache(text: string, lang: string): Promise<Blob | null> {
  try {
    const db = await getDB();
    const key = getCacheKey(text, lang);
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.audioBlob) {
          // Проверяем, не устарел ли кэш (30 дней)
          const age = Date.now() - result.timestamp;
          const ageInDays = Math.floor(age / (24 * 60 * 60 * 1000));
          if (age < 30 * 24 * 60 * 60 * 1000) {
            console.log(`💾 [Cache] Found in cache (age: ${ageInDays} days, size: ${(result.audioBlob.size / 1024).toFixed(2)} KB)`);
            resolve(result.audioBlob);
          } else {
            console.log(`🗑️ [Cache] Entry expired (age: ${ageInDays} days, max: 30 days)`);
            resolve(null);
          }
        } else {
          console.log('❌ [Cache] Not found in cache');
          resolve(null);
        }
      };
      request.onerror = () => {
        console.error('❌ [Cache] Read error:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.warn('❌ [Cache] Read error:', error);
    return null;
  }
}

// Сохранение в кэш
async function saveToCache(text: string, lang: string, audioBlob: Blob): Promise<void> {
  try {
    const db = await getDB();
    const key = getCacheKey(text, lang);
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put({
        key,
        text,
        lang,
        audioBlob,
        timestamp: Date.now(),
      });
      request.onsuccess = () => {
        console.log(`💾 [Cache] Saved to cache (size: ${(audioBlob.size / 1024).toFixed(2)} KB)`);
        resolve();
      };
      request.onerror = () => {
        console.error('❌ [Cache] Write error:', request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.warn('❌ [Cache] Write error:', error);
  }
}

// Воспроизведение аудио из Blob
async function playAudioBlob(audioBlob: Blob): Promise<void> {
  console.log('🔓 [Audio Playback] Unlocking audio...');
  await unlockAudio();
  console.log('✅ [Audio Playback] Audio unlocked');
  
  const audioUrl = URL.createObjectURL(audioBlob);
  console.log('🎵 [Audio Playback] Created object URL, creating Audio element...');
  const audio = new Audio(audioUrl);
  
  return new Promise((resolve, reject) => {
    audio.onloadedmetadata = () => {
      console.log('✅ [Audio Playback] Audio metadata loaded, duration:', audio.duration, 'seconds');
    };
    
    audio.oncanplay = () => {
      console.log('✅ [Audio Playback] Audio can play');
    };
    
    audio.onplay = () => {
      console.log('▶️ [Audio Playback] Audio started playing');
    };
    
    audio.onended = () => {
      console.log('✅ [Audio Playback] Audio playback completed');
      URL.revokeObjectURL(audioUrl);
      resolve();
    };
    
    audio.onerror = (error) => {
      console.error('❌ [Audio Playback] Audio playback error:', error);
      console.error('❌ [Audio Playback] Audio error details:', {
        error: audio.error,
        code: audio.error?.code,
        message: audio.error?.message
      });
      URL.revokeObjectURL(audioUrl);
      reject(new Error(`Audio playback failed: ${audio.error?.message || 'Unknown error'}`));
    };
    
    console.log('▶️ [Audio Playback] Attempting to play audio...');
    audio.play().then(() => {
      console.log('✅ [Audio Playback] Play() promise resolved');
    }).catch((playError) => {
      console.error('❌ [Audio Playback] Play() promise rejected:', playError);
      URL.revokeObjectURL(audioUrl);
      reject(playError);
    });
  });
}

// Получение аудио от OpenAI
async function fetchOpenAITTS(text: string, lang: 'de' | 'ru'): Promise<Blob> {
  const apiKey = (import.meta.env.VITE_OPENAI_API_KEY as string) || '';
  
  console.log('🔑 [OpenAI TTS] Checking API key...', {
    hasKey: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0,
    keyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'none'
  });
  
  if (!apiKey) {
    const errorMsg = 'OpenAI API key not found. Set VITE_OPENAI_API_KEY or OPENAI_API_KEY in Netlify / .env';
    console.error('❌ [OpenAI TTS]', errorMsg);
    throw new Error(errorMsg);
  }

  console.log('📡 [OpenAI TTS] Sending request to OpenAI API...', {
    text: text.substring(0, 50) + '...',
    lang,
    model: 'tts-1-hd',
    voice: 'nova'
  });

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1-hd', // Модель с лучшим качеством звука
        input: text,
        voice: 'nova', // Качественный голос (можно изменить на 'onyx' для мужского)
        language: lang === 'de' ? 'de' : 'ru',
      }),
    });

    console.log('📥 [OpenAI TTS] Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [OpenAI TTS] API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`OpenAI TTS failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const blob = await response.blob();
    console.log('✅ [OpenAI TTS] Audio blob received:', {
      size: `${(blob.size / 1024).toFixed(2)} KB`,
      type: blob.type
    });
    return blob;
  } catch (error) {
    console.error('❌ [OpenAI TTS] Fetch error:', error);
    throw error;
  }
}

// Основная функция воспроизведения с кэшированием
export async function playTextWithOpenAITTS(
  text: string, 
  lang: 'de' | 'ru' = 'de'
): Promise<void> {
  console.log('🔊 [TTS Engine: OpenAI] Starting playback for:', text.substring(0, 50));
  
  try {
    // Проверяем кэш
    console.log('🔍 [Cache] Checking cache for:', text.substring(0, 30) + '...');
    const cachedAudio = await getFromCache(text, lang);
    if (cachedAudio) {
      console.log('✅ [TTS Engine: OpenAI] Using cached audio (from IndexedDB) - FREE!');
      await playAudioBlob(cachedAudio);
      return;
    }
    
    // Если нет в кэше, получаем от OpenAI
    console.log('📡 [TTS Engine: OpenAI] Not in cache, fetching from API (model: tts-1-hd, voice: nova)...');
    const audioBlob = await fetchOpenAITTS(text, lang);
    
    // Кэшируем в фоне — не ждём, воспроизведение начинается сразу
    saveToCache(text, lang, audioBlob).then(() => {
      console.log('✅ [TTS Engine: OpenAI] Audio cached for future use');
    }).catch(() => {});
    
    // Воспроизводим сразу после получения blob
    console.log('▶️ [TTS Engine: OpenAI] Starting playback...');
    await playAudioBlob(audioBlob);
    console.log('✅ [TTS Engine: OpenAI] Playback completed successfully');
  } catch (error) {
    console.error('❌ [TTS Engine: OpenAI] Error in playTextWithOpenAITTS:', error);
    throw error;
  }
}

