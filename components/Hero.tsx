import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">⭐ Trusted Home Services Platform</div>
          <h1 className="hero-title">
            <span className="highlight">CONNECT.</span>{' '}
            <span className="highlight">COLLABORATE.</span>{' '}
            GET IT DONE.
          </h1>
          <p className="hero-subtitle">
            We connect homeowners with vetted local professionals for plumbing, HVAC, electrical, roofing, lawn care, and more. Fast, reliable, stress-free.
          </p>
          <div className="hero-buttons">
            <Link href="/questions" className="btn btn-primary btn-lg">Get a Free Quote</Link>
            <Link href="/looking-for-work" className="btn btn-secondary btn-lg">Looking for Work</Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-number">10+</div>
              <div className="hero-stat-label">Services</div>
            </div>
            <div>
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Contractors</div>
            </div>
            <div>
              <div className="hero-stat-number">24/7</div>
              <div className="hero-stat-label">Support</div>
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
              <div className="hero-img-badge-icon">🏠</div>
              <div className="hero-img-badge-text">
                <strong>5-Star Rated</strong>
                <span>Trusted by thousands</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
