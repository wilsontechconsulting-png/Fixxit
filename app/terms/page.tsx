import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms | Fixxit Pros',
  description: 'Terms for FIXXIT Pros text messages about your service request.',
}

export default function TermsPage() {
  return (
    <div className="page-content">
      <div className="container">
        <h1>Terms</h1>
        <p><em>Last Updated: November 20, 2026</em></p>

        <h2>SMS Text Messaging Terms</h2>
        <ul>
          <li><strong>Program:</strong> FIXXIT Pros service request texts.</li>
          <li><strong>How to opt in:</strong> On our <a href="/contact">Contact Us</a> page (fixxitpros.com/contact), the quote form, or the site chat, enter your phone number (optional) and check the optional, unchecked-by-default SMS consent box.</li>
          <li><strong>What we send:</strong> If you check the optional SMS consent box on fixxitpros.com, FIXXIT Pros may text you about your service request, including follow-up, scheduling, and urgent updates related to that request.</li>
          <li><strong>Consent is optional:</strong> The SMS consent box is unchecked by default. Consent to receive texts is not a condition of purchase.</li>
          <li><strong>Message frequency:</strong> Message frequency varies.</li>
          <li><strong>Costs:</strong> Message and data rates may apply.</li>
          <li><strong>Opt out:</strong> Reply STOP at any time to stop receiving texts. You will receive one message confirming you are unsubscribed.</li>
          <li><strong>Help:</strong> Reply HELP for help, call <a href="tel:+14807955295">480-795-5295</a>, or email <a href="mailto:info@fixxitpros.com">info@fixxitpros.com</a>.</li>
          <li><strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.</li>
          <li><strong>Privacy:</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties. See our <a href="/privacy-policy">Privacy Policy</a>.</li>
        </ul>

        <h2>Contact Us</h2>
        <ul>
          <li>Email: <a href="mailto:info@fixxitpros.com">info@fixxitpros.com</a></li>
          <li>Phone: <a href="tel:+14807955295">480-795-5295</a></li>
        </ul>
      </div>
    </div>
  )
}
