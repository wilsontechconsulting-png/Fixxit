import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Electrical Services — Panel Upgrades, Wiring & Outlet Repair | Fixxit Pros',
  description: 'Licensed electricians for panel upgrades, outlet repair, flickering lights, and code-compliant installations. Upfront pricing, 1-year warranty. Call 888-229-5696.',
}

const services = [
  'Electrical Panel Upgrades',
  'Circuit Breaker Repair & Replacement',
  'Outlet & Switch Installation',
  'GFCI Outlet Installation',
  'Whole-Home Rewiring',
  'Electrical Safety Inspections',
  'Ceiling Fan Installation',
  'Light Fixture Installation & Repair',
  'Recessed Lighting Installation',
  'Dimmer Switch Installation',
  'Smoke & Carbon Monoxide Detectors',
  'EV Charger Installation',
  'Outdoor Lighting & Landscape Lighting',
  'Generator Installation & Service',
  'Surge Protection Installation',
  'Home Office Electrical Work',
]

const painPoints = [
  'Your circuit breaker trips regularly — especially when using multiple appliances',
  'Lights flicker or dim when you turn on the dryer, microwave, or HVAC',
  'You have outlets that don\'t work, spark when you plug something in, or feel warm to the touch',
  "Your home still has aluminum wiring or a fuse box — and you know that's a liability",
  "You're adding a home office, workshop, or EV charger and need a dedicated circuit",
  "You bought an older home and you're not sure the wiring is safe",
  "Your electric bill spiked and you can't figure out why",
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Warranty', desc: 'All electrical work is backed by a full 12-month warranty. Code-compliant work that passes inspection — or we fix it free.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You get the price before any work starts. No hourly rate mysteries. No surprise charges when your panel is already open.' },
  { icon: '⚡', title: 'Fast Scheduling', desc: 'Most electrical jobs are scheduled within 24–48 hours. Electrical emergencies (no power, burning smell) are prioritized for same-day.' },
  { icon: '✅', title: 'Licensed & Code-Compliant', desc: 'Every electrician is fully licensed, insured, and pulls permits when required. All work meets current electrical code.' },
]

const faqs = [
  {
    question: 'Is it safe to use my home if a breaker keeps tripping?',
    answer: "A constantly tripping breaker means that circuit is being overloaded — or there's a fault somewhere. Keep resetting it, and you risk damaging appliances or starting a fire. Don't ignore it; call us to diagnose the cause.",
  },
  {
    question: 'Do I need a permit for electrical work?',
    answer: "It depends on the scope. Simple outlet replacements typically don't require permits. Panel upgrades, new circuits, and rewiring usually do. Our licensed electricians handle permit requirements for you — we know what needs permits in your area.",
  },
  {
    question: 'How do I know if my home has outdated or unsafe wiring?',
    answer: "Signs include: aluminum wiring (common in homes built 1965-1973), fuse boxes instead of circuit breakers, two-prong ungrounded outlets, cloth-wrapped wiring, or frequent breaker trips. A safety inspection will identify any hazards and give you a complete picture.",
  },
  {
    question: 'Can you install an EV charger in my garage?',
    answer: 'Yes — EV charger installation is one of our most requested services right now. A Level 2 charger (240V) requires a dedicated 40–50 amp circuit. We assess your panel capacity, run the circuit, install the charger, and ensure everything is code-compliant.',
  },
  {
    question: 'What does a panel upgrade cost and do I actually need one?',
    answer: "Panel upgrades typically run $1,500–$4,000 depending on your service size and local permit costs. You likely need one if: your panel is under 100 amps, you're adding high-draw appliances (EV charger, hot tub, central AC), or your current panel is a known fire hazard brand. We'll assess yours honestly.",
  },
]

export default function ElectricalPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Electrical Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Flickering Lights?<br />Tripping Breakers?<br />Licensed Electricians Ready.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Electrical issues aren&apos;t just annoying — they can be dangerous. Our licensed electricians diagnose the root cause, explain it clearly, and fix it to code — with an upfront price and a 1-year warranty.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['1-Year Warranty', 'Code-Compliant Work', 'Upfront Pricing', 'Licensed & Insured'].map(badge => (
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
            <h2 className="section-heading">We Handle ANY Electrical Issue</h2>
            <p className="section-subheading">From a dead outlet to a full panel upgrade — licensed electricians who do it right and to code.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Electrical emergency? Burning smell or no power? Call now.</p>
            <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call Now — 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="reveal">
              <div style={{ display: 'inline-block', width: 60, height: 4, background: 'var(--yellow)', borderRadius: 99, marginBottom: '1rem' }} />
              <h2 className="section-heading">Electrical Warning Signs to Not Ignore</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Electrical problems rarely fix themselves. Most get worse — and a few create real fire and safety risks.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Electrical Work</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>Never DIY your electrical. Never hire an unlicensed handyman. Here&apos;s why that matters.</p>
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
            <p>Unlicensed electrical work can void your homeowner&apos;s insurance and create hidden fire hazards. <strong>Every Fixxit electrician is licensed, pulls permits when required, and does the job to code.</strong></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Safe, transparent, and done to code.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us What&apos;s Happening</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Describe the electrical issue — flickering, tripping, no power, or an upgrade you need. We&apos;ll get you scheduled fast.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Match You With a Licensed Electrician</h3>
                  <p>We connect you with a vetted, licensed electrician in your area — typically scheduled within 24–48 hours. Electrical emergencies are prioritized for same-day.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Diagnosis, Upfront Quote, Fixed to Code</h3>
                  <p>Your electrician diagnoses the issue, explains it in plain language, quotes the exact price, and gets to work after you approve. All work is code-compliant and backed by the warranty.</p>
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
            <h2 className="section-heading">What Electrical Work Typically Costs</h2>
            <p className="section-subheading">Realistic ranges for common electrical jobs — exact quotes depend on your panel and scope.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Outlet or Switch Replacement', range: '$100 – $250', note: 'Per outlet, includes GFCI upgrade' },
              { service: 'Ceiling Fan Installation', range: '$150 – $350', note: 'With existing box, includes wiring' },
              { service: 'New Circuit Installation', range: '$250 – $600', note: 'For appliances, EV chargers, etc.' },
              { service: 'Electrical Safety Inspection', range: '$150 – $300', note: 'Full home assessment and report' },
              { service: 'Panel Upgrade (100→200 amp)', range: '$1,500 – $4,000', note: 'Includes permit and inspection' },
              { service: 'EV Charger Installation', range: '$400 – $1,200', note: 'Level 2 charger, dedicated circuit' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>You know the price before we touch anything.</strong> No hourly surprises. No scope creep without approval. What we quote is what you pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Electrical Questions Answered</h2>
            <p className="section-subheading">The stuff homeowners actually want to know.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Electrical emergency? Don&apos;t wait — call us now.</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Electrical Issues Don&apos;t Fix Themselves.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Get a licensed electrician out today. Your home&apos;s safety — and your peace of mind — are worth it.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Licensed · Insured · Code-Compliant · 1-Year Warranty
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
