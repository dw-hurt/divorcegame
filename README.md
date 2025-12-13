# 🎮 Divorce Quest

## A Scenario Planning Adventure Game for Divorce Exploration

**Repository:** https://github.com/dw-hurt/divorcegame

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ⚠️ IMPORTANT DISCLAIMER

**THIS IS A GAME FOR EDUCATIONAL AND EXPLORATORY PURPOSES ONLY**

This game does NOT:
- Constitute legal advice
- Replace consultation with a qualified attorney
- Guarantee any outcomes in real divorce proceedings
- Suggest how to execute a divorce
- Provide legally binding information

All scenarios, outcomes, and predictions are SIMULATIONS based on statistical models and may not reflect your specific situation.

**Always consult with a licensed attorney in your jurisdiction before making any legal decisions.**

---

## 📖 Project Overview

Divorce Quest is an innovative, retro-style RPG game (inspired by 1980s Legend of Zelda) that gamifies divorce scenario planning. It allows individuals going through or considering divorce to explore various potential outcomes based on their specific circumstances, using Bayesian modeling and state-specific legal data.

### Key Features

✅ **Retro 1980s RPG Interface** - Nostalgic Zelda-style game aesthetics  
✅ **Multiple Scenario Support** - Create and compare different divorce scenarios  
✅ **Comprehensive Questionnaires** - Factual, emotional, and validation questions  
✅ **Bayesian Outcome Predictions** - Statistical modeling for custody, assets, alimony, etc.  
✅ **State-Specific Data** - Customizable state laws and averages  
✅ **Content Management System** - Add custom questions and content  
✅ **Idle Timeout Protection** - 5-minute inactivity auto-save  
✅ **Local & Cloud Storage** - RESTful API with localStorage fallback  
✅ **Document Checklists** - State-specific required divorce documents  

---

## 🎯 Current Features

### ✅ Completed Features

1. **Game Engine & Flow**
   - Turn-based questionnaire system
   - Screen state management
   - Session persistence (localStorage + API)
   - Idle detection and timeout (5 minutes)

2. **User Profile System**
   - Character creation
   - Multiple scenario management per session
   - Session continuity

3. **Questionnaire System**
   - Factual questions (14 default questions)
   - Emotional profiling (10 questions)
   - Validation questions (consistency checking)
   - Dynamic conditional questions
   - Progress tracking

4. **Bayesian Prediction Engine**
   - Child custody probability calculations
   - Asset division predictions (community property vs. equitable distribution)
   - Alimony likelihood and estimates
   - Child support calculations
   - Timeline predictions
   - Cost estimates

5. **State-Specific Features**
   - 50 US states configured
   - Community property state identification
   - State-specific document templates
   - Customizable state data

6. **Content Management**
   - Add/edit/delete custom questions
   - Question categorization
   - Metadata support for complex question types
   - Active/inactive content toggling

7. **UI/UX**
   - Retro 1980s aesthetic
   - Responsive design
   - NPC dialogue system
   - Progress bars
   - Interactive questionnaires

---

## 📁 Project Structure

```
divorcegame/
├── index.html                 # Main game HTML
├── css/
│   └── style.css             # Retro game styling
├── js/
│   ├── config.js             # Configuration constants
│   ├── utils.js              # Utility functions
│   ├── api.js                # RESTful API interface
│   ├── bayesian.js           # Bayesian prediction engine
│   ├── questionnaire.js      # Questionnaire system
│   ├── scenarios.js          # Scenario management
│   ├── outcomes.js           # Outcome display logic
│   ├── content-manager.js    # Content management system
│   ├── idle-manager.js       # Idle timeout handling
│   ├── game-engine.js        # Main game controller
│   └── main.js               # Application bootstrap
├── README.md                 # This file
└── GITHUB_NOTES.md          # Technical documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for basic functionality
- Optional: RESTful Table API for cloud storage

### Local Desktop Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dw-hurt/divorcegame.git
   cd divorcegame
   ```

2. **Open in browser:**
   - Simply double-click `index.html`
   - Or open it in your browser: `file:///path/to/divorcegame/index.html`

3. **Start playing:**
   - Accept the disclaimer
   - Create your character
   - Start your first scenario

### Web Deployment

#### Option 1: Static Hosting (GitHub Pages, Netlify, Vercel)

1. **GitHub Pages:**
   ```bash
   git push origin main
   # Enable GitHub Pages in repository settings
   # Your site will be at: https://dw-hurt.github.io/divorcegame/
   ```

2. **Netlify:**
   - Drag and drop the entire folder to Netlify
   - Or connect your GitHub repository

3. **Vercel:**
   ```bash
   vercel deploy
   ```

#### Option 2: Traditional Web Server

Upload all files to your web server:
```bash
# Via FTP/SFTP
# Or using rsync
rsync -avz divorcegame/ user@yourserver.com:/var/www/html/divorcegame/
```

### Configuration

#### API Endpoint (Optional)

If you have a RESTful Table API endpoint, configure it in `js/config.js`:

```javascript
API: {
    BASE_URL: 'https://your-api-domain.com/tables/',
    // ... rest of configuration
}
```

The game will automatically fall back to localStorage if API calls fail.

---

## 📊 Data Storage

### Database Tables

The game uses 5 database tables:

1. **game_sessions** - User sessions
2. **scenarios** - Divorce scenarios
3. **questionnaire_responses** - Individual answers
4. **game_content** - Custom questions and content
5. **state_data** - State-specific legal information

### Local Storage

Data is also stored in browser localStorage as a fallback:
- `currentSession` - Active user session
- `currentScenario` - Active scenario
- `scenarios` - Array of all scenarios

---

## 🎮 How to Play

### 1. Start the Game

- Accept the disclaimer
- Choose "NEW ADVENTURE" or "CONTINUE QUEST"

### 2. Create Your Profile

- Enter your name
- Optionally provide email for progress saving

### 3. Create a Scenario

- Give your scenario a descriptive name
- Example: "Scenario A - Community Property State"

### 4. Answer Factual Questions

- State of residence
- Marriage duration
- Children information
- Assets and income
- And more...

### 5. Complete Emotional Profile

- Answer psychological questions
- Rate your emotional state
- Assess your support system

### 6. View Predictions

The game will show predictions for:
- Child custody probabilities
- Asset division estimates
- Alimony likelihood and amounts
- Timeline estimates
- Cost projections

### 7. Review Required Documents

- State-specific document checklists
- Filing requirements
- Additional forms needed

### 8. Create More Scenarios

- Compare different approaches
- Explore various outcomes
- Make informed decisions

---

## 🔧 Customization

### Adding Custom Questions

1. Click "CONTENT EDITOR" on title screen
2. Go to "Questions" tab
3. Click "ADD NEW QUESTION"
4. Fill in:
   - Question text
   - Category (factual, emotional, validation)
   - Type (select, scale, boolean, etc.)
   - Metadata (JSON format)

### Adding State Data

1. Go to "State Data" tab in content editor
2. Add or edit state information:
   - Community property status
   - Average divorce duration
   - Filing fees
   - Required documents

### Modifying Bayesian Models

Edit `js/bayesian.js` to adjust:
- Prior probabilities
- Weight factors
- Calculation algorithms

---

## 🎨 Design Philosophy

### Retro Aesthetic

- 1980s RPG style inspired by Legend of Zelda
- Monospace fonts (VT323, Press Start 2P)
- Green terminal-style color scheme
- Pixel-perfect borders and animations

### User Experience

- Turn-based question flow
- Clear progress indicators
- NPC-style guidance dialogue
- Multiple scenario support
- Auto-save functionality

### Educational Focus

- Statistical modeling, not legal advice
- Transparent probability calculations
- Confidence scores provided
- Clear disclaimers throughout

---

## 📈 Future Enhancements

### Not Yet Implemented

- [ ] Validation questionnaire integration
- [ ] Emotional consistency checking
- [ ] Advanced Bayesian prior updates based on emotional profile
- [ ] Multi-language support
- [ ] Export scenario reports (PDF)
- [ ] Comparison view for multiple scenarios
- [ ] More detailed state-by-state data
- [ ] Integration with actual state legal databases
- [ ] Mediation vs. litigation pathway predictions
- [ ] Co-parenting plan templates
- [ ] Financial calculator tools
- [ ] Attorney finder integration

---

## 🔒 Privacy & Data

### Data Collection

- All data stored locally or in your configured API
- No analytics or tracking by default
- No data sold or shared
- User controls all data

### Data Deletion

To delete all local data:
```javascript
// Open browser console and run:
localStorage.clear();
```

---

## 🤝 Contributing

Contributions are welcome! This is an open-source educational project.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- Additional state-specific data
- Improved Bayesian models
- UI/UX enhancements
- Accessibility improvements
- Bug fixes
- Documentation
- Translations

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**dw-hurt**
- GitHub: [@dw-hurt](https://github.com/dw-hurt)
- Repository: [divorcegame](https://github.com/dw-hurt/divorcegame)

---

## 🙏 Acknowledgments

- Inspired by the original Legend of Zelda game design
- Built with vanilla JavaScript (no frameworks)
- Uses Google Fonts (Press Start 2P, VT323)
- Statistical models based on published divorce research

---

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- See GITHUB_NOTES.md for technical details
- Consult the inline code documentation

---

## 🎯 Version Information

**Current Version:** 1.0.0  
**Release Date:** 2024  
**Status:** Production Ready (Educational/Exploratory Tool)

---

Remember: This is a simulation tool for exploration and education. Always consult with qualified legal professionals for advice specific to your situation.

**Play responsibly. Plan wisely. Consult professionally.** 🎮⚖️
