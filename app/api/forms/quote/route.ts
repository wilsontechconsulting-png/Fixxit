import { NextRequest, NextResponse } from 'next/server'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { createContactRequest } from '@/lib/contact-requests'
import { notifyContactRequest } from '@/lib/chat-notify'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return /^[\d\s\-\(\)\+\.]{7,40}$/.test(phone) && phone.replace(/\D/g, '').length >= 10
}

function str(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`quote:${clientIp(req)}`, 6, 15 * 60 * 1000)) {
      return rateLimitResponse()
    }
    const body = await req.json().catch(() => ({}))

    // Honeypot check
    if (body['bot-field']) {
      return NextResponse.json({ ok: true })
    }

    const source = body.source === 'contact' ? 'contact' : 'quote'
    const firstName = str(body.firstName, 80)
    const lastName = str(body.lastName, 80)
    const phone = str(body.phone, 40)
    const email = str(body.email, 200)
    const zip = str(body.zip, 10)
    const service = str(body.service, 80)
    const description = str(body.description ?? body.message, 4000)
    const smsConsent = body.sms_consent === true || body.sms_consent === 'on' || body.sms_consent === 'true'

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Please enter your name and email.' }, { status: 400 })
    }
    if (source === 'quote' && (!lastName || !zip || !service)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (phone && !isValidPhone(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number, or leave it blank.' }, { status: 400 })
    }
    if (smsConsent && !phone) {
      return NextResponse.json({ error: 'To get texts, please add your mobile number, or uncheck the text box.' }, { status: 400 })
    }

    const saved = await createContactRequest({
      source,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      zip,
      service,
      message: description,
      sms_consent: smsConsent,
      user_agent: req.headers.get('user-agent') ?? '',
      referer: req.headers.get('referer') ?? '',
    })

    await notifyContactRequest(saved).catch(() => {})

    return NextResponse.json({ ok: true, message: 'Request received' })
  } catch {
    console.error('quote/contact form error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
