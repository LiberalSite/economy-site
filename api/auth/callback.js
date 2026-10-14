// Vercel Serverless Function: GET /api/auth/callback
// Handles OAuth2 callback from Discord, gets user profile and redirects back
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.redirect("/?auth_error=no_code");
  }

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || `https://${req.headers.host}/api/auth/callback`;

  try {
    // 1. Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      return res.redirect("/?auth_error=token_failed");
    }

    // 2. Fetch User Profile
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userResponse.json();

    // 3. User info (supports modern Discord username migration)
    const displayName = userData.global_name || userData.username;
    const discordUser = {
      id: userData.id,
      username: displayName,
      tag: userData.discriminator && userData.discriminator !== '0' ? `${userData.username}#${userData.discriminator}` : `@${userData.username}`,
      avatar: userData.avatar 
        ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=128`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.id.slice(-2)) % 5}.png`,
    };

    // Redirect to home with user query param or set cookie
    const userParam = encodeURIComponent(JSON.stringify(discordUser));
    return res.redirect(`/?auth_success=true&user=${userParam}`);
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return res.redirect("/?auth_error=server_error");
  }
}
