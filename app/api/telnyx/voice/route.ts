import { NextRequest } from 'next/server'
import { getEmergency, updateEmergencyCall } from '@/lib/chat-emergencies'
import { emergencyLabel } from '@/lib/emergency-types'
import {
  bridgeCalls,
  decodeClientState,
  dialCall,
  gatherUsingSpeak,
  hangupCall,
  speakOnCall,
  telnyxEnv,
  toE164,
  verifyTelnyxSignature,
  type TelnyxClientState,
} from '@/lib/telnyx'

export const runtime = 'nodejs'

const TERMINAL = new Set([
  'completed',
  'failed',
  'team_no_answer',
  'no_digit',
  'customer_no_answer',
  'skipped_rate_limited',
])

type VoicePayload = {
  call_control_id?: string
  client_state?: string
  digits?: string
  hangup_cause?: string
  hangup_source?: string
  state?: string
}

function header(req: NextRequest, name: string) {
  return req.headers.get(name) || req.headers.get(name.toLowerCase())
}

async function mark(
  emergencyId: string,
  status: string | undefined,
  eventId: string,
  callControlIds?: Record<string, string>,
) {
  return updateEmergencyCall({
    emergencyId,
    callStatus: status,
    callControlIds,
    eventId,
  })
}

async function handleEvent(eventType: string, eventId: string, payload: VoicePayload) {
  const state = decodeClientState(payload.client_state)
  const callControlId = payload.call_control_id
  if (!state?.emergency_id || !callControlId) return

  const recorded = await mark(state.emergency_id, undefined, eventId)
  if (!recorded) return
  if (recorded.already_processed) return

  const emergency = await getEmergency(state.emergency_id)
  if (!emergency) return
  const current = emergency.call_status || recorded.call_status || ''
  const ids = { ...(emergency.call_control_ids || recorded.call_control_ids || {}) }
  const teamId = ids.team
  const customerId = ids.customer
  const clientState: TelnyxClientState = {
    emergency_id: state.emergency_id,
    role: state.role,
    team_call_control_id: teamId || state.team_call_control_id,
  }

  if (eventType === 'call.initiated' && state.role === 'team' && !current) {
    await updateEmergencyCall({
      emergencyId: state.emergency_id,
      callStatus: 'ringing_team',
      callControlIds: { team: callControlId },
    })
    return
  }

  if (eventType === 'call.answered' && state.role === 'team') {
    if (TERMINAL.has(current) || current === 'awaiting_digit' || current === 'dialing_customer' || current === 'bridged') {
      return
    }
    const firstName = emergency.first_name || 'a homeowner'
    const typeLabel = emergencyLabel(emergency.emergency_type)
    const whisper = `Fixxit emergency: ${typeLabel} for ${firstName}. Press 1 to connect to the customer.`
    await updateEmergencyCall({
      emergencyId: state.emergency_id,
      callStatus: 'awaiting_digit',
      callControlIds: { team: callControlId },
    })
    await gatherUsingSpeak(callControlId, whisper, { ...clientState, role: 'team', team_call_control_id: callControlId })
    return
  }

  if (eventType === 'call.gather.ended' && state.role === 'team') {
    if (TERMINAL.has(current) || current === 'dialing_customer' || current === 'bridged') return
    const digit = (payload.digits || '').trim()
    if (digit !== '1') {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'no_digit' })
      await speakOnCall(callControlId, 'No connection was requested. Goodbye.', clientState)
      await hangupCall(callControlId)
      return
    }

    const teamNumber = telnyxEnv().teamNumber
    const customer = toE164(emergency.phone)
    if (!customer) {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'failed' })
      await speakOnCall(callControlId, 'The customer number was not valid. Goodbye.', clientState)
      await hangupCall(callControlId)
      return
    }

    if (teamNumber && customer === teamNumber) {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'same_number' })
      await speakOnCall(
        callControlId,
        'The customer number is the same as this line, so a second call will not be placed. The emergency details were sent by email. Goodbye.',
        clientState,
      )
      await hangupCall(callControlId)
      return
    }

    await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'dialing_customer' })
    await speakOnCall(callControlId, 'Connecting you to the customer now.', clientState)
    const dial = await dialCall({
      to: customer,
      timeoutSecs: 30,
      clientState: {
        emergency_id: state.emergency_id,
        role: 'customer',
        team_call_control_id: callControlId,
      },
    })
    if (!dial.ok || !dial.callControlId) {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'customer_no_answer' })
      await speakOnCall(callControlId, 'The customer could not be reached. Goodbye.', clientState)
      await hangupCall(callControlId)
      return
    }
    await updateEmergencyCall({
      emergencyId: state.emergency_id,
      callStatus: 'dialing_customer',
      callControlIds: { customer: dial.callControlId },
    })
    return
  }

  if (eventType === 'call.answered' && state.role === 'customer') {
    if (current === 'bridged' || current === 'completed') return
    const teamCallId = teamId || state.team_call_control_id
    if (!teamCallId) return
    await updateEmergencyCall({
      emergencyId: state.emergency_id,
      callStatus: 'bridging',
      callControlIds: { customer: callControlId },
    })
    const bridged = await bridgeCalls(teamCallId, callControlId, clientState)
    if (!bridged) {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'failed' })
      await speakOnCall(teamCallId, 'The customer could not be connected. Goodbye.', { ...clientState, role: 'team' })
      await hangupCall(callControlId)
      await hangupCall(teamCallId)
    }
    return
  }

  if (eventType === 'call.bridged') {
    if (current !== 'completed') {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'bridged' })
    }
    return
  }

  if (eventType === 'call.hangup' && state.role === 'team') {
    if (TERMINAL.has(current) || current === 'same_number') return
    if (current === 'bridged' || current === 'completed' || current === 'bridging') {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'completed' })
      return
    }
    if (current === 'awaiting_digit' || current === 'dialing_customer') {
      if (current === 'awaiting_digit') {
        await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'no_digit' })
      }
      if (customerId) await hangupCall(customerId)
      return
    }
    await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'team_no_answer' })
    return
  }

  if (eventType === 'call.hangup' && state.role === 'customer') {
    if (current === 'bridged' || current === 'completed' || current === 'bridging') {
      await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'completed' })
      return
    }
    if (current === 'customer_no_answer' || TERMINAL.has(current)) return
    await updateEmergencyCall({ emergencyId: state.emergency_id, callStatus: 'customer_no_answer' })
    if (teamId) {
      await speakOnCall(teamId, 'The customer did not answer. Goodbye.', { ...clientState, role: 'team' })
      await hangupCall(teamId)
    }
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = header(req, 'telnyx-signature-ed25519')
  const timestamp = header(req, 'telnyx-timestamp')
  if (!verifyTelnyxSignature(rawBody, signature, timestamp)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { data?: { id?: string; event_type?: string; payload?: VoicePayload } }
  try {
    body = JSON.parse(rawBody)
  } catch {
    return Response.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const eventType = body.data?.event_type
  const eventId = body.data?.id
  const payload = body.data?.payload || {}
  if (!eventType || !eventId) {
    return new Response(null, { status: 200 })
  }

  try {
    await handleEvent(eventType, eventId, payload)
  } catch {
    console.error('Telnyx voice webhook failed')
  }

  return new Response(null, { status: 200 })
}
