import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Plumbing Services — Leak Repair, Drain Cleaning & Water Heaters | Fixxit Pros',
  description: 'Licensed plumbers for emergency repairs, leak detection, water heater service, drain cleaning, and pipe replacement. 2-hour response, upfront pricing. Call 888-229-5696.',
}

const services = [
  'Emergency Plumbing Repairs',
  'Burst Pipe Repair',
  'Leak Detection & Repair',
  'Drain Cleaning & Hydro-Jetting',
  'Sewer Line Inspection & Repair',
  'Water Heater Repair & Replacement',
  'Tankless Water Heater Installation',
  'Toilet Repair & Replacement',
  'Faucet & Fixture Installation',
  'Garbage Disposal Repair & Install',
  'Pipe Repair & Full Repiping',
  'Water Pressure Issues',
  'Gas Line Inspection & Repair',
  'Water Filtration & Softener Systems',
  'Backflow Prevention',
]

const painPoints = [
  "You can see water stains spreading on your ceiling or walls — and they're getting bigger",
  'Your drains are slow or backing up throughout multiple rooms at once',
  "Your water bill jumped $50+ this month and you have no idea why",
  "You woke up with no hot water — and guests are coming",
  "There's a sewage smell coming from your drains or yard",
  "You can hear water running inside your walls when nothing is on",
  'Your water pressure dropped suddenly and rooms are getting uneven flow',
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Warranty', desc: 'All plumbing work is backed by a full 12-month warranty. If the repair fails, we come back and fix it at no charge.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You get the price before any work starts. No per-hour mysteries. No surprise invoice at the end.' },
  { icon: '⚡', title: '2-Hour Response', desc: "Water damage spreads fast. We match you with a local licensed plumber quickly — most emergencies are covered same-day." },
  { icon: '✅', title: 'Licensed & Insured', desc: 'Every plumber in our network carries proper state licensing and full insurance. We verify credentials before listing anyone.' },
]

const faqs = [
  {
    question: 'How fast can you get a plumber to me?',
    answer: 'For plumbing emergencies like burst pipes or major leaks, we work to get someone to you within 2 hours. For non-emergency repairs, most appointments are same-day or next-day.',
  },
  {
    question: 'What if the problem is more serious than expected?',
    answer: "Your plumber will diagnose the full scope before starting. If something unexpected is discovered mid-job, they'll stop, explain what they found, and give you a revised price. You decide whether to proceed — no pressure.",
  },
  {
    question: 'Do you handle gas line work?',
    answer: 'Yes — our licensed plumbers are also qualified for gas line inspection, repair, and connection for appliances. All gas work is done to code and inspected for safety.',
  },
  {
    question: 'My water heater is 12 years old and not heating well — repair or replace?',
    answer: "Water heaters typically last 10–15 years. If yours is over 10 years old and having problems, replacement is often the smarter financial move — especially if the repair cost is over $300. We'll give you an honest recommendation either way.",
  },
  {
    question: "Can you fix a slow drain if drain cleaner didn't work?",
    answer: "Yes. Liquid drain cleaners only clear surface clogs. We use professional hydro-jetting or mechanical snaking to fully clear blockages that store-bought products can't touch — including roots and built-up grease.",
  },
]

export default function PlumbingPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Plumbing Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Pipe Burst? Drain Clogged?<br />Licensed Plumbers<br />Available Now.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Water damage spreads fast. Our licensed plumbers respond within 2 hours, give you an upfront price before touching anything, and back every repair with a 1-year warranty.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['1-Year Warranty', '2-Hour Response', 'Upfront Pricing', 'Licensed & Insured'].map(badge => (
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
            <h2 className="section-heading">We Handle ANY Plumbing Problem</h2>
            <p className="section-subheading">From a dripping faucet to a sewer line collapse — licensed plumbers ready for everything.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Have a plumbing issue not listed? We&apos;ve seen it before. Call us.</p>
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
              <h2 className="section-heading">You Might Be Experiencing...</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                These are the warning signs that mean it&apos;s time to call a plumber — not tomorrow, today.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Plumbing</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>Your home is your biggest investment. Don&apos;t gamble it on an unlicensed handyman.</p>
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
            <p>We also have a <strong>Communication Guarantee</strong> — your plumber will call before arriving, update you when they&apos;re 20 minutes out, and explain everything in plain language.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Fast, simple, no surprises.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Describe the Problem</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the quick form. Tell us what&apos;s happening and where you&apos;re located. For emergencies, call directly for the fastest response.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Dispatch a Licensed Plumber</h3>
                  <p>We match you with a vetted, licensed plumber in your area. For emergencies, we target a 2-hour arrival window. You&apos;ll know who&apos;s coming and when.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Upfront Quote, Then Fixed</h3>
                  <p>Your plumber diagnoses the problem, gives you the price before starting, and fixes it right. All work comes with a 1-year warranty.</p>
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
            <h2 className="section-heading">What Plumbing Service Typically Costs</h2>
            <p className="section-subheading">No surprises. Here&apos;s what most homeowners pay for common plumbing repairs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Drain Cleaning', range: '$100 – $250', note: 'Kitchen, bathroom, or floor drain' },
              { service: 'Faucet Repair / Replace', range: '$150 – $350', note: 'Parts + labor, all fixture types' },
              { service: 'Toilet Repair', range: '$150 – $400', note: 'Running, leaking, or won\'t flush' },
              { service: 'Leak Detection & Repair', range: '$200 – $600', note: 'Depends on location and access' },
              { service: 'Water Heater Repair', range: '$200 – $500', note: 'Element, thermostat, or valve' },
              { service: 'Water Heater Replacement', range: '$800 – $1,800', note: 'Tank units, fully installed' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>No hidden fees. No hourly guesswork.</strong> You get a fixed price for the job before we start. What they quote is what you pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Common Plumbing Questions</h2>
            <p className="section-subheading">Honest answers to questions we get every day.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Plumbing emergency? Don&apos;t wait — call us now.</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Stop the Drip. Fix It Today.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Every hour you wait, water damage gets worse and costs more to fix. Call now — a licensed plumber is standing by.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Licensed · Insured · Background-Checked · 1-Year Warranty
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
