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

-- One open loan per borrower. Interest is charged per whole day straight from the balance,
-- which is exactly what can push a borrower into the negative.
CREATE TABLE IF NOT EXISTS public.loans (
  id BIGSERIAL PRIMARY KEY,
  discord_id TEXT NOT NULL,
  guild_id TEXT,
  principal BIGINT NOT NULL,
  repaid BIGINT NOT NULL DEFAULT 0,
  interest_paid BIGINT NOT NULL DEFAULT 0,
  term TEXT NOT NULL CHECK (term IN ('week', 'month')),
  days_charged INT NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  due_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  closed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Upgrades for databases created with the previous schema
ALTER TABLE public.users ALTER COLUMN username DROP DEFAULT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bonus_spins INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bonus_expires_at TIMESTAMPTZ;
ALTER TABLE public.users ALTER COLUMN balance TYPE BIGINT;
UPDATE public.users SET balance = 0 WHERE balance IS NULL OR balance < 0;
ALTER TABLE public.users ALTER COLUMN balance SET NOT NULL;
ALTER TABLE public.logs ALTER COLUMN bet TYPE BIGINT;
ALTER TABLE public.logs ALTER COLUMN amount TYPE BIGINT;
ALTER TABLE public.logs ADD COLUMN IF NOT EXISTS fee BIGINT DEFAULT 0;
-- Loan interest is charged every day straight from the balance, so a borrower can end up in the
-- minus on purpose. The old non-negative check would block that.
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_balance_non_negative;

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
CREATE OR REPLACE FUNCTION public.transfer_coins(
  p_sender TEXT, p_target TEXT, p_pay BIGINT,
  p_sender_name TEXT DEFAULT NULL, p_target_name TEXT DEFAULT NULL, p_guild_id TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_fee BIGINT;
  v_recv BIGINT;
  v_collected BIGINT;
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

  UPDATE public.users
     SET balance = balance - p_pay, username = COALESCE(p_sender_name, username), updated_at = NOW()
   WHERE discord_id = p_sender AND balance >= p_pay
  RETURNING * INTO v_sender;
  IF NOT FOUND THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

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
    'fee_paid_out', v_collected
  );
END $$;

-- Upgrader round resolved entirely on the DB side: multiplier = 96 / chance (4% house edge).
-- Free quota: 3 rounds per rolling 24h; beyond that only a purchased bonus round can spin.
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
  v_window_start TIMESTAMPTZ := NOW() - INTERVAL '24 hours';
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

  UPDATE public.users
     SET balance = balance - p_bet + v_payout, updated_at = NOW()
   WHERE discord_id = p_discord_id AND balance >= p_bet
  RETURNING balance INTO v_balance;
  IF NOT FOUND THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

  IF NOT v_win THEN v_collected := distribute_earnings(p_bet, p_guild_id); END IF;

  INSERT INTO public.logs (type, is_win, "user", discord_id, avatar, bet, mult, amount, fee)
  VALUES ('upgrader_spin', v_win, p_username, p_discord_id, p_avatar, p_bet, v_mult, v_payout,
           CASE WHEN v_win THEN 0 ELSE p_bet END);

  RETURN jsonb_build_object('is_win', v_win, 'mult', v_mult, 'amount', v_payout,
    'balance', v_balance, 'bonus_used', v_bonus_used, 'loss_to_pool', CASE WHEN v_win THEN 0 ELSE p_bet END);
END $$;

-- Round state for the UI: free rounds left in the rolling 24h window and the bonus round price.
-- Bonus price: 1 round = 25% of balance, 2 = 45%, 3 = 60% (buying more is cheaper per round).
CREATE OR REPLACE FUNCTION public.upgrader_quota(p_discord_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_window_start TIMESTAMPTZ := NOW() - INTERVAL '24 hours';
  v_used INT := 0;
  v_oldest TIMESTAMPTZ;
  v_balance BIGINT := 0;
  v_bonus INT := 0;
  v_bonus_expires TIMESTAMPTZ;
  v_costs BIGINT[];
BEGIN
  SELECT COUNT(*), MIN(timestamp) INTO v_used, v_oldest FROM public.logs
   WHERE type = 'upgrader_spin' AND discord_id = p_discord_id AND timestamp >= v_window_start;

  SELECT balance, bonus_spins, bonus_expires_at INTO v_balance, v_bonus, v_bonus_expires
    FROM public.users WHERE discord_id = p_discord_id;

  IF v_bonus_expires IS NOT NULL AND v_bonus_expires <= NOW() THEN v_bonus := 0; END IF;

  v_costs := bonus_costs(COALESCE(v_balance, 0));

  RETURN jsonb_build_object(
    'limit', 3,
    'used', v_used,
    'left', GREATEST(0, 3 - v_used),
    'next_reset_at', COALESCE(v_oldest + INTERVAL '24 hours', NOW() + INTERVAL '24 hours'),
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

-- Sell p_count extra rounds; they all burn at the next quota reset.
DROP FUNCTION IF EXISTS public.buy_bonus_spin(TEXT);
CREATE OR REPLACE FUNCTION public.buy_bonus_spin(p_discord_id TEXT, p_count INT DEFAULT 1)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_window_start TIMESTAMPTZ := NOW() - INTERVAL '24 hours';
  v_balance BIGINT;
  v_used INT;
  v_oldest TIMESTAMPTZ;
  v_current_bonus INT;
  v_current_expires TIMESTAMPTZ;
  v_cost BIGINT;
  v_next_reset TIMESTAMPTZ;
BEGIN
  IF p_count IS NULL OR p_count < 1 OR p_count > 3 THEN RAISE EXCEPTION 'INVALID_COUNT'; END IF;

  SELECT balance, bonus_spins, bonus_expires_at INTO v_balance, v_current_bonus, v_current_expires
    FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'NO_USER'; END IF;

  SELECT COUNT(*), MIN(timestamp) INTO v_used, v_oldest FROM public.logs
   WHERE type = 'upgrader_spin' AND discord_id = p_discord_id AND timestamp >= v_window_start;
  IF v_used < 3 THEN RAISE EXCEPTION 'FREE_ROUNDS_LEFT'; END IF;

  v_cost := bonus_costs(v_balance)[p_count];
  v_next_reset := COALESCE(v_oldest + INTERVAL '24 hours', NOW() + INTERVAL '24 hours');

  UPDATE public.users
     SET balance = balance - v_cost,
         bonus_spins = (CASE WHEN v_current_expires > NOW() THEN v_current_bonus ELSE 0 END) + p_count,
         bonus_expires_at = v_next_reset,
         updated_at = NOW()
   WHERE discord_id = p_discord_id AND balance >= v_cost;
  IF NOT FOUND THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

  INSERT INTO public.logs (type, discord_id, amount)
  VALUES ('bonus_spin_purchase', p_discord_id, v_cost);

  RETURN upgrader_quota(p_discord_id) || jsonb_build_object('cost', v_cost, 'count', p_count);
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
-- Weekly loan: rate climbs by 1 p.p. every day (day 1 = 1%, day 7 = 7%, overdue days keep climbing) up to 15%.
-- Monthly loan: 0.5% a day while inside the term (cheaper than 1%), and once it is overdue the same
-- climbing ladder starts from 1%. Interest is always charged on the principal that is still owed.
CREATE OR REPLACE FUNCTION public.loan_day_rate(p_term TEXT, p_day INT)
RETURNS NUMERIC
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_term = 'month' AND p_day <= 30 THEN 0.5
    WHEN p_term = 'month' THEN LEAST((p_day - 30)::NUMERIC, 15)
    ELSE LEAST(p_day::NUMERIC, 15)
  END;
$$;

CREATE OR REPLACE FUNCTION public.loan_term_days(p_term TEXT)
RETURNS INT
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE WHEN p_term = 'month' THEN 30 ELSE 7 END;
$$;

-- Charge every whole day that passed since the last charge. Runs before any loan is read or touched,
-- so nobody needs a cron to see the honest number (the bot still ticks hourly).
CREATE OR REPLACE FUNCTION public.accrue_loans(p_discord_id TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  l RECORD;
  v_target INT;
  v_charge BIGINT;
  v_rate NUMERIC;
  v_owed BIGINT;
  v_loans INT := 0;
  v_interest BIGINT := 0;
  v_loan_interest BIGINT := 0;
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
    v_loan_interest := 0;

    WHILE l.days_charged < v_target LOOP
      l.days_charged := l.days_charged + 1;
      v_owed := GREATEST(l.principal - l.repaid, 0);
      IF v_owed > 0 THEN
        v_rate := public.loan_day_rate(l.term, l.days_charged);
        v_charge := FLOOR(v_owed * v_rate / 100)::BIGINT;
        IF v_charge > 0 THEN
          UPDATE public.users SET balance = balance - v_charge, updated_at = NOW() WHERE discord_id = l.discord_id;
          UPDATE public.loans
             SET days_charged = l.days_charged,
                 interest_paid = interest_paid + v_charge,
                 updated_at = NOW()
           WHERE id = l.id;
          INSERT INTO public.logs (type, discord_id, amount, fee)
          VALUES ('loan_interest', l.discord_id, v_charge, 0);
          v_paid_out := v_paid_out + public.distribute_earnings(v_charge, l.guild_id);
          v_loan_interest := v_loan_interest + v_charge;
        END IF;
      END IF;
    END LOOP;

    v_interest := v_interest + v_loan_interest;
    IF v_loan_interest > 0 THEN v_loans := v_loans + 1; END IF;
  END LOOP;

  RETURN jsonb_build_object('loans', v_loans, 'interest', v_interest, 'paid_to_role', v_paid_out);
END $$;

-- Full picture for one borrower: what they own, what they may borrow, and the open loan
CREATE OR REPLACE FUNCTION public.loan_offer(p_discord_id TEXT, p_username TEXT DEFAULT NULL, p_avatar TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_balance BIGINT;
  l public.loans;
  v_loan JSONB;
BEGIN
  PERFORM public.accrue_loans(p_discord_id);

  SELECT balance INTO v_balance FROM public.users WHERE discord_id = p_discord_id;
  v_balance := COALESCE(v_balance, 0);

  SELECT * INTO l FROM public.loans
   WHERE discord_id = p_discord_id AND status = 'active'
   ORDER BY id LIMIT 1;

  v_loan := NULL;
  IF FOUND THEN
    v_loan := jsonb_build_object(
      'id', l.id,
      'principal', l.principal,
      'repaid', l.repaid,
      'interest_paid', l.interest_paid,
      'term', l.term,
      'term_days', public.loan_term_days(l.term),
      'day', l.days_charged,
      'started_at', l.started_at,
      'due_at', l.due_at,
      'overdue', l.due_at < NOW(),
      'remaining', l.principal - l.repaid,
      'day_rate', public.loan_day_rate(l.term, l.days_charged + 1),
      'next_charge_at', l.started_at + ((l.days_charged + 1) || ' days')::INTERVAL
    );
  END IF;

  RETURN jsonb_build_object(
    'discord_id', p_discord_id,
    'balance', v_balance,
    'can_borrow', CASE WHEN v_balance >= 100 AND v_loan IS NULL THEN GREATEST(v_balance * 2, 0) ELSE 0 END,
    'max_borrow', GREATEST(v_balance * 2, 0),
    'min_amount', 100,
    'loan', v_loan,
    'week_rate_preview', public.loan_rate_preview('week'),
    'month_rate_preview', public.loan_rate_preview('month')
  );
END $$;

-- "Сколько придётся заплатить" табличка для интерфейса и команд
CREATE OR REPLACE FUNCTION public.loan_rate_preview(p_term TEXT)
RETURNS JSONB
LANGUAGE sql AS $$
  SELECT jsonb_build_object(
    'term', p_term,
    'term_days', public.loan_term_days(p_term),
    'daily', public.loan_day_rate(p_term, 1),
    'total_percent', CASE
      WHEN p_term = 'month' THEN 30 * 0.5
      ELSE (SELECT SUM(public.loan_day_rate('week', d)) FROM generate_series(1, 7) d)
    END
  );
$$;

CREATE OR REPLACE FUNCTION public.take_loan(
  p_discord_id TEXT, p_amount BIGINT, p_term TEXT,
  p_username TEXT DEFAULT NULL, p_avatar TEXT DEFAULT NULL, p_guild_id TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_balance BIGINT;
  v_existing INT;
BEGIN
  PERFORM public.accrue_loans(p_discord_id);

  IF p_term NOT IN ('week', 'month') THEN RAISE EXCEPTION 'INVALID_TERM'; END IF;
  IF p_amount IS NULL OR p_amount < 100 THEN RAISE EXCEPTION 'INVALID_LOAN_AMOUNT'; END IF;

  INSERT INTO public.users (discord_id, username, avatar)
  VALUES (p_discord_id, p_username, p_avatar)
  ON CONFLICT (discord_id) DO NOTHING;

  SELECT balance INTO v_balance FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  IF v_balance < 100 THEN RAISE EXCEPTION 'LOAN_TOO_POOR'; END IF;

  SELECT COUNT(*) INTO v_existing FROM public.loans WHERE discord_id = p_discord_id AND status = 'active';
  IF v_existing > 0 THEN RAISE EXCEPTION 'LOAN_ACTIVE'; END IF;

  IF p_amount > v_balance * 2 THEN RAISE EXCEPTION 'LOAN_LIMIT'; END IF;

  UPDATE public.users
     SET balance = balance + p_amount,
         username = COALESCE(p_username, username),
         avatar = COALESCE(p_avatar, avatar),
         updated_at = NOW()
   WHERE discord_id = p_discord_id;

  INSERT INTO public.loans (discord_id, guild_id, principal, term, due_at)
  VALUES (p_discord_id, p_guild_id, p_amount, p_term, NOW() + (public.loan_term_days(p_term) || ' days')::INTERVAL);

  INSERT INTO public.logs (type, discord_id, amount)
  VALUES ('loan_taken', p_discord_id, p_amount);

  RETURN public.loan_offer(p_discord_id);
END $$;

-- Pay back by hand: only from the current balance, never deeper into the minus, and only the
-- principal. Once the principal is covered the loan closes and interest stops.
CREATE OR REPLACE FUNCTION public.repay_loan(p_discord_id TEXT, p_amount BIGINT)
RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  l public.loans;
  v_balance BIGINT;
  v_pay BIGINT;
BEGIN
  PERFORM public.accrue_loans(p_discord_id);

  IF p_amount IS NULL OR p_amount <= 0 THEN RAISE EXCEPTION 'INVALID_AMOUNT'; END IF;

  SELECT * INTO l FROM public.loans
   WHERE discord_id = p_discord_id AND status = 'active'
   ORDER BY id LIMIT 1 FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'NO_LOAN'; END IF;

  SELECT balance INTO v_balance FROM public.users WHERE discord_id = p_discord_id FOR UPDATE;
  v_pay := LEAST(p_amount, l.principal - l.repaid, COALESCE(v_balance, 0));
  IF v_pay < 1 THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

  UPDATE public.users SET balance = balance - v_pay, updated_at = NOW() WHERE discord_id = p_discord_id;

  UPDATE public.loans
     SET repaid = repaid + v_pay,
         status = CASE WHEN repaid + v_pay >= principal THEN 'closed' ELSE 'active' END,
         closed_at = CASE WHEN repaid + v_pay >= principal THEN NOW() ELSE closed_at END,
         updated_at = NOW()
   WHERE id = l.id;

  INSERT INTO public.logs (type, discord_id, amount)
  VALUES ('loan_repaid', p_discord_id, v_pay);

  RETURN public.loan_offer(p_discord_id);
END $$;

REVOKE EXECUTE ON FUNCTION public.add_balances(JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.upgrader_quota(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.bonus_costs(BIGINT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.buy_bonus_spin(TEXT, INT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.distribute_earnings(BIGINT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_guild_earnings_role(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_guild_salary_source(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_earnings_pool(TEXT, JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_guild_config(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pay_salaries(TEXT, JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_day_rate(TEXT, INT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_term_days(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_rate_preview(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.accrue_loans(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.loan_offer(TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.take_loan(TEXT, BIGINT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.repay_loan(TEXT, BIGINT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.add_balances(JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.upgrader_quota(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.bonus_costs(BIGINT) TO service_role;
GRANT EXECUTE ON FUNCTION public.buy_bonus_spin(TEXT, INT) TO service_role;
GRANT EXECUTE ON FUNCTION public.distribute_earnings(BIGINT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.set_guild_earnings_role(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.set_guild_salary_source(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.sync_earnings_pool(TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_guild_config(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.pay_salaries(TEXT, JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_day_rate(TEXT, INT) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_term_days(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_rate_preview(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.accrue_loans(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.loan_offer(TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.take_loan(TEXT, BIGINT, TEXT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.repay_loan(TEXT, BIGINT) TO service_role;

NOTIFY pgrst, 'reload schema';
