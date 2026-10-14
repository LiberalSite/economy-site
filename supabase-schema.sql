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

-- Upgrades for databases created with the previous schema
ALTER TABLE public.users ALTER COLUMN username DROP DEFAULT;
ALTER TABLE public.users ALTER COLUMN balance TYPE BIGINT;
UPDATE public.users SET balance = 0 WHERE balance IS NULL OR balance < 0;
ALTER TABLE public.users ALTER COLUMN balance SET NOT NULL;
ALTER TABLE public.logs ALTER COLUMN bet TYPE BIGINT;
ALTER TABLE public.logs ALTER COLUMN amount TYPE BIGINT;
DO $$ BEGIN
  ALTER TABLE public.users ADD CONSTRAINT users_balance_non_negative CHECK (balance >= 0);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_users_balance ON public.users(balance DESC);
CREATE INDEX IF NOT EXISTS idx_logs_type_ts ON public.logs(type, timestamp DESC);

-- Lock down: RLS on, no policies → only service_role (which bypasses RLS) can touch data
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_payouts ENABLE ROW LEVEL SECURITY;
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

CREATE OR REPLACE FUNCTION public.transfer_coins(
  p_sender TEXT, p_target TEXT, p_amount BIGINT,
  p_sender_name TEXT DEFAULT NULL, p_target_name TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_sender public.users;
  v_target public.users;
BEGIN
  IF p_amount IS NULL OR p_amount <= 0 THEN RAISE EXCEPTION 'INVALID_AMOUNT'; END IF;
  IF p_sender = p_target THEN RAISE EXCEPTION 'SELF_TRANSFER'; END IF;

  INSERT INTO public.users (discord_id, username) VALUES (p_target, p_target_name)
  ON CONFLICT (discord_id) DO NOTHING;

  -- lock both rows in a stable order so concurrent transfers can't deadlock
  PERFORM 1 FROM public.users WHERE discord_id IN (p_sender, p_target) ORDER BY discord_id FOR UPDATE;

  UPDATE public.users
     SET balance = balance - p_amount, username = COALESCE(p_sender_name, username), updated_at = NOW()
   WHERE discord_id = p_sender AND balance >= p_amount
  RETURNING * INTO v_sender;
  IF NOT FOUND THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

  UPDATE public.users
     SET balance = balance + p_amount, username = COALESCE(p_target_name, username), updated_at = NOW()
   WHERE discord_id = p_target
  RETURNING * INTO v_target;

  INSERT INTO public.logs (type, sender_id, target_id, sender_name, target_name, amount)
  VALUES ('transfer', p_sender, p_target, v_sender.username, v_target.username, p_amount);

  RETURN jsonb_build_object('sender_balance', v_sender.balance, 'target_balance', v_target.balance);
END $$;

-- Upgrader round resolved entirely on the DB side: multiplier = 96 / chance (4% house edge).
CREATE OR REPLACE FUNCTION public.upgrader_spin(
  p_discord_id TEXT, p_bet BIGINT, p_chance NUMERIC,
  p_username TEXT DEFAULT NULL, p_avatar TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql AS $$
DECLARE
  v_mult NUMERIC;
  v_win BOOLEAN;
  v_payout BIGINT;
  v_balance BIGINT;
BEGIN
  IF p_bet IS NULL OR p_bet < 1 THEN RAISE EXCEPTION 'INVALID_BET'; END IF;
  IF p_chance IS NULL OR p_chance < 1 OR p_chance > 90 THEN RAISE EXCEPTION 'INVALID_CHANCE'; END IF;

  v_mult := ROUND(96 / p_chance, 2);
  v_win := random() * 100 < p_chance;
  v_payout := CASE WHEN v_win THEN FLOOR(p_bet * v_mult)::BIGINT ELSE 0 END;

  UPDATE public.users
     SET balance = balance - p_bet + v_payout, updated_at = NOW()
   WHERE discord_id = p_discord_id AND balance >= p_bet
  RETURNING balance INTO v_balance;
  IF NOT FOUND THEN RAISE EXCEPTION 'INSUFFICIENT_FUNDS'; END IF;

  INSERT INTO public.logs (type, is_win, "user", discord_id, avatar, bet, mult, amount)
  VALUES ('upgrader_spin', v_win, p_username, p_discord_id, p_avatar, p_bet, v_mult, v_payout);

  RETURN jsonb_build_object('is_win', v_win, 'mult', v_mult, 'amount', v_payout, 'balance', v_balance);
END $$;

REVOKE EXECUTE ON FUNCTION public.add_balances(JSONB) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.add_balances(JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION public.transfer_coins(TEXT, TEXT, BIGINT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.upgrader_spin(TEXT, BIGINT, NUMERIC, TEXT, TEXT) TO service_role;

NOTIFY pgrst, 'reload schema';
