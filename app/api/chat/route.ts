import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { supabaseAdmin } from '@/lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are the Fixxit Pros assistant. Your job is to help homeowners describe their home service needs and connect them with local professionals who can help.

Services we connect people with: Plumbing, HVAC, Electrical, Roofing, Windows & Doors, Bath & Shower, Mowing, Air Duct & Carpet Cleaning, Landscaping, Siding.

Ask helpful questions to understand their problem. Be conversational, friendly, and concise. Once you understand their needs, guide them to submit a quote request.

Important: These are local people who can help - they may be working for us or subcontracting. Don't make promises about pricing or exact timing.`

function logMessage(sessionId: string, role: string, content: string, metadata: Record<string, string>) {
  if (!supabaseAdmin) return
  supabaseAdmin
    .from('chat_conversations')
    .insert({ session_id: sessionId, role, content, metadata })
    .then(({ error }) => {
      if (error) console.error('Supabase log error:', error)
    })
    .catch((err: unknown) => console.error('Supabase log error:', err))
}

export async function POST(req: NextRequest) {
  try {
    const { messages, session_id } = await req.json()

    const metadata = {
      user_agent: req.headers.get('user-agent') ?? '',
      referer: req.headers.get('referer') ?? '',
    }

    // Log the last user message (fire-and-forget — never blocks the chat response)
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user') {
      logMessage(session_id ?? 'unknown', 'user', lastMessage.content, metadata)
    }

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
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
        let assistantContent = ''
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            const delta = chunk.choices?.[0]?.delta?.content
            if (delta) assistantContent += delta
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } finally {
          controller.close()
          // Log the full assistant response after streaming completes
          if (assistantContent) {
            logMessage(session_id ?? 'unknown', 'assistant', assistantContent, metadata)
          }
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
