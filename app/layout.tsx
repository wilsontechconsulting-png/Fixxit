import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import CookieBanner from '@/components/CookieBanner'
import FloatingPhone from '@/components/FloatingPhone'

export const metadata: Metadata = {
  title: 'Fixxit Pros — Home Services Made Easy',
  description: 'Connect with vetted local contractors for plumbing, HVAC, electrical, roofing, lawn care, and more. Get a free quote today.',
  keywords: 'home services, plumbing, HVAC, electrical, roofing, lawn care, contractors',
  openGraph: {
    title: 'Fixxit Pros — Home Services Made Easy',
    description: 'Connect with vetted local contractors for all your home service needs.',
    url: 'https://fixxitpros.com',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fixxit Pros — Home Services Made Easy',
    description: 'Connect with vetted local contractors for all your home service needs.',
  },
}

// Force no caching at the root layout level
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Aggressive cache prevention meta tags */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <FloatingPhone />
        <ChatWidget />
      </body>
    </html>
  )
}
