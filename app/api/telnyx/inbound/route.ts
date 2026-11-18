import { NextRequest } from 'next/server'
import { telnyxEnv, toE164, verifyTelnyxSignature } from '@/lib/telnyx'

export const runtime = 'nodejs'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function texml(xml: string) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>${xml}`, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

function hangup() {
  return texml('<Response><Hangup/></Response>')
}

function header(req: NextRequest, name: string) {
  return req.headers.get(name) || req.headers.get(name.toLowerCase())
}

async function inboundTexml(req: NextRequest) {
  const rawBody = req.method === 'GET'
    ? req.nextUrl.search.replace(/^\?/, '')
    : await req.text()

  const signature = header(req, 'telnyx-signature-ed25519')
  const timestamp = header(req, 'telnyx-timestamp')
  // If Telnyx signed the TeXML request, require a valid signature.
  // If no signature headers are present, still return a minimal Dial so inbound calls work.
  if ((signature || timestamp) && !verifyTelnyxSignature(rawBody, signature, timestamp)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = new URLSearchParams(rawBody)
  req.nextUrl.searchParams.forEach((value, key) => {
    if (!params.has(key)) params.set(key, value)
  })

  const team = toE164(telnyxEnv().teamNumber || '')
  if (!team) return hangup()

  const callerId = toE164(params.get('From') || params.get('Caller') || params.get('from') || '')
  const callerAttr = callerId ? ` callerId="${escapeXml(callerId)}"` : ''
  return texml(`<Response><Dial${callerAttr} timeout="30">${escapeXml(team)}</Dial></Response>`)
}

export async function POST(req: NextRequest) {
  return inboundTexml(req)
}

export async function GET(req: NextRequest) {
  return inboundTexml(req)
}
