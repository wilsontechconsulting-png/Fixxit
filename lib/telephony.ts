import type { ChatLead } from '@/lib/chat-leads'

export type EmergencyCallbackRecord = {
  id: string
  type: string
  phone: string
  note?: string | null
}

function telnyxConfigured(): boolean {
  return Boolean(
    process.env.TELNYX_API_KEY?.trim() &&
      process.env.TELNYX_FROM_NUMBER?.trim() &&
      process.env.TELNYX_CONNECTION_ID?.trim(),
  )
}

export function isTelnyxConfigured(): boolean {
  return telnyxConfigured()
}

/**
 * Planned Telnyx callback hook. Do not place calls until Jed approves
 * and TELNYX_API_KEY, TELNYX_FROM_NUMBER, and TELNYX_CONNECTION_ID are set.
 *
 * TODO: When approved, implement one of these flows:
 * 1) Click-to-call bridge — create a Telnyx session that first rings the
 *    FIXXIT business line, then dials the customer and bridges both legs
 *    when answered.
 * 2) Call Control API — place an outbound call from TELNYX_FROM_NUMBER
 *    through TELNYX_CONNECTION_ID to the business line, then conference
 *    in the customer number from the emergency request.
 *
 * This function is a no-op unless all three env vars are present, and
 * even then it does not place a call until the integration is written.
 */
export async function startEmergencyCallback(
  _lead: Pick<ChatLead, 'id' | 'first_name' | 'last_name' | 'phone' | 'email'>,
  _emergency: EmergencyCallbackRecord,
): Promise<{ started: false; reason: string } | { started: true }> {
  if (!telnyxConfigured()) {
    return { started: false, reason: 'telephony_not_configured' }
  }

  // TODO: implement the Telnyx click-to-call or Call Control flow above.
  // Credentials are present, but calling is not implemented or approved yet.
  return { started: false, reason: 'not_implemented' }
}
