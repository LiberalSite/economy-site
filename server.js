import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const app = express();
app.use(express.json());

// ─── Supabase helper ───
async function supaFetch(endpoint, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || '',
      ...options.headers,
    },
  });
  if (options.method === 'PATCH' || options.method === 'DELETE') return res;
  return res.json();
}

// ─── Local JSON DB fallback ───
const dbPath = path.resolve(__dirname, 'discord-bot', 'economy.json');
function readDB() {
  try { if (fs.existsSync(dbPath)) return JSON.parse(fs.readFileSync(dbPath, 'utf-8')); } catch (e) {}
  return { users: {}, logs: [] };
}
function writeDB(data) {
  try { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); } catch (e) {}
}

const useSupabase = !!(SUPABASE_URL && SUPABASE_KEY);
console.log(useSupabase ? '🗄️ Using Supabase database' : '📁 Using local JSON database (no SUPABASE_URL/KEY)');

// ─── API: GET /api/economy/balance?userId=... ───
app.get('/api/economy/balance', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  if (useSupabase) {
    const data = await supaFetch(`users?discord_id=eq.${userId}&select=balance`);
    const balance = (data && data.length > 0) ? data[0].balance : 0;
    return res.json({ success: true, balance });
  }

  const db = readDB();
  const user = db.users[userId] || { balance: 0 };
  res.json({ success: true, balance: user.balance || 0 });
});

// ─── API: GET /api/economy/leaderboard ───
app.get('/api/economy/leaderboard', async (req, res) => {
  if (useSupabase) {
    const data = await supaFetch('users?select=discord_id,username,balance,avatar,last_daily&order=balance.desc&limit=50');
    const users = (data || []).map(u => ({
      id: u.discord_id, username: u.username || 'Участник',
      balance: u.balance || 0, avatar: u.avatar || null, lastDaily: u.last_daily || 0
    }));
    return res.json({ success: true, users });
  }

  const db = readDB();
  const users = Object.entries(db.users || {}).map(([id, u]) => ({
    id, username: u.username || 'Участник', balance: u.balance || 0,
    avatar: u.avatar || null, lastDaily: u.lastDaily || 0
  })).sort((a, b) => b.balance - a.balance);
  res.json({ success: true, users });
});

// ─── API: POST /api/economy/pay ───
app.post('/api/economy/pay', async (req, res) => {
  const { senderId, targetId, amount } = req.body;
  if (!senderId || !targetId || !amount || amount <= 0) return res.status(400).json({ error: 'Некорректная сумма или получатель' });
  if (senderId === targetId) return res.status(400).json({ error: 'Нельзя переводить монеты самому себе' });

  if (useSupabase) {
    const senderData = await supaFetch(`users?discord_id=eq.${senderId}&select=balance,username`);
    if (!senderData || senderData.length === 0 || senderData[0].balance < amount) {
      return res.status(400).json({ error: 'Недостаточно монет на балансе' });
    }
    const targetData = await supaFetch(`users?discord_id=eq.${targetId}&select=balance,username`);

    const senderBal = senderData[0].balance - amount;
    const targetBal = (targetData && targetData.length > 0 ? targetData[0].balance : 0) + amount;

    await supaFetch(`users?discord_id=eq.${senderId}`, { method: 'PATCH', body: JSON.stringify({ balance: senderBal }) });

    if (targetData && targetData.length > 0) {
      await supaFetch(`users?discord_id=eq.${targetId}`, { method: 'PATCH', body: JSON.stringify({ balance: targetBal }) });
    } else {
      await supaFetch('users', { method: 'POST', body: JSON.stringify({ discord_id: targetId, username: 'Пользователь', balance: targetBal }) });
    }

    await supaFetch('logs', { method: 'POST', body: JSON.stringify({
      type: 'transfer', sender_id: senderId, target_id: targetId,
      sender_name: senderData[0].username, target_name: (targetData?.[0]?.username || 'Пользователь'),
      amount, timestamp: new Date().toISOString()
    }) });

    return res.json({ success: true, senderBalance: senderBal, targetBalance: targetBal });
  }

  // Local fallback
  const db = readDB();
  const sender = db.users[senderId] || { balance: 0, username: 'Sender' };
  if (sender.balance < amount) return res.status(400).json({ error: 'Недостаточно монет на балансе' });
  if (!db.users[targetId]) db.users[targetId] = { username: 'Пользователь', balance: 0, lastDaily: 0 };
  db.users[senderId].balance -= amount;
  db.users[targetId].balance += amount;
  if (!db.logs) db.logs = [];
  db.logs.unshift({ id: Date.now(), type: 'transfer', senderId, targetId, senderName: sender.username, targetName: db.users[targetId].username, amount, timestamp: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true, senderBalance: db.users[senderId].balance, targetBalance: db.users[targetId].balance });
});

// ─── API: GET /api/upgrader/history ───
app.get('/api/upgrader/history', async (req, res) => {
  if (useSupabase) {
    const wins = await supaFetch('logs?type=eq.upgrader_spin&is_win=eq.true&order=timestamp.desc&limit=30');
    const losses = await supaFetch('logs?type=eq.upgrader_spin&is_win=eq.false&order=timestamp.desc&limit=30');
    return res.json({ success: true, wins: wins || [], losses: losses || [] });
  }
  const db = readDB();
  const gameLogs = (db.logs || []).filter(l => l.type === 'upgrader_spin');
  res.json({ success: true, wins: gameLogs.filter(l => l.isWin).slice(0, 30), losses: gameLogs.filter(l => !l.isWin).slice(0, 30) });
});

// ─── API: POST /api/upgrader/record ───
app.post('/api/upgrader/record', async (req, res) => {
  const { isWin, user, discordId, avatar, bet, mult, amount } = req.body;
  const entry = { type: 'upgrader_spin', is_win: Boolean(isWin), "user": user || 'Гость', discord_id: discordId || null, avatar: avatar || null, bet: Number(bet) || 0, mult: Number(mult) || 1, amount: Number(amount) || 0, timestamp: new Date().toISOString() };

  if (useSupabase) {
    await supaFetch('logs', { method: 'POST', body: JSON.stringify(entry), prefer: 'return=representation' });
    return res.json({ success: true, entry });
  }

  const db = readDB();
  if (!db.logs) db.logs = [];
  entry.id = Date.now() + Math.floor(Math.random() * 1000);
  entry.isWin = entry.is_win;
  db.logs.unshift(entry);
  if (db.logs.length > 300) db.logs = db.logs.slice(0, 300);
  writeDB(db);
  res.json({ success: true, entry });
});

// ─── API: POST /api/economy/update ───
app.post('/api/economy/update', async (req, res) => {
  const { userId, newBalance, username } = req.body;
  if (!userId || typeof newBalance !== 'number') return res.status(400).json({ error: 'Invalid payload' });

  if (useSupabase) {
    const existing = await supaFetch(`users?discord_id=eq.${userId}&select=discord_id`);
    const balance = Math.max(0, Math.round(newBalance));
    if (existing && existing.length > 0) {
      await supaFetch(`users?discord_id=eq.${userId}`, { method: 'PATCH', body: JSON.stringify({ balance, ...(username ? { username } : {}), updated_at: new Date().toISOString() }) });
    } else {
      await supaFetch('users', { method: 'POST', body: JSON.stringify({ discord_id: userId, username: username || 'User', balance }) });
    }
    return res.json({ success: true, balance });
  }

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
