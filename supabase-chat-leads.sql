-- Applied 2026-11-17 as migration chat_leads_and_photos on project regeiengexiltiqdnewh
-- (the original chat project bzbjevprcmnuvnehisij no longer resolves).
-- That migration also added SECURITY DEFINER RPCs create_chat_lead, get_chat_lead,
-- and update_chat_lead_analysis, plus anon INSERT policies for chat_conversations
-- and storage.objects (bucket chat-photos only).
--
-- Chat leads, RLS, and private photo bucket
-- Apply on the same project as chat_conversations:
-- https://supabase.com/dashboard/project/bzbjevprcmnuvnehisij/sql
--
-- RLS is enabled with no policies, so anon/authenticated clients cannot
-- read or write rows. The Next.js server writes with the service role,
-- which bypasses RLS. The chat-photos bucket is private; only the
-- service role can create signed URLs.

CREATE TABLE IF NOT EXISTS chat_conversations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  session_id text,
  role       text,
  content    text,
  metadata   jsonb
);

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS chat_leads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now(),
  session_id      text UNIQUE NOT NULL,
  first_name      text NOT NULL,
  last_name       text NOT NULL,
  phone           text NOT NULL,
  email           text NOT NULL,
  trade_category  text,
  urgency         text,
  confidence      text,
  analysis        jsonb,
  photo_paths     text[] NOT NULL DEFAULT '{}',
  user_agent      text,
  referer         text
);

CREATE INDEX IF NOT EXISTS chat_leads_session_id_idx ON chat_leads (session_id);
CREATE INDEX IF NOT EXISTS chat_leads_created_at_idx ON chat_leads (created_at);

ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chat-photos',
  'chat-photos',
  false,
  5242880,
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic','image/heif']
)
ON CONFLICT (id) DO NOTHING;
