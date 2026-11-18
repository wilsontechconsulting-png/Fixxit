import type { ChatLead } from '@/lib/chat-leads'
import { leadHasRecentEmergencyCall, updateEmergencyCall } from '@/lib/chat-emergencies'
import { dialCall, isTelnyxReady, toE164 } from '@/lib/telnyx'

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
