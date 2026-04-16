import Link from 'next/link'

const services = [
  { icon: '🔧', name: 'Plumbing', href: '/plumbing' },
  { icon: '❄️', name: 'HVAC', href: '/hvac' },
  { icon: '✂️', name: 'Mowing & Yard Work', href: '/mowing-and-yard-work' },
  { icon: '🪟', name: 'Windows & Doors', href: '/questions' },
  { icon: '🏚️', name: 'Roofing', href: '/questions' },
  { icon: '⚡', name: 'Electrical', href: '/questions' },
  { icon: '🛁', name: 'Bath & Shower', href: '/questions' },
  { icon: '🌬️', name: 'Air Duct & Carpet', href: '/questions' },
  { icon: '🌿', name: 'Landscaping', href: '/questions' },
  { icon: '🏠', name: 'Siding', href: '/questions' },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">Our Services</h2>
          <p className="section-subheading">
            From plumbing to landscaping, we connect you with vetted professionals for every home service need.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <Link
              key={service.name}
              href={service.href}
              className={`service-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <span className="service-icon">{service.icon}</span>
              <span className="service-name">{service.name}</span>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/questions" className="btn btn-blue">Request Any Service</Link>
        </div>
      </div>
    </section>
  )
}
