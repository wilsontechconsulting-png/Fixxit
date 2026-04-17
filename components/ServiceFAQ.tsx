'use client'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function ServiceFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
          <button
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="faq-question-text">{faq.question}</span>
            <span className="faq-chevron">▾</span>
          </button>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
