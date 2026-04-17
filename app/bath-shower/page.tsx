import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Bath & Shower Services — Repairs, Regrouting & Remodeling | Fixxit Pros',
  description: 'Leaky faucets, moldy grout, outdated showers, or full bathroom remodels — licensed pros handle it all. Upfront pricing, 1-year warranty. Call 888-229-5696.',
}

const services = [
  'Shower Faucet Repair & Replacement',
  'Bathtub Faucet Repair & Replacement',
  'Shower Head Replacement & Upgrade',
  'Tile Grout Cleaning & Regrouting',
  'Shower Tile Repair & Replacement',
  'Bathtub Reglazing & Refinishing',
  'Shower Pan Repair & Replacement',
  'Shower Door Repair & Replacement',
  'Frameless Glass Shower Installation',
  'Bathtub-to-Shower Conversions',
  'Walk-In Shower Installation',
  'Caulking & Waterproofing',
  'Exhaust Fan Repair & Installation',
  'Towel Bar & Accessory Installation',
  'Bathroom Vanity Installation',
  'Full Bathroom Remodel',
]

const painPoints = [
  'Your shower faucet drips all night and you\'re losing sleep — and water',
  'The grout in your shower is black with mold that cleaning products won\'t touch',
  'You have a slow-draining tub or shower that backs up within minutes',
  'Your shower door leaks water onto the bathroom floor every time you shower',
  'Your bathtub surface is cracked, stained, or so worn it looks embarrassing',
  "You're stepping carefully over a cracked or uneven shower floor",
  "Your bathroom still looks like it did in 1990 and it's bringing down your home's value",
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Warranty', desc: 'All bath and shower work is backed by a full 12-month warranty. If tiles crack, seals fail, or faucets leak — we come back and fix it.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You know the full cost before anyone picks up a tool. No hourly rate surprises. No scope creep without your approval.' },
  { icon: '⚡', title: 'Fast Scheduling', desc: 'Most repairs are scheduled within 24–48 hours. If your shower is completely out of service, we prioritize your appointment.' },
  { icon: '✅', title: 'Licensed & Insured', desc: 'Every pro is licensed, insured, and background-checked. Bathroom work involves waterproofing that, done wrong, leads to mold and structural damage.' },
]

const faqs = [
  {
    question: 'Can you regrout my shower without retiling?',
    answer: "Yes — in most cases, regrouting is possible without replacing the tile. If the tiles themselves are in good condition but the grout is cracked, crumbling, or mold-stained, we remove the old grout and apply fresh, properly sealed grout. It's much more affordable than retiling.",
  },
  {
    question: 'Is bathtub refinishing worth it, or should I just replace the tub?',
    answer: "Refinishing (reglazing) is worth it if the tub structure is sound but the surface is stained, chipped, or faded. It typically costs $300–$600 versus $1,500–$4,000+ for a full tub replacement. The refinished surface lasts 5–10 years with proper care. We'll show you both options.",
  },
  {
    question: 'My shower floor has a crack — is that a big deal?',
    answer: "Yes. A cracked shower floor can allow water to seep into the subfloor, causing rot and mold that you won't see until it's a major structural problem. It should be assessed and repaired promptly — the repair is far less expensive than the water damage repair later.",
  },
  {
    question: 'Can you convert my bathtub to a walk-in shower?',
    answer: "Absolutely — it's one of our most popular bathroom projects. A bathtub-to-shower conversion typically takes 2–5 days depending on complexity, tile choice, and whether we're doing a simple shower pan or full custom tile work. We handle everything from demo to final caulking.",
  },
  {
    question: 'How long does a bathroom remodel take?',
    answer: 'A basic refresh (new fixtures, tile, vanity) takes 3–7 days. A full gut-and-remodel can take 2–4 weeks. We give you a timeline upfront and stick to it — no leaving your bathroom torn apart for weeks.',
  },
]

export default function BathShowerPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Bath & Shower Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Leaky Faucet?<br />Moldy Grout?<br />We Fix It — or Fully Remodel It.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              From a dripping showerhead to a complete bathroom transformation — our licensed pros handle it all with upfront pricing and a 1-year warranty on every job.
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
            <h2 className="section-heading">We Handle ANY Bath or Shower Issue</h2>
            <p className="section-subheading">Small repairs or full remodels — same licensed professionals, same upfront pricing, same warranty.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Not sure what you need? Describe the problem — we&apos;ll figure it out together.</p>
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
                These are the bath and shower problems we hear about most — and every one of them is fixable.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Bath & Shower</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>Bathroom work done wrong leads to mold, water damage, and expensive repairs. Done right, it adds value and comfort.</p>
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
            <p>We also have a <strong>Respect Guarantee</strong> — your pro treats your bathroom and belongings with care, lays down drop cloths, and cleans up completely before they leave.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Simple process, beautiful results.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Describe What&apos;s Broken (or What You Want)</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Tell us about the issue or the project you have in mind. We&apos;ll ask a few questions and get you quoted fast.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Match You With a Licensed Pro</h3>
                  <p>We connect you with a vetted, licensed bathroom specialist in your area. Most repairs are scheduled within 24–48 hours. Remodel consultations are often same week.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Assessment, Upfront Quote, Done Right</h3>
                  <p>Your pro assesses the job, gives you a full upfront quote, and starts only after you approve. All work is backed by the 1-year warranty.</p>
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
            <h2 className="section-heading">What Bath & Shower Service Typically Costs</h2>
            <p className="section-subheading">From quick fixes to full remodels — realistic ranges for what homeowners actually pay.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Faucet Repair or Replace', range: '$150 – $400', note: 'Shower or tub, all brands' },
              { service: 'Shower Regrouting', range: '$200 – $600', note: 'Per shower, full grout removal and reset' },
              { service: 'Bathtub Refinishing', range: '$300 – $700', note: 'Reglazing, chips, stains — no replacement' },
              { service: 'Shower Door Replacement', range: '$400 – $1,500', note: 'Framed or frameless glass' },
              { service: 'Tub-to-Shower Conversion', range: '$2,000 – $6,000', note: 'Fully tiled walk-in, installed' },
              { service: 'Full Bathroom Remodel', range: '$5,000 – $20,000+', note: 'Scope and materials dependent' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>Full price before anyone touches your bathroom.</strong> No mid-project surprises. No scope creep without approval.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Bath & Shower Questions</h2>
            <p className="section-subheading">Common questions from homeowners like you.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Ready to stop putting this off?</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Your Bathroom Should Work — and Look Good.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Stop tolerating a leaky, dated, or broken bathroom. Get it fixed or transformed today.
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
