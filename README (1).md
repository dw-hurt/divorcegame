# 🎮 DIVORCE QUEST v1.1.0 - Enhanced Edition

**Strategic Divorce Scenario Planning Game**

A turn-based, role-playing scenario simulator for exploring divorce outcomes using Bayesian statistical modeling and state-specific data. Built with pure vanilla JavaScript, HTML5, and CSS3.

🎯 **[PLAY LIVE GAME](https://dw-hurt.github.io/divorcegame/)** 🎯

---

## 🆕 What's New in v1.1.0

### Enhanced Complexity & Predictions
- **45 Total Questions** (up from 27)
  - 27 Factual Questions (added 9 new)
  - 18 Emotional Questions (added 9 new)
- **10 Prediction Categories** (up from 6)
  - Advanced Custody Analysis (NEW!)
  - Retirement Account Division (NEW!)
  - Mediation Success Prediction (NEW!)
  - Settlement vs Trial Analysis (NEW!)
  - Plus enhanced versions of existing predictions

### New Data Points
- Fault vs No-fault divorce considerations
- Retirement accounts (401k, IRA, pension values)
- Stock options and equity compensation
- Separate property (inherited, pre-marital assets)
- Infidelity history
- Domestic violence incidents
- Substance abuse issues
- Special needs children
- Child preference age (12+)
- Mediation willingness
- Attorney status for both parties
- Employment status for both parties
- Health insurance coverage
- Debt types breakdown
- Tax filing status
- And more...

---

## 📋 Features

### Core Gameplay
- **Turn-Based Questionnaire System**: 45 carefully designed questions
- **Multiple Scenarios**: Create, save, and compare unlimited scenarios
- **Bayesian Prediction Engine**: Statistical modeling based on state laws and averages
- **State-Specific Data**: All 50 US states with accurate divorce laws
- **Enhanced Complexity**: 10 prediction categories with detailed analysis

### Predictions & Analysis

#### 1. **Child Custody Prediction**
- Primary custody probabilities (mother, father, joint)
- Factors: Income stability, current arrangements, child ages, emotional bonds
- NEW: Domestic violence, substance abuse, special needs, child preferences

#### 2. **Advanced Custody Analysis** (NEW!)
- Factors favoring you
- Factors favoring spouse
- Risk factors identification
- Neutral factors consideration
- Detailed recommendations

#### 3. **Asset Division**
- Community property vs equitable distribution
- Your expected share vs spouse's share
- Enhanced with: Separate property, fault considerations, retirement accounts

#### 4. **Retirement Account Division** (NEW!)
- 401k, IRA, pension analysis
- Marital portion calculation
- QDRO requirements
- Percentage and dollar amount breakdowns

#### 5. **Alimony/Spousal Support**
- Likelihood percentage
- Estimated monthly amount
- Duration (rehabilitative, long-term, permanent)
- Enhanced with fault considerations

#### 6. **Child Support**
- Monthly obligation calculations
- Income shares model
- NEW: Special needs adjustments
- Net payer determination

#### 7. **Mediation Success Prediction** (NEW!)
- Success likelihood percentage
- Estimated number of sessions
- Recommendations based on conflict levels
- Factors: Willingness, compromise ability, DV, substance abuse

#### 8. **Settlement vs Trial Analysis** (NEW!)
- Settlement probability
- Trial probability
- Cost comparison (settlement vs trial)
- Potential savings calculation
- Recommendations

#### 9. **Timeline Estimation**
- Estimated months to completion
- Best and worst case scenarios
- Enhanced complexity factors

#### 10. **Cost Estimation**
- Total estimated costs
- Best and worst case scenarios
- Detailed breakdown: Attorney fees, court costs, expert fees

### Game Features
- **Content Management System**: Add custom questions
- **State Documents Library**: Standard divorce documents by state
- **Auto-Save**: Automatic progress saving
- **Idle Timeout**: 5-minute idle protection with auto-close
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Retro 1980s Zelda UI**: Nostalgic pixel-art inspired interface
- **Disclaimer System**: Clear educational disclaimer
- **Multiple Scenarios**: Play out different "what-if" situations

---

## 🎯 Currently Completed Features

### ✅ Fully Implemented

1. **Core Game Engine**
   - Turn-based question flow
   - Progress tracking
   - State management
   - Save/Load functionality
   - Idle timeout (5 minutes)

2. **Questionnaire System**
   - 27 factual questions (demographics, assets, income, etc.)
   - 18 emotional questions (stress, conflict, readiness, etc.)
   - Conditional question logic
   - Input validation
   - Multiple input types (text, number, select, scale)

3. **Bayesian Prediction Engine**
   - 10 prediction categories
   - State-specific calculations
   - Weighted factor analysis
   - Confidence scoring
   - Prior probability adjustments

4. **Data Storage**
   - Dual storage (API + localStorage fallback)
   - RESTful Table API integration
   - Scenario management (CRUD operations)
   - Custom content storage

5. **UI/UX**
   - Retro 1980s Zelda-inspired design
   - Responsive layout
   - Progress indicators
   - Interactive result visualizations
   - Loading states

6. **State-Specific Features**
   - 50 US states supported
   - Community property vs equitable distribution
   - Average timelines by state
   - Average costs by state
   - State document templates

---

## 🚀 Getting Started

### Option 1: Play Online
Visit: **[https://dw-hurt.github.io/divorcegame/](https://dw-hurt.github.io/divorcegame/)**

### Option 2: Run Locally

1. **Download Files**
   ```bash
   git clone https://github.com/dw-hurt/divorcegame.git
   cd divorcegame
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your web browser
   # No build process or dependencies required!
   ```

3. **Start Playing**
   - Accept disclaimer
   - Create character
   - Answer questions
   - View predictions

---

## 📁 Project Structure

```
divorcegame/
├── index.html                 # Main game file
├── css/
│   └── style.css             # Retro game styling
├── js/
│   ├── config.js             # Game configuration & constants
│   ├── utils.js              # Utility functions
│   ├── api.js                # RESTful API integration
│   ├── bayesian.js           # Bayesian prediction engine
│   ├── questionnaire.js      # Question management (45 questions)
│   ├── scenarios.js          # Scenario CRUD operations
│   ├── outcomes.js           # Result visualization
│   ├── content-manager.js    # Custom content management
│   ├── idle-manager.js       # Idle timeout handler
│   ├── game-engine.js        # Core game logic
│   └── main.js               # Main entry point
├── README.md                 # This file
├── GITHUB_NOTES.md           # Development notes
├── QUICKSTART.md             # Quick start guide
└── Documentation files...
```

---

## 🎮 How to Play

### 1. **Accept Disclaimer**
Read and accept the educational disclaimer.

### 2. **Create Character**
- Enter your name
- Select gender
- Choose your state
- Enter zipcode

### 3. **Answer Questions (45 Total)**
**Factual Questions (27):**
- Marriage duration
- Children (number, ages, special needs)
- Property (house, cars, investments)
- Income (yours and spouse's)
- Retirement accounts
- Stock options
- Separate property
- Employment status
- Legal considerations
- Infidelity/domestic violence
- Substance abuse
- And more...

**Emotional Questions (18):**
- Emotional readiness (1-10 scale)
- Stress level
- Conflict level
- Relationship priority
- Child concern
- Financial anxiety
- Support system
- Coparenting ability
- Compromise willingness
- Guilt and regret levels
- And more...

### 4. **View Predictions**
See detailed analysis across 10 categories:
- Custody probabilities
- Advanced custody analysis
- Asset division
- Retirement division
- Alimony estimates
- Child support
- Mediation success
- Settlement vs trial
- Timeline
- Costs

### 5. **Save Scenario**
Save your results and create multiple scenarios to compare.

---

## 🧠 Bayesian Modeling Approach

### Statistical Foundation
The game uses Bayesian inference to calculate probabilities:

```
P(Outcome|Data) = P(Data|Outcome) × P(Outcome) / P(Data)
```

### Factors Considered

**Child Custody:**
- Income stability (15% weight)
- Parenting time (20% weight)
- Child age (15% weight)
- Emotional bonds (15% weight)
- Living situation (10% weight)
- Work schedule (10% weight)
- Special needs (15% weight)
- Domestic violence (25% weight)
- Substance abuse (25% weight)
- Coparenting ability (20% weight)
- Child preference (15% weight)

**Asset Division:**
- Marital duration (20% weight)
- Income disparity (15% weight)
- Separate property (15% weight)
- Fault factor (10% weight)
- Custody factor (10% weight)
- Retirement accounts (15% weight)
- Stock options (15% weight)

**Alimony:**
- Income disparity (30% weight)
- Marriage duration (25% weight)
- Earning capacity (20% weight)
- Standard of living (15% weight)
- Fault factor (10% weight)

**And more...**

### State-Specific Adjustments
- Community property states: AZ, CA, ID, LA, NV, NM, TX, WA, WI
- Equitable distribution: All other states
- Fault states: 30 states allow fault considerations
- Average timelines: 6-13 months (state-dependent)
- Average costs: $12,000-$17,500 (state-dependent)

---

## 🔧 Technology Stack

### Frontend Only (No Backend Required!)
- **HTML5**: Semantic structure
- **CSS3**: Retro pixel-art styling, responsive design
- **Vanilla JavaScript (ES6+)**: Pure JS, no frameworks
- **LocalStorage**: Client-side data persistence
- **RESTful Table API**: Optional cloud storage

### No Dependencies
- No npm packages
- No build process
- No server required
- Pure static website
- CDN-hosted fonts only (Press Start 2P)

---

## 📊 Data Models

### Scenario Table Schema
```javascript
{
  id: UUID,
  character_name: String,
  character_gender: String,
  scenario_state: String,
  scenario_zipcode: String,
  years_married: Number,
  has_children: Boolean,
  num_children: Number,
  children_ages: String,
  owns_house: Boolean,
  home_value: Number,
  your_income: Number,
  spouse_income: Number,
  // ... 40+ more fields for comprehensive analysis
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Game Content Schema
```javascript
{
  id: UUID,
  type: String, // 'question', 'document', 'state_data'
  category: String,
  data: JSON,
  is_active: Boolean,
  created_at: Timestamp
}
```

---

## 🚀 Deployment

### GitHub Pages (Current Live Site)
**URL:** https://dw-hurt.github.io/divorcegame/

### Deploy Your Own Copy

#### Quick Deploy (Windows PowerShell)
```powershell
cd C:\Users\user\Documents\divorcegame
.\DEPLOY_NOW.ps1
```

#### Manual Deploy
```bash
git init
git add .
git commit -m "Initial commit - Divorce Quest v1.1.0"
git remote add origin https://github.com/YOUR-USERNAME/divorcegame.git
git branch -M main
git push -u origin main
```

#### Enable GitHub Pages
1. Go to repository Settings
2. Navigate to "Pages" section
3. Source: Deploy from a branch
4. Branch: `main`, Folder: `/ (root)`
5. Click "Save"
6. Wait 1-2 minutes
7. Visit: `https://YOUR-USERNAME.github.io/divorcegame/`

---

## 🔐 Privacy & Disclaimers

### Important Notices

⚠️ **THIS IS ONLY A GAME / EDUCATIONAL SIMULATION**

This application:
- ❌ Does NOT constitute legal advice
- ❌ Does NOT suggest how to execute a divorce
- ❌ Does NOT replace professional consultation
- ✅ IS for educational and planning purposes only
- ✅ Uses statistical averages and models
- ✅ Should be supplemented with professional advice

### Data Privacy
- All data stored locally in your browser
- Optional cloud storage via RESTful API
- No personal data shared with third parties
- No tracking or analytics
- Delete scenarios anytime

### Professional Consultation Required
Always consult with:
- **Licensed Attorneys**: For legal advice
- **Financial Advisors**: For financial planning
- **Therapists/Counselors**: For emotional support
- **Mediators**: For dispute resolution

---

## 📈 Roadmap & Future Enhancements

### Planned Features (v1.2.0+)
- [ ] Export scenarios to PDF
- [ ] Comparison view (side-by-side scenarios)
- [ ] More granular state-specific laws
- [ ] Advanced visualizations (charts/graphs)
- [ ] Attorney directory integration
- [ ] Mediation resource links
- [ ] Financial calculator tools
- [ ] Document checklist tracker
- [ ] Emotional wellness resources
- [ ] Multi-language support

### Community Contributions Welcome!
See `CONTRIBUTING.md` for guidelines.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/AmazingFeature`
3. **Commit Changes**: `git commit -m 'Add AmazingFeature'`
4. **Push to Branch**: `git push origin feature/AmazingFeature`
5. **Open Pull Request**

### Development Guidelines
- Pure vanilla JavaScript only
- No external dependencies (except CDN fonts)
- Maintain retro UI aesthetic
- Add comments and documentation
- Test on multiple browsers
- Ensure mobile responsiveness

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **Simplified Bayesian Models**: Real divorce outcomes depend on hundreds of factors
2. **State Averages**: Individual jurisdictions may vary significantly
3. **No Real-Time Legal Updates**: Laws change; verify with current attorney
4. **Browser Storage Limits**: LocalStorage has size limits (~5-10MB)
5. **No Backend Processing**: All calculations client-side

### Reporting Issues
Create an issue on GitHub: https://github.com/dw-hurt/divorcegame/issues

---

## 📜 License

**MIT License**

Copyright (c) 2024 Divorce Quest Project

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

See `LICENSE` file for full text.

---

## 👥 Credits & Acknowledgments

### Project Creator
- Original concept and development for divorce scenario planning

### Data Sources
- State divorce laws (publicly available information)
- Average timelines and costs (legal research databases)
- Statistical models (family law research)

### Design Inspiration
- 1980s The Legend of Zelda (retro gaming aesthetic)
- Turn-based RPG mechanics

### Technology
- Pure vanilla JavaScript community
- GitHub Pages hosting
- Google Fonts (Press Start 2P)

---

## 📞 Support & Contact

### Resources
- **Live Game**: https://dw-hurt.github.io/divorcegame/
- **GitHub Repository**: https://github.com/dw-hurt/divorcegame
- **Issue Tracker**: https://github.com/dw-hurt/divorcegame/issues
- **Documentation**: See all .md files in repository

### Getting Help
1. Check `QUICKSTART.md` for quick start
2. Read `GITHUB_NOTES.md` for technical details
3. Review `PROJECT_SUMMARY.md` for complete overview
4. Create GitHub issue for bugs/features
5. Check existing issues for solutions

---

## 🎯 Project Statistics

- **Version**: 1.1.0 (Enhanced Edition)
- **Total Files**: 30
- **Lines of Code**: ~7,500+
- **Questions**: 45
- **Prediction Categories**: 10
- **States Supported**: 50
- **Languages**: English
- **Dependencies**: 0 (pure vanilla JS)
- **File Size**: ~150 KB (total, all text files)

---

## 🙏 Thank You!

Thank you for using Divorce Quest! We hope this tool provides valuable insights for your divorce planning process.

**Remember**: This is a simulation and educational tool. Always consult with qualified professionals for your specific situation.

---

**🎮 Ready to play? [Start Now](https://dw-hurt.github.io/divorcegame/) 🎮**

---

*Last Updated: December 2024*
*Version: 1.1.0 - Enhanced Edition*
*Status: Production Ready ✅*
