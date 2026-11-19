import { getChatSupabase } from '@/lib/join-supabase'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type PhotoAnalysis = {
  description: string
  trade: string
  urgency: string
  safety_note?: string
  confidence: string
}

export type ChatLead = {
  id: string
  session_id: string
  first_name: string
  last_name: string
  phone: string
  email: string
  trade_category: string | null
  urgency: string | null
  confidence: string | null
  analysis: PhotoAnalysis | PhotoAnalysis[] | null
  photo_paths: string[]
  sms_consent: boolean
}

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function validateLeadInput(input: {
  first_name?: string
  last_name?: string
  phone?: string
  email?: string
  honeypot?: string
}): { ok: true; first_name: string; last_name: string; phone: string; email: string } | { ok: false; error: string; status: number } {
  if (input.honeypot && input.honeypot.trim()) {
    return { ok: false, error: 'Unable to submit. Please try again.', status: 400 }
  }
  const first_name = (input.first_name ?? '').trim()
  const last_name = (input.last_name ?? '').trim()
  const email = (input.email ?? '').trim()
  const phone = (input.phone ?? '').trim()
  if (!first_name || !last_name || !email || !phone) {
    return { ok: false, error: 'First name, last name, phone, and email are required.', status: 400 }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.', status: 400 }
  }
  if (digitsOnly(phone).length < 10) {
    return { ok: false, error: 'Please enter a phone number with at least 10 digits.', status: 400 }
  }
  if (first_name.length > 80 || last_name.length > 80 || email.length > 200 || phone.length > 40) {
    return { ok: false, error: 'Please shorten the contact details and try again.', status: 400 }
  }
  return { ok: true, first_name, last_name, phone, email }
}

function rowToLead(row: Record<string, unknown>): ChatLead {
  const paths = row.photo_paths
  return {
    id: String(row.id),
    session_id: String(row.session_id),
    first_name: String(row.first_name ?? ''),
    last_name: String(row.last_name ?? ''),
    phone: String(row.phone ?? ''),
    email: String(row.email ?? ''),
    trade_category: (row.trade_category as string) ?? null,
    urgency: (row.urgency as string) ?? null,
    confidence: (row.confidence as string) ?? null,
    analysis: (row.analysis as ChatLead['analysis']) ?? null,
    photo_paths: Array.isArray(paths) ? paths.map(String) : [],
    sms_consent: row.sms_consent === true,
  }
}

export async function createLead(input: {
  session_id: string
  first_name: string
  last_name: string
  phone: string
  email: string
  user_agent?: string
  referer?: string
  sms_consent?: boolean
}): Promise<ChatLead> {
  const supabase = getChatSupabase()
  if (!supabase) throw new Error('Chat storage is not configured')
  const { data, error } = await supabase.rpc('create_chat_lead', {
    p_session_id: input.session_id,
    p_first_name: input.first_name,
    p_last_name: input.last_name,
    p_phone: input.phone,
    p_email: input.email,
    p_user_agent: input.user_agent || null,
    p_referer: input.referer || null,
    p_sms_consent: input.sms_consent === true,
  })
  if (error || !data) throw error || new Error('Could not save contact details')
  return rowToLead(data as Record<string, unknown>)
}

export async function getLeadBySession(sessionId: string): Promise<ChatLead | null> {
  const supabase = getChatSupabase()
  if (!supabase || !sessionId) return null
  const { data, error } = await supabase.rpc('get_chat_lead', { p_session_id: sessionId })
  if (error) {
    console.error('get chat lead failed')
    return null
  }
  if (!data) return null
  return rowToLead(data as Record<string, unknown>)
}

export async function requireLead(sessionId: unknown): Promise<ChatLead | { error: string; status: number }> {
  if (typeof sessionId !== 'string' || !sessionId.trim()) {
    return { error: 'Please share your contact details first.', status: 401 }
  }
  const lead = await getLeadBySession(sessionId.trim())
  if (!lead) return { error: 'Please share your contact details first.', status: 401 }
  return lead
}

export function isLead(value: ChatLead | { error: string; status: number }): value is ChatLead {
  return !('error' in value)
}

export async function updateLeadAnalysis(
  lead: ChatLead,
  update: {
    trade_category: string
    urgency: string
    confidence: string
    analysis: PhotoAnalysis
    photo_paths: string[]
  },
): Promise<ChatLead> {
  const supabase = getChatSupabase()
  if (!supabase) throw new Error('Chat storage is not configured')
  const { data, error } = await supabase.rpc('update_chat_lead_analysis', {
    p_session_id: lead.session_id,
    p_trade_category: update.trade_category,
    p_urgency: update.urgency,
    p_confidence: update.confidence,
    p_analysis: update.analysis,
    p_photo_paths: update.photo_paths,
  })
  if (error || !data) throw error || new Error('Could not save photo analysis')
  return rowToLead(data as Record<string, unknown>)
}

export function analysisContext(lead: ChatLead): string {
  const items = Array.isArray(lead.analysis) ? lead.analysis : lead.analysis ? [lead.analysis] : []
  if (!items.length) return ''
  const blocks = items.map((item, i) => {
    const safety = item.safety_note ? `Safety note: ${item.safety_note}` : 'Safety note: none'
    return [
      `Photo review ${items.length > 1 ? i + 1 : ''}`.trim() + ':',
      `Description: ${item.description}`,
      `Trade: ${item.trade}`,
      `Urgency: ${item.urgency}`,
      `Confidence: ${item.confidence}`,
      safety,
    ].join('\n')
  })
  return [
    '',
    'The visitor uploaded photo(s). Use this preliminary analysis as context. It is not a diagnosis and a pro will confirm. Do not invent prices or guarantees.',
    '',
    blocks.join('\n\n'),
  ].join('\n')
}

export async function logChatMessage(
  sessionId: string,
  role: string,
  content: string,
  metadata: Record<string, unknown>,
) {
  const supabase = getChatSupabase()
  if (!supabase) return
  try {
    const { error } = await supabase
      .from('chat_conversations')
      .insert({ session_id: sessionId, role, content, metadata })
    if (error) console.error('Chat log error')
  } catch {
    console.error('Chat log error')
  }
}
