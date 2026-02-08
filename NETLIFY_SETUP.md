# Настройка переменных окружения в Netlify

## Проблема
Если вы видите ошибку: `OpenAI API key not found`, это означает, что переменная окружения не настроена в Netlify.

## Решение

### Шаг 1: Откройте панель управления Netlify
1. Войдите в [Netlify Dashboard](https://app.netlify.com/)
2. Выберите ваш сайт

### Шаг 2: Добавьте переменную окружения
1. Перейдите в **Site configuration** → **Environment variables**
2. Нажмите **Add a variable**
3. Добавьте **для озвучки в Telegram и браузере** (через Netlify Function, без CORS):
   - **Key:** `OPENAI_API_KEY`
   - **Value:** ваш ключ OpenAI (начинается с `sk-...`)
   - **Scope:** **All scopes** (Builds and Functions) — обязательно, чтобы функция `tts` имела доступ к ключу

   Опционально для прямого вызова из браузера (fallback): **Key:** `VITE_OPENAI_API_KEY`, **Value:** тот же ключ.

### Шаг 3: Пересоберите проект
1. Перейдите в **Deploys**
2. Нажмите **Trigger deploy** → **Clear cache and deploy site**
3. Дождитесь завершения деплоя

### Шаг 4: Проверьте работу
После деплоя откройте приложение (в т.ч. в Telegram) и нажмите озвучку карточки/мантры. В консоли (F12):
- `✅ [OpenAI TTS] Via proxy (Netlify function)` — озвучка идёт через функцию (работает в Telegram).
- Иначе fallback: прямой API или браузерный Speech Synthesis.

## Озвучка в Telegram (без CORS/401)
Озвучка карточек и мантр идёт через **Netlify Function** `/.netlify/functions/tts`: запрос с вашего домена на тот же домен, ключ только на сервере. В Netlify должна быть переменная **`OPENAI_API_KEY`** с scope **Builds and Functions**.

## Важно
- **OPENAI_API_KEY** — для serverless-функции TTS (озвучка в Telegram и браузере).
- **VITE_OPENAI_API_KEY** — опционально, для прямого вызова API (fallback в браузере).
- После добавления/изменения переменных: **Trigger deploy** → **Clear cache and deploy site**.
- При ошибке приложение переключается на встроенный Speech Synthesis (fallback).


