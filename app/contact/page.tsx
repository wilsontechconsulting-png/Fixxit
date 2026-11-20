import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata: Metadata = {
  title: 'Contact Us | Fixxit Pros',
  description: 'Contact FIXXIT Pros about any home service. Send a message, call 480-795-5295, or opt in to texts about your service request.',
}

export default function ContactPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="questions-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Questions about a home service? Send us a message or call <a href="tel:+14807955295" style={{ color: 'var(--yellow)' }}>480-795-5295</a>. Your phone number is optional, and texts are only sent if you check the box.</p>
        </div>
      </section>
      <ContactForm variant="contact" />
    </>
  )
}
