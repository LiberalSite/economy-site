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
  INVALID_CHANCE: 'Шанс должен быть от 1 до 75%',
  SPIN_LIMIT_REACHED: 'Спины на 24 часа закончились',
  FREE_ROUNDS_LEFT: 'У тебя ещё есть бесплатные спины',
  NO_USER: 'Аккаунт не найден',
  INVALID_COUNT: 'Некорректное количество спинов',
  INVALID_TERM: 'Срок кредита — неделя или месяц',
  INVALID_LOAN_AMOUNT: 'Сумма кредита должна быть хотя бы 100 монет',
  LOAN_TOO_POOR: 'Для кредита нужно хотя бы 100 монет на балансе',
  LOAN_ACTIVE: 'У тебя уже есть открытый кредит — сначала погаси его',
  LOAN_LIMIT: 'Сумма больше, чем тебе доступна (2 баланса)',
  NO_LOAN: 'Открытого кредита нет',
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

// p_pay is what leaves the sender; the target gets 85% of it, 15% goes to the earnings role.
export function transfer(senderId, targetId, pay, senderName = null, targetName = null, guildId = null) {
  return rpc('transfer_coins', {
    p_sender: senderId,
    p_target: targetId,
    p_pay: pay,
    p_sender_name: senderName,
    p_target_name: targetName,
    p_guild_id: guildId,
  });
}

// Smallest payment whose 85% payout is at least `receive` (integer math, mirrors the SQL fee).
export function payForReceive(receive) {
  return Math.floor((20 * (receive - 1)) / 17) + 1;
}

// Integer math keeps the JS preview identical to FLOOR(p_pay * 0.15) in Postgres
export const receiveFromPay = (pay) => pay - Math.floor((pay * 3) / 20);

export function upgraderSpin(discordId, bet, chance, username = null, avatar = null, guildId = null) {
  return rpc('upgrader_spin', {
    p_discord_id: discordId,
    p_bet: bet,
    p_chance: chance,
    p_username: username,
    p_avatar: avatar,
    p_guild_id: guildId,
  });
}

export function upgraderQuota(discordId) {
  return rpc('upgrader_quota', { p_discord_id: discordId });
}

export function buyBonusSpin(discordId, count = 1) {
  return rpc('buy_bonus_spin', { p_discord_id: discordId, p_count: count });
}

export function setGuildEarningsRole(guildId, roleId) {
  return rpc('set_guild_earnings_role', { p_guild_id: guildId, p_role_id: roleId });
}

// 'print' = salaries are minted, 'pool' = salaries are collected from the earnings role holders
export function setGuildSalarySource(guildId, source) {
  return rpc('set_guild_salary_source', { p_guild_id: guildId, p_source: source });
}

export function syncEarningsPool(guildId, members) {
  return rpc('sync_earnings_pool', { p_guild_id: guildId, p_items: members });
}

export function getGuildConfig(guildId) {
  return rpc('get_guild_config', { p_guild_id: guildId });
}

// items: [{ id, amount, username?, avatar? }] — one daily salary run for a guild
export function paySalaries(guildId, items) {
  return rpc('pay_salaries', { p_guild_id: guildId, p_items: items });
}

export function loanOffer(discordId) {
  return rpc('loan_offer', { p_discord_id: discordId });
}

export function takeLoan(discordId, amount, term, username = null, avatar = null, guildId = null) {
  return rpc('take_loan', {
    p_discord_id: discordId,
    p_amount: amount,
    p_term: term,
    p_username: username,
    p_avatar: avatar,
    p_guild_id: guildId,
  });
}

export function repayLoan(discordId, amount) {
  return rpc('repay_loan', { p_discord_id: discordId, p_amount: amount });
}

// No argument → every open loan in the database (the bot's hourly tick)
export function accrueLoans(discordId = null) {
  return rpc('accrue_loans', { p_discord_id: discordId });
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
