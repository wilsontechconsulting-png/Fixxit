import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Siding Services — Repair, Replacement & Installation | Fixxit Pros',
  description: 'Damaged, faded, or failing siding — licensed contractors for repair and full replacement in vinyl, fiber cement, wood, and more. Call 888-229-5696.',
}

const services = [
  'Vinyl Siding Repair & Replacement',
  'Fiber Cement Siding Installation',
  'Wood Siding Repair & Replacement',
  'Engineered Wood Siding',
  'Aluminum Siding Repair',
  'Hardie Board Installation',
  'Full Siding Replacement & Removal',
  'Storm Damage Siding Repair',
  'Siding Panel Replacement (Partial)',
  'Rot Repair & Prevention',
  'Exterior Trim Repair & Replacement',
  'Fascia & Soffit Repair',
  'Caulking & Sealing',
  'Moisture Barrier Installation',
  'Siding Color Consultation',
  'Insurance Claim Assistance',
]

const painPoints = [
  'You see cracked, warped, or missing siding panels that are letting moisture behind the wall',
  'Your siding is so faded or chalky that it makes the whole house look dated',
  "You've had siding issues for a while and you've been putting it off — but water damage is getting worse",
  "Your home's exterior just doesn't look good anymore and it's affecting curb appeal and value",
  'You had storm damage and need to file an insurance claim — but you don\'t know where to start',
  'There are soft spots or rot visible at the bottom of your siding near the foundation',
  'You\'re getting ready to sell and you know the exterior needs attention before listing',
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Workmanship Warranty', desc: 'All siding work is backed by a full 12-month workmanship warranty in addition to any manufacturer warranties on materials.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You get a detailed written quote before any work begins. No scope creep. No invoices that surprise you after the job is done.' },
  { icon: '⚡', title: 'Fast Scheduling', desc: 'Most siding assessments happen within 48–72 hours. Storm damage repairs are prioritized for faster response.' },
  { icon: '✅', title: 'Licensed & Insured', desc: 'Every siding contractor is fully licensed, insured, and background-checked. Siding work that fails creates moisture problems that cost far more to fix.' },
]

const faqs = [
  {
    question: 'Can you repair just a section of siding, or do I need to replace it all?',
    answer: "In many cases, we can repair or replace individual damaged panels without touching the rest. This is especially true with vinyl siding, where panels can be replaced one at a time. However, if your siding is significantly faded, matching colors exactly can be difficult — we'll be upfront with you about what to expect.",
  },
  {
    question: 'What type of siding lasts the longest?',
    answer: "Fiber cement (like Hardie Board) is generally considered the most durable option — it resists rot, insects, fire, and impact damage, and typically lasts 30–50 years. Vinyl is less expensive and still lasts 20–40 years with minimal maintenance. We can walk you through the tradeoffs based on your budget and climate.",
  },
  {
    question: 'My siding has soft spots near the bottom — is that a big problem?',
    answer: "Yes — soft spots usually indicate wood rot behind the siding, which means moisture has been getting in. This needs to be addressed quickly: rot spreads to sheathing, framing, and insulation if left untreated. We'll assess the full extent of the damage and give you an honest picture of what needs to be repaired.",
  },
  {
    question: 'Can you help me with an insurance claim for storm damage?',
    answer: "Yes. We document the damage thoroughly with photos, prepare a detailed damage report, and can meet with your insurance adjuster on-site. We have experience with storm damage claims and will make the process as straightforward as possible.",
  },
  {
    question: 'How long does a full siding replacement take?',
    answer: "A full siding replacement on a typical 2,000 sq ft home typically takes 3–7 days depending on the size, complexity, number of stories, and material chosen. We give you a realistic timeline upfront and work efficiently to minimize disruption.",
  },
]

export default function SidingPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Siding Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Damaged or Faded Siding?<br />Protect Your Home&apos;s<br />Value and Curb Appeal.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Failing siding lets moisture into your walls — and that leads to rot, mold, and expensive structural repairs. Our licensed contractors assess, repair, and replace siding the right way with a 1-year warranty.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['1-Year Warranty', 'Upfront Pricing', 'Storm Damage Priority', 'Licensed & Insured'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, background: 'var(--yellow)', color: 'var(--navy)', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section style={{ padding: '5rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">We Handle ANY Siding Project</h2>
            <p className="section-subheading">Patch repairs to full replacements — all siding types, all situations, backed by warranty.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem', marginBottom: '2.5rem' }} className="reveal">
            {services.map(svc => (
              <div key={svc} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 900, flexShrink: 0 }}>✓</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-800)', fontSize: '0.95rem' }}>{svc}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Not sure about your siding type or what you need? We&apos;ll assess it and give you straight answers.</p>
            <Link href="/questions" className="btn btn-primary btn-lg">Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="reveal">
              <div style={{ display: 'inline-block', width: 60, height: 4, background: 'var(--yellow)', borderRadius: 99, marginBottom: '1rem' }} />
              <h2 className="section-heading">Siding Problems to Not Ignore</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Siding issues are easy to put off — until they turn into a water damage situation that costs 5x more to fix.
              </p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }} className="reveal">
              {painPoints.map(point => (
                <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', padding: '1rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <span style={{ color: '#dc2626', fontSize: '1.1rem', flexShrink: 0, marginTop: '0.15rem' }}>⚠</span>
                  <span style={{ color: 'var(--gray-700)', lineHeight: 1.65 }}>{point}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call Now — 888-229-5696</a>
              <Link href="/questions" className="btn btn-blue btn-lg">Get a Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="trust">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Siding</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>Siding done wrong leads to water intrusion and structural damage. We do it right — and we back it up.</p>
          </div>
          <div className="trust-grid">
            {trustCards.map((card, i) => (
              <div key={card.title} className={`trust-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="trust-icon-emoji">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="trust-footer reveal">
            <p>We always check what&apos;s behind the siding before closing it up. <strong>If we find rot or moisture damage, we tell you — and fix it — before sealing it back in.</strong></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Straightforward process, quality results.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us About the Siding Issue</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Describe what you&apos;re seeing — damage type, location, age of siding, and if you have photos, send them. We&apos;ll get you an assessment scheduled quickly.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Assessment & Written Quote</h3>
                  <p>We connect you with a licensed siding contractor who inspects the damage, identifies any underlying moisture issues, and gives you a detailed written quote. No pressure. Full transparency.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Installation — Done Right, On Time</h3>
                  <p>Your crew installs to manufacturer specs, checks the moisture barrier, and cleans up completely. All work is backed by the 1-year workmanship warranty.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '5rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">What Siding Service Typically Costs</h2>
            <p className="section-subheading">Realistic ranges for repairs and replacements — exact quotes after an assessment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Siding Panel Repair (Partial)', range: '$200 – $800', note: 'Storm damage, cracks, isolated sections' },
              { service: 'Vinyl Siding Replacement', range: '$5,000 – $14,000', note: 'Full home, installed with moisture barrier' },
              { service: 'Fiber Cement (Hardie)', range: '$8,000 – $20,000', note: 'Most durable option, 30–50 year lifespan' },
              { service: 'Wood Siding Repair', range: '$500 – $2,500', note: 'Rot repair, board replacement, painting' },
              { service: 'Fascia & Soffit Repair', range: '$400 – $1,200', note: 'Exterior trim, full repair or replacement' },
              { service: 'Rot Remediation', range: '$500 – $3,000', note: 'Behind-siding rot removal and replacement' },
            ].map(item => (
              <div key={item.service} style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{item.service}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--blue)', fontFamily: 'var(--font-heading)', marginBottom: '0.375rem' }}>{item.range}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--gray-600)' }}>{item.note}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--white)', border: '2px solid var(--yellow)', borderRadius: '12px', padding: '1.5rem 2rem', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }} className="reveal">
            <p style={{ color: 'var(--gray-700)', margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>Detailed written quote before any work starts.</strong> You know exactly what you&apos;re getting and what it costs. Always.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Siding Questions Answered</h2>
            <p className="section-subheading">What homeowners want to know before starting a siding project.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Questions about your specific siding situation? Call us.</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Your Home&apos;s Exterior Is the First Thing People See.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Don&apos;t let damaged siding drag down your home&apos;s value or invite moisture problems. Get a free assessment today.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Licensed · Insured · Background-Checked · 1-Year Workmanship Warranty
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
