import Image from 'next/image'

const steps = [
  {
    n: '1',
    title: 'Tell Us What Broke',
    desc: 'Call us, chat with our assistant, or fill out a quick form. No appointment needed to get started — takes 60 seconds.',
  },
  {
    n: '2',
    title: 'We Find the Right Pro',
    desc: 'We match you with a licensed, background-checked local professional who specializes in your exact issue.',
  },
  {
    n: '3',
    title: 'They Show Up & Fix It',
    desc: 'Your pro arrives on time, fixes the problem, and charges exactly what was quoted. No last-minute surprises.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading">
            From &ldquo;something broke&rdquo; to &ldquo;problem solved&rdquo; in 3 simple steps.
          </p>
        </div>
        <div className="how-it-works-inner">
          <div className="steps-list">
            {steps.map((step) => (
              <div key={step.n} className="step-item">
                <div className="step-number">{step.n}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="how-it-works-right">
            <div className="how-it-works-image">
              <Image
                src="/images/how_it_works_fixxit.png"
                alt="How Fixxit Works"
                width={600}
                height={450}
              />
            </div>
            <div className="how-it-works-promise">
              <strong>Our guarantees:</strong> You&apos;ll hear back within 2 hours. Your quote is
              locked in before work starts — what we quote is what you pay. All work is backed
              by a 1-year quality guarantee.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
