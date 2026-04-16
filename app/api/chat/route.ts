import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are the Fixxit Pros assistant. Your job is to help homeowners describe their home service needs and connect them with local professionals who can help.

Services we connect people with: Plumbing, HVAC, Electrical, Roofing, Windows & Doors, Bath & Shower, Mowing, Air Duct & Carpet Cleaning, Landscaping, Siding.

Ask helpful questions to understand their problem. Be conversational, friendly, and concise. Once you understand their needs, guide them to submit a quote request.

Important: These are local people who can help - they may be working for us or subcontracting. Don't make promises about pricing or exact timing.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const stream = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Chat service unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
