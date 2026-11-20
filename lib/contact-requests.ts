import { getChatSupabase } from '@/lib/join-supabase'

/** Exact SMS consent wording shown next to the optional checkbox on the contact and quote forms. */
export const SMS_CONSENT_TEXT =
  'Optional: Yes, I agree to receive text messages from FIXXIT Pros about my service request at the phone number provided. Message frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. Consent is not a condition of purchase. See our Privacy Policy and Terms.'

export type ContactRequest = {
  id: string
  source: string
  first_name: string
  last_name: string | null
  phone: string | null
  email: string
  zip: string | null
  service: string | null
  message: string | null
  sms_consent: boolean
}

export async function createContactRequest(input: {
  source: string
  first_name: string
  last_name?: string
  phone?: string
  email: string
  zip?: string
  service?: string
  message?: string
  sms_consent: boolean
  user_agent?: string
  referer?: string
}): Promise<ContactRequest> {
  const supabase = getChatSupabase()
  if (!supabase) throw new Error('Storage is not configured')
  const { data, error } = await supabase.rpc('create_contact_request', {
    p_source: input.source,
    p_first_name: input.first_name,
    p_last_name: input.last_name || null,
    p_phone: input.phone || null,
    p_email: input.email,
    p_zip: input.zip || null,
    p_service: input.service || null,
    p_message: input.message || null,
    p_sms_consent: input.sms_consent,
    p_sms_consent_text: input.sms_consent ? SMS_CONSENT_TEXT : null,
    p_user_agent: input.user_agent || null,
    p_referer: input.referer || null,
  })
  if (error || !data) throw error || new Error('Could not save request')
  const row = data as Record<string, unknown>
  return {
    id: String(row.id),
    source: String(row.source ?? ''),
    first_name: String(row.first_name ?? ''),
    last_name: (row.last_name as string) ?? null,
    phone: (row.phone as string) ?? null,
    email: String(row.email ?? ''),
    zip: (row.zip as string) ?? null,
    service: (row.service as string) ?? null,
    message: (row.message as string) ?? null,
    sms_consent: row.sms_consent === true,
  }
}
