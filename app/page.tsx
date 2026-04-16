import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Trust from '@/components/Trust'
import ContactForm from '@/components/ContactForm'
import Testimonials from '@/components/Testimonials'
import Disclaimer from '@/components/Disclaimer'
import ScrollAnimations from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Hero />
      <Services />
      <HowItWorks />
      <Trust />
      <ContactForm />
      <Testimonials />
      <Disclaimer />
    </>
  )
}
