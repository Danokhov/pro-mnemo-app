# Настройка Firebase для Pro Mnemo

## Шаг 1: Создание проекта Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Add project" (Добавить проект)
3. Введите название проекта (например, "pro-mnemo")
4. Следуйте инструкциям для создания проекта

## Шаг 2: Настройка Authentication

1. В боковом меню выберите **Authentication**
2. Нажмите **Get started**
3. Перейдите на вкладку **Sign-in method**
4. Включите **Anonymous** (Анонимная аутентификация)
   - Это позволит пользователям Telegram автоматически входить в систему

## Шаг 3: Настройка Firestore Database

1. В боковом меню выберите **Firestore Database**
2. Нажмите **Create database**
3. Выберите режим:
   - **Production mode** (рекомендуется для продакшена)
   - **Test mode** (для разработки)
4. Выберите регион (например, `europe-west` для Европы)
5. Нажмите **Enable**

## Шаг 4: Настройка правил безопасности Firestore

1. В разделе **Firestore Database** перейдите на вкладку **Rules**
2. Замените правила на следующие:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователи могут читать и писать только свои данные
    // Используем telegramId как ID документа
    match /users/{telegramId} {
      // Разрешаем чтение и запись для анонимно аутентифицированных пользователей
      // Для создания: проверяем, что telegramId в данных совпадает с ID документа
      // Для обновления: проверяем, что обновляются только свои данные
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.resource.data.telegramId == telegramId;
      allow update: if request.auth != null && 
        resource.data.telegramId == telegramId &&
        request.resource.data.telegramId == telegramId;
      allow delete: if request.auth != null && 
        resource.data.telegramId == telegramId;
    }
  }
}
```

3. Нажмите **Publish**

## Шаг 5: Получение конфигурации Firebase

1. В боковом меню выберите **Project settings** (⚙️)
2. Прокрутите вниз до раздела **Your apps**
3. Нажмите на иконку **Web** (</>)
4. Зарегистрируйте приложение (введите название, например "Pro Mnemo Web")
5. Скопируйте конфигурацию Firebase (она будет выглядеть так):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Шаг 6: Настройка переменных окружения

### Для Netlify:

1. Перейдите в панель управления Netlify
2. Выберите ваш сайт
3. Перейдите в **Site configuration** > **Environment variables**
4. Добавьте следующие переменные:

```
VITE_FIREBASE_API_KEY=ваш_apiKey
VITE_FIREBASE_AUTH_DOMAIN=ваш_authDomain
VITE_FIREBASE_PROJECT_ID=ваш_projectId
VITE_FIREBASE_STORAGE_BUCKET=ваш_storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=ваш_messagingSenderId
VITE_FIREBASE_APP_ID=ваш_appId
```

### Для локальной разработки:

Создайте файл `.env` в корне проекта:

```
VITE_FIREBASE_API_KEY=ваш_apiKey
VITE_FIREBASE_AUTH_DOMAIN=ваш_authDomain
VITE_FIREBASE_PROJECT_ID=ваш_projectId
VITE_FIREBASE_STORAGE_BUCKET=ваш_storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=ваш_messagingSenderId
VITE_FIREBASE_APP_ID=ваш_appId
```

**Важно:** Добавьте `.env` в `.gitignore`, чтобы не коммитить секретные ключи!

## Шаг 7: Структура данных в Firestore

После настройки в Firestore будет создаваться следующая структура:

### Коллекция `users`
- **ID документа:** `telegramId` (ID пользователя из Telegram)
- **Поля:**
  - `telegramId` (string) - ID пользователя Telegram
  - `name` (string) - Имя пользователя
  - `createdAt` (timestamp) - Дата создания
  - `updatedAt` (timestamp) - Дата последнего обновления
  - `topicProgress` (object) - Прогресс по темам
    - Ключ: `topicId`
    - Значение: массив `moduleId[]`
  - `studyWords` (array) - Слова для интервального повторения
    - `wordId` (string)
    - `addedAt` (number) - timestamp
    - `nextReview` (number) - timestamp следующего повторения
    - `interval` (number) - интервал в днях до следующего повторения
    - `easeFactor` (number) - фактор легкости (оставлен для совместимости, не используется)
    - `repetitions` (number) - количество успешных повторений
    - `lastReview` (number, optional) - timestamp последнего повторения

### Логика интервального повторения:

Интервалы между повторениями:
- **1-е повторение**: 0 дней (сразу после добавления)
- **2-е повторение**: 1 день после 1-го
- **3-е повторение**: 1 день после 2-го
- **4-е повторение**: 3 дня после 3-го
- **5-е повторение**: 7 дней после 4-го
- **6-е повторение**: 14 дней после 5-го
- **7-е повторение**: 30 дней после 6-го
- **8-е и далее**: 90 дней после предыдущего

**Важно**: При неправильном ответе счетчик `repetitions` сбрасывается на 0, и карточка показывается сразу (интервал = 0 дней).

## Проверка работы

После настройки:
1. Откройте приложение в Telegram
2. Войдите в систему (автоматически через Telegram)
3. Проверьте в Firebase Console, что в коллекции `users` создался документ с вашим `telegramId`
4. Добавьте слово в изучение и проверьте, что оно сохранилось в Firebase

## Troubleshooting

### Ошибка "Firebase: Error (auth/unauthorized-domain)"
- Добавьте ваш домен в **Authentication** > **Settings** > **Authorized domains**

### Ошибка "Missing or insufficient permissions"
- Проверьте правила безопасности Firestore
- Убедитесь, что анонимная аутентификация включена

### Данные не сохраняются
- Проверьте, что все переменные окружения установлены правильно
- Проверьте консоль браузера на наличие ошибок
- Убедитесь, что пользователь аутентифицирован (проверьте `auth.currentUser`)
