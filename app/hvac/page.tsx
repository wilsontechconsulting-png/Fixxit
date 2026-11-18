import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'HVAC Services — AC Repair, Furnace & Heat Pump | Fixxit Pros',
  description: 'Licensed HVAC technicians for AC repair, furnace service, heat pumps, and emergency HVAC. 2-hour response, upfront pricing, 1-year warranty. Call 480-795-5295.',
}

const services = [
  'AC Repair (All Brands)',
  'Central AC Installation',
  'Mini-Split AC Installation',
  'Furnace Repair & Service',
  'Heat Pump Installation & Repair',
  'Ductwork Inspection & Sealing',
  'Air Handler Service',
  'Thermostat Installation & Smart Upgrades',
  'Indoor Air Quality Systems',
  'Whole-Home Humidifiers & Dehumidifiers',
  'Seasonal Maintenance Tune-Ups',
  'Evaporator & Condenser Coil Cleaning',
  'Refrigerant Recharge & Leak Repair',
  'Emergency HVAC Service',
]

const painPoints = [
  "Your AC runs constantly but the house won't cool below 80°",
  'Your heating bill spiked this month but the house still feels cold',
  "There's a burning or musty smell every time the system kicks on",
  "You're hearing grinding, banging, or high-pitched squealing from your unit",
  'Some rooms are freezing while others are sweltering',
  'Your AC keeps tripping the breaker or shutting off on its own',
  "Your system is over 10 years old and you're nervous about this summer",
]

const trustCards = [
  { icon: '🛡️', title: '1-Year Warranty', desc: 'All HVAC work is backed by a full 12-month warranty on parts and labor. If it fails, we fix it free.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'Your tech diagnoses the problem and quotes the price before touching anything. Zero surprises on your bill.' },
  { icon: '⚡', title: '2-Hour Response', desc: 'We match you with a local HVAC tech fast. Most calls are scheduled same-day — emergency calls within 2 hours.' },
  { icon: '✅', title: 'Licensed & Insured', desc: "Every technician is fully licensed, insured, and background-checked. We never send someone to your home we wouldn't send to ours." },
]

const faqs = [
  {
    question: 'How fast can you get a tech to my home?',
    answer: "We target a 2-hour response for emergencies and same-day scheduling for most service calls. During peak summer and winter seasons, we have extra coverage to make sure you're not waiting.",
  },
  {
    question: 'Do you work on all HVAC brands?',
    answer: 'Yes — our techs are trained on all major brands including Carrier, Trane, Lennox, Rheem, Goodman, York, American Standard, and more. If you have it, we can fix it.',
  },
  {
    question: 'Will I know the price before work starts?',
    answer: "Always. Your technician diagnoses the problem, explains exactly what's needed, and gives you the price upfront. You approve it before any work begins. No pressure, no surprise charges.",
  },
  {
    question: 'Is my system worth repairing or should I replace it?',
    answer: "We give you an honest assessment based on the age and condition of your system. A general rule: if repair costs exceed 50% of replacement cost on a system older than 10 years, replacement often makes more financial sense. We'll walk you through both options and let you decide.",
  },
  {
    question: 'What does the 1-year warranty actually cover?',
    answer: 'It covers all parts and labor performed by our technicians. If the same issue comes back within 12 months, we return and fix it at no charge. It does not cover pre-existing conditions or unrelated failures.',
  },
]

export default function HvacPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              HVAC Services · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              AC Not Cooling?<br />Heat Not Working?<br />We Fix It Today.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              When your HVAC fails, every hour matters. We connect you with licensed technicians who show up fast, diagnose honestly, and fix it right the first time — or we make it right.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:+14807955295" className="btn btn-primary btn-lg">📞 Call 480-795-5295</a>
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
            <h2 className="section-heading">We Handle ANY HVAC Issue</h2>
            <p className="section-subheading">From a quick tune-up to a full system replacement — our licensed techs cover it all.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Don&apos;t see your specific issue? We handle it. Just ask.</p>
            <Link href="/questions" className="btn btn-primary btn-lg">Get a Free Quote →</Link>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'inline-block', width: 60, height: 4, background: 'var(--yellow)', borderRadius: 99, marginBottom: '1rem' }} />
              <h2 className="section-heading">Sound Familiar?</h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                These are the HVAC problems homeowners come to us with most. If any of these sound like your situation, don&apos;t wait — they get worse fast.
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
              <a href="tel:+14807955295" className="btn btn-primary btn-lg">📞 Call Now — 480-795-5295</a>
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for HVAC</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>We&apos;re not the cheapest option — we&apos;re the one you call when it actually needs to get fixed.</p>
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
            <p>Every contractor in the Fixxit network passes a thorough background check and credential verification before we ever send them to your door. <strong>Your safety is non-negotiable.</strong></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">From your call to a working HVAC system — here&apos;s what to expect.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us What&apos;s Wrong</h3>
                  <p>Call <a href="tel:+14807955295" style={{ color: 'var(--blue)', fontWeight: 600 }}>480-795-5295</a> or fill out the quick form. Tell us your system type, what it&apos;s doing (or not doing), and your location. Takes about 2 minutes.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Match You With a Local Tech</h3>
                  <p>We connect you with a vetted, licensed HVAC technician in your area — usually within 2 hours. You&apos;ll know who&apos;s coming and when.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Diagnosis, Upfront Price, Fixed</h3>
                  <p>Your tech arrives, diagnoses the problem, and gives you the exact price before starting. You approve it. They fix it. You get your comfort back.</p>
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
            <h2 className="section-heading">What HVAC Service Typically Costs</h2>
            <p className="section-subheading">Realistic ranges so you know what to expect — no sticker shock, no bait-and-switch.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'AC Seasonal Tune-Up', range: '$79 – $149', note: 'Recommended annually before summer' },
              { service: 'AC Repair (Minor)', range: '$150 – $350', note: 'Capacitor, contactor, thermostat, etc.' },
              { service: 'AC Repair (Major)', range: '$350 – $700', note: 'Compressor, coil, refrigerant issues' },
              { service: 'Furnace Repair', range: '$200 – $500', note: 'Igniter, heat exchanger, blower motor' },
              { service: 'Thermostat Replacement', range: '$150 – $350', note: 'Includes smart thermostat options' },
              { service: 'New Central AC System', range: '$3,500 – $8,000', note: 'Fully installed, all brands' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>Zero hidden fees. Ever.</strong> Your tech will give you the exact price before any work starts. What they quote is what you pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Common HVAC Questions</h2>
            <p className="section-subheading">Straight answers — no runaround.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Have a question we didn&apos;t answer? Just ask.</p>
            <a href="tel:+14807955295" className="btn btn-blue">📞 Call 480-795-5295</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Ready to Get Your HVAC Fixed?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Don&apos;t sweat it out (or freeze). Call now and we&apos;ll have a licensed tech at your door today.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="tel:+14807955295" className="btn btn-primary btn-lg">📞 Call 480-795-5295</a>
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
