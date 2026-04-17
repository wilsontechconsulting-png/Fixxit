'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Do I have to talk on the phone?',
    a: 'Not at all. You can chat with our assistant 24/7, or fill out the quick quote form below. Either way, a real person follows up within 2 hours. We built multiple contact paths specifically so you can connect on your own terms.',
  },
  {
    q: 'What happens after I contact you?',
    a: "We gather the details about your issue, then match you with a licensed local pro who specializes in exactly that problem. Before anyone shows up, you'll receive a full upfront quote. Work begins only after you approve the price — no surprises.",
  },
  {
    q: 'How quickly will someone respond?',
    a: 'We guarantee a response within 2 hours during business hours (Mon–Fri 8am–7pm, Sat 9am–5pm CT). Messages sent outside those hours get a response first thing the next morning. We don\'t leave people hanging.',
  },
  {
    q: 'Are there really no hidden fees?',
    a: "Correct. Your quote is locked in before work starts. The price you approve is the price you pay. If unexpected complications arise mid-job, your pro must get your approval before any additional charges — no exceptions.",
  },
  {
    q: 'What does the 1-year guarantee cover?',
    a: 'It covers the quality of the work performed. If something we fixed fails or was done incorrectly within 12 months, we come back and make it right at no charge. Parts warranties follow manufacturer terms; labor is on us.',
  },
  {
    q: "What if I'm not satisfied with the work?",
    a: "Tell us immediately. We'll send the pro back to address it. If it still isn't right, we'll send a different pro. Our goal is that you're genuinely satisfied — not just technically done. We've removed contractors from our network over this.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">Common Questions</h2>
          <p className="section-subheading">
            Straight answers. No runaround.
          </p>
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="faq-question-text">{faq.q}</span>
                <span className="faq-chevron" aria-hidden="true">▾</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
