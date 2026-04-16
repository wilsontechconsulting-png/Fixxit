import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, services, message, 'bot-field-sub': honeypot } = body

    if (honeypot) return NextResponse.json({ ok: true })

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Subcontractor inquiry:', { fullName, email, phone, services, message })

    return NextResponse.json({ ok: true, message: 'Inquiry received' })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
