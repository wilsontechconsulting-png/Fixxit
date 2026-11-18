import { NextRequest } from 'next/server'
import { getChatSupabase } from '@/lib/join-supabase'
import { clientIp, rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import {
  isLead,
  requireLead,
  updateLeadAnalysis,
  type PhotoAnalysis,
} from '@/lib/chat-leads'
import {
  PHOTO_BUCKET,
  ensurePhotoBucket,
  notifyChatLead,
  tradeLabel,
  urgencyLabel,
} from '@/lib/chat-notify'

const GEMINI_MODEL = 'gemini-3.8-flash'

const MAX_IMAGES = 3
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
])

const TRADES = [
  'plumbing',
  'hvac',
  'electrical',
  'roofing',
  'windows_doors',
  'bath',
  'appliance',
  'general',
  'other',
] as const

const URGENCIES = ['low', 'medium', 'high', 'emergency'] as const
const CONFIDENCES = ['low', 'medium', 'high'] as const

const VISION_PROMPT = `You are a home service expert reviewing photos of a possible home repair issue.

Return JSON only, with:
- description: a short plain-language description of what likely needs fixing
- trade: one of plumbing, hvac, electrical, roofing, windows_doors, bath, appliance, general, other
- urgency: one of low, medium, high, emergency
- safety_note: a brief safety warning if there may be a gas, electrical, or water hazard; otherwise an empty string
- confidence: one of low, medium, high

Do not mention prices, cost ranges, or guarantees. This is a preliminary visual read, not a diagnosis.`

function collectImages(form: FormData): File[] {
  const files: File[] = []
  for (const key of ['images', 'image', 'photo', 'photos']) {
    for (const value of form.getAll(key)) {
      if (value instanceof File && value.size > 0) files.push(value)
    }
  }
  return files.slice(0, MAX_IMAGES)
}

function normalizeAnalysis(raw: unknown): PhotoAnalysis {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const trade = String(obj.trade || 'general').toLowerCase().replace(/[\s-]+/g, '_')
  const urgency = String(obj.urgency || 'medium').toLowerCase()
  const confidence = String(obj.confidence || 'medium').toLowerCase()
  const description = String(obj.description || '').trim()
  const safety_note = String(obj.safety_note || '').trim()
  return {
    description: description || 'We could not clearly identify the issue from this photo.',
    trade: (TRADES as readonly string[]).includes(trade) ? trade : 'other',
    urgency: (URGENCIES as readonly string[]).includes(urgency) ? urgency : 'medium',
    safety_note,
    confidence: (CONFIDENCES as readonly string[]).includes(confidence) ? confidence : 'medium',
  }
}

function formatAnalysisSummary(analysis: PhotoAnalysis, photoCount: number): string {
  const safety = analysis.safety_note
    ? `\n\n⚠️ ${analysis.safety_note}`
    : ''
  const countLabel = photoCount > 1 ? `${photoCount} photos` : 'this photo'
  return `Here's a preliminary read of ${countLabel}:

${analysis.description}

- **Trade:** ${tradeLabel(analysis.trade)}
- **Urgency:** ${urgencyLabel(analysis.urgency)}
- **Confidence:** ${analysis.confidence}${safety}

This is a preliminary read, not a diagnosis. A pro will confirm.`
}

async function analyzeWithGemini(images: { mimeType: string; data: string }[]): Promise<PhotoAnalysis> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim()
  if (!apiKey) throw new Error('Image analysis is unavailable')

  const parts: Array<Record<string, unknown>> = [
    { text: VISION_PROMPT },
    ...images.map((image) => ({
      inlineData: { mimeType: image.mimeType, data: image.data },
    })),
  ]

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              description: { type: 'STRING' },
              trade: { type: 'STRING', enum: [...TRADES] },
              urgency: { type: 'STRING', enum: [...URGENCIES] },
              safety_note: { type: 'STRING' },
              confidence: { type: 'STRING', enum: [...CONFIDENCES] },
            },
            required: ['description', 'trade', 'urgency', 'confidence'],
          },
        },
      }),
    },
  )

  if (!res.ok) {
    console.error('Gemini analysis failed', res.status)
    throw new Error('Failed to analyze image')
  }

  const payload = await res.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || ''
  try {
    return normalizeAnalysis(JSON.parse(text))
  } catch {
    console.error('Gemini analysis JSON parse failed')
    throw new Error('Failed to analyze image')
  }
}

function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'photo'
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`analyze:${clientIp(req)}`, 12, 10 * 60 * 1000)) {
      return rateLimitResponse()
    }
    const supabase = getChatSupabase()
    if (!supabase) {
      return Response.json({ error: 'Chat is temporarily unavailable.' }, { status: 503 })
    }

    const formData = await req.formData()
    const lead = await requireLead(formData.get('session_id'))
    if (!isLead(lead)) {
      return Response.json({ error: lead.error }, { status: lead.status })
    }

    const files = collectImages(formData)
    if (!files.length) {
      return Response.json({ error: 'Please upload an image.' }, { status: 400 })
    }
    for (const file of files) {
      if (!file.type.startsWith('image/') || (file.type && !ALLOWED_TYPES.has(file.type) && file.type !== 'image/jpg')) {
        return Response.json({ error: 'Please upload image files only (JPEG, PNG, WebP, or GIF).' }, { status: 400 })
      }
      if (file.size > MAX_BYTES) {
        return Response.json({ error: 'Each image must be 5 MB or less.' }, { status: 400 })
      }
    }

    const prepared = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer()
        return {
          file,
          mimeType: file.type || 'image/jpeg',
          data: Buffer.from(buffer).toString('base64'),
          bytes: Buffer.from(buffer),
        }
      }),
    )

    const analysis = await analyzeWithGemini(
      prepared.map(({ mimeType, data }) => ({ mimeType, data })),
    )

    await ensurePhotoBucket()
    const stamp = Date.now()
    const photo_paths: string[] = []
    for (const [index, item] of prepared.entries()) {
      const path = `${lead.session_id}/${stamp}-${index + 1}-${safeFileName(item.file.name)}`
      const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, item.bytes, {
        contentType: item.mimeType,
        upsert: false,
      })
      if (error) {
        console.error('chat photo upload failed')
        return Response.json({ error: 'Could not save the photo. Please try again.' }, { status: 500 })
      }
      photo_paths.push(path)
    }

    const updated = await updateLeadAnalysis(lead, {
      trade_category: analysis.trade,
      urgency: analysis.urgency,
      confidence: analysis.confidence,
      analysis,
      photo_paths,
    })

    notifyChatLead({
      kind: 'triage',
      lead: updated,
      analysis,
      newPhotoPaths: photo_paths,
    }).catch(() => {})

    const summary = formatAnalysisSummary(analysis, files.length)

    if (supabase) {
      const metadata = {
        user_agent: req.headers.get('user-agent') ?? '',
        referer: req.headers.get('referer') ?? '',
        photo_count: files.length,
        image_analysis: true,
      }
      await supabase.from('chat_conversations').insert([
        {
          session_id: lead.session_id,
          role: 'user',
          content: files.length > 1 ? `[${files.length} photos uploaded for analysis]` : '[Photo uploaded for analysis]',
          metadata,
        },
        {
          session_id: lead.session_id,
          role: 'assistant',
          content: summary,
          metadata: { ...metadata, analysis },
        },
      ])
    }

    return Response.json({
      success: true,
      analysis,
      summary,
    })
  } catch (error) {
    console.error('Image analysis error')
    return Response.json({
      error: 'Failed to analyze image',
      summary: "Sorry, I had trouble reviewing that photo. Please try again, or describe the problem in text and I'll be happy to help.",
    }, { status: 500 })
  }
}
