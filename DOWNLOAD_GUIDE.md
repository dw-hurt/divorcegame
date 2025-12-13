# 📥 DIVORCE QUEST - DOWNLOAD & SETUP GUIDE

## 📍 **Save Location: C:\Users\user\Documents\divorcegame\**

---

## 🎯 **STEP 1: Create Folder Structure**

### Open File Explorer and create these folders:

```
C:\Users\user\Documents\divorcegame\
├── css\
└── js\
```

### How to Create:
1. Open **File Explorer**
2. Navigate to `C:\Users\user\Documents\`
3. Right-click → **New** → **Folder** → Name: `divorcegame`
4. Open the divorcegame folder
5. Right-click → **New** → **Folder** → Name: `css`
6. Right-click → **New** → **Folder** → Name: `js`

---

## 📥 **STEP 2: Download Files (30 Files Total)**

### **ROOT FOLDER FILES** (18 files)
**Save to:** `C:\Users\user\Documents\divorcegame\`

Click each link to download:

1. [divorcegame-index.html](divorcegame-index.html) - Save as: `index.html`
2. [divorcegame-seed-sample-data.html](divorcegame-seed-sample-data.html) - Save as: `seed-sample-data.html`
3. [divorcegame-DEPLOY_NOW.ps1](divorcegame-DEPLOY_NOW.ps1) - Save as: `DEPLOY_NOW.ps1` ⭐
4. [divorcegame-deploy-to-github.ps1](divorcegame-deploy-to-github.ps1) - Save as: `deploy-to-github.ps1`
5. [divorcegame-README.md](divorcegame-README.md) - Save as: `README.md`
6. [divorcegame-GITHUB_NOTES.md](divorcegame-GITHUB_NOTES.md) - Save as: `GITHUB_NOTES.md`
7. [divorcegame-QUICKSTART.md](divorcegame-QUICKSTART.md) - Save as: `QUICKSTART.md`
8. [divorcegame-CONTRIBUTING.md](divorcegame-CONTRIBUTING.md) - Save as: `CONTRIBUTING.md`
9. [divorcegame-PROJECT_SUMMARY.md](divorcegame-PROJECT_SUMMARY.md) - Save as: `PROJECT_SUMMARY.md`
10. [divorcegame-DEPLOYMENT_INSTRUCTIONS.md](divorcegame-DEPLOYMENT_INSTRUCTIONS.md) - Save as: `DEPLOYMENT_INSTRUCTIONS.md`
11. [divorcegame-QUICK_REFERENCE.md](divorcegame-QUICK_REFERENCE.md) - Save as: `QUICK_REFERENCE.md`
12. [divorcegame-START_HERE.md](divorcegame-START_HERE.md) - Save as: `START_HERE.md`
13. [divorcegame-READY_TO_DEPLOY.md](divorcegame-READY_TO_DEPLOY.md) - Save as: `READY_TO_DEPLOY.md` ⭐
14. [divorcegame-WHERE_TO_SAVE_FILES.md](divorcegame-WHERE_TO_SAVE_FILES.md) - Save as: `WHERE_TO_SAVE_FILES.md`
15. [divorcegame-SIMPLE_SETUP_GUIDE.txt](divorcegame-SIMPLE_SETUP_GUIDE.txt) - Save as: `SIMPLE_SETUP_GUIDE.txt`
16. [divorcegame-📍_READ_ME_FIRST.txt](divorcegame-📍_READ_ME_FIRST.txt) - Save as: `📍_READ_ME_FIRST.txt`
17. [divorcegame-LICENSE](divorcegame-LICENSE) - Save as: `LICENSE`
18. [divorcegame-.gitignore](divorcegame-.gitignore) - Save as: `.gitignore`

### **CSS FOLDER FILES** (1 file)
**Save to:** `C:\Users\user\Documents\divorcegame\css\`

19. [divorcegame-css-style.css](divorcegame-css-style.css) - Save as: `style.css`

### **JS FOLDER FILES** (11 files)
**Save to:** `C:\Users\user\Documents\divorcegame\js\`

20. [divorcegame-js-config.js](divorcegame-js-config.js) - Save as: `config.js`
21. [divorcegame-js-utils.js](divorcegame-js-utils.js) - Save as: `utils.js`
22. [divorcegame-js-api.js](divorcegame-js-api.js) - Save as: `api.js`
23. [divorcegame-js-bayesian.js](divorcegame-js-bayesian.js) - Save as: `bayesian.js`
24. [divorcegame-js-questionnaire.js](divorcegame-js-questionnaire.js) - Save as: `questionnaire.js`
25. [divorcegame-js-scenarios.js](divorcegame-js-scenarios.js) - Save as: `scenarios.js`
26. [divorcegame-js-outcomes.js](divorcegame-js-outcomes.js) - Save as: `outcomes.js`
27. [divorcegame-js-content-manager.js](divorcegame-js-content-manager.js) - Save as: `content-manager.js`
28. [divorcegame-js-idle-manager.js](divorcegame-js-idle-manager.js) - Save as: `idle-manager.js`
29. [divorcegame-js-game-engine.js](divorcegame-js-game-engine.js) - Save as: `game-engine.js`
30. [divorcegame-js-main.js](divorcegame-js-main.js) - Save as: `main.js`

---

## ✅ **STEP 3: Verify Download**

After downloading all files, your folder should look like this:

```
C:\Users\user\Documents\divorcegame\
├── index.html
├── seed-sample-data.html
├── DEPLOY_NOW.ps1                    ⭐ RUN THIS!
├── deploy-to-github.ps1
├── README.md
├── GITHUB_NOTES.md
├── QUICKSTART.md
├── CONTRIBUTING.md
├── PROJECT_SUMMARY.md
├── DEPLOYMENT_INSTRUCTIONS.md
├── QUICK_REFERENCE.md
├── START_HERE.md
├── READY_TO_DEPLOY.md                ⭐ READ THIS!
├── WHERE_TO_SAVE_FILES.md
├── SIMPLE_SETUP_GUIDE.txt
├── 📍_READ_ME_FIRST.txt
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

**Total: 30 files**

---

## 🚀 **STEP 4: Deploy to GitHub**

### Open PowerShell:

1. Open File Explorer
2. Navigate to `C:\Users\user\Documents\divorcegame\`
3. Hold **Shift** and **right-click** inside the folder
4. Select **"Open PowerShell window here"**

### Run Deployment:

```powershell
# Allow scripts (first time only)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Deploy!
.\DEPLOY_NOW.ps1
```

### Authenticate:
- **Username:** `dw-hurt`
- **Password:** Your Personal Access Token
- **Get token:** https://github.com/settings/tokens

---

## 🌐 **STEP 5: Enable GitHub Pages**

1. Go to: https://github.com/dw-hurt/divorcegame/settings/pages
2. Source: **main** branch
3. Folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes

**Your game will be live at:** https://dw-hurt.github.io/divorcegame/

---

## 📋 **Quick Checklist**

- [ ] Created `C:\Users\user\Documents\divorcegame\` folder
- [ ] Created `css\` subfolder
- [ ] Created `js\` subfolder
- [ ] Downloaded all 18 files to root folder
- [ ] Downloaded 1 file to css folder
- [ ] Downloaded 11 files to js folder
- [ ] Verified 30 files total
- [ ] Opened PowerShell in divorcegame folder
- [ ] Ran `.\DEPLOY_NOW.ps1`
- [ ] Authenticated with Personal Access Token
- [ ] Enabled GitHub Pages
- [ ] Tested game at https://dw-hurt.github.io/divorcegame/

---

## 💡 **Important Notes**

### File Naming:
- Each download link is prefixed with `divorcegame-` to help you organize
- When saving, remove the `divorcegame-` prefix
- Example: `divorcegame-index.html` → save as `index.html`

### Folder Locations:
- **Root files** → `C:\Users\user\Documents\divorcegame\`
- **CSS files** → `C:\Users\user\Documents\divorcegame\css\`
- **JS files** → `C:\Users\user\Documents\divorcegame\js\`

### PowerShell Path:
```powershell
cd C:\Users\user\Documents\divorcegame
```

---

## 🆘 **Need Help?**

After downloading all files, read:
- **📍_READ_ME_FIRST.txt** - Overview
- **SIMPLE_SETUP_GUIDE.txt** - Easy steps
- **READY_TO_DEPLOY.md** - Deployment guide

---

## 🎉 **You're Ready!**

Once all 30 files are downloaded to the correct locations, just run:

```powershell
.\DEPLOY_NOW.ps1
```

Your game will be live in ~10 minutes!

**Good luck!** 🚀
