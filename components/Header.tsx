'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const serviceLinks = [
  { name: 'HVAC', href: '/hvac' },
  { name: 'Plumbing', href: '/plumbing' },
  { name: 'Electrical', href: '/electrical' },
  { name: 'Roofing', href: '/roofing' },
  { name: 'Lawn Care', href: '/mowing-and-yard-work' },
  { name: 'Windows & Doors', href: '/windows-doors' },
  { name: 'Bath & Shower', href: '/bath-shower' },
  { name: 'Air Duct & Carpet', href: '/air-duct-carpet' },
  { name: 'Landscaping', href: '/landscaping' },
  { name: 'Siding', href: '/siding' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  return (
    <>
      <style>{`
        .nav-dropdown-wrapper { position: relative; display: flex; align-items: center; }
        .nav-dropdown-btn { font-family: var(--font-heading); font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.85); padding: 0.5rem 0.875rem; border-radius: var(--radius-md); letter-spacing: 0.03em; transition: all 150ms ease; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.3rem; }
        .nav-dropdown-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
        .nav-dropdown-btn .chevron { font-size: 0.65rem; transition: transform 250ms ease; display: inline-block; }
        .nav-dropdown-wrapper:hover .nav-dropdown-btn .chevron { transform: rotate(180deg); }
        .nav-dropdown { position: absolute; top: calc(100% + 0.5rem); left: 50%; transform: translateX(-50%); background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 0.5rem; min-width: 200px; box-shadow: var(--shadow-lg); opacity: 0; visibility: hidden; pointer-events: none; transition: all 250ms ease; z-index: 200; }
        .nav-dropdown-wrapper:hover .nav-dropdown { opacity: 1; visibility: visible; pointer-events: auto; }
        .nav-dropdown a { display: block; font-family: var(--font-heading); font-size: 0.825rem; font-weight: 600; color: var(--navy) !important; padding: 0.5rem 0.75rem !important; border-radius: var(--radius-md) !important; letter-spacing: 0.02em; transition: all 150ms ease; background: none !important; text-decoration: none; }
        .nav-dropdown a:hover { background: var(--gray-50) !important; color: var(--blue) !important; }
        .mobile-services-toggle { font-family: var(--font-heading); font-size: 1rem; font-weight: 600; color: rgba(255,255,255,0.85); padding: 0.875rem 1rem; border-radius: var(--radius-md); border-bottom: 1px solid rgba(255,255,255,0.06); transition: all 150ms ease; background: none; border: none; cursor: pointer; width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mobile-services-toggle:hover { color: var(--white); background: rgba(255,255,255,0.08); }
        .mobile-services-list { display: flex; flex-direction: column; }
        .mobile-service-link { font-family: var(--font-heading); font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.65) !important; padding: 0.625rem 1rem 0.625rem 1.75rem !important; border-radius: var(--radius-md); border-bottom: none !important; transition: all 150ms ease; }
        .mobile-service-link:hover { color: var(--yellow) !important; background: rgba(255,255,255,0.06) !important; }
      `}</style>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="header-inner">
          <Link href="/" className="logo-link" aria-label="Fixxit Pros Home">
            <Image src="/images/Fixxit_logo_yellow.png" alt="Fixxit Pros Logo" width={120} height={44} priority />
          </Link>

          <nav className="main-nav" role="navigation" aria-label="Main navigation">
            <div className="nav-dropdown-wrapper">
              <button className="nav-dropdown-btn" aria-haspopup="true" aria-expanded={false}>
                Services <span className="chevron">▾</span>
              </button>
              <div className="nav-dropdown" role="menu">
                {serviceLinks.map(link => (
                  <Link key={link.href} href={link.href} role="menuitem">{link.name}</Link>
                ))}
              </div>
            </div>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/questions">Contact</Link>
            <Link href="/looking-for-work">Looking for Work</Link>
            <Link href="/questions" className="nav-cta">Get a Free Quote</Link>
          </nav>

          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen ? ' active' : ''}`} role="navigation" aria-label="Mobile navigation">
        <button
          className="mobile-services-toggle"
          onClick={() => setServicesOpen(!servicesOpen)}
          aria-expanded={servicesOpen}
        >
          Services <span style={{ fontSize: '0.75rem', transition: 'transform 250ms ease', display: 'inline-block', transform: servicesOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
        </button>
        {servicesOpen && (
          <div className="mobile-services-list">
            {serviceLinks.map(link => (
              <Link key={link.href} href={link.href} className="mobile-service-link" onClick={closeMenu}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
        <Link href="/#how-it-works" onClick={closeMenu}>How It Works</Link>
        <Link href="/questions" onClick={closeMenu}>Contact</Link>
        <Link href="/looking-for-work" onClick={closeMenu}>Looking for Work</Link>
        <Link href="/questions" className="mobile-cta" onClick={closeMenu}>Get a Free Quote</Link>
      </nav>
    </>
  )
}
