
export interface User {
  id: string;
  telegramId: string;
  name: string;
}

export interface Word {
  id: string; // Уникальный ID для слова
  de: string;
  ru: string;
  image?: string;
  audioDe?: string; // Путь к MP3 файлу для немецкого произношения
  audioRu?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GapFillExercise {
  sentence_ru: string; // Точный перевод предложения на русский
  sentence: string; // Немецкое предложение с пропуском ____
  options: string[]; // 4 варианта: правильный, фонетически похожий, семантически возможный, дистрактор
  explanation: string; // Краткое объяснение значения или управления слова
}

export interface ArticleExercise {
  word: string; // Немецкое слово без артикля
  translation: string; // Перевод на русский
  correctArticle: 'der' | 'die' | 'das'; // Правильный артикль
  explanation: string; // Краткое объяснение рода существительного
}

export interface Mantra {
  id: string; // Уникальный ID для мантры
  de: string;
  ru: string;
  audioDe?: string; // Путь к MP3 файлу для немецкого произношения
}

/** Один обмен репликами в скриптовом диалоге (продавец → пользователь) */
export interface DialogueTurn {
  /** Реплика продавца/собеседника */
  seller: { de: string; ru: string };
  /** Реплика пользователя (что он должен сказать); для проверки через Whisper */
  user: { de: string; ru: string };
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  videoUrl: string;
  level?: string; // Уровень языка (например, "A1-A2", "A2-B1", "B1-B2")
  isNew?: boolean; // Бейдж "новое"
  availableFrom?: string; // Дата доступности в формате "YYYY-MM-DD"
  dialog: {
    title?: string; // Заголовок текста
    imageUrl?: string; // Путь к изображению перед текстом
    text: string;
    translation: string;
    audioUrl: string; // Ссылка на MP3 файл
    pdfUrl?: string; // Ссылка на PDF файл для скачивания
  };
  words: Word[];
  mantras: Mantra[];
  quiz?: QuizQuestion[]; // Квиз по тексту (опциональный)
  exercises?: GapFillExercise[]; // Упражнения на заполнение пробелов
  articleExercises?: ArticleExercise[]; // Упражнения на артикли
  /** Скриптовый диалог для упражнения «скажи сам» (вариант B) */
  dialogueExercise?: DialogueTurn[];
}

export type ModuleType = 'video' | 'text' | 'flashcards' | 'mantras' | 'exercises' | 'articles' | 'dialogue';
