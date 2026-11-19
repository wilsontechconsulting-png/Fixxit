-- Optional SMS consent (10DLC). Applied to project regeiengexiltiqdnewh on 2026-11-19 as migration chat_sms_consent.
ALTER TABLE public.chat_leads ADD COLUMN IF NOT EXISTS sms_consent boolean NOT NULL DEFAULT false, ADD COLUMN IF NOT EXISTS sms_consent_at timestamptz;
ALTER TABLE public.chat_emergencies ADD COLUMN IF NOT EXISTS sms_consent boolean NOT NULL DEFAULT false, ADD COLUMN IF NOT EXISTS sms_consent_at timestamptz;
-- create_chat_lead(..., p_sms_consent boolean DEFAULT false) and
-- create_chat_emergency(..., p_sms_consent boolean DEFAULT false) store the flag and set sms_consent_at = now() when true.
-- Execute is granted to anon, authenticated, service_role, matching the previous versions.
