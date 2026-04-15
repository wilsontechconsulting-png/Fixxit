# Push Code to GitHub - Quick Instructions

## The code is ready, but we need GitHub authentication.

### Option 1: Use GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. Click "Add" → "Add Existing Repository"
4. Choose: `/Users/productivebot/productivebot/projects/fixxitpros-hugo`
5. Click "Publish repository"
6. Done!

---

### Option 2: Command Line with Personal Access Token

**Step 1: Create a Personal Access Token**

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Fixxit Deploy"
4. Check these permissions:
   - ✅ `repo` (all repo permissions)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again)

**Step 2: Push with Token**

Run this command (replace `YOUR_TOKEN` with the token you copied):

```bash
cd /Users/productivebot/productivebot/projects/fixxitpros-hugo
git remote set-url origin https://YOUR_TOKEN@github.com/wilsontechconsulting-png/Fixxit.git
git push -u origin main
```

---

### Option 3: Maven Does It (Tell Me Your Token)

If you send me the personal access token, I can push the code right now.

**Security note:** I'll use it once and won't store it.

---

## After Code is Pushed

1. Go to: https://github.com/wilsontechconsulting-png/Fixxit/settings/pages
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Wait 2-3 minutes for first deployment
4. Site will be live at: https://wilsontechconsulting-png.github.io/Fixxit/

Then we configure your custom domain (fixxitpros.com).

---

**Which option do you want to use?**
