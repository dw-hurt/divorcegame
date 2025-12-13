# 🚀 Divorce Quest - Complete Deployment Instructions

## Step-by-Step Guide to Upload to GitHub

---

## 📥 STEP 1: Download All Files

### Option A: Download from This Environment

If you're viewing this in a code editor or development environment, download ALL files in the project:

**Download these files/folders:**
```
divorcegame/
├── index.html
├── seed-sample-data.html
├── deploy-to-github.ps1              ← PowerShell deployment script
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── utils.js
│   ├── api.js
│   ├── bayesian.js
│   ├── questionnaire.js
│   ├── scenarios.js
│   ├── outcomes.js
│   ├── content-manager.js
│   ├── idle-manager.js
│   ├── game-engine.js
│   └── main.js
├── README.md
├── GITHUB_NOTES.md
├── QUICKSTART.md
├── CONTRIBUTING.md
├── PROJECT_SUMMARY.md
├── DEPLOYMENT_INSTRUCTIONS.md        ← This file
├── LICENSE
└── .gitignore
```

**Total Files: 22**

### Option B: Create Files Manually

If you need to create files manually:
1. Create a folder called `divorcegame`
2. Create subfolders: `css` and `js`
3. Copy each file content to the appropriate location
4. Ensure file extensions are correct (.html, .css, .js, .md, .ps1)

---

## 💻 STEP 2: Install Git

### Check if Git is Already Installed

Open PowerShell and run:
```powershell
git --version
```

If you see a version number (e.g., `git version 2.42.0`), Git is installed. **Skip to Step 3.**

### Install Git for Windows

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Download the latest version (64-bit recommended)

2. **Install Git:**
   - Run the downloaded installer
   - **Recommended settings:**
     - ✅ Use Git from Windows Command Prompt
     - ✅ Use bundled OpenSSH
     - ✅ Use OpenSSL library
     - ✅ Checkout Windows-style, commit Unix-style line endings
     - ✅ Use MinTTY (default terminal)
     - ✅ Default (fast-forward or merge)
     - ✅ Git Credential Manager
     - ✅ Enable file system caching
   - Click "Install"

3. **Verify Installation:**
   - Open a **NEW** PowerShell window
   - Run: `git --version`
   - You should see the version number

---

## 🌐 STEP 3: Create GitHub Account (if needed)

### If You Don't Have a GitHub Account:

1. Go to: https://github.com/signup
2. Enter your email, create a password, choose a username
3. Verify your email address
4. Complete the setup

### If You Already Have a GitHub Account:

1. Go to: https://github.com/login
2. Log in with your credentials

---

## 📦 STEP 4: Create GitHub Repository

1. **Go to GitHub and create a new repository:**
   - Visit: https://github.com/new
   - Or click the "+" icon → "New repository"

2. **Fill in the repository details:**
   ```
   Repository name: divorcegame
   Description: A Scenario Planning Adventure Game for Divorce Exploration
   Visibility: ○ Public  or  ○ Private (your choice)
   
   ⚠️ DO NOT CHECK ANY OF THESE:
   ☐ Add a README file
   ☐ Add .gitignore
   ☐ Choose a license
   ```

3. **Click "Create repository"**

4. **Copy the repository URL:**
   - You'll see instructions on the next page
   - Copy the URL that looks like:
   ```
   https://github.com/YOUR-USERNAME/divorcegame.git
   ```
   - **IMPORTANT:** Keep this URL handy!

---

## 🚀 STEP 5: Deploy Using PowerShell Script (EASIEST METHOD)

### Method A: Automated Script (Recommended)

1. **Navigate to your project folder:**
   - Open PowerShell
   - Navigate to your `divorcegame` folder:
   ```powershell
   cd C:\Path\To\Your\divorcegame
   ```

2. **Run the deployment script:**
   ```powershell
   .\deploy-to-github.ps1
   ```

3. **If you get an execution policy error:**
   ```powershell
   # Run this first to allow the script:
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   
   # Then run the script again:
   .\deploy-to-github.ps1
   ```

4. **Follow the script prompts:**
   - Enter your Git username (e.g., `dw-hurt`)
   - Enter your Git email (e.g., `your@email.com`)
   - Enter your GitHub repository URL (the one you copied in Step 4)
   - Confirm when prompted
   - Authenticate with GitHub when asked

5. **Authentication:**
   - **Windows will prompt for credentials**
   - **Username:** Your GitHub username
   - **Password:** Use a **Personal Access Token** (NOT your GitHub password)
     - Generate a token at: https://github.com/settings/tokens
     - Click "Generate new token" → "Classic"
     - Give it a name: "Divorce Quest Deployment"
     - Select scopes: ✅ repo (all)
     - Click "Generate token"
     - **COPY THE TOKEN** (you won't see it again!)
     - Use this token as your password

6. **Done!** The script will:
   - Initialize the Git repository
   - Add all files
   - Commit with a comprehensive message
   - Push to GitHub
   - Display success message with next steps

---

## 🛠️ STEP 5 (Alternative): Manual Deployment

If you prefer manual commands or the script doesn't work:

### 1. Open PowerShell in your project folder:
```powershell
cd C:\Path\To\Your\divorcegame
```

### 2. Initialize Git repository:
```powershell
git init
```

### 3. Configure Git (first time only):
```powershell
git config user.name "Your Name"
git config user.email "your@email.com"
```

### 4. Add all files:
```powershell
git add .
```

### 5. Commit files:
```powershell
git commit -m "Initial commit - Divorce Quest v1.0.0"
```

### 6. Add GitHub remote:
```powershell
git remote add origin https://github.com/YOUR-USERNAME/divorcegame.git
```
**Replace `YOUR-USERNAME` with your actual GitHub username!**

### 7. Rename branch to main:
```powershell
git branch -M main
```

### 8. Push to GitHub:
```powershell
git push -u origin main
```

You'll be prompted for credentials. Use your GitHub username and a Personal Access Token (see authentication section above).

---

## 🌍 STEP 6: Enable GitHub Pages (Make It Live!)

1. **Go to your repository on GitHub:**
   - Visit: https://github.com/YOUR-USERNAME/divorcegame

2. **Click on "Settings"** (top right of the repository)

3. **Scroll down to "Pages"** (left sidebar)

4. **Configure GitHub Pages:**
   - **Source:** Deploy from a branch
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
   - Click **"Save"**

5. **Wait 1-2 minutes** for deployment

6. **Your game will be live at:**
   ```
   https://YOUR-USERNAME.github.io/divorcegame/
   ```
   Example: https://dw-hurt.github.io/divorcegame/

7. **Test it:**
   - Open the URL in your browser
   - Play through the game
   - Share with others!

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Repository is visible on GitHub
- [ ] All files are present (check the file list)
- [ ] README.md displays correctly on the repository page
- [ ] GitHub Pages is enabled in Settings → Pages
- [ ] Game loads at the GitHub Pages URL
- [ ] Game is playable (can create character, answer questions)
- [ ] No console errors (press F12 to check)

---

## 🐛 Troubleshooting

### Problem: "git is not recognized"
**Solution:** Git is not installed or not in PATH
- Reinstall Git
- Make sure to select "Use Git from Windows Command Prompt" during installation
- Restart PowerShell after installation

### Problem: "Permission denied" when pushing
**Solution:** Authentication failed
- Use a Personal Access Token instead of password
- Generate at: https://github.com/settings/tokens
- Token needs `repo` scope
- Save the token somewhere safe

### Problem: "Repository not found"
**Solution:** Wrong URL or repository not created
- Double-check the repository URL
- Make sure the repository exists on GitHub
- Ensure you're logged into the correct GitHub account

### Problem: "Cannot run script" or "Execution policy" error
**Solution:** PowerShell script execution is blocked
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then run the script again.

### Problem: GitHub Pages shows 404
**Solution:** Wait 1-2 minutes or check configuration
- GitHub Pages takes time to deploy
- Verify Settings → Pages is enabled
- Ensure branch is set to `main` and folder is `/ (root)`
- Check that `index.html` exists in the root folder

### Problem: Game loads but doesn't work
**Solution:** Check browser console
- Press F12 to open Developer Tools
- Check the Console tab for errors
- Common issues:
  - JavaScript files not loading (check paths)
  - CORS issues with API (use localStorage fallback)

---

## 📁 File Structure After Upload

Your GitHub repository should look like this:

```
dw-hurt/divorcegame
├── 📄 README.md                    (displays on main page)
├── 📄 index.html
├── 📄 seed-sample-data.html
├── 📄 deploy-to-github.ps1
├── 📂 css/
│   └── style.css
├── 📂 js/
│   ├── config.js
│   ├── utils.js
│   ├── api.js
│   ├── bayesian.js
│   ├── questionnaire.js
│   ├── scenarios.js
│   ├── outcomes.js
│   ├── content-manager.js
│   ├── idle-manager.js
│   ├── game-engine.js
│   └── main.js
├── 📄 GITHUB_NOTES.md
├── 📄 QUICKSTART.md
├── 📄 CONTRIBUTING.md
├── 📄 PROJECT_SUMMARY.md
├── 📄 DEPLOYMENT_INSTRUCTIONS.md
├── 📄 LICENSE
└── 📄 .gitignore
```

---

## 🔄 Updating Your Code Later

When you make changes to your game:

```powershell
# Navigate to your project folder
cd C:\Path\To\Your\divorcegame

# Check what changed
git status

# Add changed files
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically update within 1-2 minutes!

---

## 🎉 Success!

Once everything is deployed, you'll have:

✅ **GitHub Repository:** https://github.com/YOUR-USERNAME/divorcegame  
✅ **Live Game:** https://YOUR-USERNAME.github.io/divorcegame/  
✅ **Version Control:** All your code is backed up  
✅ **Collaboration Ready:** Others can contribute  
✅ **Professional Portfolio:** Showcase your work  

---

## 📞 Need Help?

### Resources:
- **GitHub Docs:** https://docs.github.com/
- **Git Basics:** https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **GitHub Pages:** https://pages.github.com/

### Common Commands Quick Reference:
```powershell
git status              # Check status
git log                 # View commit history
git pull                # Get latest changes from GitHub
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push                # Upload to GitHub
```

---

## 🎮 You're Ready!

Follow the steps above, and your Divorce Quest game will be live on the internet!

**Happy deploying!** 🚀

---

**Questions?** Check the troubleshooting section or open an issue on GitHub after deployment.
