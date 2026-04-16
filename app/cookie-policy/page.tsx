import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Fixxit Pros',
  description: 'Learn about how Fixxit Pros uses cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
  return (
    <div className="page-content">
      <div className="container">
        <h1>Cookie Policy</h1>
        <p><em>Last Updated: January 1, 2025</em></p>

        <p>This Cookie Policy explains how Fixxit Pros uses cookies and similar tracking technologies when you visit fixxitpros.com.</p>

        <h2>What Are Cookies?</h2>
        <p>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, analyze traffic, and provide a better experience.</p>

        <h2>Types of Cookies We Use</h2>

        <h3>Strictly Necessary Cookies</h3>
        <p>These cookies are essential for the website to function properly. They cannot be disabled.</p>
        <ul>
          <li><strong>Session cookies:</strong> Maintain your session as you navigate pages</li>
          <li><strong>Security cookies:</strong> Protect against cross-site request forgery</li>
          <li><strong>Cookie consent:</strong> Remember your cookie preferences (fp_cookie_consent)</li>
        </ul>

        <h3>Analytics Cookies</h3>
        <p>Help us understand how visitors interact with our website.</p>
        <ul>
          <li><strong>Google Analytics:</strong> Page views, session duration, traffic sources (anonymized)</li>
        </ul>

        <h3>Marketing Cookies</h3>
        <p>Used to show relevant advertising and measure campaign effectiveness.</p>
        <ul>
          <li><strong>Meta Pixel:</strong> Facebook/Instagram advertising measurement</li>
          <li><strong>Google Ads:</strong> Conversion tracking</li>
        </ul>

        <h3>Functional Cookies</h3>
        <p>Enable enhanced features and personalization.</p>
        <ul>
          <li>Remember form preferences and user settings</li>
          <li>Chat widget preferences</li>
        </ul>

        <h2>How to Manage Cookies</h2>
        <p>You can control cookies through:</p>
        <ul>
          <li><strong>Browser settings:</strong> Most browsers allow you to refuse or delete cookies</li>
          <li><strong>Our cookie banner:</strong> Click &ldquo;Preferences&rdquo; to manage your choices</li>
          <li><strong>Opt-out tools:</strong> Google Analytics Opt-out Browser Add-on, NAI opt-out tool</li>
        </ul>

        <p>Note: Disabling certain cookies may affect website functionality.</p>

        <h2>Do Not Track</h2>
        <p>Some browsers transmit &ldquo;Do Not Track&rdquo; signals. We currently do not respond to these signals but will update this policy if our practices change.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Cookie Policy periodically. Check this page for the latest information.</p>

        <h2>Contact Us</h2>
        <p>Questions about our cookie practices?</p>
        <ul>
          <li>Email: <a href="mailto:info@fixxitpros.com">info@fixxitpros.com</a></li>
          <li>Phone: <a href="tel:8882295696">888-229-5696</a></li>
        </ul>
      </div>
    </div>
  )
}
