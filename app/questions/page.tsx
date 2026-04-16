import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Fixxit Pros',
  description: 'Request a free quote for any home service. We\'ll connect you with vetted local professionals quickly.',
}

export default function QuestionsPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="questions-hero">
        <div className="container">
          <h1>Get a Free Quote</h1>
          <p>Tell us what you need and we&apos;ll connect you with the right professional in your area.</p>
        </div>
      </section>
      <ContactForm />
    </>
  )
}
