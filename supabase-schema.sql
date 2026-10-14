-- Create users table for economy
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  discord_id TEXT UNIQUE NOT NULL,
  username TEXT DEFAULT 'User',
  avatar TEXT,
  balance INTEGER DEFAULT 0,
  last_daily BIGINT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create logs table for transfers and upgrader spins
CREATE TABLE IF NOT EXISTS logs (
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
  bet INTEGER DEFAULT 0,
  mult REAL DEFAULT 1,
  amount INTEGER DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security but allow all for anon key
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for logs" ON logs FOR ALL USING (true) WITH CHECK (true);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_discord_id ON users(discord_id);
CREATE INDEX IF NOT EXISTS idx_logs_type ON logs(type);
