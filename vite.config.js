import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function discordOAuthPlugin(env) {
  return {
    name: 'discord-oauth-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const fullUrl = new URL(req.url, `http://${req.headers.host}`);

        // 1. GET /api/auth/discord
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
