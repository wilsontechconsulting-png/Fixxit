import { NextRequest } from 'next/server'
import { getChatSupabase } from '@/lib/join-supabase'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { createLead, getLeadBySession, isLead, requireLead, validateLeadInput } from '@/lib/chat-leads'
import { notifyChatLead } from '@/lib/chat-notify'

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`lead:${clientIp(req)}`, 8, 15 * 60 * 1000)) {
      return rateLimitResponse()
    }
    if (!getChatSupabase()) {
      return Response.json({ error: 'Chat is temporarily unavailable.' }, { status: 503 })
    }

    const body = await req.json().catch(() => ({}))
    const checked = validateLeadInput({
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      email: body.email,
      honeypot: body.company ?? body.website ?? body.honeypot,
    })
    if (!checked.ok) {
      return Response.json({ error: checked.error }, { status: checked.status })
    }

    const requestedSession = typeof body.session_id === 'string' ? body.session_id.trim() : ''
    const existing = requestedSession ? await getLeadBySession(requestedSession) : null
    if (existing) {
      return Response.json({ ok: true, lead_id: existing.id, session_id: existing.session_id })
    }

    const session_id = requestedSession || crypto.randomUUID()
    const lead = await createLead({
      session_id,
      first_name: checked.first_name,
      last_name: checked.last_name,
      phone: checked.phone,
      email: checked.email,
      user_agent: req.headers.get('user-agent') ?? '',
      referer: req.headers.get('referer') ?? '',
    })

    notifyChatLead({ kind: 'created', lead }).catch(() => {})

    return Response.json({ ok: true, lead_id: lead.id, session_id: lead.session_id })
  } catch (error) {
    console.error('Chat lead error')
    return Response.json({ error: 'Unable to start chat. Please try again.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!rateLimit(`lead-get:${clientIp(req)}`, 40, 10 * 60 * 1000)) {
      return rateLimitResponse()
    }
    const session_id = req.nextUrl.searchParams.get('session_id')
    const lead = await requireLead(session_id)
    if (!isLead(lead)) {
      return Response.json({ error: lead.error }, { status: lead.status })
    }
    return Response.json({ phone: lead.phone })
  } catch {
    return Response.json({ error: 'Unable to load your contact details.' }, { status: 500 })
  }
}

