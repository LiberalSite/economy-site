import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

try { process.loadEnvFile(); } catch {}

const db = await import('./lib/db.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.argv.includes('--dev');
const PORT = process.env.PORT || 3000;
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || '').replace(/\/+$/, '');
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const SESSION_COOKIE = 'lg_session';
const STATE_COOKIE = 'lg_oauth_state';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

let SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  SESSION_SECRET = crypto.randomBytes(32).toString('hex');
  console.warn('⚠️ SESSION_SECRET не задан — сгенерирован временный, все входы сбросятся при перезапуске.');
}
if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
  console.error('❌ DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET не заданы — вход через Discord работать не будет.');
}

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '10kb' }));

// ─── Session (HMAC-signed cookie) ───
const sign = (value) => crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('base64url');

function parseCookies(header = '') {
  const out = {};
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function readSession(req) {
  const raw = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  if (!raw) return null;
  const [payload, sig] = raw.split('.');
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() ? data.user : null;
  } catch {
    return null;
  }
}

const cookieOpts = (maxAge) => ({
  httpOnly: true,
  secure: !isDev,
  sameSite: 'lax',
  path: '/',
  maxAge,
});

function writeSession(res, user) {
  const payload = Buffer.from(JSON.stringify({ user, exp: Date.now() + SESSION_TTL_MS })).toString('base64url');
  res.cookie(SESSION_COOKIE, `${payload}.${sign(payload)}`, cookieOpts(SESSION_TTL_MS));
}

function requireUser(req, res, next) {
  const user = readSession(req);
  if (!user) return res.status(401).json({ error: 'Войдите через Discord' });
  req.user = user;
  next();
}

const originOf = (req) => PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
const isDiscordId = (v) => typeof v === 'string' && /^\d{15,22}$/.test(v);
const toPositiveInt = (v) => {
  const n = Number(v);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
};

function sendDbError(res, err) {
  if (err instanceof db.DbError && err.userMessage) return res.status(400).json({ error: err.userMessage });
  console.error('DB error:', err.message);
  res.status(500).json({ error: 'Ошибка базы данных, попробуйте позже' });
}

// ─── Health (Render health check + keep-alive) ───
app.get('/api/health', (req, res) => res.json({ ok: true, db: db.dbConfigured }));

// ─── Discord OAuth ───
// Вход приостановлен по просьбе владельца: вернуть = false
const LOGIN_PAUSED = true;

app.get('/api/auth/discord', (req, res) => {
  if (LOGIN_PAUSED) return res.redirect('/?login_paused=1');
  const state = crypto.randomBytes(16).toString('hex');
  res.cookie(STATE_COOKIE, state, cookieOpts(10 * 60 * 1000));
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID || '',
    redirect_uri: `${originOf(req)}/api/auth/callback`,
    response_type: 'code',
    scope: 'identify',
    state,
  });
  res.redirect(`https://discord.com/oauth2/authorize?${params}`);
});

app.get('/api/auth/callback', async (req, res) => {
  if (LOGIN_PAUSED) return res.redirect('/?login_paused=1');
  const { code, state } = req.query;
  const expectedState = parseCookies(req.headers.cookie)[STATE_COOKIE];
  res.clearCookie(STATE_COOKIE, { path: '/' });
  if (!code) return res.redirect('/?auth_error=no_code');
  if (!state || state !== expectedState) return res.redirect('/?auth_error=bad_state');

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: String(code),
        redirect_uri: `${originOf(req)}/api/auth/callback`,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Discord token error:', tokenData);
      return res.redirect('/?auth_error=token_failed');
    }

    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const u = await userRes.json();
    if (!u.id) return res.redirect('/?auth_error=token_failed');

    const user = {
      id: u.id,
      username: u.global_name || u.username,
      tag: u.discriminator && u.discriminator !== '0' ? `${u.username}#${u.discriminator}` : `@${u.username}`,
      avatar: u.avatar
        ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(u.id) >> 22n) % 6}.png`,
    };

    await db.addBalance(user.id, 0, user.username, user.avatar);
    writeSession(res, user);
    res.redirect('/?auth_success=true');
  } catch (err) {
    console.error('Discord OAuth error:', err);
    res.redirect('/?auth_error=server_error');
  }
});

app.get('/api/auth/me', async (req, res) => {
  const user = readSession(req);
  if (!user) return res.json({ user: null });
  try {
    res.json({ user, balance: await db.getBalance(user.id) });
  } catch (err) {
    sendDbError(res, err);
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: '/' });
  res.json({ success: true });
});

// ─── Economy ───
app.get('/api/economy/leaderboard', async (req, res) => {
  try {
    const rows = await db.leaderboard(50);
    res.json({
      success: true,
      users: rows.map((u) => ({
        id: u.discord_id,
        username: u.username || 'Участник',
        balance: u.balance,
        avatar: u.avatar,
      })),
    });
  } catch (err) {
    sendDbError(res, err);
  }
});

app.post('/api/economy/pay', requireUser, async (req, res) => {
  const { targetId } = req.body || {};
  const amount = toPositiveInt(req.body?.amount);
  if (!isDiscordId(targetId) || !amount) return res.status(400).json({ error: 'Некорректная сумма или получатель' });
  try {
    const r = await db.transfer(req.user.id, targetId, amount, req.user.username);
    res.json({ success: true, senderBalance: r.sender_balance, targetBalance: r.target_balance });
  } catch (err) {
    sendDbError(res, err);
  }
});

// ─── Upgrader ───
app.post('/api/upgrader/spin', requireUser, async (req, res) => {
  const bet = toPositiveInt(req.body?.bet);
  const chance = Number(req.body?.chance);
  if (!bet) return res.status(400).json({ error: 'Некорректная ставка' });
  if (!Number.isFinite(chance) || chance < 1 || chance > 90) return res.status(400).json({ error: 'Шанс должен быть от 1 до 90%' });
  try {
    const r = await db.upgraderSpin(req.user.id, bet, Math.round(chance * 100) / 100, req.user.username, req.user.avatar);
    res.json({ success: true, isWin: r.is_win, mult: Number(r.mult), amount: r.amount, balance: r.balance });
  } catch (err) {
    sendDbError(res, err);
  }
});

app.get('/api/upgrader/history', async (req, res) => {
  try {
    const { wins, losses } = await db.upgraderHistory(30);
    const map = (l) => ({
      id: l.id,
      user: l.user || 'Участник',
      avatar: l.avatar,
      bet: l.bet,
      mult: l.mult,
      amount: l.amount,
      timestamp: l.timestamp,
    });
    res.json({ success: true, wins: wins.map(map), losses: losses.map(map) });
  } catch (err) {
    sendDbError(res, err);
  }
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// ─── Frontend ───
if (isDev) {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('/{*path}', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}${PUBLIC_URL ? ` (public: ${PUBLIC_URL})` : ''}`);
});

// Render free instances sleep after 15 min without inbound traffic, which would take the bot offline.
if (process.env.RENDER_EXTERNAL_URL) {
  setInterval(() => {
    fetch(`${process.env.RENDER_EXTERNAL_URL}/api/health`).catch(() => {});
  }, 10 * 60 * 1000);
}

// ─── Discord bot (same process) ───
if (isDev && process.env.START_BOT !== '1') {
  console.log('ℹ️ Dev-режим: бот не запущен (чтобы не дублировать прод-бота). Запуск: START_BOT=1 npm run dev');
} else {
  import('./discord-bot/bot.js').catch((err) => console.error('Discord bot failed to start:', err));
}
