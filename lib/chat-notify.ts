import { Resend } from 'resend'
import { getChatSupabase } from '@/lib/join-supabase'
import type { ChatLead, PhotoAnalysis } from '@/lib/chat-leads'
import type { ChatEmergency } from '@/lib/chat-emergencies'
import { emergencyLabel } from '@/lib/emergency-types'

/** Map a trade category to a notification inbox. Empty values fall back to NOTIFY_EMAIL. */
export const TRADE_RECIPIENTS: Record<string, string> = {
  plumbing: '',
  hvac: '',
  electrical: '',
  roofing: '',
  windows_doors: '',
  bath: '',
  appliance: '',
  general: '',
  other: '',
}

export const TRADE_LABELS: Record<string, string> = {
  plumbing: 'Plumbing',
  hvac: 'HVAC',
  electrical: 'Electrical',
  roofing: 'Roofing',
  windows_doors: 'Windows & Doors',
  bath: 'Bath & Shower',
  appliance: 'Appliance',
  general: 'General',
  other: 'Other',
}

export const URGENCY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  emergency: 'Emergency',
}

const SIGNED_URL_TTL_SEC = 60 * 60 * 24 * 7
const PHOTO_BUCKET = 'chat-photos'

export function recipientForTrade(trade?: string | null): string | undefined {
  const fallback = process.env.NOTIFY_EMAIL?.trim()
  if (trade && TRADE_RECIPIENTS[trade]) return TRADE_RECIPIENTS[trade]
  return fallback || undefined
}

export function tradeLabel(trade?: string | null): string {
  if (!trade) return 'Unknown'
  return TRADE_LABELS[trade] || trade
}

export function urgencyLabel(urgency?: string | null): string {
  if (!urgency) return 'Unknown'
  return URGENCY_LABELS[urgency] || urgency
}

async function signedPhotoLinks(paths: string[]): Promise<string[]> {
  const supabase = getChatSupabase()
  if (!supabase || !paths.length) return []
  const links: string[] = []
  for (const path of paths) {
    const { data, error } = await supabase.storage
      .from(PHOTO_BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL_SEC)
    if (error || !data?.signedUrl) {
      console.error('signed url failed')
      links.push(`(unavailable: ${path})`)
    } else {
      links.push(data.signedUrl)
    }
  }
  return links
}

export async function ensurePhotoBucket() {
  const supabase = getChatSupabase()
  if (!supabase) return
  const { data } = await supabase.storage.getBucket(PHOTO_BUCKET)
  if (data) return
  const { error } = await supabase.storage.createBucket(PHOTO_BUCKET, {
    public: false,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/heic',
      'image/heif',
    ],
  })
  if (error && !/already exists|duplicate/i.test(error.message)) {
    console.error('chat-photos bucket', error.message)
  }
}

export async function notifyChatLead(opts: {
  kind: 'created' | 'triage'
  lead: ChatLead
  analysis?: PhotoAnalysis
  newPhotoPaths?: string[]
}) {
  const to = recipientForTrade(opts.analysis?.trade || opts.lead.trade_category)
  const from = process.env.RESEND_FROM?.trim()
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!to || !from || !apiKey) return

  const trade = opts.analysis?.trade || opts.lead.trade_category
  const urgency = opts.analysis?.urgency || opts.lead.urgency
  const description = opts.analysis?.description || ''
  const safety = opts.analysis?.safety_note || ''
  const photoPaths = opts.newPhotoPaths?.length ? opts.newPhotoPaths : []
  const links = await signedPhotoLinks(photoPaths)

  const subject =
    opts.kind === 'created'
      ? 'New chat lead'
      : `New chat lead: ${tradeLabel(trade)} — ${urgencyLabel(urgency)}`

  const lines = [
    opts.kind === 'created' ? 'A new visitor started a FIXXIT Pros chat.' : 'Photo triage completed for a FIXXIT Pros chat lead.',
    '',
    `Name: ${opts.lead.first_name} ${opts.lead.last_name}`,
    `Phone: ${opts.lead.phone}`,
    `Email: ${opts.lead.email}`,
    `Lead ID: ${opts.lead.id}`,
    `Session: ${opts.lead.session_id}`,
  ]

  if (opts.kind === 'triage') {
    lines.push(
      `Trade: ${tradeLabel(trade)}`,
      `Urgency: ${urgencyLabel(urgency)}`,
      `Confidence: ${opts.analysis?.confidence || '—'}`,
      `Description: ${description || '—'}`,
      `Safety note: ${safety || 'none'}`,
      '',
      'Photo links (valid 7 days):',
      ...(links.length ? links.map((url, i) => `${i + 1}. ${url}`) : ['None']),
    )
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to: [to],
      subject,
      text: lines.join('\n'),
    })
  } catch (err) {
    console.error('chat notify email failed')
  }
}

export { PHOTO_BUCKET }


function triageLines(analysis: ChatLead['analysis'] | ChatEmergency['photo_triage']): string[] {
  const items = Array.isArray(analysis) ? analysis : analysis ? [analysis] : []
  if (!items.length) return ['Photo triage: none']
  const lines = ['Photo triage:']
  items.forEach((item, i) => {
    const n = items.length > 1 ? ` ${i + 1}` : ''
    lines.push(
      `  Review${n}: ${item.description || '—'}`,
      `  Trade: ${item.trade || '—'}`,
      `  Urgency: ${item.urgency || '—'}`,
      `  Confidence: ${item.confidence || '—'}`,
      `  Safety note: ${item.safety_note || 'none'}`,
    )
  })
  return lines
}

export async function notifyEmergency(opts: { lead: ChatLead; emergency: ChatEmergency }) {
  const to = process.env.NOTIFY_EMAIL?.trim()
  const from = process.env.RESEND_FROM?.trim()
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!to || !from || !apiKey) return

  const name = `${opts.lead.first_name} ${opts.lead.last_name}`.trim()
  const typeLabel = emergencyLabel(opts.emergency.emergency_type)
  const subject = `🚨 EMERGENCY: ${typeLabel} – ${name}`
  const triage = opts.emergency.photo_triage ?? opts.lead.analysis
  const lines = [
    'An emergency request was submitted in the FIXXIT Pros chat.',
    '',
    `Name: ${name}`,
    `Phone: ${opts.emergency.phone}`,
    `Email: ${opts.lead.email}`,
    `Type: ${typeLabel}`,
    `Note: ${opts.emergency.note || '—'}`,
    `Emergency ID: ${opts.emergency.id}`,
    `Lead ID: ${opts.lead.id}`,
    `Session: ${opts.lead.session_id}`,
    '',
    ...triageLines(triage),
  ]

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to: [to],
      subject,
      text: lines.join('\n'),
    })
  } catch (err) {
    console.error('emergency notify email failed')
  }
}
