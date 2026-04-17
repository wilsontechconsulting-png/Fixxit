import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollAnimations from '@/components/ScrollAnimations'
import ServiceFAQ from '@/components/ServiceFAQ'

export const metadata: Metadata = {
  title: 'Mowing & Yard Work — Lawn Care Professionals | Fixxit Pros',
  description: 'Reliable, insured lawn care professionals for mowing, edging, cleanup, aeration, and seasonal maintenance. Get a free quote today. Call 888-229-5696.',
}

const services = [
  'Lawn Mowing & Edging',
  'String Trimming & Blowing',
  'Leaf Removal & Cleanup',
  'Aeration & Overseeding',
  'Weed Control & Prevention',
  'Fertilization Programs',
  'Hedge & Shrub Trimming',
  'Garden Bed Maintenance & Mulching',
  'Tree Trimming & Pruning',
  'Stump Grinding',
  'Gutter Cleaning',
  'Spring Cleanup & Prep',
  'Fall Cleanup & Leaf Removal',
  'Debris Hauling & Disposal',
  'Weekly, Bi-Weekly & Monthly Plans',
]

const painPoints = [
  "Your lawn hasn't been mowed in 3+ weeks and it's starting to embarrass you",
  "You've been meaning to clean up the yard all season but life keeps getting in the way",
  'Your HOA sent a warning about yard maintenance and you need it done fast',
  "You've got a bad back (or bad knees) and yard work just isn't something you can do anymore",
  "The weeds have completely taken over your garden beds",
  "Your hedges and shrubs haven't been trimmed in months and they look it",
  "Leaves are piling up and you know your grass is dying underneath them",
]

const trustCards = [
  { icon: '📅', title: 'Show Up Guarantee', desc: 'We actually show up on the day scheduled. Revolutionary, we know. Your lawn care pro will confirm before arrival.' },
  { icon: '💵', title: 'Upfront Pricing', desc: 'Know the price before anyone shows up. No per-hour guessing games. What we quote is what you pay.' },
  { icon: '🛡️', title: '1-Year Warranty', desc: 'We stand behind our work. If a service falls short of what was agreed, we return and make it right.' },
  { icon: '✅', title: 'Insured & Vetted', desc: 'Every lawn care professional is fully insured and background-checked. Your property — and your safety — are protected.' },
]

const faqs = [
  {
    question: 'How quickly can you get someone out for a first visit?',
    answer: "For most areas, we can schedule your first lawn care visit within 2–5 business days. If you need something faster (HOA deadline, event prep), let us know and we'll do our best to prioritize you.",
  },
  {
    question: 'Do you offer recurring plans or is it one-time only?',
    answer: 'Both. We can set you up on a weekly, bi-weekly, or monthly recurring schedule — or you can just call when you need us. Many homeowners start with a one-time cleanup and then sign up for a regular plan.',
  },
  {
    question: "What's included in a standard mowing visit?",
    answer: 'A standard visit includes mowing, edging along sidewalks and driveways, string trimming around obstacles, and blowing debris off hard surfaces. Any add-ons (mulching, bed work, trimming) are quoted separately.',
  },
  {
    question: 'Do I need to be home?',
    answer: "Not at all. As long as we have access to your yard, you don't need to be there. We'll send you a confirmation when we arrive and when the job is done.",
  },
  {
    question: 'Can you handle larger properties and acreage?',
    answer: "Yes — we work with properties of all sizes, from small urban yards to multi-acre lots. Just describe your property when you request a quote and we'll match you with a pro who has the right equipment.",
  },
]

export default function MowingPage() {
  return (
    <>
      <ScrollAnimations />

      {/* HERO */}
      <section className="service-page-hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px' }}>
            <p style={{ color: 'var(--yellow)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>
              Mowing & Yard Work · Fixxit Pros
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Lawn Looks Like a Jungle?<br />We&apos;ll Have It Looking<br />Great This Week.
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.82)', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '580px' }}>
              Reliable, insured yard professionals who actually show up when they say they will, do the work right, and leave your property looking exactly how you wanted.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <a href="tel:8882295696" className="btn btn-primary btn-lg">📞 Call 888-229-5696</a>
              <Link href="/questions" className="btn btn-secondary btn-lg">Get a Free Quote →</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {['Fully Insured', 'Upfront Pricing', 'Reliable Scheduling', 'Background-Checked'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, background: 'var(--yellow)', color: 'var(--navy)', borderRadius: '50%', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <div style={{ background: 'var(--gray-50)', padding: '2.5rem 0 0' }}>
        <div className="container">
          <Image
            src="/images/lawncare_maintenance_fixxit.png"
            alt="Professional lawn care by Fixxit Pros"
            width={1200}
            height={500}
            style={{ borderRadius: '16px', width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '400px' }}
            priority
          />
        </div>
      </div>

      {/* SERVICES LIST */}
      <section style={{ padding: '5rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Everything Your Yard Needs</h2>
            <p className="section-subheading">One call covers all of it — mowing, cleanup, trimming, and everything in between.</p>
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
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Need something not listed? Just ask — we handle all yard work.</p>
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
                If any of these sound familiar, you&apos;re not alone — and we can help this week.
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
            <h2 className="section-heading" style={{ color: 'var(--white)' }}>Why Homeowners Choose Fixxit for Lawn Care</h2>
            <p className="section-subheading" style={{ color: 'rgba(255,255,255,0.7)' }}>We know you&apos;ve been burned by unreliable lawn services before. We operate differently.</p>
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
            <p>We also have a <strong>Respect Guarantee</strong> — your lawn professional will treat your property with care, clean up completely before leaving, and never leave a mess behind.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Getting your yard taken care of has never been easier.</p>
          </div>
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <div className="steps-list">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Tell Us About Your Yard</h3>
                  <p>Call <a href="tel:8882295696" style={{ color: 'var(--blue)', fontWeight: 600 }}>888-229-5696</a> or fill out the form. Tell us your lot size, what you need done, and how often. We&apos;ll get you a quote fast.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>We Match You With a Local Pro</h3>
                  <p>We connect you with an insured, background-checked lawn care professional in your area who serves your neighborhood and fits your schedule.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>They Show Up. It Gets Done Right.</h3>
                  <p>Your pro shows up on the scheduled day, does the work exactly as agreed, and leaves your property spotless. You get notified when it&apos;s complete.</p>
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
            <h2 className="section-heading">What Lawn Care Typically Costs</h2>
            <p className="section-subheading">Pricing depends on lot size, but here are realistic ranges for most homeowners.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 2.5rem' }} className="reveal">
            {[
              { service: 'Standard Lawn Mowing', range: '$35 – $80', note: 'Per visit, based on lot size' },
              { service: 'Mowing + Edging + Blowing', range: '$45 – $100', note: 'Full service per visit' },
              { service: 'Leaf Removal & Cleanup', range: '$100 – $350', note: 'Depends on yard size and leaf volume' },
              { service: 'Aeration & Overseeding', range: '$150 – $400', note: 'Recommended annually in fall' },
              { service: 'Hedge & Shrub Trimming', range: '$75 – $250', note: 'Per session, depends on quantity' },
              { service: 'Spring/Fall Cleanup', range: '$150 – $500', note: 'Full yard prep, debris removal' },
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
              <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>You approve the price before anyone shows up.</strong> No per-hour billing. No surprise charges. What we quote is what you pay.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header reveal">
            <div className="accent-line" />
            <h2 className="section-heading">Lawn Care Questions</h2>
            <p className="section-subheading">Answers to what homeowners ask us most.</p>
          </div>
          <ServiceFAQ faqs={faqs} />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>Ready to stop doing this yourself?</p>
            <a href="tel:8882295696" className="btn btn-blue">📞 Call 888-229-5696</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, color: 'var(--white)', marginBottom: '1rem' }}>
              Your Yard Can Look Amazing by This Weekend.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Stop putting it off. Get a free quote today and have an insured professional handle it this week.
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
