# 📘 Divorce Quest - Technical Documentation & GitHub Notes

## Design Approach & Architecture

### Overview

Divorce Quest is a client-side static web application built with vanilla JavaScript, HTML5, and CSS3. It follows a modular architecture with clear separation of concerns and no external framework dependencies.

### Design Principles

1. **Static-First Architecture**
   - No server-side processing required
   - Works offline with localStorage
   - Progressive enhancement with API integration

2. **Modular JavaScript**
   - Each module handles specific functionality
   - Clear interfaces between modules
   - Easy to extend and maintain

3. **Retro Gaming Aesthetic**
   - Inspired by 1980s RPGs (Legend of Zelda)
   - Turn-based interaction model
   - NPC dialogue-driven experience

4. **Data Persistence Strategy**
   - Primary: RESTful Table API (cloud storage)
   - Fallback: localStorage (local browser storage)
   - Graceful degradation ensures functionality

---

## 🏗️ Software Architecture

### Architecture Pattern: MVC-inspired

```
┌─────────────────────────────────────────────────┐
│                  View Layer                      │
│  (index.html + CSS + DOM manipulation)          │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│              Controller Layer                    │
│  (game-engine.js - orchestrates game flow)      │
└──┬────────┬────────┬────────┬─────────┬────────┘
   │        │        │        │         │
┌──▼──┐ ┌──▼──┐ ┌───▼───┐ ┌──▼──┐ ┌────▼────┐
│Model│ │Model│ │ Model │ │Model│ │  Model  │
│Ques-│ │Scen-│ │Bayes- │ │Out- │ │Content  │
│tions│ │arios│ │ ian   │ │comes│ │Manager  │
└──┬──┘ └──┬──┘ └───┬───┘ └──┬──┘ └────┬────┘
   │        │        │        │         │
   └────────┴────────┴────────┴─────────┘
                     │
            ┌────────▼─────────┐
            │   API Layer      │
            │  (api.js + REST) │
            └────────┬─────────┘
                     │
         ┌───────────▼───────────┐
         │   Data Persistence    │
         │  (API + localStorage) │
         └───────────────────────┘
```

### Module Breakdown

#### 1. **config.js** - Configuration Management
- Centralized configuration constants
- Screen identifiers
- API endpoints
- Bayesian model parameters
- State data

**Key Constants:**
- `IDLE_TIMEOUT`: 5 minutes (300,000ms)
- `IDLE_WARNING_TIME`: 4 minutes (240,000ms)
- `COMMUNITY_PROPERTY_STATES`: Array of 9 states

#### 2. **utils.js** - Utility Functions
- Common helper functions
- Data formatting (currency, dates, percentages)
- localStorage abstraction
- Notification system
- Mathematical utilities

**Key Functions:**
- `formatCurrency()`: Internationalized currency formatting
- `generateId()`: Unique ID generation
- `saveToLocalStorage()`: Safe localStorage operations
- `sanitizeHTML()`: XSS prevention

#### 3. **api.js** - RESTful API Client
- Generic HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Domain-specific API methods
- Error handling and fallback logic

**API Endpoints:**
```
GET    /tables/{table}                # List records
GET    /tables/{table}/{id}           # Get single record
POST   /tables/{table}                # Create record
PUT    /tables/{table}/{id}           # Update record (full)
PATCH  /tables/{table}/{id}           # Update record (partial)
DELETE /tables/{table}/{id}           # Delete record
```

#### 4. **bayesian.js** - Prediction Engine
- Statistical modeling for divorce outcomes
- Bayesian inference calculations
- State-specific adjustments

**Core Algorithms:**

1. **Custody Probability:**
   ```
   P(custody_type | data) ∝ P(data | custody_type) × P(custody_type)
   
   Factors:
   - State preferences (weight: 0.25)
   - Income disparity (weight: 0.20)
   - Gender (historical trends)
   - Number of children
   ```

2. **Asset Division:**
   ```
   Community Property States: 50/50 default
   Equitable Distribution States: 40/60 - 60/40 range
   
   Adjustments:
   - Years married > 10: favor equal split
   - Income disparity > 2x: favor equitable
   ```

3. **Alimony Calculation:**
   ```
   Base Probability = 0.25
   
   Adjustments:
   - Years married < 5: × 0.5
   - Years married > 10: × 1.5
   - Income disparity > 2x: × 1.5
   
   Amount = (Higher Income - Lower Income) × 0.35 / 12
   Duration = Years Married / 3 (max 10 years)
   ```

4. **Child Support:**
   ```
   Base Rate = 20% for first child
   Additional = +5% per additional child (max 40%)
   
   Monthly Amount = (Non-custodial Income × Rate) / 12
   ```

#### 5. **questionnaire.js** - Question System
- Dynamic question rendering
- Conditional question logic
- Answer validation
- Progress tracking
- Emotional profile calculation

**Question Types:**
- `select`: Multiple choice
- `boolean`: Yes/No
- `scale`: 1-10 rating
- `number`: Numeric input
- `currency`: Dollar amount
- `text`: Free text input

**Question Categories:**
- `factual`: Divorce circumstances (14 questions)
- `emotional`: Psychological state (10 questions)
- `validation`: Consistency checking (3 questions)

#### 6. **scenarios.js** - Scenario Management
- Session lifecycle management
- Scenario CRUD operations
- Data persistence coordination

**Data Flow:**
```
User Input → Questionnaire → Scenario Update → API/localStorage
                                    ↓
                          Bayesian Engine → Predictions
                                    ↓
                           Outcomes Display
```

#### 7. **outcomes.js** - Results Display
- Outcome visualization
- Document generation
- State-specific templates

**Outcome Sections:**
- Confidence score
- Custody predictions (with probabilities)
- Asset division estimates
- Alimony calculations
- Child support estimates
- Timeline projections
- Cost estimates
- Required documents

#### 8. **content-manager.js** - CMS
- Question management (CRUD)
- State data editing
- Content versioning
- Metadata handling

#### 9. **idle-manager.js** - Session Protection
- Activity detection
- Warning system (4 min)
- Auto-save and timeout (5 min)

**Events Monitored:**
- `mousedown`, `mousemove`, `keypress`, `scroll`, `touchstart`, `click`

#### 10. **game-engine.js** - Main Controller
- Screen flow orchestration
- Event handling
- Game state management

**Screen Flow:**
```
Disclaimer → Title → Character Creation → Scenario Selection
                                               ↓
                                    Factual Questions
                                               ↓
                                    Emotional Questions
                                               ↓
                                    Outcome Predictions
                                               ↓
                                    Documents → New Scenario
```

#### 11. **main.js** - Bootstrap
- Application initialization
- Global error handling
- Lifecycle management

---

## 💾 Data Models

### 1. game_sessions Table
```javascript
{
  id: string,                    // UUID
  player_name: string,           // Display name
  email: string,                 // Optional
  created_at: timestamp,         // Milliseconds
  last_activity: timestamp,      // Milliseconds
  current_screen: string,        // Screen identifier
  scenarios_count: number        // Count of scenarios
}
```

### 2. scenarios Table
```javascript
{
  id: string,                    // UUID
  session_id: string,            // FK to game_sessions
  scenario_name: string,         // User-defined name
  
  // Factual data
  state: string,                 // State code
  gender: string,                // male/female/other/prefer_not_to_say
  years_married: number,         // Integer
  has_children: boolean,
  num_children: number,
  owns_house: boolean,
  house_value: number,           // USD
  annual_income: number,         // USD
  spouse_income: number,         // USD
  total_assets: number,          // USD
  total_debts: number,           // USD
  zipcode: string,
  political_reg: string,
  driving_record: string,        // clean/minor/major/suspended
  
  // Calculated data
  emotional_profile: string,     // JSON
  predicted_outcomes: string,    // JSON
  completed: boolean,
  created_at: timestamp
}
```

### 3. questionnaire_responses Table
```javascript
{
  id: string,
  scenario_id: string,           // FK to scenarios
  question_id: string,           // Question identifier
  question_type: string,         // factual/emotional/validation
  question_text: string,         // The question
  answer: string,                // Answer (may be JSON)
  answer_value: number,          // Numeric value for scoring
  timestamp: timestamp
}
```

### 4. game_content Table
```javascript
{
  id: string,
  content_type: string,          // dialogue/question/outcome_text/document/state_data
  category: string,              // Category within type
  state_specific: string,        // State code or null
  title: string,
  content: string,               // Main content
  metadata: string,              // JSON metadata
  sort_order: number,
  active: boolean
}
```

### 5. state_data Table
```javascript
{
  id: string,
  state_code: string,            // Two-letter code
  state_name: string,
  is_community_property: boolean,
  avg_divorce_duration_days: number,
  filing_fee: number,            // USD
  required_separation_days: number,
  custody_default: string,       // Text description
  alimony_formula: string,       // Text description
  documents_required: string,    // JSON array
  statistical_data: string       // JSON object
}
```

---

## 🎨 CSS Architecture

### Color Scheme (Retro Terminal)
```css
--primary-bg: #000000        (Black background)
--secondary-bg: #1a1a1a      (Dark grey)
--border-color: #00ff00      (Bright green)
--text-color: #00ff00        (Bright green text)
--text-secondary: #00aa00    (Dim green)
--highlight-color: #ffff00   (Yellow highlights)
--error-color: #ff0000       (Red errors)
```

### Typography
- **Headers:** Press Start 2P (pixel font)
- **Body:** VT323 (terminal monospace)
- **Font sizes:** 0.6rem - 2.5rem (responsive scaling)

### Key CSS Features
- Scanline effect: Repeating linear gradients
- Glow effects: Box shadows with color
- Pixel-perfect borders: 4px solid borders
- Smooth transitions: 0.2-0.3s animations
- Responsive breakpoints: 768px, 480px

---

## 🔧 Code Decisions & Rationale

### 1. Why Vanilla JavaScript?
**Decision:** No frameworks (React, Vue, Angular)

**Rationale:**
- ✅ Zero build process required
- ✅ Works immediately in any browser
- ✅ Smaller file size (<100KB total)
- ✅ Easy to understand and modify
- ✅ No dependency vulnerabilities
- ✅ GitHub Pages compatible out-of-the-box

### 2. Why Module Pattern?
**Decision:** ES5-style modules with exports

**Rationale:**
- ✅ Works without bundlers
- ✅ Clear separation of concerns
- ✅ Testable in isolation
- ✅ Compatible with older browsers
- ✅ Easy to maintain

### 3. Why localStorage + API?
**Decision:** Dual persistence strategy

**Rationale:**
- ✅ Works offline (localStorage)
- ✅ Works across devices (API)
- ✅ Graceful degradation
- ✅ User controls data location
- ✅ No authentication required for basic use

### 4. Why Client-Side Only?
**Decision:** No server-side processing

**Rationale:**
- ✅ Simple deployment (static hosting)
- ✅ No server costs
- ✅ Maximum privacy (data stays local)
- ✅ Instant loading
- ✅ Easy to audit security

### 5. Why Bayesian Modeling?
**Decision:** Statistical predictions vs. rules-based

**Rationale:**
- ✅ Handles uncertainty naturally
- ✅ Incorporates prior knowledge
- ✅ Updates beliefs with new evidence
- ✅ Provides probability distributions
- ✅ More honest than deterministic predictions

### 6. Why Turn-Based Interface?
**Decision:** Sequential questions vs. forms

**Rationale:**
- ✅ Less overwhelming
- ✅ RPG game feel
- ✅ Clear progress indication
- ✅ Conditional question logic easier
- ✅ Mobile-friendly (one question per screen)

---

## 🚀 Deployment Instructions

### Local Testing

```bash
# Clone repository
git clone https://github.com/dw-hurt/divorcegame.git
cd divorcegame

# Option 1: Just open in browser
open index.html  # macOS
start index.html  # Windows
xdg-open index.html  # Linux

# Option 2: Use a simple HTTP server (optional, for API testing)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Use Node.js http-server
npx http-server -p 8000
```

### GitHub Pages Deployment

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Enable GitHub Pages
# Go to: Settings → Pages
# Source: Deploy from branch 'main'
# Folder: / (root)

# 3. Your site will be at:
# https://dw-hurt.github.io/divorcegame/
```

### Netlify Deployment

```bash
# Option 1: Drag & Drop
# Just drag the 'divorcegame' folder to Netlify

# Option 2: CLI
npm install -g netlify-cli
cd divorcegame
netlify deploy

# Follow prompts:
# Publish directory: . (current directory)
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd divorcegame
vercel

# Follow prompts for configuration
```

### Traditional Web Server (Apache/Nginx)

```bash
# Copy files to web root
scp -r divorcegame/* user@server:/var/www/html/divorcegame/

# Or use FTP client (FileZilla, Cyberduck, etc.)
```

**Apache .htaccess** (optional):
```apache
# Enable caching
<FilesMatch "\.(html|css|js)$">
  Header set Cache-Control "max-age=3600"
</FilesMatch>

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

**Nginx config** (optional):
```nginx
location /divorcegame/ {
    root /var/www/html;
    index index.html;
    
    # Cache static assets
    location ~* \.(css|js)$ {
        expires 1h;
    }
    
    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
}
```

---

## 🐛 Debugging & Troubleshooting

### Common Issues

#### 1. **API calls failing**
**Symptoms:** Game works but data not persisting across devices

**Solutions:**
- Check browser console for API errors
- Verify API endpoint in `js/config.js`
- Ensure CORS is enabled on API server
- Data will fall back to localStorage

#### 2. **Questions not loading**
**Symptoms:** Blank question screen

**Solutions:**
- Check browser console for errors
- Verify QuestionnaireSystem initialization
- Ensure conditional logic isn't skipping all questions

#### 3. **Predictions showing NaN or Infinity**
**Symptoms:** Math errors in outcome screen

**Solutions:**
- Check that income values aren't zero
- Verify scenario data completeness
- Review Bayesian engine calculations

#### 4. **Idle timeout not working**
**Symptoms:** Game doesn't auto-close after 5 minutes

**Solutions:**
- Check that IdleManager.initialize() is called
- Verify event listeners are attached
- Check browser console for timer errors

### Debug Mode

Enable debug logging:

```javascript
// In browser console:
localStorage.setItem('debugMode', 'true');

// Then reload page. You'll see verbose logging.

// To disable:
localStorage.removeItem('debugMode');
```

### Browser Compatibility

**Tested Browsers:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Required Features:**
- ES6 (arrow functions, const/let, template literals)
- Fetch API
- localStorage
- CSS Grid/Flexbox

---

## 📊 Performance Considerations

### Load Time Optimization

**Current Performance:**
- Initial HTML: ~12KB
- CSS: ~14KB
- JavaScript: ~70KB total
- **Total: < 100KB** (uncompressed)
- **Load time: < 1 second** on 3G

**Optimization Techniques:**
- No external libraries (except fonts)
- Minimal DOM manipulation
- CSS transitions over JavaScript animations
- Lazy loading of content from API

### Memory Usage

- **Session data:** ~5-10KB per session
- **Scenario data:** ~2-5KB per scenario
- **Question responses:** ~1KB per question
- **Total localStorage:** Usually < 50KB

---

## 🔐 Security Considerations

### XSS Prevention
- All user input is sanitized via `Utils.sanitizeHTML()`
- DOM manipulation uses `textContent` over `innerHTML` where possible
- No `eval()` or dynamic code execution

### Data Privacy
- No external analytics
- No tracking pixels
- Data stored locally or in user's API
- No third-party data sharing

### localStorage Security
- Not suitable for sensitive data
- Data readable by any script on same domain
- Use API storage for sensitive scenarios

---

## 🧪 Testing Strategy

### Manual Testing Checklist

**Game Flow:**
- [ ] Disclaimer acceptance
- [ ] Character creation
- [ ] Scenario creation
- [ ] Factual questionnaire completion
- [ ] Emotional questionnaire completion
- [ ] Outcome display
- [ ] Document viewing
- [ ] Multiple scenario management
- [ ] Session persistence
- [ ] Idle timeout

**Edge Cases:**
- [ ] Zero income scenarios
- [ ] No children scenarios
- [ ] Very short marriages (< 1 year)
- [ ] Very long marriages (> 30 years)
- [ ] Extreme asset disparities
- [ ] All states tested

### Automated Testing (Future)

Recommended tools:
- **Jest:** Unit testing for modules
- **Playwright:** End-to-end testing
- **Lighthouse:** Performance auditing

---

## 📚 FAQ (Frequently Asked Questions)

### General Questions

**Q: Is this legal advice?**
A: No. This is a game for educational and exploratory purposes only. Always consult a licensed attorney.

**Q: How accurate are the predictions?**
A: Predictions are based on statistical averages and simplified models. Real outcomes depend on many specific factors.

**Q: Can I use this in court?**
A: No. This is not legal documentation and should not be presented in court.

### Technical Questions

**Q: Does this work offline?**
A: Yes, after initial load. All game logic runs client-side.

**Q: Where is my data stored?**
A: Data is stored in your browser's localStorage and optionally in a configured API endpoint.

**Q: Can I export my scenarios?**
A: Not yet. This feature is planned for a future update.

**Q: How do I delete my data?**
A: Clear your browser's localStorage or delete data via API.

**Q: Can I add my own questions?**
A: Yes! Use the Content Editor accessible from the title screen.

**Q: Does this work on mobile?**
A: Yes, the design is responsive and works on phones and tablets.

### Development Questions

**Q: Can I fork this project?**
A: Yes! It's open source. See LICENSE for details.

**Q: How do I contribute?**
A: See CONTRIBUTING.md (or create one) for guidelines.

**Q: Can I use this code for my own project?**
A: Yes, per the MIT license. Attribution appreciated.

**Q: How do I add more states?**
A: Edit `js/config.js` STATES array and add data via Content Editor.

---

## 📖 Additional Resources

### Legal Research Sources
- National Center for State Courts (ncsc.org)
- American Bar Association (americanbar.org)
- State-specific bar associations

### Statistical Data
- US Census Bureau (census.gov)
- CDC National Vital Statistics
- State court statistics

### Game Design Inspiration
- The Legend of Zelda (1986)
- Classic text adventures
- Oregon Trail

---

## 🔄 Version History

### Version 1.0.0 (2024)
- Initial release
- Core game engine
- Bayesian prediction system
- 14 factual questions
- 10 emotional questions
- 50 state support
- Content management system
- Idle timeout protection

---

## 👥 Contributors

- **dw-hurt** - Initial work and project creator

---

## 📧 Contact & Support

- **Issues:** https://github.com/dw-hurt/divorcegame/issues
- **Discussions:** https://github.com/dw-hurt/divorcegame/discussions
- **Pull Requests:** Always welcome!

---

## 🎯 Project Goals

### Short-term (v1.x)
- [ ] Add validation questionnaire
- [ ] Implement scenario comparison view
- [ ] Add PDF export functionality
- [ ] Expand state-specific data
- [ ] Add more emotional questions

### Long-term (v2.x)
- [ ] Multi-language support
- [ ] Advanced statistical models
- [ ] Integration with legal databases
- [ ] Mobile app (React Native?)
- [ ] Attorney finder integration

---

**Remember:** This is an educational tool. Real divorce situations are complex and require professional legal guidance.

**Built with ❤️ for informed decision-making** 🎮⚖️
