# LG ECONOMY — сайт + Discord-бот

Сайт с Upgrader, лидербордом и переводами монет + Discord-бот экономики. Баланс общий: бот и сайт работают с одной базой Supabase.

**Стек:** React + Vite (фронт), Express (API + Discord OAuth), discord.js (бот, в том же процессе), Supabase Postgres (данные), Render.com (хостинг), GitHub (код, автодеплой).

```
server.js          Express: API, вход через Discord, раздача собранного фронта, запуск бота
lib/db.js          Работа с Supabase (REST + RPC-функции)
discord-bot/bot.js Бот: /balance /pay /leaderboard /give /payout /roles /setup_roles /upgrader
src/               React-фронтенд
supabase-schema.sql Таблицы и функции БД (запускать в Supabase SQL Editor)
render.yaml        Blueprint для Render
```

Все операции с монетами (перевод, апгрейд, начисления) выполняются атомарно внутри Postgres-функций. Сайт определяет пользователя по подписанной cookie после входа через Discord — клиент не может подменить ID или баланс. Гости играют в Upgrader в демо-режиме с локальными монетами.

---

## 1. Supabase

1. Создайте проект на [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → вставьте весь `supabase-schema.sql` → **Run**. Скрипт можно запускать повторно (он же обновляет старую схему).
3. **Project Settings → API Keys** скопируйте:
   - `Project URL` → `SUPABASE_URL`
   - **secret / service_role** ключ → `SUPABASE_KEY` (не anon/publishable! публичный ключ не будет иметь доступа к данным).

## 2. Discord Developer Portal

[discord.com/developers/applications](https://discord.com/developers/applications) → ваше приложение:

1. **OAuth2 → Redirects** добавьте:
   - `https://lg-economy.onrender.com/api/auth/callback` (адрес вашего сервиса на Render)
   - `http://localhost:3000/api/auth/callback` (для локальной разработки)
2. **OAuth2 → Client Secret → Reset Secret** — возьмите новый `DISCORD_CLIENT_SECRET`.
3. **Bot → Privileged Gateway Intents**: включите **Server Members Intent** и **Message Content Intent**.
4. **Bot → Reset Token** → `DISCORD_BOT_TOKEN`.
5. Пригласите бота: `https://discord.com/oauth2/authorize?client_id=<CLIENT_ID>&permissions=8&scope=bot%20applications.commands`

## 3. Render.com

**Новый сервис:** Dashboard → **New → Blueprint** → выберите GitHub-репозиторий → Render прочитает `render.yaml` и попросит заполнить `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_BOT_TOKEN`, `SUPABASE_URL`, `SUPABASE_KEY`. `SESSION_SECRET` сгенерируется сам.

**Уже существующий сервис** (создан вручную): Settings →
- Build Command: `npm ci --include=dev && npm run build`
- Start Command: `node server.js`
- Health Check Path: `/api/health`

и в **Environment** задайте: `NODE_VERSION=22`, `NODE_ENV=production`, `TZ=Europe/Moscow`, `SESSION_SECRET` (длинная случайная строка), плюс 5 ключей выше.

После каждого `git push` в ветку сервиса Render пересобирает сайт автоматически.

**Сон на бесплатном тарифе.** Render усыпляет free-сервис через 15 минут без запросов — бот при этом отключается. Сервер сам пингует себя каждые 10 минут, этого достаточно. Для надёжности можно добавить бесплатный монитор [UptimeRobot](https://uptimerobot.com) на `https://<ваш-сервис>.onrender.com/api/health` с интервалом 5 минут. Если сервис всё же спал в 18:30, зарплаты начислятся при пробуждении (не более одного раза в день на сервер).

Проверка: `https://<ваш-сервис>.onrender.com/api/health` должен вернуть `{"ok":true,"db":true}`.

## Локальный запуск

```bash
npm install
cp .env.example .env   # заполните значения
npm run dev            # http://localhost:3000 (сайт + API, бот НЕ запускается)
START_BOT=1 npm run dev  # вместе с ботом (не запускайте одновременно с прод-ботом)
```

Продакшн-режим локально: `npm run build && npm start`.

## Зарплаты

Каждый день в 18:30 (`TZ`) бот начисляет монеты по высшей роли активности `[act+10]` … `[act+3]` (450 … 30 🪙). `/setup_roles` создаёт эти роли, `/payout` — внеочередная выплата (только админы).
