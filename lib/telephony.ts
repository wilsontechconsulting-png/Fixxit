import type { ChatLead } from '@/lib/chat-leads'
import { leadHasRecentEmergencyCall, updateEmergencyCall } from '@/lib/chat-emergencies'
import { emergencyLabel } from '@/lib/emergency-types'
import { dialCall, isTelnyxReady, isTelnyxSmsEnabled, sendSms, toE164 } from '@/lib/telnyx'

export type EmergencyCallbackRecord = {
  id: string
  type: string
  phone: string
  note?: string | null
}

export function isTelnyxConfigured(): boolean {
  return isTelnyxReady()
}

/**
 * Text a customer only if they checked the optional SMS consent box
 * (sms_consent on chat_leads / chat_emergencies) and texting is enabled.
 * Team alerts to TELNYX_TEAM_NUMBER do not go through this helper.
 */
export async function sendCustomerSms(opts: {
  to: string
  text: string
  smsConsent: boolean
}): Promise<{ ok: boolean; reason?: string }> {
  if (opts.smsConsent !== true) return { ok: false, reason: 'no_sms_consent' }
  if (!isTelnyxSmsEnabled()) return { ok: false, reason: 'sms_disabled' }
  const to = toE164(opts.to)
  if (!to) return { ok: false, reason: 'invalid_number' }
  const sms = await sendSms({ to, text: opts.text })
  return sms.ok ? { ok: true } : { ok: false, reason: `status_${sms.status}` }
}

/**
 * Start the Telnyx emergency bridge: dial the FIXXIT team from
 * TELNYX_FROM_NUMBER through TELNYX_CONNECTION_ID. When the team answers
 * and presses 1, the webhook dials the customer and bridges the two legs.
 *
 * No-op unless TELNYX_API_KEY, TELNYX_FROM_NUMBER, TELNYX_CONNECTION_ID,
 * and TELNYX_TEAM_NUMBER are set. The from number is used only as caller ID;
 * it stays on its existing inbound TeXML connection.
 */
export async function startEmergencyCallback(
  lead: Pick<ChatLead, 'id' | 'first_name' | 'last_name' | 'phone' | 'email'>,
  emergency: EmergencyCallbackRecord,
): Promise<{ started: false; reason: string } | { started: true; callControlId?: string }> {
  if (!isTelnyxReady()) {
    return { started: false, reason: 'telephony_not_configured' }
  }

  if (await leadHasRecentEmergencyCall(lead.id, 10)) {
    await updateEmergencyCall({
      emergencyId: emergency.id,
      callStatus: 'skipped_rate_limited',
    })
    return { started: false, reason: 'rate_limited' }
  }

  const customer = toE164(emergency.phone)
  if (!customer) {
    await updateEmergencyCall({
      emergencyId: emergency.id,
      callStatus: 'failed',
    })
    return { started: false, reason: 'invalid_customer_number' }
  }

  const teamNumber = process.env.TELNYX_TEAM_NUMBER?.trim()
  if (!teamNumber) {
    return { started: false, reason: 'telephony_not_configured' }
  }

  if (isTelnyxSmsEnabled()) {
    const name = [lead.first_name, lead.last_name].filter(Boolean).join(' ').trim() || 'Unknown'
    const note = (emergency.note || '').trim().replace(/\s+/g, ' ')
    const parts = [
      `FIXXIT emergency: ${emergencyLabel(emergency.type)}.`,
      `${name}, ${customer}.`,
    ]
    if (note) parts.push(note)
    const text = parts.join(' ').slice(0, 320)
    const sms = await sendSms({ to: teamNumber, text })
    if (!sms.ok) console.error('Emergency SMS failed', sms.status)
  }

  const dial = await dialCall({
    to: teamNumber,
    timeoutSecs: 30,
    clientState: { emergency_id: emergency.id, role: 'team' },
  })

  if (!dial.ok || !dial.callControlId) {
    await updateEmergencyCall({
      emergencyId: emergency.id,
      callStatus: 'failed',
    })
    return { started: false, reason: 'dial_failed' }
  }

  await updateEmergencyCall({
    emergencyId: emergency.id,
    callStatus: 'ringing_team',
    callControlIds: { team: dial.callControlId },
  })

  return { started: true, callControlId: dial.callControlId }
}
