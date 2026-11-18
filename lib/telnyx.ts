import { createPublicKey, verify } from 'crypto'
import { digitsOnly } from '@/lib/chat-leads'

const TELNYX_API = 'https://api.telnyx.com/v2'
const WEBHOOK_TOLERANCE_SEC = 300
const ED25519_SPKI_PREFIX = Buffer.from('302a300506032b6570032100', 'hex')

export type TelnyxClientState = {
  emergency_id: string
  role: 'team' | 'customer'
  team_call_control_id?: string
}

export function telnyxEnv() {
  const apiKey = process.env.TELNYX_API_KEY?.trim()
  const fromNumber = process.env.TELNYX_FROM_NUMBER?.trim()
  const connectionId = process.env.TELNYX_CONNECTION_ID?.trim()
  const teamNumber = process.env.TELNYX_TEAM_NUMBER?.trim()
  const publicKey = process.env.TELNYX_PUBLIC_KEY?.trim()
  return { apiKey, fromNumber, connectionId, teamNumber, publicKey }
}

export function isTelnyxReady() {
  const env = telnyxEnv()
  return Boolean(env.apiKey && env.fromNumber && env.connectionId && env.teamNumber)
}

export function toE164(phone: string): string | null {
  const trimmed = phone.trim()
  const digits = digitsOnly(trimmed)
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (trimmed.startsWith('+') && digits.length >= 10 && digits.length <= 15) return `+${digits}`
  return null
}

export function encodeClientState(state: TelnyxClientState): string {
  return Buffer.from(JSON.stringify(state), 'utf8').toString('base64')
}

export function decodeClientState(value?: string | null): TelnyxClientState | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(Buffer.from(value, 'base64').toString('utf8')) as TelnyxClientState
    if (!parsed?.emergency_id || (parsed.role !== 'team' && parsed.role !== 'customer')) return null
    return parsed
  } catch {
    return null
  }
}

export function verifyTelnyxSignature(rawBody: string, signature?: string | null, timestamp?: string | null): boolean {
  const publicKeyB64 = telnyxEnv().publicKey
  if (!publicKeyB64 || !signature || !timestamp) return false
  const ts = Number(timestamp)
  if (!Number.isFinite(ts)) return false
  if (Math.abs(Date.now() / 1000 - ts) > WEBHOOK_TOLERANCE_SEC) return false
  try {
    const rawKey = Buffer.from(publicKeyB64, 'base64')
    if (rawKey.length !== 32) return false
    const key = createPublicKey({
      key: Buffer.concat([ED25519_SPKI_PREFIX, rawKey]),
      format: 'der',
      type: 'spki',
    })
    return verify(null, Buffer.from(`${timestamp}|${rawBody}`), key, Buffer.from(signature, 'base64'))
  } catch {
    return false
  }
}

async function telnyxFetch<T = Record<string, unknown>>(
  path: string,
  init?: { method?: string; body?: Record<string, unknown> },
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const { apiKey } = telnyxEnv()
  if (!apiKey) return { ok: false, status: 0, data: null }
  try {
    const res = await fetch(`${TELNYX_API}${path}`, {
      method: init?.method || 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: init?.body ? JSON.stringify(init.body) : undefined,
    })
    const json = await res.json().catch(() => null)
    return { ok: res.ok, status: res.status, data: json as T }
  } catch {
    console.error('Telnyx request failed')
    return { ok: false, status: 0, data: null }
  }
}

function callControlId(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined
  const root = data as { data?: { call_control_id?: string } }
  return root.data?.call_control_id
}

export async function dialCall(opts: {
  to: string
  clientState: TelnyxClientState
  timeoutSecs?: number
  linkTo?: string
}): Promise<{ ok: boolean; callControlId?: string }> {
  const env = telnyxEnv()
  if (!env.connectionId || !env.fromNumber) return { ok: false }
  const body: Record<string, unknown> = {
    connection_id: env.connectionId,
    to: opts.to,
    from: env.fromNumber,
    webhook_url: 'https://fixxitpros.com/api/telnyx/voice',
    webhook_url_method: 'POST',
    timeout_secs: opts.timeoutSecs ?? 30,
    client_state: encodeClientState(opts.clientState),
    answering_machine_detection: 'disabled',
  }
  if (opts.linkTo) body.link_to = opts.linkTo
  const res = await telnyxFetch('/calls', { method: 'POST', body })
  if (!res.ok) {
    console.error('Telnyx dial failed', res.status)
    return { ok: false }
  }
  return { ok: true, callControlId: callControlId(res.data) }
}

export async function gatherUsingSpeak(callControlId: string, payload: string, clientState: TelnyxClientState) {
  const res = await telnyxFetch(`/calls/${encodeURIComponent(callControlId)}/actions/gather_using_speak`, {
    method: 'POST',
    body: {
      payload,
      voice: 'female',
      language: 'en-US',
      minimum_digits: 1,
      maximum_digits: 1,
      valid_digits: '1',
      timeout_millis: 12000,
      inter_digit_timeout_millis: 5000,
      client_state: encodeClientState(clientState),
    },
  })
  if (!res.ok) console.error('Telnyx gather failed', res.status)
  return res.ok
}

export async function speakOnCall(callControlId: string, payload: string, clientState?: TelnyxClientState) {
  const body: Record<string, unknown> = {
    payload,
    voice: 'female',
    language: 'en-US',
  }
  if (clientState) body.client_state = encodeClientState(clientState)
  const res = await telnyxFetch(`/calls/${encodeURIComponent(callControlId)}/actions/speak`, {
    method: 'POST',
    body,
  })
  if (!res.ok) console.error('Telnyx speak failed', res.status)
  return res.ok
}

export async function bridgeCalls(callControlId: string, toCallControlId: string, clientState?: TelnyxClientState) {
  const body: Record<string, unknown> = { to_call_control_id: toCallControlId }
  if (clientState) body.client_state = encodeClientState(clientState)
  const res = await telnyxFetch(`/calls/${encodeURIComponent(callControlId)}/actions/bridge`, {
    method: 'POST',
    body,
  })
  if (!res.ok) console.error('Telnyx bridge failed', res.status)
  return res.ok
}

export async function hangupCall(callControlId: string) {
  const res = await telnyxFetch(`/calls/${encodeURIComponent(callControlId)}/actions/hangup`, {
    method: 'POST',
    body: {},
  })
  if (!res.ok && res.status !== 422) console.error('Telnyx hangup failed', res.status)
  return res.ok
}
