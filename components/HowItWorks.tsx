import Image from 'next/image'

const steps = [
  {
    n: '1',
    title: 'Tell Us What You Need',
    desc: 'Fill out our simple form or chat with our AI assistant. Describe your project — no technical expertise required.',
  },
  {
    n: '2',
    title: 'Get Matched with Pros',
    desc: 'We connect you with vetted local professionals who specialize in exactly what you need, in your area.',
  },
  {
    n: '3',
    title: 'Get It Done',
    desc: 'Your matched pro shows up, completes the work, and you only pay when you\'re satisfied. It\'s that simple.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header reveal">
          <div className="accent-line" />
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading">Three simple steps to get your home service project done right.</p>
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
          <div className="how-it-works-image">
            <Image
              src="/images/how_it_works_fixxit.png"
              alt="How Fixxit Works"
              width={600}
              height={450}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
