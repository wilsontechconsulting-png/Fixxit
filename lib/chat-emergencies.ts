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
  }
}

export async function createEmergency(input: {
  lead: ChatLead
  emergency_type: EmergencyTypeId
  phone: string
  note: string
}): Promise<ChatEmergency> {
  const supabase = getChatSupabase()
  if (!supabase) throw new Error('Chat storage is not configured')
  const { data, error } = await supabase.rpc('create_chat_emergency', {
    p_session_id: input.lead.session_id,
    p_emergency_type: input.emergency_type,
    p_phone: input.phone,
    p_note: input.note || null,
  })
  if (error || !data) throw error || new Error('Could not save the emergency request')
  return rowToEmergency(data as Record<string, unknown>)
}
