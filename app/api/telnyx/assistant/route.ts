import { timingSafeEqual } from 'crypto'
import { NextRequest } from 'next/server'
import { upsertCallLog, shouldNotify, type CallLog } from '@/lib/call-logs'
import { notifyCallLog } from '@/lib/chat-notify'
import { verifyTelnyxSignature } from '@/lib/telnyx'

export const runtime = 'nodejs'

function header(req: NextRequest, name: string) {
  return req.headers.get(name) || req.headers.get(name.toLowerCase())
}

function secretMatches(provided?: string | null): boolean {
  const expected = process.env.TELNYX_ASSISTANT_WEBHOOK_SECRET?.trim()
  if (!expected || !provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

function isAuthorized(req: NextRequest, rawBody: string): boolean {
  const signature = header(req, 'telnyx-signature-ed25519')
  const timestamp = header(req, 'telnyx-timestamp')
  if (signature || timestamp) {
    return verifyTelnyxSignature(rawBody, signature, timestamp)
  }
  const secret =
    header(req, 'x-fixxit-assistant-secret') ||
    header(req, 'x-telnyx-assistant-secret')
  return secretMatches(secret)
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

function text(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return null
}

function firstText(...values: unknown[]): string | null {
  for (const value of values) {
    const found = text(value)
    if (found) return found
  }
  return null
}

function nestedPayload(body: Record<string, unknown>): Record<string, unknown> {
  const data = asRecord(body.data)
  const payload = asRecord(body.payload) || asRecord(data?.payload)
  return { ...payload, ...asRecord(data), ...body }
}

function eventTypeOf(body: Record<string, unknown>): string {
  const data = asRecord(body.data)
  return (
    firstText(body.event_type, data?.event_type, body.record_type, data?.record_type, body.type) ||
    ''
  ).toLowerCase()
}

function sourceForEvent(eventType: string): 'insight' | 'conversation_ended' | 'tool' {
  if (eventType.includes('insight')) return 'insight'
  if (eventType.includes('conversation.ended') || eventType.includes('conversation_ended')) {
    return 'conversation_ended'
  }
  return 'tool'
}

function collectInsightSummary(payload: Record<string, unknown>): { summary: string | null; insights: unknown } {
  const inner = asRecord(payload.payload) || payload
  const results = inner.results
  if (Array.isArray(results) && results.length) {
    const parts: string[] = []
    for (const item of results) {
      const rec = asRecord(item)
      if (!rec) continue
      const result = rec.result
      if (typeof result === 'string' && result.trim()) {
        try {
          const parsed = JSON.parse(result) as Record<string, unknown>
          const summary = firstText(parsed.summary, parsed.recap, parsed.message, result)
          if (summary) parts.push(summary)
        } catch {
          parts.push(result.trim())
        }
      }
    }
    return { summary: parts.join('\n') || null, insights: results }
  }
  return {
    summary: firstText(inner.summary, inner.insights_instructions, payload.summary),
    insights: inner.results ?? payload,
  }
}

function collectTranscript(payload: Record<string, unknown>): unknown {
  const inner = asRecord(payload.payload) || payload
  return inner.messages ?? inner.transcript ?? payload.messages ?? payload.transcript ?? null
}

function collectRecordingUrl(payload: Record<string, unknown>): string | null {
  const inner = asRecord(payload.payload) || payload
  const recording = asRecord(inner.recording) || asRecord(payload.recording)
  return firstText(
    inner.recording_url,
    payload.recording_url,
    recording?.url,
    recording?.recording_url,
    asRecord(inner.recording_urls)?.mp3,
  )
}

async function saveAndNotify(input: {
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
  source: string
  event_type?: string | null
}): Promise<CallLog> {
  const saved = await upsertCallLog({
    ...input,
    notify_kind: null,
  })
  const kind = shouldNotify(saved, input.source, Boolean(saved.summary))
  if (!kind) return saved
  await notifyCallLog(saved)
  return upsertCallLog({
    id: saved.id,
    conversation_id: saved.conversation_id,
    call_control_id: saved.call_control_id,
    source: input.source,
    event_type: input.event_type,
    notify_kind: kind,
  })
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  if (!isAuthorized(req, rawBody)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let parsed: unknown = {}
  if (rawBody.trim()) {
    try {
      parsed = JSON.parse(rawBody)
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }
  }

  const body = asRecord(parsed) || {}
  const merged = nestedPayload(body)
  const eventType = eventTypeOf(body)
  const source = sourceForEvent(eventType)
  const params = req.nextUrl.searchParams

  const conversationId = firstText(
    merged.conversation_id,
    asRecord(merged.payload)?.conversation_id,
    params.get('conversation_id'),
    asRecord(body.data)?.payload && asRecord(asRecord(body.data)?.payload)?.conversation_id,
  )
  const callControlId = firstText(
    merged.call_control_id,
    asRecord(merged.payload)?.call_control_id,
    params.get('call_control_id'),
  )
  const callerNumber = firstText(
    merged.caller_number,
    merged.from,
    merged.From,
    merged.telnyx_end_user_target,
    asRecord(merged.payload)?.from,
  )

  try {
    let log: CallLog
    if (source === 'insight') {
      const { summary, insights } = collectInsightSummary(merged)
      log = await saveAndNotify({
        conversation_id: conversationId,
        call_control_id: callControlId,
        caller_number: callerNumber,
        summary,
        insights,
        source,
        event_type: eventType || 'conversation_insight_result',
      })
    } else if (source === 'conversation_ended') {
      const inner = asRecord(merged.payload) || merged
      log = await saveAndNotify({
        conversation_id: conversationId,
        call_control_id: callControlId,
        caller_name: firstText(inner.caller_name, merged.caller_name),
        caller_number: callerNumber,
        summary: firstText(inner.summary, merged.summary),
        recording_url: collectRecordingUrl(merged),
        transcript: collectTranscript(merged),
        source,
        event_type: eventType || 'call.conversation.ended',
      })
    } else {
      log = await saveAndNotify({
        conversation_id: conversationId,
        call_control_id: callControlId,
        category: firstText(merged.category, merged.call_category),
        caller_name: firstText(merged.caller_name, merged.name),
        caller_number: callerNumber,
        callback_number: firstText(merged.callback_number, merged.phone, merged.callback_phone),
        zip: firstText(merged.zip, merged.zip_code, merged.postal_code),
        address: firstText(merged.address),
        issue: firstText(merged.issue, merged.message_summary, merged.message),
        summary: firstText(merged.summary, merged.message_summary),
        source: 'tool',
        event_type: eventType || 'tool',
      })
    }

    return Response.json({ ok: true, id: log.id })
  } catch (err) {
    console.error('assistant webhook failed')
    return Response.json({ error: 'Unable to save call log' }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}
