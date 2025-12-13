# 🎮 START HERE - Divorce Quest Deployment Guide

## 👋 Welcome!

Your **Divorce Quest** game is **100% complete and ready to deploy!**

This guide will help you get your game from this environment to GitHub and live on the internet in about 15 minutes.

---

## 📋 What You'll Do (Overview)

1. ✅ Download all project files
2. ✅ Install Git (if needed)
3. ✅ Create GitHub repository
4. ✅ Run PowerShell deployment script
5. ✅ Enable GitHub Pages
6. ✅ Your game is LIVE! 🎉

---

## 📥 STEP 1: Download All Files

You need to download **22 files** from this project.

### Required Files:

#### Root Files (8)
- `index.html` - Main game interface
- `seed-sample-data.html` - Data seeding utility
- `deploy-to-github.ps1` - **IMPORTANT: Deployment script**
- `README.md` - Main documentation
- `LICENSE` - MIT License
- `.gitignore` - Git configuration
- Plus all other .md files (GITHUB_NOTES.md, QUICKSTART.md, etc.)

#### CSS Folder (1 file)
- `css/style.css` - All game styling

#### JS Folder (11 files)
- `js/config.js`
- `js/utils.js`
- `js/api.js`
- `js/bayesian.js`
- `js/questionnaire.js`
- `js/scenarios.js`
- `js/outcomes.js`
- `js/content-manager.js`
- `js/idle-manager.js`
- `js/game-engine.js`
- `js/main.js`

### How to Download:

1. **Create a folder** on your computer: `C:\divorcegame`
2. **Download each file** to the appropriate location:
   ```
   C:\divorcegame\
   ├── index.html
   ├── deploy-to-github.ps1    ← You'll run this!
   ├── README.md
   ├── (other .md files)
   ├── css\
   │   └── style.css
   └── js\
       └── (all 11 .js files)
   ```

3. **Keep the folder structure** - Don't put everything in one folder!

---

## 💻 STEP 2: Install Git

### Check if you already have Git:

1. Open **PowerShell** (search for "PowerShell" in Windows)
2. Type: `git --version`
3. If you see a version number, **Git is installed!** Skip to Step 3.

### If Git is not installed:

1. **Download:** https://git-scm.com/download/win
2. **Run installer** with default settings (just keep clicking "Next")
3. **Restart PowerShell**
4. **Verify:** Type `git --version` again

---

## 🌐 STEP 3: Create GitHub Repository

### If you don't have a GitHub account:
1. Go to: https://github.com/signup
2. Create account (free)

### Create the repository:

1. **Log into GitHub**
2. **Go to:** https://github.com/new
3. **Fill in:**
   - Repository name: `divorcegame`
   - Description: `A Scenario Planning Adventure Game for Divorce Exploration`
   - Public (recommended) or Private
   - **DO NOT** check any boxes (README, .gitignore, license)
4. **Click "Create repository"**
5. **COPY the repository URL** (looks like: `https://github.com/YOUR-USERNAME/divorcegame.git`)
   - You'll need this in the next step!

---

## 🚀 STEP 4: Run Deployment Script (EASIEST WAY!)

### Open PowerShell in your project folder:

1. **Navigate to your folder:**
   - Open File Explorer
   - Go to `C:\divorcegame` (or wherever you saved files)
   - Hold **Shift** and **right-click** in the folder
   - Select **"Open PowerShell window here"**
   - OR type `cd C:\divorcegame` in PowerShell

2. **Allow script execution** (one-time setup):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   - Type `Y` and press Enter

3. **Run the deployment script:**
   ```powershell
   .\deploy-to-github.ps1
   ```

4. **Follow the prompts:**
   - Enter your name (e.g., "John Doe")
   - Enter your email (e.g., "john@example.com")
   - **Paste your repository URL** (from Step 3)
   - Type `y` to confirm

5. **Authenticate with GitHub:**
   - When prompted for credentials:
     - **Username:** Your GitHub username
     - **Password:** Use a **Personal Access Token** (NOT your GitHub password!)
   
   **How to get a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Classic"
   - Name: `Divorce Quest Deployment`
   - Check: ✅ **repo** (all)
   - Click "Generate token"
   - **COPY the token** (you won't see it again!)
   - **Paste as password** when prompted

6. **Wait for success message!**
   - The script will upload all your files
   - You'll see "✓ SUCCESS!" when done

---

## 🌍 STEP 5: Enable GitHub Pages (Make It LIVE!)

1. **Go to your repository:**
   - Visit: `https://github.com/YOUR-USERNAME/divorcegame`

2. **Click "Settings"** (top menu)

3. **Click "Pages"** (left sidebar)

4. **Configure:**
   - Source: **Deploy from a branch**
   - Branch: Select **main**
   - Folder: Select **/ (root)**
   - Click **"Save"**

5. **Wait 1-2 minutes** for deployment

6. **Your game is LIVE at:**
   ```
   https://YOUR-USERNAME.github.io/divorcegame/
   ```
   
   Example: `https://dw-hurt.github.io/divorcegame/`

7. **Test it!**
   - Open the URL in your browser
   - Play the game
   - Share with others!

---

## 🎉 SUCCESS! You're Done!

Your game is now:
- ✅ **Backed up on GitHub** (safe and secure)
- ✅ **Live on the internet** (accessible worldwide)
- ✅ **Version controlled** (track all changes)
- ✅ **Ready to share** (send the link to anyone)

---

## 📚 What to Read Next

### For Playing the Game:
- **QUICKSTART.md** - How to play the game
- **README.md** - Complete documentation

### For Understanding the Code:
- **GITHUB_NOTES.md** - Technical architecture
- **PROJECT_SUMMARY.md** - Complete project overview

### For Deploying:
- **DEPLOYMENT_INSTRUCTIONS.md** - Detailed deployment guide
- **QUICK_REFERENCE.md** - Quick command reference

### For Contributing:
- **CONTRIBUTING.md** - How to contribute to the project

---

## 🐛 Something Not Working?

### Common Issues:

**"git is not recognized"**
- Install Git: https://git-scm.com/download/win
- Restart PowerShell

**"Cannot run script"**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**"Permission denied" when pushing**
- Use a Personal Access Token, not your password
- Generate at: https://github.com/settings/tokens

**GitHub Pages shows 404**
- Wait 1-2 minutes after enabling Pages
- Check Settings → Pages is enabled
- Verify branch is `main`, folder is `/ (root)`

**Game loads but doesn't work**
- Press F12 in browser to check for errors
- Make sure all files were uploaded
- Check that folder structure is correct (css/, js/)

**For more help:** See **DEPLOYMENT_INSTRUCTIONS.md** (detailed troubleshooting)

---

## 🔄 Need to Update Your Game Later?

If you make changes to your files:

```powershell
cd C:\divorcegame
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update in 1-2 minutes!

---

## 📞 Quick Links

- **Download Git:** https://git-scm.com/download/win
- **Create GitHub Account:** https://github.com/signup
- **Create Repository:** https://github.com/new
- **Personal Access Token:** https://github.com/settings/tokens
- **GitHub Pages Help:** https://pages.github.com/

---

## ✅ Deployment Checklist

Use this to track your progress:

- [ ] Downloaded all 22 files
- [ ] Created folder structure (css/, js/)
- [ ] Installed Git
- [ ] Created GitHub account
- [ ] Created GitHub repository
- [ ] Ran deployment script (`.\deploy-to-github.ps1`)
- [ ] Authenticated with Personal Access Token
- [ ] Enabled GitHub Pages
- [ ] Waited 1-2 minutes
- [ ] Tested game at GitHub Pages URL
- [ ] Game works correctly

---

## 🎯 Your Game URLs

After deployment:

**GitHub Repository:**
```
https://github.com/YOUR-USERNAME/divorcegame
```

**Live Game:**
```
https://YOUR-USERNAME.github.io/divorcegame/
```

*(Replace YOUR-USERNAME with your actual GitHub username)*

---

## 💡 Pro Tips

1. **Test Locally First**
   - Before deploying, double-click `index.html`
   - Make sure the game works on your computer

2. **Save Your Token**
   - Store your Personal Access Token somewhere safe
   - You'll need it for future updates

3. **Use the Script**
   - The PowerShell script handles everything automatically
   - Much easier than manual commands

4. **Share Your Game**
   - Send the GitHub Pages URL to friends/family
   - They can play without downloading anything

5. **Keep Learning**
   - Read GITHUB_NOTES.md to understand how it works
   - Modify the code and make it your own!

---

## 🚀 Ready? Let's Deploy!

**Follow the 5 steps above, and your game will be live in ~15 minutes!**

Need help? See **DEPLOYMENT_INSTRUCTIONS.md** for detailed guidance.

---

**You've got this! Your game is ready to go live!** 🎮🌐

**Start with Step 1 above and work your way down. Good luck!** 🍀
