import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { analysisContext, isLead, logChatMessage, requireLead } from '@/lib/chat-leads'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are the Fixxit Pros assistant. Your job is to help homeowners describe their home service needs and connect them with local professionals who can help.

Services we connect people with: Plumbing, HVAC, Electrical, Roofing, Windows & Doors, Bath & Shower, Mowing, Air Duct & Carpet Cleaning, Landscaping, Siding.

Ask helpful questions to understand their problem. Be conversational, friendly, and concise. Once you understand their needs, guide them to submit a quote request.

Important: These are local people who can help - they may be working for us or subcontracting. Don't make promises about pricing or exact timing.

The chat has permanent action buttons:
- 🚨 Emergency (lets the visitor flag an urgent problem and send it to the Fixxit team)
- 📸 Upload Photo (users can upload images of their problem and get AI analysis)
- 📞 Call Now (888-229-5696)
- 📝 Get Quote (opens questions form at fixxitpros.com/questions)

You can mention these options in your responses (e.g., "You can upload a photo of the problem, use the Emergency button, call us now, or answer a few quick questions using the buttons below").

Safety first — always prioritize this over scheduling a pro:
- If the visitor mentions a gas smell, tell them to leave the house immediately and call 911 or the gas utility from a safe place. Do not tell them to flip switches or use phones or appliances inside.
- If they mention sparking or a burning smell, tell them to shut off the breaker if it is safe to do so, and to leave and call 911 if there is fire.
- If they mention major flooding, tell them to shut off the main water valve if they can do so safely, and to stay away from standing water near electrical outlets.
- Do not downplay emergencies. Point them to the red Emergency button and to Call Now at 888-229-5696, in addition to 911 when there is immediate danger.
- Never promise response times, prices, or guarantees.

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


type ChatTurn = { role: 'user' | 'assistant'; content: string }

function sanitizeMessages(input: unknown): ChatTurn[] {
  if (!Array.isArray(input)) return []
  const allowed = input.filter((item): item is ChatTurn => {
    if (!item || typeof item !== 'object') return false
    const role = (item as ChatTurn).role
    const content = (item as ChatTurn).content
    return (role === 'user' || role === 'assistant') && typeof content === 'string'
  })
  return allowed.slice(-30).map((item) => ({
    role: item.role,
    content: item.content.slice(0, 4000),
  }))
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`chat:${clientIp(req)}`, 40, 10 * 60 * 1000)) {
      return rateLimitResponse()
    }

    const body = await req.json()
    const lead = await requireLead(body?.session_id)
    if (!isLead(lead)) {
      return Response.json({ error: lead.error }, { status: lead.status })
    }

    const messages = sanitizeMessages(body?.messages)
    if (!messages.length) {
      return Response.json({ error: 'Please enter a message.' }, { status: 400 })
    }

    const metadata = {
      user_agent: req.headers.get('user-agent') ?? '',
      referer: req.headers.get('referer') ?? '',
    }

    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user') {
      logChatMessage(lead.session_id, 'user', lastMessage.content, metadata)
    }

    const stream = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + analysisContext(lead) },
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
              const data = JSON.stringify({ choices: [{ delta: { content: delta } }] })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } finally {
          controller.close()
          if (assistantContent) {
            logChatMessage(lead.session_id, 'assistant', assistantContent, metadata)
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
