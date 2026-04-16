import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Fixxit Pros',
  description: 'Read the Fixxit Pros Privacy Policy to understand how we collect, use, and protect your information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="page-content">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p><em>Last Updated: January 1, 2025</em></p>

        <p>Fixxit Pros (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website fixxitpros.com or use our services.</p>

        <h2>1. Information We Collect</h2>
        <h3>Information You Provide Directly</h3>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Home address or zip code</li>
          <li>Service requests and project descriptions</li>
          <li>Communications with us</li>
        </ul>

        <h3>Information Automatically Collected</h3>
        <ul>
          <li>IP address and browser type</li>
          <li>Pages visited and time spent</li>
          <li>Referring URLs</li>
          <li>Device information</li>
        </ul>

        <h3>Third-Party Information</h3>
        <p>We may receive information about you from contractors, service providers, or public databases to verify information or improve our services.</p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To connect you with appropriate service professionals</li>
          <li>To communicate about your service requests</li>
          <li>To improve our platform and services</li>
          <li>To send relevant marketing communications (with your consent)</li>
          <li>To comply with legal obligations</li>
          <li>To detect and prevent fraud</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service Contractors:</strong> To fulfill your service requests</li>
          <li><strong>Service Providers:</strong> Third parties that help us operate our platform</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
          <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>4. Data Retention</h2>
        <p>We retain your information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time.</p>

        <h2>5. Your Rights</h2>
        <p>Depending on your location, you may have rights to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications</li>
          <li>Data portability (California residents under CCPA)</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>We use cookies and similar technologies to enhance your experience. See our <a href="/cookie-policy">Cookie Policy</a> for details.</p>

        <h2>7. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>Our services are not directed to children under 13. We do not knowingly collect information from children.</p>

        <h2>9. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your information. However, no transmission over the internet is 100% secure.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this policy periodically. We will notify you of material changes by posting the new policy on this page with an updated date.</p>

        <h2>11. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at:</p>
        <ul>
          <li>Email: <a href="mailto:info@fixxitpros.com">info@fixxitpros.com</a></li>
          <li>Phone: <a href="tel:8882295696">888-229-5696</a></li>
        </ul>
      </div>
    </div>
  )
}
