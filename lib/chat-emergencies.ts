import { getChatSupabase } from '@/lib/join-supabase'
import type { ChatLead, PhotoAnalysis } from '@/lib/chat-leads'
import { digitsOnly } from '@/lib/chat-leads'
import { isEmergencyType, type EmergencyTypeId } from '@/lib/emergency-types'

export type ChatEmergency = {
  id: string
  created_at?: string
  lead_id: string
  session_id: string
  emergency_type: EmergencyTypeId
  phone: string
  note: string | null
  photo_triage: PhotoAnalysis | PhotoAnalysis[] | null
  sms_consent: boolean
  first_name?: string
  last_name?: string
  call_status?: string | null
  call_control_ids?: Record<string, string>
  already_processed?: boolean
}

export function validateEmergencyInput(input: {
  emergency_type?: unknown
  phone?: unknown
  note?: unknown
}): { ok: true; emergency_type: EmergencyTypeId; phone: string; note: string } | { ok: false; error: string; status: number } {
  const emergency_type = typeof input.emergency_type === 'string' ? input.emergency_type.trim() : ''
  const phone = typeof input.phone === 'string' ? input.phone.trim() : ''
  const note = typeof input.note === 'string' ? input.note.trim() : ''

  if (!isEmergencyType(emergency_type)) {
    return { ok: false, error: 'Please choose an emergency type.', status: 400 }
  }
  if (!phone || digitsOnly(phone).length < 10) {
    return { ok: false, error: 'Please enter a phone number with at least 10 digits.', status: 400 }
  }
  if (phone.length > 40) {
    return { ok: false, error: 'Please shorten the phone number and try again.', status: 400 }
  }
  if (note.length > 500) {
    return { ok: false, error: 'Please keep the note under 500 characters.', status: 400 }
  }
  return { ok: true, emergency_type, phone, note }
}

function rowToEmergency(row: Record<string, unknown>): ChatEmergency {
  return {
    id: String(row.id),
    created_at: row.created_at ? String(row.created_at) : undefined,
    lead_id: String(row.lead_id),
    session_id: String(row.session_id),
    emergency_type: row.emergency_type as EmergencyTypeId,
    phone: String(row.phone ?? ''),
    note: (row.note as string) ?? null,
    photo_triage: (row.photo_triage as ChatEmergency['photo_triage']) ?? null,
    sms_consent: row.sms_consent === true,
  }
}

export async function createEmergency(input: {
  lead: ChatLead
  emergency_type: EmergencyTypeId
  phone: string
  note: string
  sms_consent?: boolean
}): Promise<ChatEmergency> {
  const supabase = getChatSupabase()
  if (!supabase) throw new Error('Chat storage is not configured')
  const { data, error } = await supabase.rpc('create_chat_emergency', {
    p_session_id: input.lead.session_id,
    p_emergency_type: input.emergency_type,
    p_phone: input.phone,
    p_note: input.note || null,
    p_sms_consent: input.sms_consent === true,
  })
  if (error || !data) throw error || new Error('Could not save the emergency request')
  return rowToEmergency(data as Record<string, unknown>)
}

export async function getEmergency(emergencyId: string): Promise<ChatEmergency | null> {
  const supabase = getChatSupabase()
  if (!supabase || !emergencyId) return null
  const { data, error } = await supabase.rpc('get_chat_emergency', { p_emergency_id: emergencyId })
  if (error || !data) return null
  const row = data as Record<string, unknown>
  return {
    ...rowToEmergency(row),
    first_name: row.first_name ? String(row.first_name) : undefined,
    last_name: row.last_name ? String(row.last_name) : undefined,
    call_status: (row.call_status as string) ?? null,
    call_control_ids: (row.call_control_ids as Record<string, string>) || {},
  }
}

export async function leadHasRecentEmergencyCall(leadId: string, windowMinutes = 10): Promise<boolean> {
  const supabase = getChatSupabase()
  if (!supabase || !leadId) return false
  const { data, error } = await supabase.rpc('lead_has_recent_emergency_call', {
    p_lead_id: leadId,
    p_window_minutes: windowMinutes,
  })
  if (error) {
    console.error('recent emergency call check failed')
    return false
  }
  return Boolean(data)
}

export async function updateEmergencyCall(input: {
  emergencyId: string
  callStatus?: string
  callControlIds?: Record<string, string>
  eventId?: string
}): Promise<ChatEmergency | null> {
  const supabase = getChatSupabase()
  if (!supabase) return null
  const { data, error } = await supabase.rpc('update_chat_emergency_call', {
    p_emergency_id: input.emergencyId,
    p_call_status: input.callStatus ?? null,
    p_call_control_ids: input.callControlIds ?? null,
    p_event_id: input.eventId ?? null,
  })
  if (error || !data) {
    if (error) console.error('update emergency call failed')
    return null
  }
  const row = data as Record<string, unknown>
  return {
    ...rowToEmergency(row),
    call_status: (row.call_status as string) ?? null,
    call_control_ids: (row.call_control_ids as Record<string, string>) || {},
    already_processed: Boolean(row.already_processed),
  }
}

export async function getEmergencyByCallControl(callControlId: string): Promise<ChatEmergency | null> {
  const supabase = getChatSupabase()
  if (!supabase || !callControlId) return null
  const { data, error } = await supabase.rpc('get_chat_emergency_by_call_control', {
    p_call_control_id: callControlId,
  })
  if (error || !data) return null
  const row = data as Record<string, unknown>
  return {
    ...rowToEmergency(row),
    first_name: row.first_name ? String(row.first_name) : undefined,
    last_name: row.last_name ? String(row.last_name) : undefined,
    call_status: (row.call_status as string) ?? null,
    call_control_ids: (row.call_control_ids as Record<string, string>) || {},
  }
}
