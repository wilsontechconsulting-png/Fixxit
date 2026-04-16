import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import FloatingPhone from '@/components/FloatingPhone'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Fixxit Pros — Home Services Made Easy',
  description: 'Connect with vetted local contractors for plumbing, HVAC, electrical, roofing, lawn care, and more. Get a free quote today.',
  keywords: 'home services, plumbing, HVAC, electrical, roofing, lawn care, contractors',
  openGraph: {
    title: 'Fixxit Pros — Home Services Made Easy',
    description: 'Connect with vetted local contractors for all your home service needs.',
    type: 'website',
    url: 'https://fixxitpros.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <FloatingPhone />
        <ChatWidget />
      </body>
    </html>
  )
}
