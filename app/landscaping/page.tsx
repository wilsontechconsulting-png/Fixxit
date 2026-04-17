import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Landscaping Services — Design, Installation & Hardscaping | Fixxit Pros',
  description: 'Professional landscaping services including design, planting, hardscaping, irrigation, and outdoor transformations. Upfront pricing, licensed pros. Call 888-229-5696.',
}

const services = [
  'Landscape Design & Planning',
  'Planting Beds & Garden Installation',
  'Sod Installation',
  'Seed & Lawn Establishment',
  'Mulch Installation',
  'Tree & Shrub Planting',
  'Perennial & Annual Flower Installation',
  'Retaining Wall Construction',
  'Patio Design & Installation',
  'Walkway & Pathway Installation',
  'Outdoor Lighting Design',
  'Irrigation System Installation',
  'Irrigation Repair & Winterization',
  'Drainage Solutions',
  'Grading & Land Leveling',
  'Backyard Transformation Projects',
]

const painPoints = [
  "Your yard looks bare, neglected, or just like everyone else's on the block",
  "You've been meaning to tackle a landscaping project for 3+ years and it never happens",
  'Your front yard curb appeal is hurting your home value and you know it',
  "You have drainage problems — standing water, erosion, or a soggy yard after rain",
  "You want a patio or outdoor space but don't know where to start",
  "Your planting beds are overgrown, weedy, or completely barren",
  "You're selling your home and first impressions aren't making the impression you need",
]

const trustCards = [
  { icon: '🌿', title: 'Design Expertise', desc: 'Our landscape pros plan projects for long-term beauty and low maintenance — not just what looks good on install day.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You get a detailed written quote before any shovels go in the ground. No hourly rates, no scope surprises.' },
  { icon: '🛡️', title: '1-Year Warranty', desc: 'All installation work is backed by a 1-year warranty. Plants that fail within the warranty period are replaced.' },
  { icon: '✅', title: 'Insured & Background-Checked', desc: 'Every landscaping pro is fully insured and background-checked. Your property is protected throughout the project.' },
]

const faqs = [
  {
    question: 'Do you offer both design and installation?',
    answer: "Yes — we handle the full project from design consultation through final installation. You can come to us with a blank slate or a half-finished idea, and we'll help you develop a plan that fits your budget and goals.",
  },
  {
    question: 'What does a typical landscaping project cost?',
    answer: 'It varies enormously by scope. A basic front yard refresh (mulch, plants, edging) might run $500–$2,000. A full backyard transformation with patio, lighting, and plantings can run $10,000–$50,000+. We give you an exact quote after understanding your vision and site.',
  },
  {
    question: 'Will the plants survive? Do you guarantee them?',
    answer: "Yes — we provide a 1-year warranty on all plant material we install, assuming proper watering is maintained. We select plants suited to your climate, soil type, and sun exposure so they're set up to thrive, not just look good on day one.",
  },
  {
    question: 'Can you help with drainage problems in my yard?',
    answer: "Absolutely. Drainage issues are one of the most common landscaping problems we solve. We assess the grading, identify where water is pooling or eroding, and design solutions — French drains, regrading, dry creek beds, or swales — that redirect water where it belongs.",
  },
  {
    question: 'How long do landscaping projects take?',
    answer: "Small projects (planting beds, mulch, sod) typically take 1–3 days. Mid-size projects with hardscaping take 1–2 weeks. Large backyard transformations can take 3–6 weeks. We give you a realistic timeline upfront and keep you updated throughout.",
  },
]

export default function LandscapingPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Landscaping Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Ready to Love<br />Your Yard Again?<br />Let&apos;s Make It Happen.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              From a simple planting bed to a complete outdoor transformation — our landscaping pros design, plan, and install projects that look great and last. Upfront pricing, no surprises.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['1-Year Plant Warranty', 'Design Included', 'Upfront Pricing', 'Insured & Vetted'].map(badge => (
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
            <h2 className="section-heading">Full-Service Landscaping</h2>
            <p className="section-subheading">Design through installation — we handle every aspect of your outdoor project.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Have a specific vision? We can work from your ideas or help you develop a plan from scratch.</p>
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
              <h2 className="section-heading">Does This Sound Like Your Yard?</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                These are the landscaping situations homeowners come to us with most — and all of them are transformable.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Landscaping</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>We design for your lifestyle, your climate, and your long-term goals — not just what looks good on the day we plant it.</p>
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
            <p>We plant the right plants for your region, soil, and sun exposure. <strong>Plants that fail within 12 months of installation are replaced — no questions, no hassle.</strong></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">From vision to reality — here&apos;s the process.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us Your Vision</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Describe what you&apos;re hoping to achieve — or just tell us what&apos;s wrong with the yard and we&apos;ll help figure out the solution.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Design Consultation & Quote</h3>
                  <p>We connect you with a landscaping specialist who will assess your property, discuss your goals, and provide a detailed written quote. No pressure. You decide if you want to proceed.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Installation — On Time & On Budget</h3>
                  <p>Your landscaping crew arrives on the scheduled date, installs per the agreed plan, and cleans up completely. You get a beautiful yard — and a 1-year warranty on the work.</p>
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
            <h2 className="section-heading">What Landscaping Projects Typically Cost</h2>
            <p className="section-subheading">Ballpark ranges to help you plan — exact quotes provided after a site assessment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Planting Bed Refresh', range: '$500 – $2,000', note: 'Edging, mulch, plants, cleanup' },
              { service: 'Sod Installation', range: '$500 – $3,000', note: 'Per project, depends on square footage' },
              { service: 'Mulch Installation', range: '$200 – $800', note: 'Full property, multiple beds' },
              { service: 'Patio Installation', range: '$3,000 – $15,000', note: 'Concrete, pavers, or stone' },
              { service: 'Retaining Wall', range: '$2,000 – $10,000', note: 'Block or stone, depends on height/length' },
              { service: 'Irrigation System', range: '$1,500 – $4,000', note: 'Full yard, installed and tested' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>Written quote before any work begins.</strong> Your project, your budget, your approval. We never start without it.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Landscaping Questions</h2>
            <p className="section-subheading">What homeowners ask us most before starting a project.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Have a project idea? Let&apos;s talk through it.</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Stop Driving Past Your Dream Yard.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Get a free quote today. Landscaping projects book fast — especially in spring and fall.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Licensed · Insured · Background-Checked · 1-Year Plant Warranty
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
