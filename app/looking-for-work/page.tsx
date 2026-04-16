'use client'
import { useState, useRef } from 'react'
import ScrollAnimations from '@/components/ScrollAnimations'

const subServices = [
  'Plumbing', 'HVAC', 'Electrical', 'Roofing', 'Windows & Doors',
  'Bath & Shower', 'Mowing', 'Air Duct & Carpet', 'Landscaping', 'Siding',
]

const positions = [
  'Customer Success', 'Operations', 'Sales', 'Marketing',
  'Field Tech', 'Account Manager', 'Other',
]

function SubcontractorForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const loadTime = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (Date.now() - loadTime.current < 3000) return
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('bot-field-sub')) return
    setLoading(true)
    try {
      const services = subServices.filter(s => data.get(`service_${s}`))
      const res = await fetch('/api/forms/subcontractor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          phone: data.get('phone'),
          services,
          message: data.get('message'),
        }),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-success visible">
        <div className="form-success-icon">✅</div>
        <h3>Inquiry Received!</h3>
        <p>We&apos;ll review your information and be in touch within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="text" name="bot-field-sub" className="honey-field" tabIndex={-1} autoComplete="off" />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="sub-name">Full Name *</label>
          <input type="text" id="sub-name" name="fullName" required placeholder="John Smith" />
        </div>
        <div className="form-group">
          <label htmlFor="sub-email">Email *</label>
          <input type="email" id="sub-email" name="email" required placeholder="john@example.com" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="sub-phone">Phone *</label>
        <input type="tel" id="sub-phone" name="phone" required placeholder="(555) 000-0000" />
      </div>
      <div className="form-group">
        <label>Services Offered</label>
        <div className="services-checkbox-grid">
          {subServices.map(s => (
            <label key={s} className="checkbox-item">
              <input type="checkbox" name={`service_${s}`} value={s} />
              {s}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="sub-message">Tell Us About Your Experience</label>
        <textarea id="sub-message" name="message" placeholder="Years of experience, certifications, service area..." />
      </div>
      <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Subcontractor Inquiry →'}
      </button>
    </form>
  )
}

function EmployeeForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const loadTime = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (Date.now() - loadTime.current < 3000) return
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('bot-field-emp')) return
    setLoading(true)
    try {
      const res = await fetch('/api/forms/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          phone: data.get('phone'),
          position: data.get('position'),
          coverNote: data.get('coverNote'),
        }),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-success visible">
        <div className="form-success-icon">✅</div>
        <h3>Application Received!</h3>
        <p>Thanks for your interest! We&apos;ll review your application and be in touch if there&apos;s a good fit.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="text" name="bot-field-emp" className="honey-field" tabIndex={-1} autoComplete="off" />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="emp-name">Full Name *</label>
          <input type="text" id="emp-name" name="fullName" required placeholder="Jane Doe" />
        </div>
        <div className="form-group">
          <label htmlFor="emp-email">Email *</label>
          <input type="email" id="emp-email" name="email" required placeholder="jane@example.com" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="emp-phone">Phone *</label>
          <input type="tel" id="emp-phone" name="phone" required placeholder="(555) 000-0000" />
        </div>
        <div className="form-group">
          <label htmlFor="emp-position">Position *</label>
          <select id="emp-position" name="position" required defaultValue="">
            <option value="" disabled>Select a position</option>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="emp-cover">Cover Note</label>
        <textarea id="emp-cover" name="coverNote" placeholder="Tell us why you want to join Fixxit and what you bring to the team..." />
      </div>
      <button type="submit" className="btn btn-blue form-submit-btn" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Application →'}
      </button>
    </form>
  )
}

export default function LookingForWorkPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="service-page-hero">
        <div className="container">
          <h1>Join the Fixxit Network</h1>
          <p>Whether you&apos;re a skilled contractor or looking for a career in home services, we&apos;d love to connect.</p>
        </div>
      </section>
      <section className="work-forms">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="work-form-section reveal">
            <h2>🔧 Subcontractor Inquiry</h2>
            <p className="form-desc">
              Are you a licensed contractor looking to grow your business? Join our network and get connected with homeowners in your area.
            </p>
            <SubcontractorForm />
          </div>
          <div className="work-form-section reveal">
            <h2>💼 Employee Application</h2>
            <p className="form-desc">
              Interested in working directly for Fixxit Pros? We&apos;re always looking for talented people to join our team.
            </p>
            <EmployeeForm />
          </div>
        </div>
      </section>
    </>
  )
}
