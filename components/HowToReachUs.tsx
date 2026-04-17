'use client'

export default function HowToReachUs() {
  function openChat() {
    window.dispatchEvent(new CustomEvent('openChat'))
  }

  return (
    <section className="reach-us">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" style={{ background: 'var(--yellow)' }} />
          <h2 className="section-heading">Ready to Get It Fixed?</h2>
          <p className="section-subheading">
            Three ways to reach us. Pick the one that feels right.
          </p>
        </div>
        <div className="reach-us-grid">
          <div className="reach-us-card reveal reveal-delay-1">
            <div className="reach-us-icon">📞</div>
            <h3>Call Us</h3>
            <p>
              Talk to a real person right now. Best for urgent issues or when you want answers
              before committing to anything.
            </p>
            <a href="tel:8882295696" className="btn btn-primary">
              888-229-5696
            </a>
          </div>

          <div className="reach-us-card reveal reveal-delay-2">
            <div className="reach-us-icon">💬</div>
            <h3>Chat Now</h3>
            <p>
              Describe your issue in the chat. Our assistant collects the details; a human
              follows up within 2 hours with your quote and next steps.
            </p>
            <button onClick={openChat} className="btn btn-blue">
              Open Chat
            </button>
          </div>

          <div className="reach-us-card reveal reveal-delay-3">
            <div className="reach-us-icon">📋</div>
            <h3>Fill Out a Form</h3>
            <p>
              Prefer to write it all out? Use the quick quote form below. We respond
              within 2 hours during business hours.
            </p>
            <a href="#quote-form" className="btn btn-blue">
              Get a Quote ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
