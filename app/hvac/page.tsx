import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'HVAC Services | Fixxit Pros',
  description: 'Find licensed, insured HVAC contractors for AC repair, furnace service, heat pumps, and more. Get a free quote today.',
}

export default function HvacPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="service-page-hero">
        <div className="container">
          <h1>HVAC Services</h1>
          <p>Heating, ventilation, and air conditioning services by licensed, background-checked professionals.</p>
          <Link href="/questions" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>

      <div className="page-content">
        <div className="container">
          <h2>Services We Cover</h2>
          <ul>
            <li>AC Installation &amp; Repair</li>
            <li>Furnace &amp; Heating System Service</li>
            <li>Heat Pump Installation &amp; Maintenance</li>
            <li>Ductwork Inspection &amp; Repair</li>
            <li>Seasonal Tune-Ups</li>
            <li>Thermostat Installation &amp; Programming</li>
            <li>Indoor Air Quality Systems</li>
            <li>Emergency HVAC Services</li>
          </ul>

          <h2>Why Choose Fixxit for HVAC?</h2>
          <p>Every HVAC contractor in the Fixxit network is licensed, insured, and background-checked. We match you with experienced professionals who specialize in your specific system type and brand.</p>

          <h2>How It Works</h2>
          <ol>
            <li>Submit your quote request with details about your system</li>
            <li>We match you with qualified HVAC professionals in your area</li>
            <li>Get a diagnosis and quote — no pressure, no obligation</li>
          </ol>

          <h2>Signs You Need HVAC Service</h2>
          <ul>
            <li>AC not cooling or heat not working</li>
            <li>Unusual noises from your HVAC system</li>
            <li>High energy bills despite normal usage</li>
            <li>Uneven temperatures throughout your home</li>
            <li>Strange smells from vents</li>
            <li>System cycling on and off frequently</li>
          </ul>

          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/questions" className="btn btn-primary btn-lg">Get a Free Quote</Link>
          </div>
        </div>
      </div>
    </>
  )
}
