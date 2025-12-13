# 💾 WHERE TO SAVE FILES - Step-by-Step Guide

## 📁 **Recommended Location: Documents Folder**

### **Your Save Location:**
```
C:\Users\user\Documents\divorcegame\
```

This is where ALL your files will be saved.

---

## 🎯 **STEP-BY-STEP: Create Folder and Download Files**

### **Step 1: Create Main Folder**

1. **Open File Explorer**
2. **Navigate to** `C:\Users\user\Documents\`
3. **Right-click** in the Documents folder
4. Select **New** → **Folder**
5. Name it: `divorcegame`
6. Press Enter

Your folder is now at:
```
C:\Users\user\Documents\divorcegame\
```

### **Step 2: Create Subfolders**

Inside the `divorcegame` folder, create two folders:

1. **Right-click inside the divorcegame folder**
2. **New** → **Folder** → Name it: `css`
3. **New** → **Folder** → Name it: `js`

Now you have:
```
C:\Users\user\Documents\divorcegame\
├── css\          (empty for now)
└── js\           (empty for now)
```

### **Step 3: Download Files to Correct Locations**

#### **Download to ROOT (divorcegame folder) - 18 files:**

Save these directly in `C:\Users\user\Documents\divorcegame\`:

```
✓ index.html
✓ seed-sample-data.html
✓ DEPLOY_NOW.ps1               ← Important!
✓ deploy-to-github.ps1
✓ README.md
✓ GITHUB_NOTES.md
✓ QUICKSTART.md
✓ CONTRIBUTING.md
✓ PROJECT_SUMMARY.md
✓ DEPLOYMENT_INSTRUCTIONS.md
✓ QUICK_REFERENCE.md
✓ START_HERE.md
✓ READY_TO_DEPLOY.md          ← Read this!
✓ DEPLOY_INSTRUCTIONS.txt
✓ WHERE_TO_SAVE_FILES.md      ← This file!
✓ FILE_CHECKLIST.txt
✓ LICENSE
✓ .gitignore
```

#### **Download to CSS folder - 1 file:**

Save to `C:\Users\YourUsername\Desktop\divorcegame\css\`:

```
✓ style.css
```

#### **Download to JS folder - 11 files:**

Save to `C:\Users\user\Documents\divorcegame\js\`:

```
✓ config.js
✓ utils.js
✓ api.js
✓ bayesian.js
✓ questionnaire.js
✓ scenarios.js
✓ outcomes.js
✓ content-manager.js
✓ idle-manager.js
✓ game-engine.js
✓ main.js
```

---

## 📂 **Final Folder Structure**

After downloading all files, your folder should look like this:

```
C:\Users\YourUsername\Desktop\divorcegame\
│
├── index.html
├── seed-sample-data.html
├── DEPLOY_NOW.ps1                    ← RUN THIS!
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
├── DEPLOY_INSTRUCTIONS.txt
├── WHERE_TO_SAVE_FILES.md
├── FILE_CHECKLIST.txt
├── LICENSE
├── .gitignore
│
├── css\
│   └── style.css                     ← Only 1 file here
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
    └── main.js                       ← 11 files total here
```

**Total: 28 files + 2 folders**

---

## ✅ **How to Verify You Have Everything**

### **Method 1: Visual Check**

Open File Explorer and navigate to your divorcegame folder:

1. **Root folder** should have ~17 files
2. **css folder** should have 1 file (style.css)
3. **js folder** should have 11 files

### **Method 2: Count Files**

1. Open the `divorcegame` folder
2. In the search box (top right), type: `*`
3. Look at the status bar (bottom): Should show "28 items"

### **Method 3: Check for Key Files**

Must have these files:
- [ ] `index.html` (in root)
- [ ] `DEPLOY_NOW.ps1` (in root)
- [ ] `css\style.css` (in css folder)
- [ ] `js\main.js` (in js folder)

If these exist, you're good to go!

---

## 🖥️ **How to Navigate to Your Folder in PowerShell**

### **If folder is on Desktop:**

```powershell
cd C:\Users\YourUsername\Desktop\divorcegame
```

**Replace `YourUsername` with your actual Windows username!**

### **Find Your Username:**

Not sure of your username? Type this in PowerShell:
```powershell
echo $env:USERNAME
```

Then use that name:
```powershell
cd C:\Users\YOUR_USERNAME_HERE\Desktop\divorcegame
```

### **Alternative: Use File Explorer**

1. Open File Explorer
2. Navigate to your `divorcegame` folder
3. Click in the address bar (shows the path)
4. Type: `powershell` and press Enter
5. PowerShell opens in that folder automatically!

---

## 🚀 **After Files Are Saved - What's Next?**

### **Step 1: Test Locally (Optional but Recommended)**

1. Open File Explorer
2. Navigate to your `divorcegame` folder
3. **Double-click `index.html`**
4. Your browser should open with the game
5. Try clicking through - does it work?

If the game works locally, you're ready to deploy!

### **Step 2: Open PowerShell in Your Folder**

**Method A: Shift + Right-Click**
1. Navigate to `divorcegame` folder in File Explorer
2. Hold **Shift** and **right-click** inside the folder
3. Select **"Open PowerShell window here"**

**Method B: Type in Address Bar**
1. Navigate to `divorcegame` folder
2. Click the address bar (where it shows the path)
3. Type: `powershell`
4. Press **Enter**

**Method C: CD Command**
```powershell
# Open PowerShell from Start menu
# Then navigate:
cd C:\Users\YourUsername\Desktop\divorcegame
```

### **Step 3: Run Deployment**

```powershell
# Allow scripts (first time only)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Deploy to GitHub
.\DEPLOY_NOW.ps1
```

---

## 📋 **Download Checklist**

Use this to track your progress:

### **Root Files:**
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
- [ ] READY_TO_DEPLOY.md
- [ ] DEPLOY_INSTRUCTIONS.txt
- [ ] WHERE_TO_SAVE_FILES.md
- [ ] FILE_CHECKLIST.txt
- [ ] LICENSE
- [ ] .gitignore

### **CSS Folder:**
- [ ] css\style.css

### **JS Folder:**
- [ ] js\config.js
- [ ] js\utils.js
- [ ] js\api.js
- [ ] js\bayesian.js
- [ ] js\questionnaire.js
- [ ] js\scenarios.js
- [ ] js\outcomes.js
- [ ] js\content-manager.js
- [ ] js\idle-manager.js
- [ ] js\game-engine.js
- [ ] js\main.js

**Total: 28 files**

---

## ⚠️ **Common Mistakes to Avoid**

### **DON'T:**
❌ Put all files in one folder (no subfolders)
❌ Put JavaScript files in root folder
❌ Rename the css or js folders
❌ Save files inside a ZIP file (extract first!)
❌ Mix up which files go where

### **DO:**
✅ Create css\ and js\ folders
✅ Put style.css in the css\ folder
✅ Put all .js files in the js\ folder
✅ Keep root files in the main divorcegame\ folder
✅ Keep exact file names (don't rename)

---

## 🔍 **Troubleshooting File Issues**

### **Problem: "Can't find DEPLOY_NOW.ps1"**
**Solution:** 
- Make sure you're in the right folder
- Type: `ls` in PowerShell to see files
- Should see DEPLOY_NOW.ps1 listed

### **Problem: "Game doesn't work when I open index.html"**
**Solution:**
- Check that css\style.css exists
- Check that js\ folder has all 11 files
- Press F12 in browser, check Console for errors

### **Problem: "Don't see .gitignore file"**
**Solution:**
- File Explorer might hide files starting with "."
- In File Explorer: View → Show → Hidden items (check)
- Or just don't worry - the deploy script will create it

### **Problem: "PowerShell won't open in my folder"**
**Solution:**
- Open PowerShell from Start menu
- Type: `cd ` (with a space)
- Drag your divorcegame folder into PowerShell
- Press Enter

---

## 💡 **Pro Tips**

1. **Use Desktop for Easy Access**
   - Easy to find
   - Easy to drag into PowerShell
   - Easy to delete later if needed

2. **Test Before Deploying**
   - Double-click index.html
   - Make sure game loads
   - Saves time troubleshooting later

3. **Keep Files Organized**
   - Don't add extra files to the folder
   - Don't change folder names
   - Keep the structure as shown

4. **Backup Your Files**
   - After download, make a copy
   - Save to another location
   - Or ZIP the folder

---

## 🎯 **Quick Start Path**

```
1. Create folder on Desktop: divorcegame
   └─ Create subfolders: css, js

2. Download 28 files to correct locations
   ├─ 17 files → divorcegame\
   ├─ 1 file → divorcegame\css\
   └─ 11 files → divorcegame\js\

3. Open PowerShell in divorcegame folder
   (Shift + right-click → "Open PowerShell window here")

4. Run: .\DEPLOY_NOW.ps1

5. Follow prompts and authenticate

6. Enable GitHub Pages

7. Your game is LIVE!
```

---

## ✅ **You're Ready When:**

- [ ] divorcegame folder exists
- [ ] css and js subfolders exist
- [ ] All 28 files downloaded to correct locations
- [ ] Can open index.html and see the game
- [ ] Can open PowerShell in the folder
- [ ] See DEPLOY_NOW.ps1 when you type `ls` in PowerShell

**If all checks pass, you're ready to deploy!**

---

## 🚀 **Next Steps**

1. **Read:** READY_TO_DEPLOY.md
2. **Run:** .\DEPLOY_NOW.ps1
3. **Enjoy:** Your live game!

---

**Your Path:**
```
C:\Users\YourUsername\Desktop\divorcegame\
```

**PowerShell Command:**
```powershell
cd C:\Users\YourUsername\Desktop\divorcegame
.\DEPLOY_NOW.ps1
```

**That's it! Good luck!** 🎮🚀
