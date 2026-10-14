const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

export const dbConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

function describeKey(key) {
  if (key.startsWith('sb_secret_')) return 'secret';
  if (key.startsWith('sb_publishable_')) return 'publishable';
  try {
    return JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString()).role || 'unknown';
  } catch {
    return 'unknown';
  }
}

if (!dbConfigured) {
  console.error('❌ SUPABASE_URL / SUPABASE_KEY не заданы — экономика работать не будет.');
} else {
  const kind = describeKey(SUPABASE_KEY);
  if (kind === 'anon' || kind === 'publishable') {
    console.error('❌ SUPABASE_KEY — это публичный (anon/publishable) ключ. Нужен service_role / secret ключ из Supabase → Project Settings → API Keys.');
  }
}

const ERROR_MESSAGES = {
  INSUFFICIENT_FUNDS: 'Недостаточно монет на балансе',
  SELF_TRANSFER: 'Нельзя переводить монеты самому себе',
  INVALID_AMOUNT: 'Некорректная сумма',
  INVALID_BET: 'Некорректная ставка',
  INVALID_CHANCE: 'Шанс должен быть от 1 до 90%',
};

export class DbError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.userMessage = ERROR_MESSAGES[message] || null;
  }
}

async function request(path, { method = 'GET', body, prefer } = {}) {
  if (!dbConfigured) throw new DbError('DB_NOT_CONFIGURED', 503);
  const headers = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };
  // new-style sb_* keys are not JWTs and must not be sent as a Bearer token
  if (!SUPABASE_KEY.startsWith('sb_')) headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  if (prefer) headers.Prefer = prefer;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new DbError(data?.message || `HTTP ${res.status}`, res.status);
  return data;
}

const rpc = (fn, args) => request(`rpc/${fn}`, { method: 'POST', body: args });

export async function getUser(discordId) {
  const rows = await request(`users?discord_id=eq.${encodeURIComponent(discordId)}&select=discord_id,username,avatar,balance`);
  return rows[0] || null;
}

export async function getBalance(discordId) {
  return (await getUser(discordId))?.balance ?? 0;
}

// items: [{ id, amount, username?, avatar? }], amount >= 0
export async function addBalances(items) {
  if (!items.length) return [];
  return rpc('add_balances', { p_items: items });
}

export async function addBalance(discordId, amount, username = null, avatar = null) {
  const [row] = await addBalances([{ id: discordId, amount, username, avatar }]);
  return row.balance;
}

export function transfer(senderId, targetId, amount, senderName = null, targetName = null) {
  return rpc('transfer_coins', {
    p_sender: senderId,
    p_target: targetId,
    p_amount: amount,
    p_sender_name: senderName,
    p_target_name: targetName,
  });
}

export function upgraderSpin(discordId, bet, chance, username = null, avatar = null) {
  return rpc('upgrader_spin', {
    p_discord_id: discordId,
    p_bet: bet,
    p_chance: chance,
    p_username: username,
    p_avatar: avatar,
  });
}

export function leaderboard(limit = 50) {
  return request(`users?select=discord_id,username,avatar,balance&order=balance.desc,updated_at.desc&limit=${limit}`);
}

export async function upgraderHistory(limit = 30) {
  const base = `logs?type=eq.upgrader_spin&select=id,user,discord_id,avatar,bet,mult,amount,timestamp&order=timestamp.desc&limit=${limit}`;
  const [wins, losses] = await Promise.all([
    request(`${base}&is_win=eq.true`),
    request(`${base}&is_win=eq.false`),
  ]);
  return { wins, losses };
}

// Returns true only for the first caller per guild per day — makes the daily payout idempotent.
export async function claimPayout(guildId, payDate) {
  const rows = await request('salary_payouts?on_conflict=guild_id,pay_date', {
    method: 'POST',
    body: { guild_id: guildId, pay_date: payDate },
    prefer: 'resolution=ignore-duplicates,return=representation',
  });
  return rows.length > 0;
}

export async function releasePayout(guildId, payDate) {
  await request(`salary_payouts?guild_id=eq.${encodeURIComponent(guildId)}&pay_date=eq.${payDate}`, { method: 'DELETE' });
}
