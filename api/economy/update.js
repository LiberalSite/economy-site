// Vercel Serverless Function: POST /api/economy/update
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, newBalance, username } = req.body;

  if (!userId || typeof newBalance !== 'number') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/users?discord_id=eq.${userId}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          balance: Math.max(0, Math.round(newBalance)),
          updated_at: new Date().toISOString()
        })
      });
      return res.status(200).json({ success: true, balance: newBalance });
    } catch (e) {
      console.warn("Supabase update error:", e);
    }
  }

  return res.status(200).json({ success: true, balance: newBalance });
}
