-- ====================================================================
-- FAZENN CAMPAIGN 2026: SUPABASE DATABASE SCHEMA
-- Вставьте этот скрипт в SQL Editor на https://supabase.com
-- ====================================================================

-- 1. Таблица участников и баланса
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    discord_id TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    avatar_url TEXT,
    role_tag TEXT DEFAULT '@[act+4]',
    balance BIGINT DEFAULT 1000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Таблица истории транзакций и апгрейдов
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    discord_id TEXT NOT NULL REFERENCES public.users(discord_id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'DAILY_SALARY', 'UPGRADER_WIN', 'UPGRADER_LOSS', 'TRANSFER'
    amount BIGINT NOT NULL,
    multiplier NUMERIC(5,2),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Таблица истории ежедневных выплат зарплат (каждые 24ч)
CREATE TABLE IF NOT EXISTS public.salary_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    discord_id TEXT NOT NULL,
    role_tag TEXT NOT NULL,
    payout_amount INT NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Включение Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_logs ENABLE ROW LEVEL SECURITY;

-- Публичные политики на чтение и запись через Anon Key
CREATE POLICY "Public Read Users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public Insert Users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Public Read Transactions" ON public.transactions FOR SELECT USING (true);
CREATE POLICY "Public Insert Transactions" ON public.transactions FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Salary Logs" ON public.salary_logs FOR SELECT USING (true);
CREATE POLICY "Public Insert Salary Logs" ON public.salary_logs FOR INSERT WITH CHECK (true);
