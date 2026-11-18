'use client'
import { useState, useRef, useEffect, useLayoutEffect, type ReactNode } from 'react'
import Markdown, { defaultUrlTransform } from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { EMERGENCY_TYPES, FIRE_SAFETY_WARNING, GAS_SAFETY_WARNING, emergencyTypeById } from '@/lib/emergency-types'

function safeUrl(url: string) {
  const value = url.trim()
  if (/^(tel|mailto):/i.test(value)) return value
  return defaultUrlTransform(value)
}

function isFixxitHref(href?: string) {
  if (!href) return false
  if (href.startsWith('/') && !href.startsWith('//')) return true
  try {
    const url = new URL(href, 'https://fixxitpros.com')
    return url.hostname === 'fixxitpros.com' || url.hostname === 'www.fixxitpros.com'
  } catch {
    return false
  }
}

function AssistantMarkdown({ content }: { content: string }) {
  if (!content) return null
  return (
    <div className="chat-md">
      <Markdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        allowedElements={['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li']}
        unwrapDisallowed
        urlTransform={safeUrl}
        components={{
          a({ href, children }: { href?: string; children?: ReactNode }) {
            const internal = isFixxitHref(href)
            return (
              <a
                href={href}
                {...(internal
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}

const STORAGE_KEY = 'fixxit_chat_lead'
const MAX_PHOTOS = 3
const MAX_PHOTO_BYTES = 5 * 1024 * 1024

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface StoredLead {
  session_id: string
  lead_id: string
}

function generateSessionId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function readStoredLead(): StoredLead | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredLead
    if (parsed?.session_id && parsed?.lead_id) return parsed
  } catch {
    // ignore damaged storage
  }
  return null
}

function writeStoredLead(lead: StoredLead) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lead))
}

function clearStoredLead() {
  localStorage.removeItem(STORAGE_KEY)
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [gateReady, setGateReady] = useState(false)
  const [needsGate, setNeedsGate] = useState(true)
  const [gateError, setGateError] = useState('')
  const [gateBusy, setGateBusy] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the Fixxit assistant 🏠\n\nTell me what's going on, or snap a photo. I can:\n\n- Read photos of damage and tell you what likely needs fixing\n- Flag emergencies like leaks, gas smells or electrical hazards\n- Get you to the right pro\n\nIf this is urgent, tap **Emergency** below. If you smell gas, leave right away and call 911 from outside.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [emergencyStep, setEmergencyStep] = useState<'closed' | 'types' | 'confirm' | 'done'>('closed')
  const [emergencyType, setEmergencyType] = useState<string | null>(null)
  const [emergencyPhone, setEmergencyPhone] = useState('')
  const [emergencyNote, setEmergencyNote] = useState('')
  const [emergencyError, setEmergencyError] = useState('')
  const [emergencyBusy, setEmergencyBusy] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesAreaRef = useRef<HTMLDivElement>(null)
  const emergencyPanelRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef<string>(generateSessionId())

  useEffect(() => {
    const stored = readStoredLead()
    if (stored) {
      sessionIdRef.current = stored.session_id
      setNeedsGate(false)
    }
    setGateReady(true)
  }, [])

  useEffect(() => {
    if (open && !needsGate && emergencyStep === 'closed' && messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open, needsGate, emergencyStep])

  useLayoutEffect(() => {
    if (emergencyPanelRef.current) {
      emergencyPanelRef.current.scrollTop = 0
    }
    if (emergencyStep === 'closed' && messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = 0
    }
  }, [emergencyStep])

  useEffect(() => {
    function handleOpenChat() { setOpen(true) }
    window.addEventListener('openChat', handleOpenChat)
    return () => window.removeEventListener('openChat', handleOpenChat)
  }, [])

  function lockForNewLead() {
    clearStoredLead()
    sessionIdRef.current = generateSessionId()
    setNeedsGate(true)
    setGateError('')
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    if (gateBusy) return
    setGateError('')
    const digits = phone.replace(/\D/g, '')
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setGateError('First name, last name, phone, and email are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setGateError('Please enter a valid email address.')
      return
    }
    if (digits.length < 10) {
      setGateError('Please enter a phone number with at least 10 digits.')
      return
    }

    setGateBusy(true)
    try {
      const res = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          company: honeypot,
          session_id: sessionIdRef.current,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setGateError(typeof data.error === 'string' ? data.error : 'Unable to start chat. Please try again.')
        return
      }
      if (data.session_id) sessionIdRef.current = data.session_id
      writeStoredLead({ session_id: data.session_id, lead_id: data.lead_id })
      setNeedsGate(false)
    } catch {
      setGateError('Unable to start chat. Please try again.')
    } finally {
      setGateBusy(false)
    }
  }

  async function send() {
    const text = input.trim()
    if (!text || loading || needsGate) return

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, session_id: sessionIdRef.current }),
      })

      if (res.status === 401) {
        lockForNewLead()
        throw new Error('gated')
      }
      if (!res.ok) throw new Error('Failed')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let botMsg = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const parsed = JSON.parse(data)
                const delta = parsed.choices?.[0]?.delta?.content || ''
                botMsg += delta
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: 'assistant', content: botMsg }
                  return updated
                })
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'gated') {
        setMessages(prev => prev.slice(0, -1))
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting. Please call us at 480-795-5295.',
        }])
      }
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, MAX_PHOTOS)
    if (!files.length || uploading || needsGate) return

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        alert('Please select image files only')
        return
      }
      if (file.size > MAX_PHOTO_BYTES) {
        alert('Each image must be 5 MB or less')
        return
      }
    }

    setUploading(true)
    const label = files.length > 1 ? `📸 Analyzing ${files.length} photos...` : '📸 Analyzing photo...'
    setMessages(prev => [...prev, { role: 'user', content: label }])

    try {
      const formData = new FormData()
      for (const file of files) formData.append('images', file)
      formData.append('session_id', sessionIdRef.current)

      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json().catch(() => ({}))

      if (res.status === 401) {
        lockForNewLead()
        setMessages(prev => prev.slice(0, -1))
        return
      }

      const summary = typeof result.summary === 'string' ? result.summary : ''
      if (summary) {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'user',
            content: files.length > 1 ? `📸 ${files.length} photos uploaded` : '📸 Photo uploaded',
          }
          return [...updated, { role: 'assistant', content: summary }]
        })
      } else {
        throw new Error(typeof result.error === 'string' ? result.error : 'No analysis returned')
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I had trouble reviewing that photo. Please try again, or describe the problem in text and I'll be happy to help.",
      }])
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }


  async function openEmergency() {
    if (emergencyStep !== 'closed') {
      setEmergencyStep('closed')
      setEmergencyError('')
      return
    }
    setEmergencyError('')
    setEmergencyNote('')
    setEmergencyType(null)
    setEmergencyStep('types')
    let nextPhone = phone.trim()
    if (!nextPhone) {
      try {
        const res = await fetch(`/api/chat/lead?session_id=${encodeURIComponent(sessionIdRef.current)}`)
        const data = await res.json().catch(() => ({}))
        if (res.status === 401) {
          lockForNewLead()
          setEmergencyStep('closed')
          return
        }
        if (typeof data.phone === 'string') nextPhone = data.phone
      } catch {
        // visitor can enter the number on the confirm step
      }
    }
    setEmergencyPhone(nextPhone)
  }

  function chooseEmergencyType(id: string) {
    setEmergencyType(id)
    setEmergencyError('')
    setEmergencyStep('confirm')
  }

  async function submitEmergency(e: React.FormEvent) {
    e.preventDefault()
    if (emergencyBusy || !emergencyType) return
    setEmergencyError('')
    if (emergencyPhone.replace(/\D/g, '').length < 10) {
      setEmergencyError('Please enter a phone number with at least 10 digits.')
      return
    }
    setEmergencyBusy(true)
    try {
      const res = await fetch('/api/chat/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          emergency_type: emergencyType,
          phone: emergencyPhone.trim(),
          note: emergencyNote.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401) {
        lockForNewLead()
        setEmergencyStep('closed')
        return
      }
      if (!res.ok) {
        setEmergencyError(typeof data.error === 'string' ? data.error : 'Unable to send your emergency request. Please call 480-795-5295.')
        return
      }
      const selected = emergencyTypeById(emergencyType)
      const label = selected?.label || 'emergency'
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: `🚨 Emergency: ${label}` },
        {
          role: 'assistant',
          content: 'Your emergency request was sent to the Fixxit team. You can also call us now at [480-795-5295](tel:+14807955295).',
        },
      ])
      setEmergencyStep('done')
    } catch {
      setEmergencyError('Unable to send your emergency request. Please call 480-795-5295.')
    } finally {
      setEmergencyBusy(false)
    }
  }

  const showChat = gateReady && !needsGate
  const showEmergency = showChat && emergencyStep !== 'closed'
  const selectedEmergency = emergencyType ? emergencyTypeById(emergencyType) : undefined


  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🏠</div>
              <div className="chat-header-text">
                <strong>Fixxit Assistant</strong>
                <span>Online now</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          {gateReady && needsGate && (
            <div className="chat-gate">
              <p className="chat-gate-intro">
                To help protect against spam, and so we can contact you about your issue or the service you need, please share your first name, last name, phone number and email. Then you can keep chatting.
              </p>
              <form className="chat-gate-form" onSubmit={submitLead}>
                <div className="chat-gate-row">
                  <label className="chat-gate-field">
                    <span>First name</span>
                    <input
                      type="text"
                      name="first_name"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required
                    />
                  </label>
                  <label className="chat-gate-field">
                    <span>Last name</span>
                    <input
                      type="text"
                      name="last_name"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="chat-gate-phone">
                  <label className="chat-gate-field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </label>
                  <p className="chat-gate-consent">
                    By providing your number you agree to receive calls and texts from FIXXIT Pros about your request. Msg &amp; data rates may apply. Reply STOP to opt out.
                  </p>
                </div>
                <label className="chat-gate-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </label>
                <div className="chat-hp" aria-hidden="true">
                  <label htmlFor="chat-company">Company</label>
                  <input
                    id="chat-company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                  />
                </div>
                {gateError && <p className="chat-gate-error">{gateError}</p>}
                <button className="chat-gate-submit" type="submit" disabled={gateBusy}>
                  {gateBusy ? 'Starting…' : 'Continue to chat'}
                </button>
                <p className="chat-gate-privacy">
                  We use this information to follow up about your request and to help reduce spam. Read our{' '}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                </p>
              </form>
            </div>
          )}

          {showChat && showEmergency && (
            <div className="chat-emergency-panel" ref={emergencyPanelRef}>
              {emergencyStep === 'types' && (
                <>
                  <button type="button" className="chat-emergency-back" onClick={() => setEmergencyStep('closed')}>
                    ← Back to chat
                  </button>
                  <h3 className="chat-emergency-title">What type of emergency?</h3>
                  <p className="chat-emergency-lead">Choose the closest match. If you smell gas, leave right away and call 911 and your gas company from outside.</p>
                  <div className="chat-emergency-types">
                    {EMERGENCY_TYPES.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`chat-emergency-type${item.alertFirst ? ' chat-emergency-type-alert' : ''}`}
                        onClick={() => chooseEmergencyType(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {emergencyStep === 'confirm' && selectedEmergency && (
                <form className="chat-emergency-form" onSubmit={submitEmergency}>
                  <button type="button" className="chat-emergency-back" onClick={() => setEmergencyStep('types')}>
                    ← All emergency types
                  </button>
                  <h3 className="chat-emergency-title">{selectedEmergency.label}</h3>
                  {selectedEmergency.alertFirst && (
                    <p className="chat-emergency-alert">
                      {selectedEmergency.id === 'gas_smell' ? GAS_SAFETY_WARNING : FIRE_SAFETY_WARNING}
                    </p>
                  )}
                  {selectedEmergency.tip ? <p className="chat-emergency-tip">{selectedEmergency.tip}</p> : null}
                  <label className="chat-gate-field">
                    <span>Phone number</span>
                    <input
                      type="tel"
                      name="emergency_phone"
                      autoComplete="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      required
                    />
                  </label>
                  <label className="chat-gate-field">
                    <span>Short note (optional)</span>
                    <textarea
                      className="chat-emergency-note"
                      name="emergency_note"
                      value={emergencyNote}
                      onChange={(e) => setEmergencyNote(e.target.value)}
                      maxLength={500}
                      rows={3}
                      placeholder="Anything the team should know…"
                    />
                  </label>
                  {emergencyError && <p className="chat-gate-error">{emergencyError}</p>}
                  <button className="chat-emergency-submit" type="submit" disabled={emergencyBusy}>
                    {emergencyBusy ? 'Sending…' : 'Send emergency request'}
                  </button>
                </form>
              )}

              {emergencyStep === 'done' && (
                <div className="chat-emergency-done">
                  <h3 className="chat-emergency-title">Request sent</h3>
                  <p className="chat-emergency-tip">
                    Your emergency request was sent to the Fixxit team. You can also call us now.
                  </p>
                  <a className="chat-emergency-call" href="tel:+14807955295">
                    📞 Call Now 480-795-5295
                  </a>
                  <button type="button" className="chat-emergency-back" onClick={() => setEmergencyStep('closed')}>
                    ← Back to chat
                  </button>
                </div>
              )}
            </div>
          )}

          {showChat && !showEmergency && (
            <div className="chat-messages" ref={messagesAreaRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`}>
                  {msg.role === 'assistant' ? <AssistantMarkdown content={msg.content} /> : msg.content}
                </div>
              ))}
              {loading && (
                <div className="chat-typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {showChat && (
            <button
              type="button"
              className={`chat-emergency-bar${showEmergency ? ' is-open' : ''}`}
              onClick={openEmergency}
              aria-label="Report an emergency"
            >
              🚨 Emergency
            </button>
          )}

          {showChat && !showEmergency && (
            <>
              <div className="chat-quick-actions">
                <button
                  className="quick-action-btn quick-action-photo"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  aria-label="Upload photo"
                >
                  <span className="quick-action-icon">📸</span>
                  <span className="quick-action-text">{uploading ? 'Analyzing...' : 'Upload Photo'}</span>
                </button>
                <button
                  className="quick-action-btn quick-action-call"
                  onClick={() => window.location.href = 'tel:+14807955295'}
                  aria-label="Call now"
                >
                  <span className="quick-action-icon">📞</span>
                  <span className="quick-action-text">Call Now</span>
                </button>
                <button
                  className="quick-action-btn quick-action-quote"
                  onClick={() => window.open('https://fixxitpros.com/questions', '_blank')}
                  aria-label="Get a quote"
                >
                  <span className="quick-action-icon">📝</span>
                  <span className="quick-action-text">Get Quote</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <div className="chat-input-area">
                <textarea
                  className="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Describe the problem or upload a photo…"
                  rows={1}
                />
                <button
                  className="chat-send-btn"
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <button
        className="chat-toggle-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
