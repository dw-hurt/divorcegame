# 🎯 Divorce Quest - Quick Reference Card

## 🚀 Deploy to GitHub in 5 Minutes

### Prerequisites Checklist
- [ ] Git installed (download: https://git-scm.com/download/win)
- [ ] GitHub account created (signup: https://github.com/signup)
- [ ] All project files downloaded to a folder

### Quick Deploy (PowerShell)

```powershell
# 1. Navigate to your project
cd C:\Path\To\divorcegame

# 2. Run deployment script
.\deploy-to-github.ps1

# 3. Follow prompts:
#    - Enter GitHub username
#    - Enter email
#    - Enter repository URL: https://github.com/USERNAME/divorcegame.git
#    - Confirm push
#    - Authenticate with Personal Access Token
```

### Manual Deploy (PowerShell)

```powershell
# Navigate to project
cd C:\Path\To\divorcegame

# Initialize Git
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Commit files
git add .
git commit -m "Initial commit - Divorce Quest v1.0.0"

# Push to GitHub
git remote add origin https://github.com/USERNAME/divorcegame.git
git branch -M main
git push -u origin main
```

### Enable GitHub Pages

1. Go to: https://github.com/USERNAME/divorcegame
2. Click **Settings** → **Pages**
3. Source: **main** branch, **/ (root)** folder
4. Click **Save**
5. Wait 1-2 minutes
6. Visit: https://USERNAME.github.io/divorcegame/

---

## 📁 Essential Files (Must Download)

### Core Files (6)
```
✓ index.html                    - Main game
✓ seed-sample-data.html         - Data seeder
✓ deploy-to-github.ps1          - Deployment script
✓ README.md                     - Documentation
✓ LICENSE                       - License
✓ .gitignore                    - Git config
```

### Folders (2)
```
✓ css/
  └── style.css                 - Styling
✓ js/
  ├── config.js                 - Configuration
  ├── utils.js                  - Utilities
  ├── api.js                    - API client
  ├── bayesian.js               - Predictions
  ├── questionnaire.js          - Questions
  ├── scenarios.js              - Scenarios
  ├── outcomes.js               - Results
  ├── content-manager.js        - CMS
  ├── idle-manager.js           - Timeout
  ├── game-engine.js            - Controller
  └── main.js                   - Bootstrap
```

### Documentation (5)
```
✓ GITHUB_NOTES.md               - Technical docs
✓ QUICKSTART.md                 - Quick start
✓ CONTRIBUTING.md               - Contribution guide
✓ PROJECT_SUMMARY.md            - Project overview
✓ DEPLOYMENT_INSTRUCTIONS.md    - This guide
```

**Total: 22 files**

---

## 🔑 GitHub Personal Access Token

### Create Token:
1. Go to: https://github.com/settings/tokens
2. Click: **Generate new token** → **Classic**
3. Name: `Divorce Quest Deployment`
4. Scopes: ✅ **repo** (all)
5. Click: **Generate token**
6. **COPY TOKEN** (won't see again!)

### Use Token:
- When prompted for password during `git push`
- Use the token instead of your GitHub password
- Save it somewhere safe (password manager)

---

## 🐛 Common Issues

### "git is not recognized"
```powershell
# Install Git from: https://git-scm.com/download/win
# Restart PowerShell after installation
git --version  # Should show version
```

### "Cannot run script"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\deploy-to-github.ps1
```

### "Permission denied"
- Use Personal Access Token (not password)
- Generate at: https://github.com/settings/tokens
- Needs `repo` scope

### "Repository not found"
- Create repository on GitHub first: https://github.com/new
- Use exact URL: https://github.com/USERNAME/divorcegame.git

### GitHub Pages 404
- Wait 1-2 minutes for deployment
- Check Settings → Pages is enabled
- Verify branch is `main`, folder is `/ (root)`

---

## 📊 Project Stats

- **Files:** 22
- **Code Size:** ~170 KB
- **Load Time:** < 1 second
- **Questions:** 27 default
- **States:** All 50 US
- **Predictions:** 6 types

---

## 🎮 Game Features

✓ Turn-based questionnaire  
✓ Bayesian predictions  
✓ Multiple scenarios  
✓ Content management  
✓ State-specific data  
✓ Idle timeout (5 min)  
✓ Document checklists  
✓ API + localStorage  

---

## 📖 Documentation Quick Links

- **Main Guide:** README.md
- **Technical:** GITHUB_NOTES.md
- **Quick Start:** QUICKSTART.md
- **Deploy:** DEPLOYMENT_INSTRUCTIONS.md
- **Contribute:** CONTRIBUTING.md
- **Summary:** PROJECT_SUMMARY.md

---

## 🔄 Update Your Game Later

```powershell
cd C:\Path\To\divorcegame
git add .
git commit -m "Your change description"
git push
```

GitHub Pages updates automatically in 1-2 minutes!

---

## 🌐 Your URLs

After deployment:

**Repository:** https://github.com/USERNAME/divorcegame  
**Live Game:** https://USERNAME.github.io/divorcegame/  
**Settings:** https://github.com/USERNAME/divorcegame/settings  

*(Replace USERNAME with your GitHub username)*

---

## ⚡ PowerShell Commands

```powershell
# Navigate
cd C:\Path\To\Folder

# Check status
git status

# View history
git log --oneline

# See changes
git diff

# Undo changes (before commit)
git restore .

# Pull updates
git pull

# Push updates
git push
```

---

## 🎯 Success Checklist

Deployment complete when:

- [ ] Files visible on GitHub
- [ ] README displays on repository page
- [ ] GitHub Pages enabled
- [ ] Game loads at GitHub Pages URL
- [ ] Can create character and play
- [ ] No console errors (F12)

---

## 📞 Get Help

- **Git Docs:** https://git-scm.com/doc
- **GitHub Docs:** https://docs.github.com/
- **GitHub Pages:** https://pages.github.com/
- **Issues:** After deployment, use GitHub Issues

---

## 💡 Pro Tips

1. **Test Locally First**
   - Open `index.html` in browser
   - Verify everything works

2. **Use the Script**
   - Automated deployment is easier
   - Handles common issues

3. **Save Your Token**
   - Store Personal Access Token safely
   - Use password manager

4. **Commit Often**
   - Make small, frequent commits
   - Use descriptive messages

5. **Check GitHub Pages**
   - First deployment takes 1-2 minutes
   - Refresh if needed

---

**Ready to deploy? Follow the steps above!** 🚀

**Need detailed instructions?** See DEPLOYMENT_INSTRUCTIONS.md

**Your game will be live at:** https://YOUR-USERNAME.github.io/divorcegame/
