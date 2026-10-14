// Vercel Serverless Function: POST /api/upgrader/play
// Server-validated Upgrader game logic

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, betAmount, multiplier } = req.body;

    if (!betAmount || betAmount <= 0) {
      return res.status(400).json({ error: 'Invalid bet amount' });
    }

    if (!multiplier || multiplier < 1.1) {
      return res.status(400).json({ error: 'Invalid multiplier' });
    }

    // Win chance calculation (with 4% house edge)
    const winChance = Math.min(90, Math.max(1, ((1 / multiplier) * 96)));
    
    // Server RNG (0 to 100)
    const randomRoll = Math.random() * 100;
    const isWin = randomRoll <= winChance;
    const wonAmount = isWin ? Math.floor(betAmount * multiplier) : 0;
    const profit = wonAmount - betAmount;

    // Optional: Sync to Supabase if configured
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    let newBalance = null;

    if (SUPABASE_URL && SUPABASE_KEY && userId) {
      // Connect to Supabase REST API directly without heavy client
      try {
        const fetchUserRes = await fetch(`${SUPABASE_URL}/rest/v1/users?discord_id=eq.${userId}`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          }
        });
        const users = await fetchUserRes.json();
        
        if (users && users.length > 0) {
          const currentBal = users[0].balance || 0;
          newBalance = Math.max(0, currentBal + profit);

          // Update user balance in Supabase
          await fetch(`${SUPABASE_URL}/rest/v1/users?discord_id=eq.${userId}`, {
            method: 'PATCH',
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ balance: newBalance, updated_at: new Date().toISOString() })
          });
        }
      } catch (dbErr) {
        console.warn("Supabase sync warning:", dbErr);
      }
    }

    return res.status(200).json({
      success: true,
      isWin,
      randomRoll: parseFloat(randomRoll.toFixed(2)),
      winChance: parseFloat(winChance.toFixed(2)),
      betAmount,
      multiplier,
      wonAmount,
      profit,
      newBalance
    });
  } catch (err) {
    console.error("Upgrader error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
