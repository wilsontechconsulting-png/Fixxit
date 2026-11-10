import { createClient } from "@supabase/supabase-js";

/** Client for the FIXXIT Pros recruiting applications table (not the customer-site Supabase project). */
export function getRecruitingSupabase() {
  const url = process.env.FIXXIT_RECRUITING_SUPABASE_URL;
  const key = process.env.FIXXIT_RECRUITING_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing FIXXIT_RECRUITING_SUPABASE_URL or FIXXIT_RECRUITING_SUPABASE_ANON_KEY");
  }
  return createClient(url, key);
}
