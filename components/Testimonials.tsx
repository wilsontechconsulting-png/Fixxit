'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    text: 'Fixxit connected me with an amazing plumber within hours. Fixed my leak quickly and the price was fair. I couldn\'t believe how easy it was!',
    name: 'Sarah M.',
    role: 'Homeowner, Austin TX',
    avatar: '/images/FIXXIT_customer_testimonial_01.png',
  },
  {
    text: 'My AC went out in the middle of July. Fixxit had an HVAC tech at my door the next morning. Lifesavers! I\'ve used them three times since.',
    name: 'James R.',
    role: 'Homeowner, Dallas TX',
    avatar: '/images/FIXXIT_customer_testimonial_02.png',
  },
  {
    text: 'I needed my lawn maintained while traveling for work. Fixxit set me up with a reliable crew and my yard has never looked better. Highly recommend!',
    name: 'Linda K.',
    role: 'Homeowner, Houston TX',
    avatar: '/images/FIXXIT_customer_testimonial_03.png',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => {
        setCurrent(c => (c + 1) % testimonials.length)
      }, 5000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused])

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(c => (c + 1) % testimonials.length)

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">What Homeowners Say</h2>
          <p className="section-subheading">Real experiences from real customers across the country.</p>
        </div>
        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="testimonials-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <Image src={t.avatar} alt={t.name} width={56} height={56} className="testimonial-avatar" />
                    <div>
                      <div className="testimonial-author-name">{t.name}</div>
                      <div className="testimonial-author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prev} aria-label="Previous">‹</button>
            <div className="carousel-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={next} aria-label="Next">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
