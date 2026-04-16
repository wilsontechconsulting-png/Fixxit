import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Plumbing Services | Fixxit Pros',
  description: 'Find licensed plumbers for emergency repairs, leak detection, water heater service, drain cleaning, and more.',
}

export default function PlumbingPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="service-page-hero">
        <div className="container">
          <h1>Plumbing Services</h1>
          <p>From emergency leaks to full pipe replacement — licensed plumbers ready to help fast.</p>
          <Link href="/questions" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>

      <div className="page-content">
        <div className="container">
          <h2>Services We Cover</h2>
          <ul>
            <li>Emergency Plumbing Repairs</li>
            <li>Leak Detection &amp; Repair</li>
            <li>Drain Cleaning &amp; Unclogging</li>
            <li>Water Heater Installation &amp; Repair</li>
            <li>Toilet Repair &amp; Replacement</li>
            <li>Faucet &amp; Fixture Installation</li>
            <li>Pipe Repair &amp; Replacement</li>
            <li>Garbage Disposal Installation</li>
            <li>Sewer Line Inspection &amp; Repair</li>
            <li>Water Filtration Systems</li>
          </ul>

          <h2>Licensed &amp; Insured Plumbers</h2>
          <p>All plumbers in our network carry proper licensing and insurance. We verify credentials before listing any contractor so you can book with confidence.</p>

          <p>We provide fast response times — most plumbing emergencies can be matched with a professional within hours.</p>

          <h2>Warning Signs You Need a Plumber</h2>
          <ul>
            <li>Dripping faucets or running toilets</li>
            <li>Slow drains throughout the house</li>
            <li>Low water pressure</li>
            <li>Water stains on ceilings or walls</li>
            <li>Unusual sounds in pipes (banging, gurgling)</li>
            <li>Sewage smells indoors</li>
            <li>Spike in water bills</li>
          </ul>

          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/questions" className="btn btn-primary btn-lg">Get a Free Quote</Link>
          </div>
        </div>
      </div>
    </>
  )
}
