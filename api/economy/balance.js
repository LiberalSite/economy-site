// Vercel Serverless Function: GET /api/economy/balance?userId=...
export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId parameter' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/users?discord_id=eq.${userId}`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        return res.status(200).json({ success: true, balance: data[0].balance || 0 });
      }

      // New user default: 0 balance
      await fetch(`${SUPABASE_URL}/rest/v1/users`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ discord_id: userId, balance: 0 })
      });
      return res.status(200).json({ success: true, balance: 0 });
    } catch (e) {
      console.warn("Supabase fetch error:", e);
    }
  }

  // Fallback if running without external DB
  return res.status(200).json({ success: true, balance: 0 });
}
