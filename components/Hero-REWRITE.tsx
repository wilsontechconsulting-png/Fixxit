'use client'
import Image from 'next/image'

export default function Hero() {
  function openChat() {
    window.dispatchEvent(new CustomEvent('openChat'))
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">⭐ Dallas&apos;s Trusted Home Services</div>
          <h1 className="hero-title">
            Home Repairs Without the{' '}
            <span className="highlight">Contractor Headaches</span>
          </h1>
          <p className="hero-subtitle">
            Tired of contractors who ghost you, charge surprise fees, or do shoddy work?
            Our vetted local pros come with upfront pricing, a 1-year work guarantee,
            and a real human you can actually reach — within 2 hours.
          </p>
          <div className="hero-buttons">
            <a href="tel:8882295696" className="btn btn-primary btn-lg">
              📞 Talk to Someone Now
            </a>
            <button onClick={openChat} className="btn btn-secondary btn-lg">
              💬 Chat With Us
            </button>
          </div>
          <div className="hero-trust-badges">
            <div className="hero-trust-badge">
              <span className="hero-trust-check">✓</span>
              <span>Upfront Pricing — No Surprises</span>
            </div>
            <div className="hero-trust-badge">
              <span className="hero-trust-check">✓</span>
              <span>1-Year Work Guarantee</span>
            </div>
            <div className="hero-trust-badge">
              <span className="hero-trust-check">✓</span>
              <span>2-Hour Response Guarantee</span>
            </div>
          </div>
        </div>

        <div className="hero-image-col">
          <div className="hero-image-stack">
            <Image
              src="/images/fixxit_team_200.png"
              alt="Fixxit Professionals"
              width={540}
              height={405}
              className="hero-img-main"
              priority
            />
            <div className="hero-img-badge">
              <div className="hero-img-badge-icon">🛡️</div>
              <div className="hero-img-badge-text">
                <strong>1-Year Guarantee</strong>
                <span>On all work performed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
