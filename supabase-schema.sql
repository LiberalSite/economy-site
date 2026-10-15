-- LG ECONOMY — Supabase schema. Safe to re-run: Supabase Dashboard → SQL Editor → paste → Run.
-- The server and bot use the service_role key; anon/authenticated roles get no access at all.

CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  discord_id TEXT UNIQUE NOT NULL,
  username TEXT,
  avatar TEXT,
  balance BIGINT NOT NULL DEFAULT 0,
  last_daily BIGINT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.logs (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  is_win BOOLEAN,
  sender_id TEXT,
  target_id TEXT,
  sender_name TEXT,
  target_name TEXT,
  "user" TEXT,
  discord_id TEXT,
  avatar TEXT,
  bet BIGINT DEFAULT 0,
  mult REAL DEFAULT 1,
  amount BIGINT DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.salary_payouts (
  guild_id TEXT NOT NULL,
  pay_date DATE NOT NULL,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (guild_id, pay_date)
);

-- Per-guild settings chosen by the leader in Discord: which role collects losses and transfer fees,
-- and whether daily salaries are printed out of nowhere ('print') or collected from that role ('pool')
CREATE TABLE IF NOT EXISTS public.guild_config (
  guild_id TEXT PRIMARY KEY,
  earnings_role_id TEXT,
  salary_source TEXT NOT NULL DEFAULT 'print' CHECK (salary_source IN ('print', 'pool')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.guild_config ADD COLUMN IF NOT EXISTS salary_source TEXT NOT NULL DEFAULT 'print';

-- Members currently holding the earnings role; refreshed by the bot, read by the payout functions
CREATE TABLE IF NOT EXISTS public.earnings_pool (
  guild_id TEXT NOT NULL,
  discord_id TEXT NOT NULL,
  username TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (guild_id, discord_id)
);

-- How the leader wants every announcement to look, per guild and per alert type
-- (key: payout / loan / transfer / upgrader). A NULL field means "use the built-in default",
-- so updating the defaults in the code reaches guilds that never touched the panel.
CREATE TABLE IF NOT EXISTS public.alert_config (
  guild_id TEXT NOT NULL,
  alert_key TEXT NOT NULL,
  enabled BOOLEAN,
  channel_id TEXT,
  title TEXT,
  template TEXT,
  color TEXT,
  mention TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (guild_id, alert_key)
);

-- One open loan per borrower, repaid by annuity: the DB takes the same fixed amount every day
-- straight from the balance. daily_payment can never be bigger than the member's daily salary,
-- so the loan is always affordable; total_due/term_days are what the schedule worked out at issue.
-- The old week/month table is replaced on purpose: no loan could exist in it yet, the feature
-- was never live, so nothing is lost. Balances and logs are untouched. If rows somehow exist,
-- the run stops here instead of deleting them.
DO $do$
BEGIN
  IF to_regclass('public.loans') IS NOT NULL AND EXISTS (SELECT 1 FROM public.loans) THEN
    RAISE EXCEPTION 'public.loans holds rows — close or migrate them before replacing the table';
  END IF;
END $do$;
DROP TABLE IF EXISTS public.loans;
CREATE TABLE IF NOT EXISTS public.loans (
  id BIGSERIAL PRIMARY KEY,
  discord_id TEXT NOT NULL,
  guild_id TEXT,
  principal BIGINT NOT NULL,
  repaid BIGINT NOT NULL DEFAULT 0,
  interest_paid BIGINT NOT NULL DEFAULT 0,
  daily_payment BIGINT NOT NULL,
  total_due BIGINT NOT NULL,
  term_days INT NOT NULL,
  days_charged INT NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  closed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Upgrades for databases created with the previous schema
ALTER TABLE public.users ALTER COLUMN username DROP DEFAULT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bonus_spins INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bonus_expires_at TIMESTAMPTZ;
-- The loan daily payment is a share of the salary that comes from the Discord activity role, which
-- the database cannot see. The bot mirrors the role and its salary onto the user row.
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS salary_daily BIGINT NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS activity_role TEXT;
ALTER TABLE public.users ALTER COLUMN balance TYPE BIGINT;
UPDATE public.users SET balance = 0 WHERE balance IS NULL;
ALTER TABLE public.users ALTER COLUMN balance SET NOT NULL;
ALTER TABLE public.logs ALTER COLUMN bet TYPE BIGINT;
ALTER TABLE public.logs ALTER COLUMN amount TYPE BIGINT;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS fee BIGINT DEFAULT 0;
-- Loan interest is charged every day straight from the balance, so a borrower can end up in the
-- minus on purpose. Drop any check that forbids a negative balance, whatever Supabase named it.
DO $do$
DECLARE
  c RECORD;
BEGIN
  FOR c IN
    SELECT con.conname AS n
      FROM pg_constraint con
      JOIN pg_class rel ON rel.oid = con.conrelid
      JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
     WHERE nsp.nspname = 'public' AND rel.relname = 'users' AND con.contype = 'c'
       AND pg_get_constraintdef(con.oid) ILIKE '%balance%'
  LOOP
    EXECUTE format('ALTER TABLE public.users DROP CONSTRAINT %I', c.n);
  END LOOP;
END
$do$;

CREATE INDEX IF NOT EXISTS idx_users_balance ON public.users(balance DESC);
CREATE INDEX IF NOT EXISTS idx_logs_type_ts ON public.logs(type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_logs_upgrader_user ON public.logs(discord_id, timestamp DESC) WHERE type = 'upgrader_spin';
CREATE INDEX IF NOT EXISTS idx_loans_active_user ON public.loans(discord_id) WHERE status = 'active';

-- Lock down: RLS on, no policies → only service_role (which bypasses RLS) can touch data
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnings_pool ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for users" ON public.users;
DROP POLICY IF EXISTS "Allow all for logs" ON public.logs;

-- Credit coins (amount >= 0) to many users at once; also upserts username/avatar.
CREATE OR REPLACE FUNCTION public.add_balances(p_items JSONB)
RETURNS SETOF public.users
LANGUAGE sql AS $$
  INSERT INTO public.users (discord_id, username, avatar, balance)
  SELECT x.id, x.username, x.avatar, COALESCE(x.amount, 0)
  FROM jsonb_to_recordset(p_items) AS x(id TEXT, username TEXT, avatar TEXT, amount BIGINT)
  WHERE x.id IS NOT NULL AND COALESCE(x.amount, 0) >= 0
  ON CONFLICT (discord_id) DO UPDATE SET
    balance = public.users.balance + EXCLUDED.balance,
    username = COALESCE(EXCLUDED.username, public.users.username),
    avatar = COALESCE(EXCLUDED.avatar, public.users.avatar),
    updated_at = NOW()
  RETURNING *;
$$;

-- Split an amount equally between everyone holding the earnings role; the indivisible remainder
-- goes to the poorest holder. Returns how much was actually paid out (0 when no role is set up).
CREATE OR REPLACE FUNCTION public.distribute_earnings(p_amount BIGINT, p_guild_id TEXT DEFAULT NULL)
RETURNS BIGINT
LANGUAGE plpgsql AS $$
DECLARE
  v_total BIGINT := COALESCE(p_amount, 0);
  v_members BIGINT;
  v_each BIGINT;
  v_rest BIGINT;
BEGIN
  IF v_total <= 0 THEN RETURN 0; END IF;

  SELECT COUNT(DISTINCT u.discord_id) INTO v_members
    FROM public.earnings_pool p JOIN public.users u ON u.discord_id = p.discord_id
   WHERE (p_guild_id IS NULL OR p.guild_id = p_guild_id);
  IF v_members = 0 THEN RETURN 0; END IF;

  v_each := FLOOR(v_total / v_members)::BIGINT;
  v_rest := v_total - v_each * v_members;

  IF v_each > 0 THEN
    UPDATE public.users u SET balance = u.balance + v_each, updated_at = NOW()
     WHERE u.discord_id IN (
       SELECT DISTINCT p.discord_id FROM public.earnings_pool p
        WHERE (p_guild_id IS NULL OR p.guild_id = p_guild_id)
     );
  END IF;

  -- the indivisible remainder goes one coin at a time to the poorest holders
  IF v_rest > 0 THEN
    UPDATE public.users u SET balance = u.balance + 1, updated_at = NOW()
     WHERE u.discord_id IN (
       SELECT p.discord_id FROM public.earnings_pool p JOIN public.users uu ON uu.discord_id = p.discord_id
        WHERE (p_guild_id IS NULL OR p.guild_id = p_guild_id)
        ORDER BY uu.balance ASC, p.discord_id ASC LIMIT v_rest
     );
  END IF;

  RETURN v_total;
END $$;

-- Transfer with a 15% commission: the sender pays p_pay, the target receives p_pay - fee,
-- the fee is handed to the earnings role right away.
DROP FUNCTION IF EXISTS public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT);
-- While a loan is open the borrower must always keep one daily payment on the account, so the
-- scheduled charge can never fail. Spending (bets, transfers, bonus rounds) is allowed down to
-- that reserve and not further; receiving coins and repaying stay allowed.
DROP FUNCTION IF EXISTS public.loan_blocks_spend(TEXT);
CREATE OR REPLACE FUNCTION public.loan_reserve(p_discord_id TEXT)
RETURNS BIGINT
LANGUAGE sql STABLE AS $$
  SELECT COALESCE((
    SELECT daily_payment FROM public.loans
     WHERE discord_id = p_discord_id AND status = 'active'
     ORDER BY id LIMIT 1
  ), 0);
$$;

CREATE OR REPLACE FUNCTION public.transfer_coins(
  p_sender TEXT, p_target TEXT, p_pay BIGINT,
  p_sender_name TEXT DEFAULT NULL, p_target_name TEXT DEFAULT NULL, p_guild_id TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_fee BIGINT;
  v_recv BIGINT;
  v_collected BIGINT;
  v_reserve BIGINT;
  v_before BIGINT;
  v_sender public.users;
  v_target public.users;
BEGIN
  IF p_pay IS NULL OR p_pay <= 0 THEN RAISE EXCEPTION 'INVALID_AMOUNT'; END IF;
  IF p_sender = p_target THEN RAISE EXCEPTION 'SELF_TRANSFER'; END IF;

  v_fee := FLOOR(p_pay * 0.15)::BIGINT;
  v_recv := p_pay - v_fee;
  IF v_recv < 1 THEN RAISE EXCEPTION 'INVALID_AMOUNT'; END IF;

  INSERT INTO public.users (discord_id, username) VALUES (p_target, p_target_name)
  ON CONFLICT (discord_id) DO NOTHING;

  -- lock both rows in a stable order so concurrent transfers can't deadlock
  PERFORM 1 FROM public.users WHERE discord_id IN (p_sender, p_target) ORDER BY discord_id FOR UPDATE;

  SELECT balance INTO v_before FROM public.users WHERE discord_id = p_sender;
  IF COALESCE(v_before, 0) < p_pay THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;
  v_reserve := public.loan_reserve(p_sender);
  IF v_before - p_pay < v_reserve THEN RAISE EXCEPTION 'LOAN_RESERVE'; END IF;

  UPDATE public.users
     SET balance = balance - p_pay, username = COALESCE(p_sender_name, username), updated_at = NOW()
   WHERE discord_id = p_sender
  RETURNING * INTO v_sender;

  UPDATE public.users
     SET balance = balance + v_recv, username = COALESCE(p_target_name, username), updated_at = NOW()
   WHERE discord_id = p_target
  RETURNING * INTO v_target;

  v_collected := distribute_earnings(v_fee, p_guild_id);

  INSERT INTO public.logs (type, sender_id, target_id, sender_name, target_name, amount, fee)
  VALUES ('transfer', p_sender, p_target, v_sender.username, v_target.username, p_pay, v_fee);

  RETURN jsonb_build_object(
    'sender_balance', v_sender.balance,
    'target_balance', v_target.balance,
    'paid', p_pay,
    'received', v_recv,
    'fee', v_fee,
    'fee_paid_out', v_collected,
    'reserve', v_reserve
  );
END $$;

-- One shared calendar day for the round quota: every member gets the 3 free rounds back at the
-- same moment — 00:00 in Amsterdam, fixed here instead of following the server clock (Render runs
-- the app in Europe/Moscow).
CREATE OR REPLACE FUNCTION public.quota_day_start(p_at TIMESTAMPTZ DEFAULT NOW())
RETURNS TIMESTAMPTZ
LANGUAGE sql STABLE AS $$
  SELECT (date_trunc('day', p_at AT TIME ZONE 'Europe/Amsterdam')) AT TIME ZONE 'Europe/Amsterdam';
$$;

CREATE OR REPLACE FUNCTION public.quota_day_end(p_at TIMESTAMPTZ DEFAULT NOW())
RETURNS TIMESTAMPTZ
LANGUAGE sql STABLE AS $$
  SELECT public.quota_day_start(p_at) + INTERVAL '1 day';
$$;

-- Upgrader round resolved entirely on the DB side: multiplier = 96 / chance (4% house edge).
-- Free quota: 3 rounds per Amsterdam calendar day; beyond that only a purchased bonus round can spin.
-- A lost bet is not burned — it goes straight to the members of the earnings role.
DROP FUNCTION IF EXISTS public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT);
CREATE OR REPLACE FUNCTION public.upgrader_spin(
  p_discord_id TEXT, p_bet BIGINT, p_chance NUMERIC,
  p_username TEXT DEFAULT NULL, p_avatar TEXT DEFAULT NULL, p_guild_id TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_mult NUMERIC;
  v_win BOOLEAN;
  v_payout BIGINT;
  v_balance BIGINT;
  v_used INT;
  v_bonus INT;
  v_bonus_expires TIMESTAMPTZ;
  v_bonus_used BOOLEAN := FALSE;
  v_collected BIGINT := 0;
  v_reserve BIGINT := 0;
  v_window_start TIMESTAMPTZ := public.quota_day_start();
BEGIN
  IF p_bet IS NULL OR p_bet < 1 THEN RAISE EXCEPTION 'INVALID_BET'; END IF;
  IF p_chance IS NULL OR p_chance < 1 OR p_chance > 75 THEN RAISE EXCEPTION 'INVALID_CHANCE'; END IF;

  SELECT COUNT(*) INTO v_used FROM public.logs
   WHERE type = 'upgrader_spin' AND discord_id = p_discord_id AND timestamp >= v_window_start;

  IF v_used >= 3 THEN
    SELECT bonus_spins, bonus_expires_at INTO v_bonus, v_bonus_expires
      FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
    IF COALESCE(v_bonus, 0) > 0 AND v_bonus_expires > NOW() THEN
      UPDATE public.users SET bonus_spins = bonus_spins - 1 WHERE discord_id = p_discord_id;
      v_bonus_used := TRUE;
    ELSE
      RAISE EXCEPTION 'SPIN_LIMIT_REACHED';
    END IF;
  END IF;

  v_mult := ROUND(96 / p_chance, 2);
  v_win := random() * 100 < p_chance;
  v_payout := CASE WHEN v_win THEN FLOOR(p_bet * v_mult)::BIGINT ELSE 0 END;

  SELECT balance INTO v_balance FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  IF COALESCE(v_balance, 0) < p_bet THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;
  v_reserve := public.loan_reserve(p_discord_id);
  IF v_balance - p_bet < v_reserve THEN RAISE EXCEPTION 'LOAN_RESERVE'; END IF;

  UPDATE public.users
     SET balance = balance - p_bet + v_payout, updated_at = NOW()
   WHERE discord_id = p_discord_id
  RETURNING balance INTO v_balance;

  IF NOT v_win THEN v_collected := distribute_earnings(p_bet, p_guild_id); END IF;

  INSERT INTO public.logs (type, is_win, "user", discord_id, avatar, bet, mult, amount, fee)
  VALUES ('upgrader_spin', v_win, p_username, p_discord_id, p_avatar, p_bet, v_mult, v_payout,
           CASE WHEN v_win THEN 0 ELSE p_bet END);

  RETURN jsonb_build_object('is_win', v_win, 'mult', v_mult, 'amount', v_payout,
    'balance', v_balance, 'bonus_used', v_bonus_used, 'loss_to_pool', CASE WHEN v_win THEN 0 ELSE p_bet END);
END $$;

-- Round state for the UI: free rounds left in the current Amsterdam day and the bonus round price.
-- Bonus price: 1 round = 25% of balance, 2 = 45%, 3 = 60% (buying more is cheaper per round).
CREATE OR REPLACE FUNCTION public.upgrader_quota(p_discord_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_window_start TIMESTAMPTZ := public.quota_day_start();
  v_used INT := 0;
  v_balance BIGINT := 0;
  v_bonus INT := 0;
  v_bonus_expires TIMESTAMPTZ;
  v_costs BIGINT[];
BEGIN
  SELECT COUNT(*) INTO v_used FROM public.logs
   WHERE type = 'upgrader_spin' AND discord_id = p_discord_id AND timestamp >= v_window_start;

  SELECT balance, bonus_spins, bonus_expires_at INTO v_balance, v_bonus, v_bonus_expires
    FROM public.users WHERE discord_id = p_discord_id;

  IF v_bonus_expires IS NOT NULL AND v_bonus_expires <= NOW() THEN v_bonus := 0; END IF;

  v_costs := bonus_costs(COALESCE(v_balance, 0));

  RETURN jsonb_build_object(
    'limit', 3,
    'used', v_used,
    'left', GREATEST(0, 3 - v_used),
    'next_reset_at', public.quota_day_end(),
    'balance', v_balance,
    'bonus_spins', v_bonus,
    'bonus_expires_at', v_bonus_expires,
    'bonus_cost', v_costs[1],
    'bonus_costs', to_jsonb(v_costs)
  );
END $$;

-- Price list for 1, 2 and 3 bonus rounds; cheaper per round in bigger packs.
CREATE OR REPLACE FUNCTION public.bonus_costs(p_balance BIGINT)
RETURNS BIGINT[]
LANGUAGE sql IMMUTABLE AS $$
  SELECT ARRAY[
    GREATEST(1, FLOOR(p_balance * 0.25)::BIGINT),
    GREATEST(2, FLOOR(p_balance * 0.45)::BIGINT),
    GREATEST(3, FLOOR(p_balance * 0.60)::BIGINT)
  ];
$$;

-- Sell p_count extra rounds; they all burn at the next quota reset. The price is not burned:
-- it goes to the earnings role, the same one that collects losses and transfer fees.
DROP FUNCTION IF EXISTS public.buy_bonus_spin(TEXT);
DROP FUNCTION IF EXISTS public.buy_bonus_spin(TEXT, INT);
CREATE OR REPLACE FUNCTION public.buy_bonus_spin(p_discord_id TEXT, p_count INT DEFAULT 1, p_guild_id TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_window_start TIMESTAMPTZ := public.quota_day_start();
  v_balance BIGINT;
  v_used INT;
  v_current_bonus INT;
  v_current_expires TIMESTAMPTZ;
  v_cost BIGINT;
  v_costs BIGINT[];
  v_reserve BIGINT;
  v_collected BIGINT := 0;
  v_next_reset TIMESTAMPTZ;
BEGIN
  IF p_count IS NULL OR p_count < 1 OR p_count > 3 THEN RAISE EXCEPTION 'INVALID_COUNT'; END IF;

  SELECT balance, bonus_spins, bonus_expires_at INTO v_balance, v_current_bonus, v_current_expires
    FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'NO_USER'; END IF;

  SELECT COUNT(*) INTO v_used FROM public.logs
   WHERE type = 'upgrader_spin' AND discord_id = p_discord_id AND timestamp >= v_window_start;
  IF v_used < 3 THEN RAISE EXCEPTION 'FREE_ROUNDS_LEFT'; END IF;

  v_costs := public.bonus_costs(v_balance);
  v_cost := v_costs[p_count];
  v_next_reset := public.quota_day_end();

  IF v_balance < v_cost THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;
  v_reserve := public.loan_reserve(p_discord_id);
  IF v_balance - v_cost < v_reserve THEN RAISE EXCEPTION 'LOAN_RESERVE'; END IF;

  UPDATE public.users
     SET balance = balance - v_cost,
         bonus_spins = (CASE WHEN v_current_expires > NOW() THEN v_current_bonus ELSE 0 END) + p_count,
         bonus_expires_at = v_next_reset,
         updated_at = NOW()
   WHERE discord_id = p_discord_id;

  v_collected := public.distribute_earnings(v_cost, p_guild_id);

  INSERT INTO public.logs (type, discord_id, amount, fee)
  VALUES ('bonus_spin_purchase', p_discord_id, v_cost, v_cost);

  RETURN upgrader_quota(p_discord_id) || jsonb_build_object('cost', v_cost, 'count', p_count, 'paid_to_role', v_collected);
END $$;

-- Leader settings, written by the bot
CREATE OR REPLACE FUNCTION public.set_guild_earnings_role(p_guild_id TEXT, p_role_id TEXT)
RETURNS VOID
LANGUAGE sql AS $$
  INSERT INTO public.guild_config (guild_id, earnings_role_id, updated_at)
  VALUES (p_guild_id, p_role_id, NOW())
  ON CONFLICT (guild_id) DO UPDATE SET earnings_role_id = EXCLUDED.earnings_role_id, updated_at = NOW();
$$;

CREATE OR REPLACE FUNCTION public.set_guild_salary_source(p_guild_id TEXT, p_source TEXT)
RETURNS VOID
LANGUAGE sql AS $$
  INSERT INTO public.guild_config (guild_id, salary_source, updated_at)
  VALUES (p_guild_id, p_source, NOW())
  ON CONFLICT (guild_id) DO UPDATE SET salary_source = EXCLUDED.salary_source, updated_at = NOW();
$$;

-- Replace the list of members holding the earnings role for one guild
CREATE OR REPLACE FUNCTION public.sync_earnings_pool(p_guild_id TEXT, p_items JSONB)
RETURNS INT
LANGUAGE plpgsql AS $$
DECLARE
  v_count INT;
BEGIN
  DELETE FROM public.earnings_pool WHERE guild_id = p_guild_id;
  INSERT INTO public.earnings_pool (guild_id, discord_id, username)
  SELECT p_guild_id, x.id, x.username
  FROM jsonb_to_recordset(p_items) AS x(id TEXT, username TEXT)
  WHERE x.id IS NOT NULL
  ON CONFLICT (guild_id, discord_id) DO UPDATE SET username = EXCLUDED.username;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END $$;

-- Mirror of the Discord activity roles: the bot sends every member with their daily salary
-- (0 when they hold no activity role). The daily salary is what a loan is measured against.
CREATE OR REPLACE FUNCTION public.sync_activity(p_items JSONB)
RETURNS INT
LANGUAGE plpgsql AS $$
DECLARE
  v_count INT;
BEGIN
  INSERT INTO public.users (discord_id, salary_daily, activity_role)
  SELECT x.id, COALESCE(x.salary, 0), x.role
    FROM jsonb_to_recordset(p_items) AS x(id TEXT, salary BIGINT, role TEXT)
   WHERE x.id IS NOT NULL
  ON CONFLICT (discord_id) DO UPDATE
    SET salary_daily = EXCLUDED.salary_daily,
        activity_role = EXCLUDED.activity_role;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END $$;

CREATE OR REPLACE FUNCTION public.get_guild_config(p_guild_id TEXT)
RETURNS JSONB
LANGUAGE sql AS $$
  SELECT jsonb_build_object(
    'guild_id', p_guild_id,
    'earnings_role_id', COALESCE((SELECT earnings_role_id FROM public.guild_config WHERE guild_id = p_guild_id), ''),
    'salary_source', COALESCE((SELECT salary_source FROM public.guild_config WHERE guild_id = p_guild_id), 'print'),
    'holders', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('id', p.discord_id, 'username', COALESCE(u.username, p.username), 'balance', COALESCE(u.balance, 0))
                        ORDER BY u.balance DESC)
        FROM public.earnings_pool p LEFT JOIN public.users u ON u.discord_id = p.discord_id
       WHERE p.guild_id = p_guild_id
    ), '[]'::jsonb)
  );
$$;

-- Daily salaries: either printed out of nowhere, or collected from the earnings role first.
-- Anything the role cannot cover is printed, so a payout never silently fails.
CREATE OR REPLACE FUNCTION public.pay_salaries(p_guild_id TEXT, p_items JSONB)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_total BIGINT;
  v_source TEXT;
  v_collected BIGINT := 0;
  v_left BIGINT;
  v_sum BIGINT;
  v_take BIGINT;
  v_paid INT;
  r RECORD;
BEGIN
  SELECT COALESCE(SUM(x.amount), 0) INTO v_total
    FROM jsonb_to_recordset(p_items) AS x(id TEXT, username TEXT, avatar TEXT, amount BIGINT);
  IF v_total <= 0 THEN RETURN jsonb_build_object('paid', 0, 'total', 0, 'collected', 0, 'printed', 0); END IF;

  SELECT salary_source INTO v_source FROM public.guild_config WHERE guild_id = p_guild_id;
  v_source := COALESCE(v_source, 'print');

  IF v_source = 'pool' THEN
    v_left := v_total;
    SELECT COALESCE(SUM(u.balance), 0) INTO v_sum
      FROM public.earnings_pool p JOIN public.users u ON u.discord_id = p.discord_id
     WHERE p.guild_id = p_guild_id AND u.balance > 0;

    IF v_sum > 0 THEN
      -- fair share: everyone in the role contributes in proportion to what they hold
      FOR r IN
        SELECT u.discord_id, u.balance
          FROM public.earnings_pool p JOIN public.users u ON u.discord_id = p.discord_id
         WHERE p.guild_id = p_guild_id AND u.balance > 0
         ORDER BY u.balance DESC FOR UPDATE OF u
      LOOP
        EXIT WHEN v_left <= 0;
        v_take := LEAST(v_left, FLOOR(v_total * r.balance / v_sum)::BIGINT);
        IF v_take > 0 THEN
          UPDATE public.users SET balance = balance - v_take, updated_at = NOW() WHERE discord_id = r.discord_id;
          v_left := v_left - v_take;
          v_collected := v_collected + v_take;
        END IF;
      END LOOP;

      -- shortfall: take the rest from whoever still has coins
      FOR r IN
        SELECT u.discord_id, u.balance
          FROM public.earnings_pool p JOIN public.users u ON u.discord_id = p.discord_id
         WHERE p.guild_id = p_guild_id AND u.balance > 0
         ORDER BY u.balance DESC FOR UPDATE OF u
      LOOP
        EXIT WHEN v_left <= 0;
        v_take := LEAST(v_left, r.balance);
        IF v_take > 0 THEN
          UPDATE public.users SET balance = balance - v_take, updated_at = NOW() WHERE discord_id = r.discord_id;
          v_left := v_left - v_take;
          v_collected := v_collected + v_take;
        END IF;
      END LOOP;
    END IF;
  END IF;

  INSERT INTO public.users (discord_id, username, avatar, balance)
  SELECT x.id, x.username, x.avatar, COALESCE(x.amount, 0)
  FROM jsonb_to_recordset(p_items) AS x(id TEXT, username TEXT, avatar TEXT, amount BIGINT)
  WHERE x.id IS NOT NULL
  ON CONFLICT (discord_id) DO UPDATE SET
    balance = public.users.balance + EXCLUDED.balance,
    username = COALESCE(EXCLUDED.username, public.users.username),
    avatar = COALESCE(EXCLUDED.avatar, public.users.avatar),
    updated_at = NOW();
  GET DIAGNOSTICS v_paid = ROW_COUNT;

  INSERT INTO public.logs (type, target_id, amount, fee)
  VALUES ('salary_payout', p_guild_id, v_total, v_collected);

  RETURN jsonb_build_object('paid', v_paid, 'total', v_total, 'collected', v_collected, 'printed', v_total - v_collected);
END $$;

-- ─── Loans ───
-- Annuity loans: the DB takes the same fixed amount every day straight from the balance. That
-- daily payment is a share of the member's daily activity salary (the member picks the share,
-- the whole salary is the maximum), so a payment is always affordable. Interest is
-- loan_day_rate() % of the debt that is still owed and goes to the earnings role — the same role
-- that collects lost bets and transfer fees.
DROP FUNCTION IF EXISTS public.loan_day_rate(TEXT, INT);
CREATE OR REPLACE FUNCTION public.loan_day_rate()
RETURNS NUMERIC
LANGUAGE sql IMMUTABLE AS $$
  SELECT 1;
$$;

DROP FUNCTION IF EXISTS public.loan_term_days(TEXT);
DROP FUNCTION IF EXISTS public.loan_rate_preview(TEXT);

-- The whole repayment plan for a fixed daily payment: how many days the debt lasts and the sum
-- the borrower hands over in total. Same integer math as accrue_loans, so a preview never lies.
CREATE OR REPLACE FUNCTION public.loan_schedule(p_amount BIGINT, p_daily_payment BIGINT)
RETURNS JSONB
LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE
  v_owed BIGINT := p_amount;
  v_rate NUMERIC := public.loan_day_rate();
  v_days INT := 0;
  v_total BIGINT := 0;
  v_interest BIGINT;
  v_pay BIGINT;
BEGIN
  IF p_amount IS NULL OR p_amount < 1 OR p_daily_payment IS NULL OR p_daily_payment < 1 THEN RETURN NULL; END IF;
  WHILE v_owed > 0 AND v_days < 400 LOOP
    v_interest := FLOOR(v_owed * v_rate / 100)::BIGINT;
    v_pay := LEAST(p_daily_payment, v_owed + v_interest);
    v_owed := GREATEST(v_owed - (v_pay - v_interest), 0);
    v_total := v_total + v_pay;
    v_days := v_days + 1;
  END LOOP;
  RETURN jsonb_build_object('days', v_days, 'total', v_total, 'interest', v_total - p_amount);
END $$;

-- The largest loan the chosen payment can service: the first day's interest has to stay below the
-- daily payment, otherwise the debt would never shrink.
CREATE OR REPLACE FUNCTION public.loan_max_amount(p_daily_payment BIGINT)
RETURNS BIGINT
LANGUAGE sql IMMUTABLE AS $$
  SELECT GREATEST(COALESCE(p_daily_payment, 0) * FLOOR(100 / public.loan_day_rate())::BIGINT - 1, 0);
$$;

-- Charge every whole day that passed since the last charge. Runs before any loan is read or touched,
-- so nobody needs a cron to see the honest number (the bot still ticks hourly).
CREATE OR REPLACE FUNCTION public.accrue_loans(p_discord_id TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  l RECORD;
  v_target INT;
  v_rate NUMERIC := public.loan_day_rate();
  v_owed BIGINT;
  v_interest BIGINT;
  v_pay BIGINT;
  v_body BIGINT;
  v_loans INT := 0;
  v_collected BIGINT := 0;
  v_loan_paid BIGINT := 0;
  v_interest_total BIGINT := 0;
  v_paid_out BIGINT := 0;
BEGIN
  FOR l IN
    SELECT * FROM public.loans
     WHERE status = 'active' AND (p_discord_id IS NULL OR discord_id = p_discord_id)
     ORDER BY id FOR UPDATE SKIP LOCKED
  LOOP
    v_target := FLOOR(EXTRACT(EPOCH FROM (NOW() - l.started_at)) / 86400)::INT;
    -- a loan nobody touched for years must not lock the transaction in a long loop
    IF v_target > l.days_charged + 400 THEN v_target := l.days_charged + 400; END IF;
    v_loan_paid := 0;

    WHILE l.days_charged < v_target LOOP
      v_owed := GREATEST(l.principal - l.repaid, 0);
      EXIT WHEN v_owed <= 0;

      v_interest := FLOOR(v_owed * v_rate / 100)::BIGINT;
      v_pay := LEAST(l.daily_payment, v_owed + v_interest);
      v_body := v_pay - v_interest;
      l.days_charged := l.days_charged + 1;
      l.repaid := l.repaid + v_body;
      l.interest_paid := l.interest_paid + v_interest;

      UPDATE public.users SET balance = balance - v_pay, updated_at = NOW() WHERE discord_id = l.discord_id;
      UPDATE public.loans
         SET days_charged = l.days_charged,
             repaid = l.repaid,
             interest_paid = l.interest_paid,
             status = CASE WHEN l.repaid >= l.principal THEN 'closed' ELSE 'active' END,
             closed_at = CASE WHEN l.repaid >= l.principal THEN NOW() ELSE closed_at END,
             updated_at = NOW()
       WHERE id = l.id;
      INSERT INTO public.logs (type, discord_id, amount, fee)
      VALUES ('loan_payment', l.discord_id, v_pay, v_interest);

      v_paid_out := v_paid_out + public.distribute_earnings(v_interest, l.guild_id);
      v_collected := v_collected + v_pay;
      v_loan_paid := v_loan_paid + v_pay;
      v_interest_total := v_interest_total + v_interest;
      IF l.repaid >= l.principal THEN EXIT; END IF;
    END LOOP;

    IF v_loan_paid > 0 THEN v_loans := v_loans + 1; END IF;
  END LOOP;

  RETURN jsonb_build_object('loans', v_loans, 'collected', v_collected,
    'interest', v_interest_total, 'paid_to_role', v_paid_out);
END $$;

-- Full picture for one borrower: the activity salary a loan is measured against, what they may
-- borrow, and the open loan with its payment plan.
CREATE OR REPLACE FUNCTION public.loan_offer(p_discord_id TEXT, p_username TEXT DEFAULT NULL, p_avatar TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  u public.users;
  l RECORD;
  v_loan JSONB;
  v_salary BIGINT;
BEGIN
  INSERT INTO public.users (discord_id, username, avatar)
  VALUES (p_discord_id, p_username, p_avatar)
  ON CONFLICT (discord_id) DO NOTHING;

  PERFORM public.accrue_loans(p_discord_id);

  SELECT * INTO u FROM public.users WHERE discord_id = p_discord_id;
  v_salary := GREATEST(COALESCE(u.salary_daily, 0), 0);

  SELECT *, (principal - repaid) AS owed, (total_due - interest_paid - repaid) AS owed_total
    INTO l
    FROM public.loans
   WHERE discord_id = p_discord_id AND status = 'active'
   ORDER BY id LIMIT 1;

  v_loan := NULL;
  IF FOUND THEN
    v_loan := jsonb_build_object(
      'id', l.id,
      'principal', l.principal,
      'repaid', l.repaid,
      'interest_paid', l.interest_paid,
      'daily_payment', l.daily_payment,
      'total_due', l.total_due,
      'term_days', l.term_days,
      'day', l.days_charged,
      'days_left', GREATEST(l.term_days - l.days_charged, 0),
      'started_at', l.started_at,
      'due_at', l.started_at + (l.term_days::TEXT || ' days')::INTERVAL,
      'next_charge_at', l.started_at + ((l.days_charged + 1)::TEXT || ' days')::INTERVAL,
      'remaining', GREATEST(l.owed, 0),
      'remaining_due', GREATEST(l.owed_total, 0),
      'salary_percent', CASE WHEN v_salary > 0 THEN ROUND((l.daily_payment * 100)::NUMERIC / v_salary, 1) ELSE 0 END
    );
  END IF;

  RETURN jsonb_build_object(
    'discord_id', p_discord_id,
    'balance', COALESCE(u.balance, 0),
    'salary_daily', v_salary,
    'activity_role', u.activity_role,
    'day_rate', public.loan_day_rate(),
    'min_amount', 100,
    'max_daily_payment', v_salary,
    'max_amount', CASE WHEN v_loan IS NULL THEN public.loan_max_amount(v_salary) ELSE 0 END,
    'can_borrow', (v_salary >= 1 AND v_loan IS NULL),
    'reserve', public.loan_reserve(p_discord_id),
    'loan', v_loan
  );
END $$;

CREATE OR REPLACE FUNCTION public.take_loan(
  p_discord_id TEXT, p_amount BIGINT, p_payment_percent INT DEFAULT 100,
  p_username TEXT DEFAULT NULL, p_avatar TEXT DEFAULT NULL, p_guild_id TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  u public.users;
  v_salary BIGINT;
  v_payment BIGINT;
  v_sched JSONB;
  v_days INT;
  v_total BIGINT;
  v_existing INT;
BEGIN
  PERFORM public.accrue_loans(p_discord_id);

  IF p_amount IS NULL OR p_amount < 100 THEN RAISE EXCEPTION 'INVALID_LOAN_AMOUNT'; END IF;
  IF p_payment_percent IS NULL OR p_payment_percent < 10 OR p_payment_percent > 100 THEN
    RAISE EXCEPTION 'INVALID_PAYMENT_PERCENT';
  END IF;

  INSERT INTO public.users (discord_id, username, avatar)
  VALUES (p_discord_id, p_username, p_avatar)
  ON CONFLICT (discord_id) DO NOTHING;

  SELECT * INTO u FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  v_salary := GREATEST(COALESCE(u.salary_daily, 0), 0);
  IF v_salary < 1 THEN RAISE EXCEPTION 'NO_ACTIVITY_ROLE'; END IF;

  v_payment := FLOOR(v_salary::NUMERIC * p_payment_percent / 100)::BIGINT;
  IF v_payment < 1 THEN RAISE EXCEPTION 'INVALID_PAYMENT_PERCENT'; END IF;

  SELECT COUNT(*) INTO v_existing FROM public.loans WHERE discord_id = p_discord_id AND status = 'active';
  IF v_existing > 0 THEN RAISE EXCEPTION 'LOAN_ACTIVE'; END IF;

  IF p_amount > public.loan_max_amount(v_payment) THEN RAISE EXCEPTION 'LOAN_LIMIT'; END IF;

  v_sched := public.loan_schedule(p_amount, v_payment);
  v_days := (v_sched->>'days')::INT;
  v_total := (v_sched->>'total')::BIGINT;

  UPDATE public.users
     SET balance = balance + p_amount,
         username = COALESCE(p_username, username),
         avatar = COALESCE(p_avatar, avatar),
         updated_at = NOW()
   WHERE discord_id = p_discord_id;

  INSERT INTO public.loans (discord_id, guild_id, principal, daily_payment, total_due, term_days)
  VALUES (p_discord_id, p_guild_id, p_amount, v_payment, v_total, v_days);

  INSERT INTO public.logs (type, discord_id, amount)
  VALUES ('loan_taken', p_discord_id, p_amount);

  RETURN public.loan_offer(p_discord_id);
END $$;

-- Pay back by hand: only from the current balance, only the debt that is still owed. Because the
-- debt shrinks early, the remaining plan is recalculated — the borrower stops paying interest on
-- money they already returned.
CREATE OR REPLACE FUNCTION public.repay_loan(p_discord_id TEXT, p_amount BIGINT)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  l public.loans;
  v_balance BIGINT;
  v_pay BIGINT;
  v_left BIGINT;
  v_sched JSONB;
BEGIN
  PERFORM public.accrue_loans(p_discord_id);

  IF p_amount IS NULL OR p_amount <= 0 THEN RAISE EXCEPTION 'INVALID_AMOUNT'; END IF;

  SELECT * INTO l FROM public.loans
   WHERE discord_id = p_discord_id AND status = 'active'
   ORDER BY id LIMIT 1 FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'NO_LOAN'; END IF;

  SELECT balance INTO v_balance FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  v_pay := LEAST(p_amount, l.principal - l.repaid, GREATEST(COALESCE(v_balance, 0), 0));
  IF v_pay < 1 THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

  UPDATE public.users SET balance = balance - v_pay, updated_at = NOW() WHERE discord_id = p_discord_id;

  v_left := l.principal - l.repaid - v_pay;
  IF v_left > 0 THEN
    v_sched := public.loan_schedule(v_left, l.daily_payment);
    UPDATE public.loans
       SET repaid = repaid + v_pay,
           total_due = repaid + v_pay + interest_paid + (v_sched->>'total')::BIGINT,
           term_days = days_charged + (v_sched->>'days')::INT,
           updated_at = NOW()
     WHERE id = l.id;
  ELSE
    UPDATE public.loans
       SET repaid = repaid + v_pay,
           total_due = repaid + v_pay + interest_paid,
           status = 'closed',
           closed_at = NOW(),
           updated_at = NOW()
     WHERE id = l.id;
  END IF;

  INSERT INTO public.logs (type, discord_id, amount)
  VALUES ('loan_repaid', p_discord_id, v_pay);

  RETURN public.loan_offer(p_discord_id);
END $$;

-- 👑 [Лидер] takes coins away from any member. They are not burned: the coins go to the earnings
-- role, the same one that collects losses, fees and loan interest. A removal never touches the
-- coin reserved for the borrower's next daily payment.
CREATE OR REPLACE FUNCTION public.remove_coins(p_discord_id TEXT, p_amount BIGINT, p_guild_id TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_balance BIGINT;
  v_take BIGINT;
  v_left BIGINT;
  v_reserve BIGINT;
  v_collected BIGINT := 0;
BEGIN
  IF p_amount IS NULL OR p_amount <= 0 THEN RAISE EXCEPTION 'INVALID_AMOUNT'; END IF;

  SELECT balance INTO v_balance FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'NO_USER'; END IF;

  v_reserve := public.loan_reserve(p_discord_id);
  v_take := LEAST(p_amount, GREATEST(COALESCE(v_balance, 0) - v_reserve, 0));
  IF v_take < 1 THEN RAISE EXCEPTION 'NOTHING_TO_REMOVE'; END IF;

  UPDATE public.users
     SET balance = balance - v_take, updated_at = NOW()
   WHERE discord_id = p_discord_id
  RETURNING balance INTO v_left;

  v_collected := public.distribute_earnings(v_take, p_guild_id);

  INSERT INTO public.logs (type, discord_id, amount, fee)
  VALUES ('coins_removed', p_discord_id, v_take, v_take);

  RETURN jsonb_build_object(
    'discord_id', p_discord_id,
    'removed', v_take,
    'balance', v_left,
    'reserve', v_reserve,
    'paid_to_role', v_collected
  );
END $$;

-- ─── Announcements (👑 configured by the leader in /alerts) ───
-- Defaults live here, not in the bot: a NULL field on a stored row means "use the default", so
-- changing the wording below reaches every guild that never touched the panel.
-- Variables a template may use: payout {count} {total} {source}; loan {user} {amount} {days}
-- {payment} (fires when a loan is issued); transfer {user} {target} {amount} {action};
-- upgrader {user} {amount} {mult} {bet}.
CREATE OR REPLACE FUNCTION public.get_alerts(p_guild_id TEXT)
RETURNS JSONB
LANGUAGE sql STABLE AS $$
  SELECT COALESCE(jsonb_object_agg(d.key, jsonb_build_object(
           'key', d.key,
           'label', d.label,
           'enabled', COALESCE(c.enabled, TRUE),
           'channel_id', COALESCE(c.channel_id, ''),
           'title', COALESCE(c.title, d.title),
           'template', COALESCE(c.template, d.template),
           'color', COALESCE(c.color, d.color),
           'mention', COALESCE(c.mention, 'none'),
           'default_title', d.title,
           'default_template', d.template,
           'default_color', d.color
         )), '{}'::jsonb)
    FROM (VALUES
      ('payout', '💸 Выплата зарплат'::TEXT, '⚡ СУТОЧНАЯ ВЫПЛАТА ЗАРПЛАТ [18:30]'::TEXT,
       E'Каждые 24 часа в **18:30** бот начисляет монеты по ролям активностей.\nВыплачено: **{count}** участников на **{total} 🪙**.\n{source}'::TEXT, '#00F0FF'::TEXT),
      ('loan', '🏦 Кредиты', '🏦 КРЕДИТ',
       '{user} взял кредит на {amount} 🪙 — {days} дней по {payment} 🪙 в день.', '#FFB020'),
      ('transfer', '💸 Переводы и покупки', '💸 ПЕРЕВОД',
       '{user} {action} {amount} 🪙 → {target}.', '#3BA55D'),
      ('upgrader', '🎰 Upgrader: крупные раздачи', '🎰 КРУПНАЯ РАЗДАЧА',
       '{user} сорвал {amount} 🪙 — множитель x{mult}, ставка {bet} 🪙!', '#EB459E')
    ) AS d(key, label, title, template, color)
    LEFT JOIN public.alert_config c
           ON c.alert_key = d.key AND c.guild_id = p_guild_id;
$$;

-- One field at a time: only the keys present in p_fields are written, an empty string clears a
-- field back to its default. Returns the whole (merged) config for the alert type.
CREATE OR REPLACE FUNCTION public.set_alert(p_guild_id TEXT, p_alert_key TEXT, p_fields JSONB)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_updated INT;
BEGIN
  IF p_alert_key IS NULL OR p_alert_key NOT IN ('payout', 'loan', 'transfer', 'upgrader') THEN
    RAISE EXCEPTION 'UNKNOWN_ALERT';
  END IF;
  IF p_fields IS NULL THEN p_fields := '{}'::jsonb; END IF;

  UPDATE public.alert_config
     SET enabled    = CASE WHEN p_fields -> 'enabled'    IS NOT NULL THEN (p_fields ->> 'enabled')::BOOLEAN ELSE enabled END,
         channel_id = CASE WHEN p_fields -> 'channel_id' IS NOT NULL THEN NULLIF(btrim(p_fields ->> 'channel_id'), '') ELSE channel_id END,
         title      = CASE WHEN p_fields -> 'title'      IS NOT NULL THEN NULLIF(btrim(p_fields ->> 'title'), '') ELSE title END,
         template   = CASE WHEN p_fields -> 'template'   IS NOT NULL THEN NULLIF(btrim(p_fields ->> 'template'), '') ELSE template END,
         color      = CASE WHEN p_fields -> 'color'      IS NOT NULL THEN NULLIF(btrim(p_fields ->> 'color'), '') ELSE color END,
         mention    = CASE WHEN p_fields -> 'mention'    IS NOT NULL THEN NULLIF(btrim(p_fields ->> 'mention'), '') ELSE mention END,
         updated_at = NOW()
   WHERE guild_id = p_guild_id AND alert_key = p_alert_key;
  GET DIAGNOSTICS v_updated = ROW_COUNT;

  IF v_updated = 0 THEN
    INSERT INTO public.alert_config (guild_id, alert_key, enabled, channel_id, title, template, color, mention)
    VALUES (p_guild_id, p_alert_key,
            CASE WHEN p_fields -> 'enabled' IS NOT NULL THEN (p_fields ->> 'enabled')::BOOLEAN END,
            NULLIF(btrim(p_fields ->> 'channel_id'), ''),
            NULLIF(btrim(p_fields ->> 'title'), ''),
            NULLIF(btrim(p_fields ->> 'template'), ''),
            NULLIF(btrim(p_fields ->> 'color'), ''),
            NULLIF(btrim(p_fields ->> 'mention'), ''));
  END IF;

  RETURN public.get_alerts(p_guild_id) -> p_alert_key;
END $$;

REVOKE EXECUTE ON FUNCTION public.add_balances(JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.upgrader_quota(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.bonus_costs(BIGINT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.buy_bonus_spin(TEXT, INT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.distribute_earnings(BIGINT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_guild_earnings_role(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_guild_salary_source(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_earnings_pool(TEXT, JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_activity(JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_guild_config(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pay_salaries(TEXT, JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_day_rate() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_schedule(BIGINT, BIGINT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_max_amount(BIGINT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_reserve(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.accrue_loans(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_offer(TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.take_loan(TEXT, BIGINT, INT, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.repay_loan(TEXT, BIGINT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.quota_day_start(TIMESTAMPTZ) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.quota_day_end(TIMESTAMPTZ) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.remove_coins(TEXT, BIGINT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_alerts(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_alert(TEXT, TEXT, JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.add_balances(JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.upgrader_quota(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.bonus_costs(BIGINT) TO service_role;
GRANT EXECUTE ON FUNCTION public.buy_bonus_spin(TEXT, INT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.distribute_earnings(BIGINT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.set_guild_earnings_role(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.set_guild_salary_source(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.sync_earnings_pool(TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.sync_activity(JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_guild_config(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.pay_salaries(TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_day_rate() TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_schedule(BIGINT, BIGINT) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_max_amount(BIGINT) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_reserve(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.accrue_loans(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_offer(TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.take_loan(TEXT, BIGINT, INT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.repay_loan(TEXT, BIGINT) TO service_role;
GRANT EXECUTE ON FUNCTION public.quota_day_start(TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION public.quota_day_end(TIMESTAMPTZ) TO service_role;
GRANT EXECUTE ON FUNCTION public.remove_coins(TEXT, BIGINT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_alerts(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.set_alert(TEXT, TEXT, JSONB) TO service_role;

NOTIFY pgrst, 'reload schema';
