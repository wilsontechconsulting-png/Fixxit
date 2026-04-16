import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, position, coverNote, 'bot-field-emp': honeypot } = body

    if (honeypot) return NextResponse.json({ ok: true })

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Employee application:', { fullName, email, phone, position, coverNote })

    return NextResponse.json({ ok: true, message: 'Application received' })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
