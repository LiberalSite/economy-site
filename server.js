import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// ─── Economy DB helpers ───
const dbPath = path.resolve(__dirname, 'discord-bot', 'economy.json');
function readDB() {
  try {
    if (fs.existsSync(dbPath)) return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (e) {}
  return { users: {}, logs: [] };
}
function writeDB(data) {
  try { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); } catch (e) { console.error('DB write error:', e); }
}

// ─── API: GET /api/economy/balance?userId=... ───
app.get('/api/economy/balance', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  const db = readDB();
  const user = db.users[userId] || { balance: 0, lastDaily: 0 };
  res.json({ success: true, balance: user.balance || 0 });
});

// ─── API: GET /api/economy/leaderboard ───
app.get('/api/economy/leaderboard', (req, res) => {
  const db = readDB();
  const users = Object.entries(db.users || {}).map(([id, u]) => ({
    id, username: u.username || 'Участник', balance: u.balance || 0,
    avatar: u.avatar || null, lastDaily: u.lastDaily || 0
  })).sort((a, b) => b.balance - a.balance);
  res.json({ success: true, users });
});

// ─── API: POST /api/economy/pay ───
app.post('/api/economy/pay', (req, res) => {
  const { senderId, targetId, amount } = req.body;
  if (!senderId || !targetId || !amount || amount <= 0) return res.status(400).json({ error: 'Некорректная сумма или получатель' });
  if (senderId === targetId) return res.status(400).json({ error: 'Нельзя переводить монеты самому себе' });
  const db = readDB();
  const sender = db.users[senderId] || { balance: 0, username: 'Sender' };
  if (sender.balance < amount) return res.status(400).json({ error: 'Недостаточно монет на балансе' });
  if (!db.users[targetId]) db.users[targetId] = { username: 'Пользователь', balance: 0, lastDaily: 0 };
  db.users[senderId].balance -= amount;
  db.users[targetId].balance += amount;
  if (!db.logs) db.logs = [];
  db.logs.unshift({ id: Date.now(), type: 'transfer', senderId, targetId, senderName: sender.username, targetName: db.users[targetId].username, amount, timestamp: new Date().toISOString() });
  if (db.logs.length > 200) db.logs = db.logs.slice(0, 200);
  writeDB(db);
  res.json({ success: true, senderBalance: db.users[senderId].balance, targetBalance: db.users[targetId].balance });
});

// ─── API: GET /api/upgrader/history ───
app.get('/api/upgrader/history', (req, res) => {
  const db = readDB();
  const gameLogs = (db.logs || []).filter(l => l.type === 'upgrader_spin');
  res.json({ success: true, wins: gameLogs.filter(l => l.isWin).slice(0, 30), losses: gameLogs.filter(l => !l.isWin).slice(0, 30) });
});

// ─── API: POST /api/upgrader/record ───
app.post('/api/upgrader/record', (req, res) => {
  const { isWin, user, discordId, avatar, bet, mult, amount } = req.body;
  const db = readDB();
  if (!db.logs) db.logs = [];
  const entry = { id: Date.now() + Math.floor(Math.random() * 1000), type: 'upgrader_spin', isWin: Boolean(isWin), user: user || 'Гость', discordId: discordId || null, avatar: avatar || null, bet: Number(bet) || 0, mult: Number(mult) || 1, amount: Number(amount) || 0, timestamp: new Date().toISOString() };
  db.logs.unshift(entry);
  if (db.logs.length > 300) db.logs = db.logs.slice(0, 300);
  writeDB(db);
  res.json({ success: true, entry });
});

// ─── API: POST /api/economy/update ───
app.post('/api/economy/update', (req, res) => {
  const { userId, newBalance, username } = req.body;
  if (!userId || typeof newBalance !== 'number') return res.status(400).json({ error: 'Invalid payload' });
  const db = readDB();
  if (!db.users[userId]) db.users[userId] = { username: username || 'User', balance: 0, lastDaily: 0 };
  db.users[userId].balance = Math.max(0, Math.round(newBalance));
  if (username) db.users[userId].username = username;
  writeDB(db);
  res.json({ success: true, balance: db.users[userId].balance });
});

// ─── Discord OAuth: GET /api/auth/discord ───
app.get('/api/auth/discord', (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID || '1558107029124550677';
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers.host;
  const origin = `${proto}://${host}`;
  const redirectUri = encodeURIComponent(`${origin}/api/auth/callback`);
  const scope = encodeURIComponent('identify guilds.members.read');
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`);
});

// ─── Discord OAuth: GET /api/auth/callback ───
app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect('/?auth_error=no_code');

  const clientId = process.env.DISCORD_CLIENT_ID || '1558107029124550677';
  const clientSecret = process.env.DISCORD_CLIENT_SECRET || 'iJ3DT_fGUIh13YFP8qWqhW1WWnXPod4Y';
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers.host;
  const redirectUri = `${proto}://${host}/api/auth/callback`;

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'authorization_code', code, redirect_uri: redirectUri }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Discord Token Error:', tokenData);
      return res.redirect('/?auth_error=token_failed');
    }

    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userRes.json();

    const displayName = userData.global_name || userData.username;
    const discordUser = {
      id: userData.id,
      username: displayName,
      tag: userData.discriminator && userData.discriminator !== '0' ? `${userData.username}#${userData.discriminator}` : `@${userData.username}`,
      avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=128` : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.id.slice(-2)) % 5}.png`,
    };

    const userParam = encodeURIComponent(JSON.stringify(discordUser));
    res.redirect(`/?auth_success=true&user=${userParam}`);
  } catch (err) {
    console.error('Discord OAuth Error:', err);
    res.redirect('/?auth_error=server_error');
  }
});

// ─── Serve static built frontend ───
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ─── Start server ───
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📂 Serving static files from: ${distPath}`);
});

// ─── Launch Discord bot ───
const botProc = spawn('node', ['discord-bot/bot.js'], {
  stdio: 'inherit',
  env: { ...process.env },
  cwd: __dirname
});
botProc.on('close', (code) => {
  console.warn('Discord bot exited with code', code);
});
