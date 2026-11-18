import { getChatSupabase } from '@/lib/join-supabase'

export const CALL_CATEGORIES = ['emergency', 'service', 'applicant', 'other'] as const
export type CallCategory = (typeof CALL_CATEGORIES)[number]

export type CallLog = {
  id: string
  created_at: string
  updated_at: string
  conversation_id: string | null
  call_control_id: string | null
  category: string | null
  caller_name: string | null
  caller_number: string | null
  callback_number: string | null
  zip: string | null
  address: string | null
  issue: string | null
  summary: string | null
  recording_url: string | null
  transcript: unknown
  insights: unknown
  source: string | null
  event_type: string | null
  last_notify_kind: string | null
  last_notified_at: string | null
}

export type UpsertCallLogInput = {
  id?: string | null
  conversation_id?: string | null
  call_control_id?: string | null
  category?: string | null
  caller_name?: string | null
  caller_number?: string | null
  callback_number?: string | null
  zip?: string | null
  address?: string | null
  issue?: string | null
  summary?: string | null
  recording_url?: string | null
  transcript?: unknown
  insights?: unknown
  source?: string | null
  event_type?: string | null
  notify_kind?: string | null
}

export function normalizeCategory(value?: string | null): CallCategory | null {
  if (!value) return null
  const v = value.trim().toLowerCase()
  if (v === 'emergency' || v === 'emergencies') return 'emergency'
  if (v === 'service' || v === 'services' || v === 'plumbing' || v === 'electrical' || v === 'hvac') return 'service'
  if (v === 'applicant' || v === 'applicants' || v === 'job' || v === 'recruiting' || v === 'application') return 'applicant'
  if (v === 'other') return 'other'
  return null
}

function cleanText(value?: string | null): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function rowToLog(row: Record<string, unknown>): CallLog {
  return {
    id: String(row.id),
    created_at: String(row.created_at ?? ''),
    updated_at: String(row.updated_at ?? ''),
    conversation_id: (row.conversation_id as string) ?? null,
    call_control_id: (row.call_control_id as string) ?? null,
    category: (row.category as string) ?? null,
    caller_name: (row.caller_name as string) ?? null,
    caller_number: (row.caller_number as string) ?? null,
    callback_number: (row.callback_number as string) ?? null,
    zip: (row.zip as string) ?? null,
    address: (row.address as string) ?? null,
    issue: (row.issue as string) ?? null,
    summary: (row.summary as string) ?? null,
    recording_url: (row.recording_url as string) ?? null,
    transcript: row.transcript ?? null,
    insights: row.insights ?? null,
    source: (row.source as string) ?? null,
    event_type: (row.event_type as string) ?? null,
    last_notify_kind: (row.last_notify_kind as string) ?? null,
    last_notified_at: (row.last_notified_at as string) ?? null,
  }
}

export async function upsertCallLog(input: UpsertCallLogInput): Promise<CallLog> {
  const supabase = getChatSupabase()
  if (!supabase) throw new Error('Call log storage is not configured')
  const { data, error } = await supabase.rpc('upsert_call_log', {
    p_id: cleanText(input.id),
    p_conversation_id: cleanText(input.conversation_id),
    p_call_control_id: cleanText(input.call_control_id),
    p_category: normalizeCategory(input.category) || cleanText(input.category),
    p_caller_name: cleanText(input.caller_name),
    p_caller_number: cleanText(input.caller_number),
    p_callback_number: cleanText(input.callback_number),
    p_zip: cleanText(input.zip),
    p_address: cleanText(input.address),
    p_issue: cleanText(input.issue),
    p_summary: cleanText(input.summary),
    p_recording_url: cleanText(input.recording_url),
    p_transcript: input.transcript ?? null,
    p_insights: input.insights ?? null,
    p_source: cleanText(input.source),
    p_event_type: cleanText(input.event_type),
    p_notify_kind: cleanText(input.notify_kind),
  })
  if (error || !data) throw error || new Error('Could not save call log')
  return rowToLog(data as Record<string, unknown>)
}

export function shouldNotify(existing: CallLog | null, source: string, hasSummary: boolean): string | null {
  if (source === 'tool') return 'tool'
  if (source === 'insight' && hasSummary && existing?.last_notify_kind !== 'insight') return 'insight'
  if (source === 'conversation_ended' && !existing?.last_notify_kind && !existing?.category) return 'conversation_ended'
  return null
}
