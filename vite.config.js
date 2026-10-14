import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function discordOAuthPlugin(env) {
  return {
    name: 'discord-oauth-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const fullUrl = new URL(req.url, `http://${req.headers.host}`);

        // Helper to get local economy DB path
        const dbPath = path.resolve(process.cwd(), 'discord-bot', 'economy.json');
        const readDB = () => {
          try {
            if (fs.existsSync(dbPath)) {
              return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            }
          } catch (e) {}
          return { users: {}, logs: [] };
        };
        const writeDB = (data) => {
          try {
            fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
          } catch (e) {
            console.error('Failed to write economy DB:', e);
          }
        };

        // 1. GET /api/economy/balance?userId=...
        if (fullUrl.pathname === '/api/economy/balance' && req.method === 'GET') {
          const userId = fullUrl.searchParams.get('userId');
          if (!userId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Missing userId' }));
          }
          const db = readDB();
          const user = db.users[userId] || { balance: 0, lastDaily: 0 };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, balance: user.balance || 0 }));
        }

        // 2. GET /api/economy/leaderboard
        if (fullUrl.pathname === '/api/economy/leaderboard' && req.method === 'GET') {
          const db = readDB();
          const users = Object.entries(db.users || {}).map(([id, u]) => ({
            id,
            username: u.username || 'Участник',
            balance: u.balance || 0,
            avatar: u.avatar || null,
            lastDaily: u.lastDaily || 0
          })).sort((a, b) => b.balance - a.balance);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, users }));
        }

        // 3. POST /api/economy/pay (Transfer between members)
        if (fullUrl.pathname === '/api/economy/pay' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { senderId, targetId, amount } = JSON.parse(body);
              if (!senderId || !targetId || !amount || amount <= 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Некорректная сумма или получатель' }));
              }
              if (senderId === targetId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Нельзя переводить монеты самому себе' }));
              }
              const db = readDB();
              const sender = db.users[senderId] || { balance: 0, username: 'Sender' };
              if (sender.balance < amount) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Недостаточно монет на балансе' }));
              }
              if (!db.users[targetId]) {
                db.users[targetId] = { username: 'Пользователь', balance: 0, lastDaily: 0 };
              }
              db.users[senderId].balance -= amount;
              db.users[targetId].balance += amount;

              if (!db.logs) db.logs = [];
              db.logs.unshift({
                id: Date.now(),
                type: 'transfer',
                senderId,
                targetId,
                senderName: sender.username,
                targetName: db.users[targetId].username,
                amount,
                timestamp: new Date().toISOString()
              });
              if (db.logs.length > 200) db.logs = db.logs.slice(0, 200);
              writeDB(db);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ 
                success: true, 
                senderBalance: db.users[senderId].balance,
                targetBalance: db.users[targetId].balance 
              }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 4. GET /api/upgrader/history (Real persistent wins & losses)
        if (fullUrl.pathname === '/api/upgrader/history' && req.method === 'GET') {
          const db = readDB();
          const gameLogs = (db.logs || []).filter(l => l.type === 'upgrader_spin');
          const wins = gameLogs.filter(l => l.isWin).slice(0, 30);
          const losses = gameLogs.filter(l => !l.isWin).slice(0, 30);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: true, wins, losses }));
        }

        // 5. POST /api/upgrader/record (Save real win/loss to database)
        if (fullUrl.pathname === '/api/upgrader/record' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { isWin, user, discordId, avatar, bet, mult, amount } = JSON.parse(body);
              const db = readDB();
              if (!db.logs) db.logs = [];

              const entry = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                type: 'upgrader_spin',
                isWin: Boolean(isWin),
                user: user || 'Гость',
                discordId: discordId || null,
                avatar: avatar || null,
                bet: Number(bet) || 0,
                mult: Number(mult) || 1,
                amount: Number(amount) || 0,
                timestamp: new Date().toISOString()
              };

              db.logs.unshift(entry);
              if (db.logs.length > 300) db.logs = db.logs.slice(0, 300);
              writeDB(db);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: true, entry }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 6. POST /api/economy/update
        if (fullUrl.pathname === '/api/economy/update' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { userId, newBalance, username } = JSON.parse(body);
              if (!userId || typeof newBalance !== 'number') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid payload' }));
              }
              const db = readDB();
              if (!db.users[userId]) {
                db.users[userId] = { username: username || 'User', balance: 0, lastDaily: 0 };
              }
              db.users[userId].balance = Math.max(0, Math.round(newBalance));
              if (username) db.users[userId].username = username;
              writeDB(db);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ success: true, balance: db.users[userId].balance }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 3. GET /api/auth/discord
        if (fullUrl.pathname === '/api/auth/discord') {
          const clientId = env.DISCORD_CLIENT_ID || '1558107029124550677';
          const proto = req.headers['x-forwarded-proto'] || 'http';
          const host = req.headers.host;
          const origin = `${proto}://${host}`;
          const redirectUri = encodeURIComponent(`${origin}/api/auth/callback`);
          const scope = encodeURIComponent('identify guilds.members.read');
          const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
          
          res.writeHead(302, { Location: discordAuthUrl });
          return res.end();
        }

        // 2. GET /api/auth/callback
        if (fullUrl.pathname === '/api/auth/callback') {
          const code = fullUrl.searchParams.get('code');
          if (!code) {
            res.writeHead(302, { Location: '/?auth_error=no_code' });
            return res.end();
          }

          const clientId = env.DISCORD_CLIENT_ID || '1558107029124550677';
          const clientSecret = env.DISCORD_CLIENT_SECRET || 'iJ3DT_fGUIh13YFP8qWqhW1WWnXPod4Y';
          const proto = req.headers['x-forwarded-proto'] || 'http';
          const host = req.headers.host;
          const redirectUri = `${proto}://${host}/api/auth/callback`;

          try {
            const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
              }),
            });
            const tokenData = await tokenRes.json();
            
            if (!tokenData.access_token) {
              console.error('Discord Token Error:', tokenData);
              res.writeHead(302, { Location: '/?auth_error=token_failed' });
              return res.end();
            }

            // Fetch user info from Discord
            const userRes = await fetch('https://discord.com/api/users/@me', {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            const userData = await userRes.json();

            const displayName = userData.global_name || userData.username;
            const discordUser = {
              id: userData.id,
              username: displayName,
              tag: userData.discriminator && userData.discriminator !== '0' 
                ? `${userData.username}#${userData.discriminator}` 
                : `@${userData.username}`,
              avatar: userData.avatar 
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=128`
                : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.id.slice(-2)) % 5}.png`,
            };

            const userParam = encodeURIComponent(JSON.stringify(discordUser));
            res.writeHead(302, { Location: `/?auth_success=true&user=${userParam}` });
            return res.end();
          } catch (err) {
            console.error('Discord OAuth Error in Middleware:', err);
            res.writeHead(302, { Location: '/?auth_error=server_error' });
            return res.end();
          }
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), discordOAuthPlugin(env)],
    server: {
      port: 3000,
      open: false,
      host: true,
      allowedHosts: true
    }
  };
});
