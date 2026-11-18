-- Applied on project regeiengexiltiqdnewh as migration call_logs.
-- RLS is enabled with no direct table policies. The Next.js server
-- writes through the SECURITY DEFINER RPC upsert_call_log, using the
-- same recruiting anon key as other chat writes.

CREATE TABLE IF NOT EXISTS public.call_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  conversation_id text,
  call_control_id text,
  category text,
  caller_name text,
  caller_number text,
  callback_number text,
  zip text,
  address text,
  issue text,
  summary text,
  recording_url text,
  transcript jsonb,
  insights jsonb,
  source text,
  event_type text,
  last_notify_kind text,
  last_notified_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS call_logs_conversation_id_uidx
  ON public.call_logs (conversation_id)
  WHERE conversation_id IS NOT NULL AND btrim(conversation_id) <> '';

CREATE INDEX IF NOT EXISTS call_logs_created_at_idx ON public.call_logs (created_at);
CREATE INDEX IF NOT EXISTS call_logs_caller_number_idx ON public.call_logs (caller_number);
CREATE INDEX IF NOT EXISTS call_logs_call_control_id_idx ON public.call_logs (call_control_id);

ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.upsert_call_log(
  p_id uuid DEFAULT NULL,
  p_conversation_id text DEFAULT NULL,
  p_call_control_id text DEFAULT NULL,
  p_category text DEFAULT NULL,
  p_caller_name text DEFAULT NULL,
  p_caller_number text DEFAULT NULL,
  p_callback_number text DEFAULT NULL,
  p_zip text DEFAULT NULL,
  p_address text DEFAULT NULL,
  p_issue text DEFAULT NULL,
  p_summary text DEFAULT NULL,
  p_recording_url text DEFAULT NULL,
  p_transcript jsonb DEFAULT NULL,
  p_insights jsonb DEFAULT NULL,
  p_source text DEFAULT NULL,
  p_event_type text DEFAULT NULL,
  p_notify_kind text DEFAULT NULL
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  existing public.call_logs%ROWTYPE;
  result jsonb;
  v_conversation_id text := NULLIF(btrim(COALESCE(p_conversation_id, '')), '');
  v_call_control_id text := NULLIF(btrim(COALESCE(p_call_control_id, '')), '');
  v_category text := NULLIF(btrim(COALESCE(p_category, '')), '');
  v_caller_name text := NULLIF(left(btrim(COALESCE(p_caller_name, '')), 200), '');
  v_caller_number text := NULLIF(left(btrim(COALESCE(p_caller_number, '')), 40), '');
  v_callback_number text := NULLIF(left(btrim(COALESCE(p_callback_number, '')), 40), '');
  v_zip text := NULLIF(left(btrim(COALESCE(p_zip, '')), 20), '');
  v_address text := NULLIF(left(btrim(COALESCE(p_address, '')), 300), '');
  v_issue text := NULLIF(left(btrim(COALESCE(p_issue, '')), 4000), '');
  v_summary text := NULLIF(left(btrim(COALESCE(p_summary, '')), 8000), '');
  v_recording_url text := NULLIF(left(btrim(COALESCE(p_recording_url, '')), 2000), '');
  v_source text := NULLIF(left(btrim(COALESCE(p_source, '')), 80), '');
  v_event_type text := NULLIF(left(btrim(COALESCE(p_event_type, '')), 120), '');
  v_notify_kind text := NULLIF(left(btrim(COALESCE(p_notify_kind, '')), 80), '');
BEGIN
  IF p_id IS NOT NULL THEN
    SELECT * INTO existing FROM public.call_logs WHERE id = p_id;
  END IF;

  IF existing.id IS NULL AND v_conversation_id IS NOT NULL THEN
    SELECT * INTO existing FROM public.call_logs WHERE conversation_id = v_conversation_id;
  END IF;

  IF existing.id IS NULL AND v_call_control_id IS NOT NULL THEN
    SELECT * INTO existing FROM public.call_logs
    WHERE call_control_id = v_call_control_id
    ORDER BY created_at DESC
    LIMIT 1;
  END IF;

  IF existing.id IS NOT NULL THEN
    UPDATE public.call_logs
    SET
      updated_at = now(),
      conversation_id = COALESCE(v_conversation_id, conversation_id),
      call_control_id = COALESCE(v_call_control_id, call_control_id),
      category = COALESCE(v_category, category),
      caller_name = COALESCE(v_caller_name, caller_name),
      caller_number = COALESCE(v_caller_number, caller_number),
      callback_number = COALESCE(v_callback_number, callback_number),
      zip = COALESCE(v_zip, zip),
      address = COALESCE(v_address, address),
      issue = COALESCE(v_issue, issue),
      summary = COALESCE(v_summary, summary),
      recording_url = COALESCE(v_recording_url, recording_url),
      transcript = COALESCE(p_transcript, transcript),
      insights = COALESCE(p_insights, insights),
      source = COALESCE(v_source, source),
      event_type = COALESCE(v_event_type, event_type),
      last_notify_kind = COALESCE(v_notify_kind, last_notify_kind),
      last_notified_at = CASE WHEN v_notify_kind IS NOT NULL THEN now() ELSE last_notified_at END
    WHERE id = existing.id
    RETURNING to_jsonb(public.call_logs.*) INTO result;
    RETURN result;
  END IF;

  INSERT INTO public.call_logs (
    conversation_id, call_control_id, category, caller_name, caller_number,
    callback_number, zip, address, issue, summary, recording_url, transcript,
    insights, source, event_type, last_notify_kind, last_notified_at
  ) VALUES (
    v_conversation_id, v_call_control_id, v_category, v_caller_name, v_caller_number,
    v_callback_number, v_zip, v_address, v_issue, v_summary, v_recording_url, p_transcript,
    p_insights, v_source, v_event_type, v_notify_kind,
    CASE WHEN v_notify_kind IS NOT NULL THEN now() ELSE NULL END
  )
  RETURNING to_jsonb(public.call_logs.*) INTO result;

  RETURN result;
END;
$function$;

REVOKE ALL ON FUNCTION public.upsert_call_log(
  uuid, text, text, text, text, text, text, text, text, text, text, text, jsonb, jsonb, text, text, text
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_call_log(
  uuid, text, text, text, text, text, text, text, text, text, text, text, jsonb, jsonb, text, text, text
) TO anon, authenticated, service_role;
