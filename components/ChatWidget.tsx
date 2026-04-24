'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  buttons?: Array<{
    text: string
    action: 'call' | 'link' | 'form'
    value: string
  }>
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
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
      let buttons: Message['buttons'] = undefined

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
                // Strip [BUTTONS:...] during streaming for clean display
                const displayMsg = botMsg.replace(/\[BUTTONS:.*?\]/g, '').trim()
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: 'assistant', content: displayMsg }
                  return updated
                })
              } catch {
                // skip malformed chunks
              }
            }
          }
        }

        // Parse buttons from complete message
        const buttonMatch = botMsg.match(/\[BUTTONS:(.*?)\]/)
        if (buttonMatch) {
          try {
            buttons = JSON.parse(buttonMatch[1])
          } catch (e) {
            console.error('Failed to parse buttons:', e)
          }
        }
        
        // Clean message (remove button markup)
        const cleanMsg = botMsg.replace(/\[BUTTONS:.*?\]/g, '').trim()

        // Update final message with clean content and parsed buttons
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: cleanMsg, buttons }
          return updated
        })
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
                {msg.buttons && msg.buttons.length > 0 && (
                  <div className="chat-buttons">
                    {msg.buttons.map((btn, btnIndex) => (
                      <button
                        key={btnIndex}
                        className="chat-action-btn"
                        onClick={() => {
                          if (btn.action === 'call') {
                            window.location.href = btn.value
                          } else if (btn.action === 'link') {
                            window.open(btn.value, '_blank')
                          } else if (btn.action === 'form') {
                            window.location.href = btn.value
                          }
                        }}
                      >
                        {btn.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
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
