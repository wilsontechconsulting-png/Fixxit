import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Windows & Doors — Repair, Replacement & Installation | Fixxit Pros',
  description: 'Drafty windows, broken seals, sticky doors, or full replacements — licensed pros handle it all. Upfront pricing, 1-year warranty. Call 888-229-5696.',
}

const services = [
  'Window Repair (All Types)',
  'Window Seal & Glazing Repair',
  'Window Replacement (Single & Double-Pane)',
  'Energy-Efficient Window Installation',
  'Storm Window Installation',
  'Window Screen Repair & Replacement',
  'Window Hardware & Lock Repair',
  'Exterior Door Repair & Replacement',
  'Interior Door Repair & Replacement',
  'Door Frame Repair',
  'Door Hinge & Hardware Replacement',
  'Sliding Glass Door Repair',
  'Patio Door Installation',
  'Storm & Security Door Installation',
  'Door Weatherstripping & Sealing',
  'Garage Door Opener Repair',
]

const painPoints = [
  'You can feel cold air (or hot air) coming through your windows even when they\'re fully closed',
  'You\'re paying significantly more on your energy bill than you should be',
  'A window won\'t open, won\'t close, or is stuck in one position',
  'You see condensation or fog between double-pane window glass — the seal is gone',
  'Your front door is difficult to open, won\'t latch, or has visible daylight around the frame',
  'A window or door was damaged in a storm, break-in, or accident',
  'Your windows or doors look dated and are dragging down your home\'s value',
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Warranty', desc: 'All window and door work is backed by a full 12-month warranty on parts and labor. We stand behind every install and repair.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You get the exact cost before anyone starts work. No per-hour billing. No surprise add-ons at the end.' },
  { icon: '⚡', title: 'Fast Scheduling', desc: 'Most window and door repairs are scheduled within 24–48 hours. Urgent needs (broken glass, security) are prioritized.' },
  { icon: '✅', title: 'Licensed & Insured', desc: 'Every installer is licensed, insured, and background-checked. Your home and family are protected throughout the job.' },
]

const faqs = [
  {
    question: 'Is it worth repairing a window or should I just replace it?',
    answer: "It depends on the issue. Hardware, seals, locks, and weatherstripping are almost always worth repairing — it's quick and affordable. If the glass is broken or the seal is failed (foggy between panes), a full window replacement is often more cost-effective long-term. We'll give you an honest assessment.",
  },
  {
    question: 'How long does a window replacement take?',
    answer: 'Most single window replacements take 1–3 hours per window. A full home window replacement project can take 1–3 days depending on the number of windows. We work efficiently and clean up completely before leaving.',
  },
  {
    question: 'Can you fix a door that drags or doesn\'t close properly?',
    answer: "Absolutely. Doors that stick, drag, or won't latch are usually caused by hinge issues, frame settling, or humidity warping. Most fixes take under an hour and cost a fraction of replacement.",
  },
  {
    question: 'Do you work on sliding glass doors?',
    answer: 'Yes — sliding glass door repair is one of our most common jobs. We fix tracks, rollers, handles, locks, and glass. We also do full sliding door replacements if the frame or glass is beyond repair.',
  },
  {
    question: 'Will new windows actually lower my energy bill?',
    answer: "Yes — significantly. Old single-pane windows or failed double-pane seals can account for 25–30% of your home's heating and cooling loss. Energy-efficient replacement windows typically pay for themselves within 5–10 years in energy savings.",
  },
]

export default function WindowsDoorsPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Windows & Doors · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Drafty Windows?<br />Sticky Doors?<br />We Fix It Right — Guaranteed.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Broken seals, stuck frames, and cracked glass aren&apos;t just annoying — they&apos;re costing you money every month. Our licensed pros diagnose the issue, give you an upfront price, and fix it fast.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['1-Year Warranty', 'Upfront Pricing', 'Fast Scheduling', 'Licensed & Insured'].map(badge => (
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
            <h2 className="section-heading">We Handle ANY Window or Door Issue</h2>
            <p className="section-subheading">Minor repairs or full replacements — licensed pros handle it all with the same care and warranty.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Not sure if your issue can be repaired or needs replacement? We&apos;ll tell you honestly.</p>
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
                These are the most common window and door problems homeowners call us about — and all of them are fixable.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Windows & Doors</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>We give you straight talk — repair when it makes sense, replace only when it truly doesn&apos;t.</p>
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
            <p>We never upsell you from a repair to a replacement just to make more money. <strong>If a repair will solve your problem, that&apos;s what we recommend.</strong></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Simple, fast, no pressure.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Describe the Issue</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the quick form. Tell us what&apos;s wrong — drafty, broken, stuck, or needs replacement. We&apos;ll get you scheduled fast.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Match You With a Local Pro</h3>
                  <p>We connect you with a licensed, insured window and door specialist in your area. Most repairs are scheduled within 24–48 hours.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Assessment, Upfront Quote, Fixed</h3>
                  <p>Your pro assesses the problem, explains your options (repair vs. replace), gives you the exact price, and gets to work once you approve. Warranty included.</p>
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
            <h2 className="section-heading">What Window & Door Service Typically Costs</h2>
            <p className="section-subheading">Know what to expect before you call. Prices vary by scope — this gives you a realistic baseline.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Window Seal Repair', range: '$150 – $400', note: 'Per window, stops drafts & condensation' },
              { service: 'Window Glass Replacement', range: '$200 – $600', note: 'Per pane, depends on size & type' },
              { service: 'Full Window Replacement', range: '$400 – $1,200', note: 'Per window, installed & sealed' },
              { service: 'Door Repair (Hinge/Latch)', range: '$100 – $300', note: 'Alignment, hardware, weatherstrip' },
              { service: 'Exterior Door Replacement', range: '$800 – $2,500', note: 'Door + frame + hardware, installed' },
              { service: 'Sliding Door Repair', range: '$150 – $500', note: 'Track, rollers, lock, or glass' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>You approve the price before anyone starts.</strong> No per-hour billing surprises. Exact quote, every time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Windows & Doors FAQ</h2>
            <p className="section-subheading">Straight answers to the questions we get most.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Have a specific window or door question? Call us.</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Stop Losing Money Through Leaky Windows.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Every drafty window is money leaving your home. Get it fixed today and start saving on your energy bill.
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
