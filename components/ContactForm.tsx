'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

const services = [
  'Plumbing', 'HVAC', 'Electrical', 'Roofing', 'Windows & Doors',
  'Bath & Shower', 'Mowing & Yard Work', 'Air Duct & Carpet', 'Landscaping', 'Siding', 'Other',
]

export default function ContactForm({ prefill }: { prefill?: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const loadTime = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot check
    if (data.get('bot-field')) return

    // Timing check
    if (Date.now() - loadTime.current < 3000) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/forms/quote', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(data)),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-image-col">
            <Image
              src="/images/Contact_fixxit.png"
              alt="Contact Fixxit"
              width={500}
              height={600}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <div className="contact-form-col">
            {submitted ? (
              <div className="form-success visible">
                <div className="form-success-icon">✅</div>
                <h3>Request Received!</h3>
                <p>We&apos;ll connect you with the right professional within 24 hours. Check your email for confirmation.</p>
              </div>
            ) : (
              <>
                <h2>Get a Free Quote</h2>
                <p className="form-subtitle">Tell us about your project and we&apos;ll connect you with the right pro.</p>
                <form onSubmit={handleSubmit} noValidate>
                  <input type="text" name="bot-field" className="honey-field" tabIndex={-1} autoComplete="off" />
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input type="text" id="firstName" name="firstName" required placeholder="Jane" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required placeholder="Smith" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input type="tel" id="phone" name="phone" required placeholder="(555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input type="email" id="email" name="email" required placeholder="jane@example.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="zip">Zip Code *</label>
                      <input type="text" id="zip" name="zip" required placeholder="12345" maxLength={10} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service Type *</label>
                      <select id="service" name="service" required defaultValue="">
                        <option value="" disabled>Select a service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Describe Your Project</label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Tell us more about what you need help with..."
                      defaultValue={prefill || ''}
                    />
                  </div>
                  {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{error}</p>}
                  <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Get My Free Quote →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
