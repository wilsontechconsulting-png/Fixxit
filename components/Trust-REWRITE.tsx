const cards = [
  {
    icon: '⚡',
    title: '2-Hour Response Guarantee',
    desc: 'Contact us any time during business hours and you\'ll have a real human response within 2 hours — not a bot, not an auto-reply.',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing Guarantee',
    desc: 'You see the full price before anyone lifts a tool. What we quote is what you pay. No "oh by the way" charges when the job is done.',
  },
  {
    icon: '🛡️',
    title: '1-Year Quality Guarantee',
    desc: 'Every job we complete is backed for 12 months. If anything fails due to workmanship, we come back and fix it at no charge.',
  },
  {
    icon: '🤝',
    title: 'No Ghosting Guarantee',
    desc: 'Your pro confirms the appointment. You get a direct line to them. We don\'t take your money and disappear — ever.',
  },
]

export default function Trust() {
  return (
    <section className="trust">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" style={{ background: 'var(--yellow)' }} />
          <h2 className="section-heading">Our Four Guarantees</h2>
          <p className="section-subheading">
            Not marketing fluff. Specific, enforceable promises — because you&apos;ve been burned before.
          </p>
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
        <div className="trust-footer">
          <p>
            <strong>Real talk:</strong> We built Fixxit because we were sick of flaky contractors too.
            Every pro in our network is held to standards we&apos;d demand for our own homes.
          </p>
        </div>
      </div>
    </section>
  )
}
