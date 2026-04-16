import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <Image src="/images/Fixxit_logo_yellow.png" alt="Fixxit Pros" width={120} height={40} />
            </div>
            <p>Connecting homeowners with trusted local professionals for all their home service needs.</p>
            <div className="social-links">
              <a href="https://facebook.com/fixxitpros" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">f</a>
              <a href="https://youtube.com/@fixxitpros" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">▶</a>
              <a href="https://instagram.com/fixxitpros" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">◈</a>
              <a href="https://x.com/fixxitpros" className="social-link" aria-label="X/Twitter" target="_blank" rel="noopener noreferrer">✕</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <nav className="footer-links">
              <Link href="/plumbing">Plumbing</Link>
              <Link href="/hvac">HVAC</Link>
              <Link href="/mowing-and-yard-work">Mowing &amp; Yard Work</Link>
              <Link href="/#services">All Services</Link>
            </nav>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <nav className="footer-links">
              <Link href="/questions">Contact Us</Link>
              <Link href="/looking-for-work">Looking for Work</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </nav>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <a href="tel:8882295696">888-229-5696</a>
            </div>
            <div className="footer-contact-item">
              <span className="icon">✉️</span>
              <a href="mailto:info@fixxitpros.com">info@fixxitpros.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Fixxit Pros. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/cookie-policy">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
