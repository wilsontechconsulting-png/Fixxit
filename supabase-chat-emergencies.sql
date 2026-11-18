-- Applied 2026-11-17 as migration chat_emergencies on project regeiengexiltiqdnewh
-- RLS is enabled with no direct policies. The Next.js server inserts through
-- the SECURITY DEFINER RPC create_chat_emergency, using the same recruiting
-- anon key as other chat writes.

CREATE TABLE IF NOT EXISTS public.chat_emergencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  lead_id uuid NOT NULL REFERENCES public.chat_leads(id),
  session_id text NOT NULL,
  emergency_type text NOT NULL,
  phone text NOT NULL,
  note text,
  photo_triage jsonb
);

CREATE INDEX IF NOT EXISTS chat_emergencies_lead_id_idx ON public.chat_emergencies (lead_id);
CREATE INDEX IF NOT EXISTS chat_emergencies_created_at_idx ON public.chat_emergencies (created_at);
CREATE INDEX IF NOT EXISTS chat_emergencies_session_id_idx ON public.chat_emergencies (session_id);

ALTER TABLE public.chat_emergencies ENABLE ROW LEVEL SECURITY;


-- Applied 2026-11-17 as migration chat_emergencies_call_status.
-- Adds call_status, call_control_ids, call_event_ids, and RPCs
-- get_chat_emergency, lead_has_recent_emergency_call, and update_chat_emergency_call.
