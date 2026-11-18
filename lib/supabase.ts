import { createClient } from '@supabase/supabase-js'

function cleanEnv(value?: string) {
  return (value ?? '')
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/\\n$/g, '')
    .trim()
}

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseServiceRoleKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY)

// Server-side client with service role key (bypasses RLS, for logging and leads)
// Returns null if env vars are missing, so callers can skip or fail gracefully
export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null
