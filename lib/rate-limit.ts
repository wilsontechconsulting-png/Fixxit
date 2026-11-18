import { NextRequest } from 'next/server'

type Bucket = { times: number[] }

const buckets = new Map<string, Bucket>()

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0].trim()
    if (first) return first
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

/** Returns true if the request is allowed. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key) ?? { times: [] }
  bucket.times = bucket.times.filter((t) => now - t < windowMs)
  if (bucket.times.length >= limit) {
    buckets.set(key, bucket)
    return false
  }
  bucket.times.push(now)
  buckets.set(key, bucket)
  return true
}

export function rateLimitResponse() {
  return Response.json(
    { error: 'Too many requests. Please wait a moment and try again.' },
    { status: 429, headers: { 'Retry-After': '60' } },
  )
}
