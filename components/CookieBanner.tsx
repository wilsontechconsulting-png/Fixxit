'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('fp_cookie_consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 1200)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('fp_cookie_consent', 'accepted')
    setVisible(false)
  }

  const prefs = () => {
    localStorage.setItem('fp_cookie_consent', 'set')
    setVisible(false)
  }

  return (
    <div className={`cookie-banner${visible ? ' visible' : ''}`} role="dialog" aria-label="Cookie consent">
      <p className="cookie-text">
        We use cookies to enhance your experience and analyze site traffic. By continuing to use our site, you agree to our{' '}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn-accept" onClick={accept}>Accept All</button>
        <button className="cookie-btn-prefs" onClick={prefs}>Preferences</button>
      </div>
    </div>
  )
}
