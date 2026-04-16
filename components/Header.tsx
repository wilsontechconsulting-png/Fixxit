'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="header-inner">
          <Link href="/" className="logo-link" aria-label="Fixxit Pros Home">
            <Image src="/images/Fixxit_logo_yellow.png" alt="Fixxit Pros Logo" width={120} height={44} priority />
          </Link>

          <nav className="main-nav" role="navigation" aria-label="Main navigation">
            <Link href="/#services">Services</Link>
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
        <Link href="/#services" onClick={closeMenu}>Services</Link>
        <Link href="/#how-it-works" onClick={closeMenu}>How It Works</Link>
        <Link href="/questions" onClick={closeMenu}>Contact</Link>
        <Link href="/looking-for-work" onClick={closeMenu}>Looking for Work</Link>
        <Link href="/questions" className="mobile-cta" onClick={closeMenu}>Get a Free Quote</Link>
      </nav>
    </>
  )
}
