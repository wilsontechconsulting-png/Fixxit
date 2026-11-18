import { NextRequest } from 'next/server'
import { getChatSupabase } from '@/lib/join-supabase'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { isLead, logChatMessage, requireLead } from '@/lib/chat-leads'
import { createEmergency, validateEmergencyInput } from '@/lib/chat-emergencies'
import { notifyEmergency } from '@/lib/chat-notify'
import { emergencyLabel } from '@/lib/emergency-types'
import { isTelnyxConfigured, startEmergencyCallback } from '@/lib/telephony'

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`emergency:${clientIp(req)}`, 6, 15 * 60 * 1000)) {
      return rateLimitResponse()
    }
    if (!getChatSupabase()) {
      return Response.json({ error: 'Chat is temporarily unavailable.' }, { status: 503 })
    }

    const body = await req.json().catch(() => ({}))
    const lead = await requireLead(body?.session_id)
    if (!isLead(lead)) {
      return Response.json({ error: lead.error }, { status: lead.status })
    }

    const checked = validateEmergencyInput({
      emergency_type: body.emergency_type,
      phone: body.phone,
      note: body.note,
    })
    if (!checked.ok) {
      return Response.json({ error: checked.error }, { status: checked.status })
    }

    const emergency = await createEmergency({
      lead,
      emergency_type: checked.emergency_type,
      phone: checked.phone,
      note: checked.note,
    })

    logChatMessage(lead.session_id, 'user', `Emergency: ${emergencyLabel(emergency.emergency_type)}`, {
      kind: 'emergency',
      emergency_id: emergency.id,
    })

    notifyEmergency({ lead, emergency }).catch(() => {})

    // Telnyx calling is not enabled until credentials are set and Jed approves.
    if (isTelnyxConfigured()) {
      startEmergencyCallback(lead, {
        id: emergency.id,
        type: emergency.emergency_type,
        phone: emergency.phone,
        note: emergency.note,
      }).catch(() => {})
    }

    return Response.json({ ok: true, emergency_id: emergency.id })
  } catch (error) {
    console.error('Chat emergency error')
    return Response.json({ error: 'Unable to send your emergency request. Please call 888-229-5696.' }, { status: 500 })
  }
}
