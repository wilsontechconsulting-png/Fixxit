# Fixxit Pros Website - Hugo Build Specification

## Project Goal
Create an exact replica of https://fixxitpros.com using Hugo static site generator, matching design, layout, forms, and functionality.

## Screenshots Saved
Reference screenshots are in this directory for design matching.

## Image Assets to Download

Download all images from fixxitpros.com and save to `static/images/`:

```
http://fixxitpros.com/wp-content/uploads/2025/04/Fixxit_logo_yellow.png
http://fixxitpros.com/wp-content/uploads/2025/04/lawncare_maintenance_fixxit.png
http://fixxitpros.com/wp-content/uploads/2025/04/FIXXIT_customer_testimonial_01.png
http://fixxitpros.com/wp-content/uploads/2025/04/fixxit_team_201.png
http://fixxitpros.com/wp-content/uploads/2025/04/FIXXIT_customer_testimonial_03.png
http://fixxitpros.com/wp-content/uploads/2025/04/fixxit_plumber_under_sink.png
http://fixxitpros.com/wp-content/uploads/2025/04/fixxit_team_200.png
http://fixxitpros.com/wp-content/uploads/2025/04/fixxit_team_202.png
http://fixxitpros.com/wp-content/uploads/2025/04/how_it_works_fixxit.png
http://fixxitpros.com/wp-content/uploads/2025/04/how_it_works_fixxit2.png
http://fixxitpros.com/wp-content/uploads/2025/04/Professionals_icon.png
http://fixxitpros.com/wp-content/uploads/2025/04/Seemless_scheduling_icon.png
http://fixxitpros.com/wp-content/uploads/2025/04/no_stress_coordination_icon.png
http://fixxitpros.com/wp-content/uploads/2025/04/on_going_local_support_icon.png
http://fixxitpros.com/wp-content/uploads/2025/04/Contact_fixxit.png
http://fixxitpros.com/wp-content/uploads/2025/04/FIXXIT_customer_testimonial_02.png
http://fixxitpros.com/wp-content/uploads/2025/04/FIXXIT_customer_testimonials.png
```

## Site Structure

### Pages Required
1. **Homepage** (`content/_index.md`)
   - Hero section with "CONNECT. COLLABORATE. GET IT DONE"
   - Services grid (Plumbing, Windows & Door, HVAC, Roofing, Electrical, Bath & Shower, Mowing, AirDuct & Carpet Cleaning, Landscaping, Siding)
   - 3-step process section
   - Trust factors (4 steps)
   - Contact form
   - Testimonials carousel
   - Disclaimer section
   - Footer

2. **Questions Page** (`content/questions.md`)
   - Full contact form

3. **Looking for Work Page** (`content/looking-for-work.md`)
   - Subcontractor form
   - Employee application form

4. **Service Pages**
   - HVAC (`content/hvac.md`)
   - Plumbing (`content/plumbing.md`)
   - LawnCare (`content/mowing-and-yard-work.md`)

5. **Legal Pages**
   - Privacy Policy (`content/privacy-policy.md`)
   - Cookie Policy (`content/cookie-policy.md`)

## Design Specifications

### Color Scheme
- Primary Blue: `#0066cc` (approximate - match from screenshots)
- Accent Yellow: `#ffd700` (logo yellow)
- White background
- Dark text for body copy

### Typography
- Clean, modern sans-serif
- Large hero headings
- Readable body text

### Layout
- Full-width sections
- Centered content containers (max-width ~1200px)
- Responsive grid for services
- Mobile-friendly

## Forms Implementation

**Use Netlify Forms** for all contact forms:

### Homepage Quick Quote Form
Fields:
- First Name (required)
- Last Name (required)
- Phone (required)
- Email (required)
- Zip Code (required)
- Description (textarea, required)
- Submit button
- Reset button

### Questions Page Form
Same as homepage form

### Looking for Work Forms
Two separate forms:
1. **Subcontractor Form**
   - Name
   - Email
   - Phone
   - Services offered
   - Message

2. **Employee Application Form**
   - Name
   - Email
   - Phone
   - Position interested in
   - Resume upload
   - Message

## Components to Build

### Header
- Logo (left)
- CONTACT button (right, links to /questions/)
- Sticky on scroll
- Mobile hamburger menu

### Hero Section
- Large heading: "CONNECT. COLLABORATE. GET IT DONE"
- Two CTAs:
  - "GET A FREE QUOTE" → /questions/
  - "LOOKING FOR WORK" → /looking-for-work/

### Services Grid
10 service cards with icons:
- Icon image (background image or img tag)
- Service name below
- 2 rows × 5 columns on desktop
- Responsive (stack on mobile)

### 3-Step Process
- Numbered steps (Step 1, Step 2, Step 3)
- Title for each step
- Description text
- Visual layout matches screenshot

### Trust Factors (Why Homeowners Trust Fixxit)
- 4 numbered cards
- Icons
- Titles
- Descriptions

### Testimonials Section
- 3 testimonial cards
- Customer photo
- Quote text
- Name
- Role/occupation
- Carousel or static grid

### Footer
- Logo
- Company description
- Social links (Facebook, YouTube, Instagram, X)
- Services links
- Company links (Contact, Looking for Work, Privacy, Cookie Policy)

### Call-to-Action Button
- Floating phone button: "CALL NOW!" → tel:888-229-5696
- Sticky to bottom-right on mobile/desktop

### Chat Widget
- "Real People! Let us know what you need?" button
- Sticky to bottom-right

### Cookie Consent Banner
- Message about cookies
- "Learn More" link → /cookie-policy/
- "Accept All" button
- "Preferences" button

## Technical Requirements

1. **Hugo Setup**
   - Initialize new Hugo site
   - Create custom theme in `themes/fixxitpros/`
   - Use layouts: `index.html`, `single.html`, `baseof.html`
   - Partials for header, footer, forms

2. **Static Assets**
   - Download all images to `static/images/`
   - CSS in `assets/css/main.css`
   - JavaScript (if needed) in `assets/js/`

3. **Netlify Forms**
   - Add `netlify` attribute to forms
   - Include honeypot field for spam protection
   - Set up form names for Netlify dashboard

4. **GitHub Pages Deployment**
   - Create GitHub repo
   - Set up GitHub Actions workflow for Hugo build
   - Deploy to `gh-pages` branch
   - Configure custom domain (fixxitpros.com)

5. **Responsive Design**
   - Mobile-first approach
   - Breakpoints for tablet/desktop
   - Test on multiple devices

6. **SEO**
   - Meta tags (title, description)
   - Open Graph tags
   - Structured data for services
   - Sitemap.xml
   - robots.txt

## Content Strategy

### Homepage Content
- Use actual text from fixxitpros.com (extracted from screenshots)
- Maintain exact wording for:
  - Hero headline
  - Service names
  - Step descriptions
  - Trust factor text
  - Testimonials (customer names, quotes)
  - Disclaimer

### Legal Pages
- Copy exact text from Privacy Policy and Cookie Policy pages

## Build Process

1. **Phase 1: Setup**
   - Initialize Hugo site
   - Download all images
   - Create theme structure
   - Set up git repo

2. **Phase 2: Layout**
   - Build base template
   - Create header partial
   - Create footer partial
   - Homepage layout

3. **Phase 3: Components**
   - Services grid
   - 3-step process
   - Trust factors
   - Testimonials
   - Forms

4. **Phase 4: Pages**
   - Questions page
   - Looking for Work page
   - Service pages
   - Legal pages

5. **Phase 5: Styling**
   - Match colors exactly
   - Typography
   - Spacing
   - Responsive breakpoints

6. **Phase 6: JavaScript**
   - Mobile menu toggle
   - Testimonial carousel (if needed)
   - Chat widget (placeholder or real)
   - Cookie consent banner

7. **Phase 7: Deployment**
   - GitHub repo setup
   - GitHub Actions workflow
   - Test deployment
   - Custom domain configuration

## Success Criteria

✅ Site looks identical to fixxitpros.com (visual match)
✅ All forms work with Netlify
✅ Responsive on mobile/tablet/desktop
✅ GitHub Pages deployment successful
✅ All images loaded from local static folder
✅ SEO tags in place
✅ Fast page load times
✅ No broken links
✅ Clean, maintainable code

## Deliverables

1. Complete Hugo site in `/Users/productivebot/productivebot/projects/fixxitpros-hugo/`
2. GitHub repository with deployment workflow
3. README.md with:
   - How to run locally
   - How to deploy
   - How to update content
   - How to add new services/pages
4. Documentation for Maven (AI assistant) to manage site going forward

## Notes

- This is an EXACT replica - match design pixel-perfect
- Use real images from original site (already downloaded)
- Forms must be functional with Netlify
- Site will be managed by AI assistant going forward (so code must be clean and well-documented)
- Owner wants to operate this site autonomously through AI

---

**Build this site with Hugo. Match the design exactly. Make it production-ready.**
