import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Mowing & Yard Work | Fixxit Pros',
  description: 'Find reliable lawn care and yard work professionals for mowing, landscaping, aeration, and seasonal maintenance.',
}

export default function MowingPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="service-page-hero">
        <div className="container">
          <h1>Mowing &amp; Yard Work</h1>
          <p>Keep your lawn looking its best with reliable, insured yard work professionals.</p>
          <Link href="/questions" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>

      <div className="page-content">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <Image
              src="/images/lawncare_maintenance_fixxit.png"
              alt="Professional lawn care"
              width={800}
              height={400}
              style={{ borderRadius: '16px', width: '100%', height: 'auto' }}
            />
          </div>

          <h2>Services We Cover</h2>
          <ul>
            <li>Lawn Mowing &amp; Edging</li>
            <li>Leaf Removal &amp; Cleanup</li>
            <li>Aeration &amp; Overseeding</li>
            <li>Weed Control &amp; Fertilization</li>
            <li>Hedge &amp; Shrub Trimming</li>
            <li>Garden Bed Maintenance</li>
            <li>Tree Trimming &amp; Removal</li>
            <li>Gutter Cleaning</li>
            <li>Seasonal Cleanup (Spring/Fall)</li>
            <li>Landscaping Design &amp; Installation</li>
          </ul>

          <h2>Why Hire Through Fixxit?</h2>
          <p>Every lawn care professional in our network is insured, reliable, and reviewed by real customers. We match you with pros who serve your specific area and can meet your schedule.</p>

          <h2>Seasonal Lawn Care Tips</h2>
          <p><strong>Spring:</strong> Aerate compacted soil, overseed bare patches, apply pre-emergent weed control.</p>
          <p><strong>Summer:</strong> Mow at proper height (3-4 inches), water deeply but infrequently, watch for pests.</p>
          <p><strong>Fall:</strong> Overseed cool-season grasses, rake leaves, apply fall fertilizer.</p>
          <p><strong>Winter:</strong> Winterize irrigation, final cleanup, plan for spring projects.</p>

          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/questions" className="btn btn-primary btn-lg">Get a Free Quote</Link>
          </div>
        </div>
      </div>
    </>
  )
}
