# ✅ DIVORCE QUEST - READY TO DEPLOY!

## Your Repository is Ready: https://github.com/dw-hurt/divorcegame

---

## 🎯 **FASTEST WAY TO DEPLOY (5 Minutes)**

### **Step 1: Download All Files (27 files)**
Download everything to: `C:\divorcegame` (or your preferred folder)

**Keep this structure:**
```
C:\divorcegame\
├── index.html
├── DEPLOY_NOW.ps1          ← YOU'LL RUN THIS!
├── (other files)
├── css\
│   └── style.css
└── js\
    └── (11 .js files)
```

### **Step 2: Open PowerShell**
1. Navigate to your folder: `cd C:\divorcegame`
2. Allow scripts (one-time): 
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### **Step 3: Run Deployment**
```powershell
.\DEPLOY_NOW.ps1
```

### **Step 4: Authenticate**
When prompted:
- **Username:** `dw-hurt`
- **Password:** Use a **Personal Access Token**

**Get Token:**
1. Go to: https://github.com/settings/tokens
2. Generate new token → Classic
3. Name: `Divorce Quest`
4. Scope: ✅ **repo** (all)
5. Generate and COPY the token
6. Paste as password

### **Step 5: Enable GitHub Pages**
1. Go to: https://github.com/dw-hurt/divorcegame/settings/pages
2. Source: **main** branch
3. Folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes

### **Done! 🎉**
Your game will be live at: **https://dw-hurt.github.io/divorcegame/**

---

## 📋 **What You're Deploying**

### **Game Features:**
✅ Turn-based questionnaire (27 questions)  
✅ Bayesian prediction engine  
✅ Multiple scenario support  
✅ Content management system  
✅ State-specific data (all 50 US states)  
✅ 5-minute idle timeout  
✅ Document checklists  
✅ Retro Zelda-style UI  

### **File Count:**
- **Total:** 27 files
- **HTML:** 2 files
- **CSS:** 1 file
- **JavaScript:** 11 files
- **Documentation:** 11 files
- **Config:** 2 files

### **Total Size:** ~200 KB

---

## 🚀 **Three Ways to Deploy**

### **Option 1: Quick Deploy (Recommended)**
```powershell
.\DEPLOY_NOW.ps1
```
✅ Pre-configured for your repository  
✅ Automatic setup  
✅ Clear prompts  

### **Option 2: Full Deploy Script**
```powershell
.\deploy-to-github.ps1
```
✅ More detailed output  
✅ Shows all files  
✅ Step-by-step feedback  

### **Option 3: Manual Commands**
```powershell
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial commit - Divorce Quest v1.0.0"
git remote add origin https://github.com/dw-hurt/divorcegame.git
git branch -M main
git push -u origin main
```

---

## 🔑 **Personal Access Token (REQUIRED)**

You CANNOT use your GitHub password anymore. You MUST use a token.

### **Generate Token:**
1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Classic"
3. **Name:** `Divorce Quest Deployment`
4. **Scopes:** Check ✅ **repo** (all options under repo)
5. **Generate** and **COPY** immediately
6. **Save** somewhere safe (you won't see it again!)

### **Use Token:**
- When PowerShell asks for password
- Paste your token (it won't show on screen)
- Press Enter

---

## 📂 **Files to Download Checklist**

### **Root Files (15):**
- [ ] index.html
- [ ] seed-sample-data.html
- [ ] DEPLOY_NOW.ps1 ⭐
- [ ] deploy-to-github.ps1
- [ ] README.md
- [ ] GITHUB_NOTES.md
- [ ] QUICKSTART.md
- [ ] CONTRIBUTING.md
- [ ] PROJECT_SUMMARY.md
- [ ] DEPLOYMENT_INSTRUCTIONS.md
- [ ] QUICK_REFERENCE.md
- [ ] START_HERE.md
- [ ] FILE_CHECKLIST.txt
- [ ] LICENSE
- [ ] .gitignore

### **CSS Folder (1):**
- [ ] css/style.css

### **JS Folder (11):**
- [ ] js/config.js
- [ ] js/utils.js
- [ ] js/api.js
- [ ] js/bayesian.js
- [ ] js/questionnaire.js
- [ ] js/scenarios.js
- [ ] js/outcomes.js
- [ ] js/content-manager.js
- [ ] js/idle-manager.js
- [ ] js/game-engine.js
- [ ] js/main.js

**Total: 27 files**

---

## ✅ **Verification After Deployment**

### **Check on GitHub:**
- [ ] Visit: https://github.com/dw-hurt/divorcegame
- [ ] All files visible in file list
- [ ] README.md displays on main page
- [ ] css/ and js/ folders exist

### **Enable Pages:**
- [ ] Go to: Settings → Pages
- [ ] Source: main branch, / (root) folder
- [ ] Click Save
- [ ] Wait 1-2 minutes
- [ ] See green success message

### **Test Your Game:**
- [ ] Visit: https://dw-hurt.github.io/divorcegame/
- [ ] Game loads (retro green interface)
- [ ] Can click through disclaimer
- [ ] Can create character
- [ ] Can answer questions
- [ ] No console errors (press F12)

---

## 🐛 **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| "git is not recognized" | Install Git: https://git-scm.com/download/win |
| "Cannot run script" | Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| "Permission denied" | Use Personal Access Token, not password |
| "Repository not found" | Verify repo exists at github.com/dw-hurt/divorcegame |
| GitHub Pages 404 | Wait 1-2 minutes, check Settings → Pages enabled |
| Game doesn't work | Press F12, check console for errors |

---

## 📞 **Quick Links**

- **Your Repository:** https://github.com/dw-hurt/divorcegame
- **Settings/Pages:** https://github.com/dw-hurt/divorcegame/settings/pages
- **Live Game URL:** https://dw-hurt.github.io/divorcegame/
- **Generate Token:** https://github.com/settings/tokens
- **Git Download:** https://git-scm.com/download/win

---

## 📖 **Documentation to Read**

### **For Deployment:**
1. **DEPLOY_INSTRUCTIONS.txt** ⭐ - Quick deployment guide (this file)
2. **START_HERE.md** - Complete step-by-step
3. **QUICK_REFERENCE.md** - Command reference

### **For Playing:**
4. **QUICKSTART.md** - How to play
5. **README.md** - Main documentation

### **For Development:**
6. **GITHUB_NOTES.md** - Technical details
7. **PROJECT_SUMMARY.md** - Project overview

---

## 🎯 **Your Deployment Checklist**

- [ ] Downloaded all 27 files
- [ ] Created correct folder structure (css/, js/)
- [ ] Installed Git
- [ ] Generated Personal Access Token
- [ ] Opened PowerShell in divorcegame folder
- [ ] Ran: `.\DEPLOY_NOW.ps1`
- [ ] Entered credentials (username + token)
- [ ] Saw success message
- [ ] Enabled GitHub Pages in Settings
- [ ] Waited 1-2 minutes
- [ ] Tested game at: https://dw-hurt.github.io/divorcegame/
- [ ] Game works correctly

---

## 🎉 **You're All Set!**

Everything is pre-configured for your repository:
- ✅ Repository URL: `https://github.com/dw-hurt/divorcegame.git`
- ✅ Live URL: `https://dw-hurt.github.io/divorcegame/`
- ✅ Scripts ready to run
- ✅ All files ready to upload

**Just run `DEPLOY_NOW.ps1` and follow the prompts!**

---

## 💡 **Pro Tips**

1. **Test Locally First:** Open `index.html` in browser before deploying
2. **Save Your Token:** Store it in a password manager
3. **Use DEPLOY_NOW.ps1:** It's pre-configured for your repository
4. **Be Patient:** GitHub Pages takes 1-2 minutes to go live
5. **Check Console:** Press F12 if game doesn't work

---

## 🚀 **Ready to Deploy?**

```powershell
cd C:\divorcegame
.\DEPLOY_NOW.ps1
```

**That's it! Your game will be live in ~10 minutes!**

---

**Questions?** See **DEPLOY_INSTRUCTIONS.txt** or **START_HERE.md**

**Good luck!** 🎮🌐
