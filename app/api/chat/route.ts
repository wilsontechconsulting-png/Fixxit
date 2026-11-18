import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { supabaseAdmin } from '@/lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are the Fixxit Pros assistant. Your job is to help homeowners describe their home service needs and connect them with local professionals who can help.

Services we connect people with: Plumbing, HVAC, Electrical, Roofing, Windows & Doors, Bath & Shower, Mowing, Air Duct & Carpet Cleaning, Landscaping, Siding.

Ask helpful questions to understand their problem. Be conversational, friendly, and concise. Once you understand their needs, guide them to submit a quote request.

Important: These are local people who can help - they may be working for us or subcontracting. Don't make promises about pricing or exact timing.

The chat has permanent action buttons:
- 📸 Upload Photo (users can upload images of their problem and get AI analysis)
- 📞 Call Now (888-229-5696)
- 📝 Get Quote (opens questions form at fixxitpros.com/questions)

You can mention these options in your responses (e.g., "You can upload a photo of the problem, call us now, or answer a few quick questions using the buttons below").

When users upload photos, they will receive an AI analysis separately. You should acknowledge photo uploads positively and work with the analysis provided.

You also help people who want to join the FIXXIT Pros team. First recognize whether the visitor is a homeowner looking for service or a job-seeker. If it is unclear, ask briefly which one they need. For job-seekers, point them to the careers pages below instead of the quote form.

Recruiting facts (use only these; do not add other claims):
- FIXXIT Pros is hiring in Florida. The careers page is https://fixxitpros.com/join and has a state and trade filter.
- The join page says: "Looking for licensed Florida pros to qualify and lead each division, plus experienced technicians."
- The three current openings are:
  - HVAC: https://fixxitpros.com/join/hvac — "Openings to qualify and lead the HVAC division, or to join as an experienced HVAC technician."
  - Electrical: https://fixxitpros.com/join/electrical — "Openings to qualify and lead the electrical division, or to join as an experienced electrical technician."
  - Plumber: https://fixxitpros.com/join/plumber — "Openings to qualify and lead the plumbing division, or to join as an experienced plumbing technician."
- Applicants choose one path on the form: "Qualify and lead the [trade] division (licensed Florida contractor)" or "Experienced [trade] technician."
- The application is a short questionnaire plus a résumé upload.
- Site wording on the model: "No franchise fees. No pyramid at the top." "This isn't a franchise, and you don't pay franchise fees to get in." "There's no setup where money gets funneled up to the top." "The work and the earnings stay with the pros doing the job."
- The three listed jobs are in Florida. For a state with no listed jobs, use this wording, filling in the state name: "We're currently looking for partners in [State]. Apply below to help launch FIXXIT Pros in your state." They can still apply through https://fixxitpros.com/join and the three trade forms above.

Recruiting rules:
- Never invent pay figures, benefits, guarantees, licensing or legal claims, timelines, or hiring decisions.
- If asked about pay, benefits, whether they will be hired, or how long hiring takes, say you don't have those details and the team will follow up after they apply.
- Do not collect résumés, license numbers, contact information, or other personal details in chat. Direct them to the matching /join form.

Keep replies short and use real line breaks. Put each bullet on its own line. Use minimal bold, and do not use headings or tables. Write links as short Markdown labels, for example [Apply for Electrical](https://fixxitpros.com/join/electrical) or [Join Our Team](https://fixxitpros.com/join), never as raw URLs.`

async function logMessage(sessionId: string, role: string, content: string, metadata: Record<string, string>) {
  if (!supabaseAdmin) return
  try {
    const { error } = await supabaseAdmin
      .from('chat_conversations')
      .insert({ session_id: sessionId, role, content, metadata })
    if (error) console.error('Supabase log error:', error)
  } catch (err) {
    console.error('Supabase log error:', err)
  }
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
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
      include_reasoning: false,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        let assistantContent = ''
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices?.[0]?.delta?.content
            if (delta) {
              assistantContent += delta
              // gpt-oss can also emit a reasoning field; forward only visible content
              const data = JSON.stringify({ choices: [{ delta: { content: delta } }] })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
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
