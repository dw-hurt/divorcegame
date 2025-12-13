# 🚀 DIVORCE QUEST - FINAL DEPLOYMENT INSTRUCTIONS

## 📍 **Your Save Location**
```
C:\Users\user\Documents\divorcegame\
```

All files must be saved to this location and its subfolders.

---

## ⚡ **QUICK START (4 Steps)**

### **Step 1: Create Folders**

Open File Explorer and create:

```
C:\Users\user\Documents\divorcegame\
├── css\
└── js\
```

**How:**
1. Open File Explorer
2. Go to `C:\Users\user\Documents\`
3. Create new folder: `divorcegame`
4. Inside divorcegame, create: `css` and `js` folders

---

### **Step 2: Download 30 Files**

Download all files from your development environment and save them to:

**18 files → `C:\Users\user\Documents\divorcegame\`** (root folder)
**1 file → `C:\Users\user\Documents\divorcegame\css\`**
**11 files → `C:\Users\user\Documents\divorcegame\js\`**

See **🎯_DOWNLOAD_ALL_FILES.md** for complete file list.

---

### **Step 3: Deploy to GitHub**

Open PowerShell in your divorcegame folder:

```powershell
# Navigate to folder
cd C:\Users\user\Documents\divorcegame

# Allow scripts (first time only)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Deploy!
.\DEPLOY_NOW.ps1
```

**Authenticate with:**
- Username: `dw-hurt`
- Password: Personal Access Token from https://github.com/settings/tokens

---

### **Step 4: Enable GitHub Pages**

1. Visit: https://github.com/dw-hurt/divorcegame/settings/pages
2. Source: **main** branch
3. Folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes

**Your game will be live at:** https://dw-hurt.github.io/divorcegame/

---

## 📂 **Complete File Structure**

After downloading all files, you should have:

```
C:\Users\user\Documents\divorcegame\
│
├── index.html
├── seed-sample-data.html
├── DEPLOY_NOW.ps1                    ← Run this!
├── deploy-to-github.ps1
├── README.md
├── GITHUB_NOTES.md
├── QUICKSTART.md
├── CONTRIBUTING.md
├── PROJECT_SUMMARY.md
├── DEPLOYMENT_INSTRUCTIONS.md
├── QUICK_REFERENCE.md
├── START_HERE.md
├── READY_TO_DEPLOY.md
├── WHERE_TO_SAVE_FILES.md
├── SIMPLE_SETUP_GUIDE.txt
├── 📍_READ_ME_FIRST.txt
├── 🎯_DOWNLOAD_ALL_FILES.md
├── 🚀_FINAL_INSTRUCTIONS.md         ← You are here!
├── LICENSE
├── .gitignore
│
├── css\
│   └── style.css                     (1 file)
│
└── js\
    ├── config.js
    ├── utils.js
    ├── api.js
    ├── bayesian.js
    ├── questionnaire.js
    ├── scenarios.js
    ├── outcomes.js
    ├── content-manager.js
    ├── idle-manager.js
    ├── game-engine.js
    └── main.js                       (11 files)
```

**Total: 30 files + 2 folders**

---

## 📥 **File Download List**

### **Root Folder Files (18):**
Save to: `C:\Users\user\Documents\divorcegame\`

1. index.html
2. seed-sample-data.html
3. DEPLOY_NOW.ps1 ⭐
4. deploy-to-github.ps1
5. README.md
6. GITHUB_NOTES.md
7. QUICKSTART.md
8. CONTRIBUTING.md
9. PROJECT_SUMMARY.md
10. DEPLOYMENT_INSTRUCTIONS.md
11. QUICK_REFERENCE.md
12. START_HERE.md
13. READY_TO_DEPLOY.md ⭐
14. WHERE_TO_SAVE_FILES.md
15. SIMPLE_SETUP_GUIDE.txt
16. 📍_READ_ME_FIRST.txt ⭐
17. LICENSE
18. .gitignore

### **CSS Folder Files (1):**
Save to: `C:\Users\user\Documents\divorcegame\css\`

19. style.css

### **JS Folder Files (11):**
Save to: `C:\Users\user\Documents\divorcegame\js\`

20. config.js
21. utils.js
22. api.js
23. bayesian.js
24. questionnaire.js
25. scenarios.js
26. outcomes.js
27. content-manager.js
28. idle-manager.js
29. game-engine.js
30. main.js

---

## 🔐 **Authentication Requirements**

### **Personal Access Token (Required!)**

You CANNOT use your GitHub password. You MUST use a token.

**Generate Token:**
1. Go to: https://github.com/settings/tokens
2. Click: **Generate new token** → **Classic**
3. Name: `Divorce Quest Deployment`
4. Scopes: Check ✅ **repo** (all options under repo)
5. Click: **Generate token**
6. **COPY THE TOKEN** immediately (you won't see it again!)
7. Save it somewhere safe

**Use Token:**
- When PowerShell asks for password
- Paste your token (it won't show on screen)
- Press Enter

---

## 🎯 **PowerShell Commands Reference**

### **Navigate to Your Folder:**
```powershell
cd C:\Users\user\Documents\divorcegame
```

### **Check You're in the Right Place:**
```powershell
# Should list all your files
ls
```

### **Allow Scripts (First Time Only):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Deploy:**
```powershell
.\DEPLOY_NOW.ps1
```

### **Alternative: Open PowerShell in Folder:**
1. Open File Explorer
2. Navigate to `C:\Users\user\Documents\divorcegame\`
3. Hold **Shift** + **Right-click** in the folder
4. Select **"Open PowerShell window here"**

---

## ✅ **Verification Checklist**

Before deploying, verify:

- [ ] Folder exists: `C:\Users\user\Documents\divorcegame\`
- [ ] Subfolder exists: `C:\Users\user\Documents\divorcegame\css\`
- [ ] Subfolder exists: `C:\Users\user\Documents\divorcegame\js\`
- [ ] Root folder has 18 files
- [ ] css folder has 1 file
- [ ] js folder has 11 files
- [ ] Total: 30 files
- [ ] Can double-click index.html and see game
- [ ] Git is installed (run: `git --version`)
- [ ] Have Personal Access Token ready

After deploying, verify:

- [ ] Code visible at: https://github.com/dw-hurt/divorcegame
- [ ] All files show on GitHub
- [ ] GitHub Pages enabled in Settings → Pages
- [ ] Game loads at: https://dw-hurt.github.io/divorcegame/
- [ ] Can play through questionnaire
- [ ] No console errors (press F12)

---

## 🐛 **Troubleshooting**

### **Problem: Can't find folder in PowerShell**
```powershell
# Navigate step by step
cd C:\
cd Users
cd user
cd Documents
cd divorcegame

# Now you should be there
ls
```

### **Problem: Script won't run**
```powershell
# Run this first
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Try again
.\DEPLOY_NOW.ps1
```

### **Problem: Authentication fails**
- Use Personal Access Token, NOT your GitHub password
- Generate new token at: https://github.com/settings/tokens
- Make sure token has `repo` scope
- Copy the entire token (it's long!)

### **Problem: Git not found**
- Install Git: https://git-scm.com/download/win
- Restart PowerShell after installation
- Verify: `git --version`

### **Problem: GitHub Pages shows 404**
- Wait 1-2 minutes (Pages takes time to deploy)
- Check Settings → Pages is enabled
- Verify branch is `main`, folder is `/ (root)`
- Check green success message appears

### **Problem: Game doesn't work**
- Press F12 in browser
- Check Console tab for errors
- Verify all files uploaded to GitHub
- Check folder structure (css/ and js/ folders)

---

## 📖 **Which Guide to Read?**

**Quick Setup:**
- 🎯 **🎯_DOWNLOAD_ALL_FILES.md** - File download list
- 📍 **📍_READ_ME_FIRST.txt** - Quick overview
- 📝 **SIMPLE_SETUP_GUIDE.txt** - Step-by-step

**Detailed Instructions:**
- ✅ **READY_TO_DEPLOY.md** - Complete checklist
- 📚 **START_HERE.md** - Beginner's guide
- 📖 **README.md** - Full documentation

**Quick Reference:**
- ⚡ **QUICK_REFERENCE.md** - Command cheat sheet
- 📋 **DEPLOYMENT_INSTRUCTIONS.md** - Deployment steps

---

## 🌐 **Your URLs**

**Repository:** https://github.com/dw-hurt/divorcegame  
**Live Game:** https://dw-hurt.github.io/divorcegame/  
**GitHub Pages Settings:** https://github.com/dw-hurt/divorcegame/settings/pages  
**Generate Token:** https://github.com/settings/tokens  
**Git Download:** https://git-scm.com/download/win

---

## 🎉 **Success!**

Once everything is set up:

1. ✅ Files in `C:\Users\user\Documents\divorcegame\`
2. ✅ PowerShell running: `.\DEPLOY_NOW.ps1`
3. ✅ Authenticated with Personal Access Token
4. ✅ GitHub Pages enabled
5. ✅ Game live at: https://dw-hurt.github.io/divorcegame/

**Congratulations! Your game is deployed!** 🎮🎉

---

## 💡 **Pro Tips**

1. **Bookmark These URLs:**
   - Your repository
   - GitHub Pages settings
   - Token generation page

2. **Save Your Token:**
   - Store in password manager
   - You'll need it for updates

3. **Test Before Deploy:**
   - Double-click index.html
   - Make sure game works locally

4. **Keep Folder Organized:**
   - Don't add extra files
   - Don't modify structure
   - Keep it clean

5. **Update Later:**
   ```powershell
   cd C:\Users\user\Documents\divorcegame
   git add .
   git commit -m "Update"
   git push
   ```

---

## 🚀 **Ready to Deploy?**

**Your command:**
```powershell
cd C:\Users\user\Documents\divorcegame
.\DEPLOY_NOW.ps1
```

**Total time: ~15 minutes**

**Good luck!** 🎮🚀

---

**Questions?** Read the guide files in your divorcegame folder!
