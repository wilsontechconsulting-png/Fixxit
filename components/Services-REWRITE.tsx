import Link from 'next/link'

const services = [
  {
    icon: '❄️',
    name: 'HVAC',
    desc: 'AC or heat not working? Licensed techs, upfront pricing.',
    href: '/hvac',
  },
  {
    icon: '🔧',
    name: 'Plumbing',
    desc: 'Leaks, clogs, burst pipes — handled by licensed pros.',
    href: '/plumbing',
  },
  {
    icon: '⚡',
    name: 'Electrical',
    desc: 'Licensed electricians. Code-compliant work, guaranteed.',
    href: '/electrical',
  },
  {
    icon: '🏚️',
    name: 'Roofing',
    desc: 'Repairs and replacements with a 1-year workmanship warranty.',
    href: '/roofing',
  },
  {
    icon: '✂️',
    name: 'Lawn Care',
    desc: 'Mowing, trimming, and cleanup on your schedule.',
    href: '/mowing-and-yard-work',
  },
  {
    icon: '🪟',
    name: 'Windows & Doors',
    desc: 'Drafty, broken, or hard to open — we fix it right.',
    href: '/windows-doors',
  },
  {
    icon: '🚿',
    name: 'Bath & Shower',
    desc: 'From leaky faucets to full bathroom remodels.',
    href: '/bath-shower',
  },
  {
    icon: '🌬️',
    name: 'Air Duct & Carpet',
    desc: 'Professional cleaning for better air quality and cleaner floors.',
    href: '/air-duct-carpet',
  },
  {
    icon: '🌿',
    name: 'Landscaping',
    desc: 'Design, installation, and full outdoor transformations.',
    href: '/landscaping',
  },
  {
    icon: '🏠',
    name: 'Siding',
    desc: 'Repair or replace damaged siding. Protect your home.',
    href: '/siding',
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">What Do You Need Fixed?</h2>
          <p className="section-subheading">
            Pick your issue below. We&apos;ll match you with a vetted local pro who specializes in exactly that.
          </p>
        </div>
        <div className="services-grid services-grid-described">
          {services.map((service, i) => (
            <Link
              key={service.name}
              href={service.href}
              className={`service-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <span className="service-icon">{service.icon}</span>
              <span className="service-name">{service.name}</span>
              <span className="service-desc">{service.desc}</span>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>
            Don&apos;t see your issue? We handle all home repairs.
          </p>
          <Link href="/questions" className="btn btn-blue">Tell Us What Broke →</Link>
        </div>
      </div>
    </section>
  )
}
