const cards = [
  {
    icon: '🔒',
    title: 'Vetted Professionals',
    desc: 'Every contractor in our network is background-checked, licensed, and insured for your peace of mind.',
  },
  {
    icon: '📅',
    title: 'Seamless Scheduling',
    desc: 'Book appointments that work with your schedule. No waiting around all day for a no-show.',
  },
  {
    icon: '😌',
    title: 'No-Stress Coordination',
    desc: 'We handle the coordination so you don\'t have to. One call or form submission and we take it from there.',
  },
  {
    icon: '🤝',
    title: 'Ongoing Local Support',
    desc: 'Our local support team is here for you before, during, and after every service. We\'re in your community.',
  },
]

export default function Trust() {
  return (
    <section className="trust">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" style={{ background: 'var(--yellow)' }} />
          <h2 className="section-heading">Why Homeowners Trust Fixxit</h2>
          <p className="section-subheading">We hold every professional to the highest standards so you never have to worry.</p>
        </div>
        <div className="trust-grid">
          {cards.map((card, i) => (
            <div key={card.title} className={`trust-card reveal reveal-delay-${i + 1}`}>
              <div className="trust-icon-emoji">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
