# Fixxit Pros - Deployment Instructions

## 🎉 Site Built Successfully

Your modern, conversion-optimized Fixxit Pros website is ready to deploy!

**What was built:**
- ✅ Modern Hugo site with custom theme
- ✅ All 17 images downloaded from fixxitpros.com
- ✅ Improved UX/UI (better typography, spacing, colors)
- ✅ All pages: Homepage, Contact, Looking for Work, Service pages, Legal pages
- ✅ Netlify Forms integrated
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ GitHub Actions workflow for automatic deployment
- ✅ SEO optimized (meta tags, sitemap, robots.txt)

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Name:** `fixxitpros-website` (or any name you want)
   - **Visibility:** Public (required for free GitHub Pages)
   - **Do NOT initialize with README** (we already have code)
3. Click "Create repository"

---

## Step 2: Push Code to GitHub

After creating the repo, run these commands (Maven will do this for you):

```bash
cd /Users/productivebot/productivebot/projects/fixxitpros-hugo
git add -A
git commit -m "Initial commit: Fixxit Pros Hugo site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fixxitpros-website.git
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Build and deployment":
   - **Source:** GitHub Actions
5. GitHub will automatically deploy when you push to main branch

**Your site will be live at:**
`https://YOUR_USERNAME.github.io/fixxitpros-website/`

---

## Step 4: DNS Settings for fixxitpros.com

### Option A: Apex Domain (fixxitpros.com)

Add these **A Records** at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**CNAME Record for www:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR_USERNAME.github.io | 3600 |

### Option B: Subdomain Only (www.fixxitpros.com)

Add this **CNAME Record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR_USERNAME.github.io | 3600 |

---

## Step 5: Configure Custom Domain in GitHub

1. Go to repository **Settings** → **Pages**
2. Under "Custom domain":
   - Enter: `fixxitpros.com` (or `www.fixxitpros.com`)
3. Click **Save**
4. Wait for DNS check (takes 1-10 minutes)
5. Once verified, check **Enforce HTTPS**

---

## Step 6: Verify It's Working

1. Wait 5-10 minutes for DNS propagation
2. Visit https://fixxitpros.com
3. Check:
   - ✅ Site loads
   - ✅ SSL/HTTPS working
   - ✅ Forms submit correctly
   - ✅ All images load
   - ✅ Mobile responsive

---

## DNS Settings Summary (Copy/Paste Ready)

**For your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):**

### A Records (for apex domain fixxitpros.com):
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### CNAME Record (for www subdomain):
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Managing the Site Going Forward

### Update Content
All content is in `/content/` folder:
- `_index.md` = Homepage
- `questions.md` = Contact page
- `looking-for-work.md` = Work application page
- `hvac.md`, `plumbing.md`, etc. = Service pages

### Update Images
Place new images in `/static/images/`

### Deploy Changes
1. Make changes to files
2. Git commit and push to main branch
3. GitHub Actions automatically rebuilds and deploys
4. Live in ~2 minutes

### Forms
Forms are handled by Netlify Forms (free tier):
- You'll need to sign up at https://netlify.com
- Deploy the site to Netlify (or keep GitHub Pages and just use Netlify for forms)

**Alternative:** Use Formspree, Google Forms, or any other form service

---

## Local Development

To preview changes before deploying:

```bash
cd /Users/productivebot/productivebot/projects/fixxitpros-hugo
hugo server
```

Visit: http://localhost:1313

---

## Troubleshooting

**DNS not working?**
- Wait 10-30 minutes for propagation
- Use https://dnschecker.org to verify DNS records
- Make sure you replaced `YOUR_USERNAME` with actual GitHub username

**SSL not working?**
- Wait 24 hours after DNS verification
- GitHub Pages auto-provisions SSL certificates
- Make sure "Enforce HTTPS" is checked in Settings → Pages

**Forms not submitting?**
- Set up Netlify or alternative form service
- Update form action URLs in layouts/partials/forms

---

## Next Steps

1. **Create GitHub repo** (tell me when ready, I'll push the code)
2. **Add DNS records** (copy from summary above)
3. **Configure custom domain** in GitHub Pages
4. **Set up form handling** (Netlify or alternative)
5. **Test everything** (forms, links, mobile, SSL)

---

**Ready to deploy? Tell me your GitHub username and I'll push the code.**
