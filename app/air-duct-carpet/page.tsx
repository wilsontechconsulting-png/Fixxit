import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Air Duct & Carpet Cleaning — Professional Indoor Cleaning | Fixxit Pros',
  description: 'Professional air duct cleaning and carpet cleaning services. Improve indoor air quality and remove deep-set stains. Upfront pricing. Call 888-229-5696.',
}

const services = [
  'Whole-Home Air Duct Cleaning',
  'Dryer Vent Cleaning',
  'HVAC System Sanitizing',
  'Mold & Mildew Treatment (Ducts)',
  'Air Duct Inspection & Assessment',
  'Supply & Return Vent Cleaning',
  'Blower Motor & Coil Cleaning',
  'Residential Carpet Cleaning',
  'Deep Steam Carpet Cleaning',
  'Pet Stain & Odor Treatment',
  'Area Rug Cleaning',
  'Upholstery & Furniture Cleaning',
  'Tile & Grout Cleaning',
  'Hardwood Floor Cleaning & Conditioning',
  'Move-Out & Move-In Cleaning',
  'Post-Construction Cleaning',
]

const painPoints = [
  "Your home has a musty or stale smell that won't go away no matter what you clean",
  'You or your family members have worsening allergies or respiratory issues indoors',
  'You see visible dust or debris coming out of your vents when the HVAC runs',
  "Your carpet has stains from pets, kids, or spills that regular vacuuming won't fix",
  "Your dryer takes two cycles to dry a load — a dirty dryer vent is the likely cause",
  "You moved into a home and don't know when (or if) the ducts were ever cleaned",
  "Your carpet smells like pets even after shampooing it yourself",
]

const trustCards = [
  { icon: '🌬️', title: 'NADCA-Standard Cleaning', desc: "We use proper equipment and methods — not just a shop vac. Negative pressure systems that actually remove debris from your ducts, not just dislodge it." },
  { icon: '💵', title: 'Upfront Pricing', desc: 'Know the full cost before anyone shows up. No bait-and-switch pricing or "you need extra services" upselling once we\'re in your home.' },
  { icon: '⚡', title: 'Fast Scheduling', desc: 'Most cleaning appointments are scheduled within 2–5 business days. We work around your schedule and are in and out efficiently.' },
  { icon: '✅', title: 'Insured & Background-Checked', desc: 'Every cleaning professional is fully insured and background-checked. We treat your home with respect.' },
]

const faqs = [
  {
    question: 'How often should I have my air ducts cleaned?',
    answer: "The EPA and NADCA recommend every 3–5 years for most homes. More frequently if you have pets, recent renovations, mold issues, or family members with allergies or asthma. If you've never had them cleaned and you've lived in your home over 5 years, it's time.",
  },
  {
    question: 'Will air duct cleaning actually improve my air quality?',
    answer: "Yes — significantly, in most cases. Ducts collect dust, pet dander, pollen, mold spores, and in some cases rodent debris over time. A proper cleaning removes these contaminants from your air supply. Many families notice the difference within days, especially allergy sufferers.",
  },
  {
    question: 'Can carpet cleaning remove pet odors completely?',
    answer: "Professional hot water extraction (steam cleaning) combined with enzymatic pet odor treatment eliminates pet odors at the source rather than masking them. For severe cases where urine has soaked through to the subfloor, we may recommend pad replacement — we'll be honest with you if that's the case.",
  },
  {
    question: 'How long does it take for carpet to dry after cleaning?',
    answer: 'Typically 6–12 hours with good airflow. We use high-powered truck-mounted extraction equipment that removes significantly more water than rental machines, which means faster drying times. Opening windows and running fans speeds it up.',
  },
  {
    question: 'Is dryer vent cleaning really necessary?',
    answer: "Yes — it's actually a fire safety issue. Clogged dryer vents cause approximately 15,000 house fires per year in the US. If your dryer takes more than one cycle to dry clothes, or if it's been more than a year since the vent was cleaned, schedule it now.",
  },
]

export default function AirDuctCarpetPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Air Duct & Carpet Cleaning · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Dusty Vents?<br />Stained Carpets?<br />Breathe Easier Tonight.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Professional air duct and carpet cleaning that actually works — not the bait-and-switch discount cleaning you&apos;ve seen advertised. Real equipment, real results, upfront pricing.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['Upfront Pricing', 'No Upselling', 'Fast Scheduling', 'Insured & Vetted'].map(badge => (
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
            <h2 className="section-heading">Complete Indoor Cleaning Services</h2>
            <p className="section-subheading">From your ducts to your floors — professional cleaning that improves your air quality and your home&apos;s look.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Not sure what you need? We&apos;ll assess and recommend — no pressure.</p>
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
                These are the signs your indoor air quality and floors need professional attention.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Trust Fixxit for Cleaning</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>We&apos;ve all seen the $49 duct cleaning ads. This is nothing like that.</p>
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
            <p>Budget duct cleaning often makes things worse by dislodging debris into your living space. <strong>Our pros use proper negative-pressure equipment and vacuum first — every time.</strong></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">In and out efficiently — with real results you can see and breathe.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us What You Need</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Tell us about your home, your duct system, carpet areas, or pet situation. We&apos;ll give you an accurate quote fast.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Schedule Your Appointment</h3>
                  <p>We connect you with an insured cleaning professional in your area and get you scheduled within days. Most jobs are done in a single visit.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Professional Cleaning, Real Results</h3>
                  <p>Your pro arrives with proper equipment, cleans thoroughly, and leaves your home noticeably cleaner — air and floors. No rushed jobs, no corners cut.</p>
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
            <h2 className="section-heading">What Cleaning Services Typically Cost</h2>
            <p className="section-subheading">Real prices for real cleaning — not the bait-and-switch $49 specials.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Air Duct Cleaning (Full Home)', range: '$350 – $700', note: 'Whole system, all vents, negative pressure' },
              { service: 'Dryer Vent Cleaning', range: '$100 – $200', note: 'Fire safety essential, annually recommended' },
              { service: 'Carpet Cleaning (per room)', range: '$40 – $80', note: 'Hot water extraction, all carpet types' },
              { service: 'Carpet Cleaning (whole home)', range: '$200 – $500', note: '3–5 rooms, includes hallways' },
              { service: 'Pet Stain & Odor Treatment', range: '$50 – $150', note: 'Per treatment area, enzyme-based' },
              { service: 'Upholstery Cleaning', range: '$100 – $300', note: 'Sofa, chairs, or sectional' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>No bait-and-switch pricing.</strong> The price we quote is the price you pay. No add-ons, no pressure upgrades once we&apos;re in your home.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Air Duct & Carpet Cleaning Questions</h2>
            <p className="section-subheading">Everything you want to know before scheduling.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Ready to breathe easier and live on cleaner floors?</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              A Cleaner Home Starts with Clean Ducts and Clean Floors.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Schedule your professional cleaning today and notice the difference immediately.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Insured · Background-Checked · Upfront Pricing · Satisfaction Guaranteed
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
