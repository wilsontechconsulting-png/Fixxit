'use client'

export default function ChooseYourPath() {
  function openChat() {
    window.dispatchEvent(new CustomEvent('openChat'))
  }

  return (
    <section className="choose-path" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">How Do You Want to Connect?</h2>
          <p className="section-subheading">
            Some people like to talk it through. Others prefer typing. Either way, we&apos;ve got you.
          </p>
        </div>
        <div className="choose-path-grid">
          <div className="path-card path-card-talk reveal reveal-delay-1">
            <div className="path-icon">📞</div>
            <h3>Prefer to Talk?</h3>
            <p>
              Call us and a real person picks up. Describe what broke, we&apos;ll tell you
              exactly what it&apos;ll cost and who we&apos;re sending — before we send anyone.
            </p>
            <a href="tel:8882295696" className="btn btn-primary btn-lg">
              Call 888-229-5696
            </a>
            <div className="path-card-note">Mon–Fri 8am–7pm &middot; Sat 9am–5pm CT</div>
          </div>

          <div className="path-card path-card-chat reveal reveal-delay-2">
            <div className="path-icon">💬</div>
            <h3>Prefer to Type?</h3>
            <p>
              Chat with our assistant right now. Describe the issue, we gather the details,
              and a real person follows up within 2 hours with your options.
            </p>
            <button onClick={openChat} className="btn btn-primary btn-lg">
              Start a Chat
            </button>
            <div className="path-card-note">Available 24/7 &middot; Human follow-up within 2 hours</div>
          </div>
        </div>
        <p className="choose-path-note">
          Rather fill out a form?{' '}
          <a href="#quote-form">Scroll down to our quick quote form ↓</a>
        </p>
      </div>
    </section>
  )
}
