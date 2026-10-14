// Vercel Serverless Function: GET /api/auth/discord
// Redirects user to Discord OAuth2 Authorization URL
export default function handler(req, res) {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "DEMO_CLIENT_ID";
  const REDIRECT_URI = encodeURIComponent(
    process.env.DISCORD_REDIRECT_URI || `https://${req.headers.host}/api/auth/callback`
  );

  if (CLIENT_ID === "DEMO_CLIENT_ID") {
    // If user hasn't configured real Discord App yet, redirect with demo user
    return res.redirect("/?demo_login=true");
  }

  const scope = encodeURIComponent("identify guilds.members.read");
  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}`;

  return res.redirect(discordUrl);
}
