import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function cleanEnv(value?: string) {
  return (value ?? "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n$/g, "")
    .trim();
}

/** Client for the FIXXIT Pros recruiting applications table (not the original customer-site project). */
export function getRecruitingSupabase() {
  const url = cleanEnv(process.env.FIXXIT_RECRUITING_SUPABASE_URL);
  const key = cleanEnv(process.env.FIXXIT_RECRUITING_SUPABASE_ANON_KEY);
  if (!url || !key) {
    throw new Error("Missing FIXXIT_RECRUITING_SUPABASE_URL or FIXXIT_RECRUITING_SUPABASE_ANON_KEY");
  }
  return createClient(url, key);
}

/** Same project as recruiting, used for chat leads, photos, and conversation logs. */
export function getChatSupabase(): SupabaseClient | null {
  const url = cleanEnv(process.env.FIXXIT_RECRUITING_SUPABASE_URL);
  const key = cleanEnv(process.env.FIXXIT_RECRUITING_SUPABASE_ANON_KEY);
  if (!url || !key) return null;
  return createClient(url, key);
}
