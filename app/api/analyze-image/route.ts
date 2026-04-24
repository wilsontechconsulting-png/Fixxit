import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabaseAdmin } from '@/lib/supabase'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

const VISION_PROMPT = `You are a home service expert analyzing images of home repair problems.

Analyze this image and provide:
1. What type of problem you see (plumbing, HVAC, electrical, roofing, etc.)
2. Specific issue description
3. Severity level (minor, moderate, urgent, emergency)
4. Typical repair cost range
5. Brief recommendation

Be conversational, friendly, and helpful. Keep response under 150 words.

Example response:
"I can see you have a leaking P-trap under your kitchen sink. This is a common plumbing issue where the connection has come loose or the gasket has worn out. 

Severity: Moderate - not an emergency but should be fixed soon to prevent water damage.

Typical cost: $150-250 for P-trap replacement including labor and parts.

Recommendation: This is a straightforward repair that typically takes 30-60 minutes. You can call us now for same-day service or submit a quote request to schedule at your convenience."`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as File
    const sessionId = formData.get('session_id') as string

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 })
    }

    // Convert image to base64
    const buffer = await image.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    // Prepare image data for Gemini
    const imagePart = {
      inlineData: {
        data: base64,
        mimeType: image.type
      }
    }

    // Call Gemini Vision API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const result = await model.generateContent([VISION_PROMPT, imagePart])
    const analysis = result.response.text()

    // Log to Supabase
    if (supabaseAdmin) {
      const metadata = {
        user_agent: req.headers.get('user-agent') ?? '',
        referer: req.headers.get('referer') ?? '',
        image_type: image.type,
        image_size: image.size,
      }

      // Log image upload
      await supabaseAdmin.from('chat_conversations').insert({
        session_id: sessionId ?? 'unknown',
        role: 'user',
        content: '[Photo uploaded for analysis]',
        metadata
      })

      // Log AI analysis
      await supabaseAdmin.from('chat_conversations').insert({
        session_id: sessionId ?? 'unknown',
        role: 'assistant',
        content: analysis,
        metadata: { ...metadata, image_analysis: true }
      })
    }

    return Response.json({ 
      analysis,
      success: true 
    })

  } catch (error) {
    console.error('Image analysis error:', error)
    return Response.json({ 
      error: 'Failed to analyze image',
      analysis: 'Sorry, I had trouble analyzing that image. Please try again or describe your problem in text, and I\'ll be happy to help!'
    }, { status: 500 })
  }
}
