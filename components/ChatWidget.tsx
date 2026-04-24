'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function generateSessionId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m the Fixxit assistant. What home service can I help you with today? 🏠',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef<string>(generateSessionId())

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  useEffect(() => {
    function handleOpenChat() { setOpen(true) }
    window.addEventListener('openChat', handleOpenChat)
    return () => window.removeEventListener('openChat', handleOpenChat)
  }, [])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

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
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please call us at 888-229-5696.',
      }])
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
    const file = e.target.files?.[0]
    if (!file || uploading) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setUploading(true)

    // Show uploading message
    setMessages(prev => [...prev, {
      role: 'user',
      content: '📸 Analyzing photo...'
    }])

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('session_id', sessionIdRef.current)

      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData
      })

      const result = await res.json()

      if (result.analysis) {
        // Replace "analyzing" message with result
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'user',
            content: '📸 Photo uploaded'
          }
          return updated
        })

        // Add AI analysis
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: result.analysis
        }])
      } else {
        throw new Error('No analysis returned')
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I had trouble analyzing that image. Please try again or describe your problem in text!'
      }])
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

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
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Quick Action Buttons */}
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
              onClick={() => window.location.href = 'tel:888-229-5696'}
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

          {/* Hidden file input */}
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            capture="environment"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />

          <div className="chat-input-area">
            <textarea
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Describe your home service need..."
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
