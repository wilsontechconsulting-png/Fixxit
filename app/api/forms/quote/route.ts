import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return /^[\d\s\-\(\)\+]{7,}$/.test(phone)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, phone, email, zip, service, description, 'bot-field': honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    // Validation
    if (!firstName || !lastName || !phone || !email || !zip || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    }

    // Log submission (in production: send email via Resend/SendGrid)
    console.log('Quote request:', { firstName, lastName, phone, email, zip, service, description })

    return NextResponse.json({ ok: true, message: 'Quote request received' })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
