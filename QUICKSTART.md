# 🚀 Divorce Quest - Quick Start Guide

Get up and running in 5 minutes!

## ⚡ Fastest Way to Play

### Option 1: Open Locally (30 seconds)

1. Download the repository
2. Unzip the files
3. Double-click `index.html`
4. Start playing!

### Option 2: Run from GitHub (2 minutes)

```bash
# Clone the repository
git clone https://github.com/dw-hurt/divorcegame.git

# Navigate to directory
cd divorcegame

# Open in browser
open index.html  # macOS
start index.html  # Windows
xdg-open index.html  # Linux
```

That's it! No installation, no build process, no dependencies.

## 🎮 First Time Playing

### Step 1: Accept Disclaimer
- Read and accept the legal disclaimer
- This is a game, not legal advice

### Step 2: Create Your Character
- Enter your name (e.g., "Alex")
- Optionally add email for saving progress
- Click "BEGIN QUEST"

### Step 3: Create Your First Scenario
- Click "⚔️ NEW SCENARIO"
- Name it (e.g., "Scenario A - California")
- Start answering questions

### Step 4: Answer Questions
The game will ask two types of questions:

**Factual Questions (14 questions)**
- Your state
- Years married
- Children
- Assets and income
- Etc.

**Emotional Questions (10 questions)**
- How you're feeling
- Stress levels
- Support system
- Future outlook

### Step 5: View Predictions
The game will show you:
- Custody probabilities
- Asset division estimates
- Alimony calculations
- Timeline predictions
- Cost estimates
- Required documents

### Step 6: Explore More Scenarios
- Create multiple scenarios
- Compare different approaches
- Make informed decisions

## 🔧 Customization Quick Start

### Add a Custom Question

1. From title screen, click "CONTENT EDITOR"
2. Go to "Questions" tab
3. Click "➕ ADD NEW QUESTION"
4. Fill in the form:
   ```
   Question ID: my_custom_question
   Question Text: What is your primary concern?
   Category: emotional
   Metadata: {"type": "text"}
   ```
5. Click "SAVE QUESTION"

### Add State Data

1. Go to "State Data" tab in Content Editor
2. Click "➕ ADD STATE DATA"
3. Fill in state information:
   - State code (e.g., "CA")
   - Community property status
   - Average divorce duration
   - Filing fees
   - Required documents

## 📱 Mobile Quick Start

The game works great on mobile!

1. Visit the deployed URL on your phone
2. Add to home screen for app-like experience
3. Play anywhere, anytime

**iOS:** Tap Share → Add to Home Screen  
**Android:** Tap Menu → Add to Home screen

## 🌐 Deploy Quick Start

### GitHub Pages (Recommended - 2 minutes)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/divorcegame.git
git push -u origin main

# Enable GitHub Pages
# Go to: Repository Settings → Pages
# Source: main branch, / (root)
# Save

# Your game will be live at:
# https://yourusername.github.io/divorcegame/
```

### Netlify (Easiest - 1 minute)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `divorcegame` folder
3. Done! You get a live URL instantly

### Your Own Server

```bash
# Upload via FTP or:
scp -r divorcegame/* user@yourserver.com:/var/www/html/
```

## 🐛 Troubleshooting

### Game won't load
- Check browser console (F12) for errors
- Try a different browser (Chrome recommended)
- Clear browser cache and reload

### Data not saving
- Check if localStorage is enabled
- Try a different browser
- Check if private/incognito mode is blocking storage

### Questions not appearing
- Check browser console for JavaScript errors
- Ensure all .js files loaded correctly
- Try refreshing the page

### Predictions showing errors
- Ensure all questions were answered
- Check that income values aren't zero
- Review scenario data completeness

## 💡 Pro Tips

### Tip 1: Multiple Scenarios
Create different scenarios to compare:
- "Best case" scenario
- "Worst case" scenario
- "Most likely" scenario

### Tip 2: Use Email
Enter your email when creating character to:
- Save progress across devices (if API configured)
- Receive updates (future feature)

### Tip 3: Content Editor
Customize the game to your needs:
- Add state-specific questions
- Include relevant local laws
- Customize predictions

### Tip 4: Print/Save Results
To save your results:
- Take screenshots of outcome screen
- Use browser's Print to PDF function
- Copy text to a document

### Tip 5: Idle Timeout
The game closes after 5 minutes of inactivity:
- Saves your progress automatically
- Just refresh to continue
- Move your mouse to reset timer

## 📚 Learn More

- **Full Documentation:** See [README.md](README.md)
- **Technical Details:** See [GITHUB_NOTES.md](GITHUB_NOTES.md)
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🆘 Need Help?

- **Issues:** [GitHub Issues](https://github.com/dw-hurt/divorcegame/issues)
- **Questions:** [GitHub Discussions](https://github.com/dw-hurt/divorcegame/discussions)

## ⚖️ Remember

This is a game for exploration and education. 

**Always consult with a qualified attorney for legal advice specific to your situation.**

---

**Ready to play?** Open `index.html` and start your quest! 🎮
