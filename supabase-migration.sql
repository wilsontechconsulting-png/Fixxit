-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/bzbjevprcmnuvnehisij/sql

CREATE TABLE IF NOT EXISTS chat_conversations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  session_id text,
  role       text,
  content    text,
  metadata   jsonb
);
