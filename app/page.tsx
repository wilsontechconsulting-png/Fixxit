import Hero from '@/components/Hero-REWRITE'
import Services from '@/components/Services-REWRITE'
import ChooseYourPath from '@/components/ChooseYourPath'
import HowItWorks from '@/components/HowItWorks-REWRITE'
import Trust from '@/components/Trust-REWRITE'
import FAQ from '@/components/FAQ'
import Testimonials from '@/components/Testimonials'
import HowToReachUs from '@/components/HowToReachUs'
import ContactForm from '@/components/ContactForm'
import Disclaimer from '@/components/Disclaimer'
import ScrollAnimations from '@/components/ScrollAnimations'

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Hero />
      <Services />
      <ChooseYourPath />
      <HowItWorks />
      <Trust />
      <FAQ />
      <Testimonials />
      <HowToReachUs />
      <div id="quote-form">
        <ContactForm />
      </div>
      <Disclaimer />
    </>
  )
}
