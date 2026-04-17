import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Roofing Services — Repair, Replacement & Inspections | Fixxit Pros',
  description: 'Missing shingles, leaks, storm damage — licensed roofers handle it all. 1-year workmanship warranty, upfront pricing, fast response. Call 888-229-5696.',
}

const services = [
  'Roof Leak Repair',
  'Shingle Repair & Replacement',
  'Emergency Roof Tarping',
  'Storm Damage Repair',
  'Full Roof Replacement',
  'Flat Roof Repair & Replacement',
  'Metal Roof Repair & Installation',
  'Tile Roof Repair',
  'Roof Inspection & Assessment',
  'Gutter Installation & Replacement',
  'Gutter Guard Installation',
  'Fascia & Soffit Repair',
  'Flashing Repair & Replacement',
  'Chimney Flashing & Cap Repair',
  'Ventilation & Attic Venting',
  'Insurance Claim Assistance',
]

const painPoints = [
  'You see water stains spreading on your ceiling after every rain — and they\'re getting bigger',
  "You're missing shingles after the last storm and you're worried about the next one",
  "You've been getting quotes to fix the roof but you're not sure who to trust",
  "Your roof is over 15 years old and you haven't had it inspected since it was installed",
  'Your gutters are pulling away from the house or you have ice dams forming in winter',
  'You can see daylight through your attic boards or feel a draft near your ceiling',
  "You're selling your home and the buyer's inspector flagged roof issues",
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Workmanship Warranty', desc: 'All roofing work comes with a full 12-month workmanship warranty. If our work fails, we come back and fix it — no arguments.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'You get a detailed written quote before any work begins. No vague estimates. No surprise charges when the job is done.' },
  { icon: '⚡', title: 'Emergency Response', desc: 'Active leak? Storm damage? We prioritize emergency calls and can have someone out for tarping and assessment same-day in most areas.' },
  { icon: '✅', title: 'Licensed & Fully Insured', desc: 'Every roofer carries proper licensing and full liability insurance. This protects you if anything goes wrong on your property.' },
]

const faqs = [
  {
    question: 'How do I know if I need a repair or a full replacement?',
    answer: "A roof inspection will tell you definitively. Generally: if your roof is under 15 years old and has isolated damage, repair is usually the right call. If it's over 20 years old or has widespread damage across multiple areas, replacement is often more cost-effective. We'll give you an honest assessment and explain both options.",
  },
  {
    question: 'Can you work with my insurance company?',
    answer: "Yes — we have experience working with homeowner's insurance claims for storm damage and help you document damage properly, submit photos, and communicate with your adjuster. We make the process as easy as possible.",
  },
  {
    question: 'My roof is leaking right now — what should I do?',
    answer: "Call us immediately at 888-229-5696. For active leaks, we prioritize emergency response. In the meantime, move valuables away from the affected area and place buckets if needed. We can often get a tarp installed same-day to stop further water intrusion while we plan the full repair.",
  },
  {
    question: 'How long does a full roof replacement take?',
    answer: 'Most full residential roof replacements take 1–3 days depending on the size and pitch of the roof, the materials, and weather conditions. We work efficiently and clean up all debris before leaving.',
  },
  {
    question: 'What roofing materials do you work with?',
    answer: 'We work with all major roofing materials including asphalt shingles (3-tab and architectural), metal, tile, flat/TPO, and modified bitumen. We can also help you compare options if you\'re deciding on materials for a replacement.',
  },
]

export default function RoofingPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Roofing Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Roof Leaking?<br />Missing Shingles?<br />Don&apos;t Wait — It Gets Worse.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Small roof problems become expensive water damage fast. Our licensed roofers respond quickly, diagnose honestly, and fix it right — with a 1-year workmanship warranty on every job.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['1-Year Warranty', 'Emergency Response', 'Upfront Pricing', 'Licensed & Insured'].map(badge => (
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
            <h2 className="section-heading">We Handle ANY Roofing Issue</h2>
            <p className="section-subheading">From a single shingle to a full tear-off and replacement — licensed roofers for every job.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Active leak or storm damage? Call directly for fastest response.</p>
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
              <h2 className="section-heading">Roof Trouble Signs — Don&apos;t Ignore These</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Every one of these issues gets significantly more expensive the longer you wait.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Roofing</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>Roofing scams are real. We are not that. Licensed, insured, and accountable for every job.</p>
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
            <p>After a storm, door-to-door roofing contractors are common — and often unlicensed. <strong>Always verify licensing before signing anything.</strong> All Fixxit roofers are pre-verified so you don&apos;t have to worry.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">From call to covered — here&apos;s the process.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Describe the Problem</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Tell us what you&apos;re seeing — leaks, damage, age concerns, or just need an inspection. Emergency? Call directly.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Match You With a Licensed Roofer</h3>
                  <p>We connect you with a vetted, licensed roofing contractor in your area. For emergencies, we prioritize same-day assessment and emergency tarping.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Inspection, Written Quote, Fixed</h3>
                  <p>Your roofer inspects the damage, gives you a detailed written quote, and doesn&apos;t start until you approve. All work is backed by the 1-year workmanship warranty.</p>
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
            <h2 className="section-heading">What Roofing Service Typically Costs</h2>
            <p className="section-subheading">Ballpark ranges for common roofing jobs — exact quotes depend on scope and materials.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Roof Inspection', range: 'Free – $250', note: 'Many inspections are complimentary' },
              { service: 'Minor Leak Repair', range: '$200 – $600', note: 'Flashing, sealant, or small shingle area' },
              { service: 'Shingle Replacement (Partial)', range: '$400 – $1,500', note: 'Storm damage, isolated sections' },
              { service: 'Full Roof Replacement', range: '$5,000 – $15,000', note: 'Depends on size, pitch, and materials' },
              { service: 'Gutter Replacement', range: '$800 – $2,500', note: 'Full home, seamless aluminum' },
              { service: 'Emergency Tarping', range: '$200 – $600', note: 'Active leak protection, same-day' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>Written quote before any work begins. Always.</strong> No vague estimates. No post-job surprises. What we quote is what you pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Roofing Questions Answered</h2>
            <p className="section-subheading">Straight talk about common roofing concerns.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Leaking right now? Call us immediately.</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Don&apos;t Let a Small Leak Become a Big Problem.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              The next rain is coming. Get your roof assessed now before the damage spreads.
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
