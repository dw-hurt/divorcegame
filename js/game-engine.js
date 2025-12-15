/**
 * DIVORCE QUEST - Game Engine
 * Main game controller handling screen transitions and game flow
 */

const GameEngine = {
    currentScreen: null,
    
    /**
     * Initialize game engine
     */
    initialize() {
        console.log('🎮 Divorce Quest - Game Engine Starting...');
        
        // Initialize idle manager
        IdleManager.initialize();
        
        // Setup screen event listeners
        this.setupEventListeners();
        
        // Check if user has existing session
        const existingSession = ScenarioManager.getCurrentSession();
        if (existingSession) {
            console.log('Found existing session:', existingSession.player_name);
            // Could auto-continue here, but let's show title screen
        }
        
        // Show disclaimer screen first
        this.showScreen(CONFIG.SCREENS.DISCLAIMER);
    },
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Disclaimer screen
        document.getElementById('accept-disclaimer')?.addEventListener('click', () => {
            this.showScreen(CONFIG.SCREENS.MENU);
        });
        
        // Title screen
        document.getElementById('new-game-btn')?.addEventListener('click', () => {
            this.startNewGame();
        });
        
        document.getElementById('continue-game-btn')?.addEventListener('click', () => {
            this.continueGame();
        });
        
        document.getElementById('content-admin-btn')?.addEventListener('click', () => {
            this.showScreen(CONFIG.SCREENS.CONTENT_MANAGEMENT);
            ContentManager.initialize();
        });
        
        // Character creation
        document.getElementById('character-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createCharacter();
        });
        
        document.getElementById('back-to-title')?.addEventListener('click', () => {
            this.showScreen(CONFIG.SCREENS.MENU);
        });
        
        // Scenario selection
       document.getElementById('new-scenario-btn')?.addEventListener('click', () => {
	   this.startNewGame();  // ← CHANGE THIS LINE});

        });
        
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.logout();
        });
        
        // Outcome screen
        document.getElementById('view-documents-btn')?.addEventListener('click', () => {
            this.showDocuments();
        });
        
        document.getElementById('new-scenario-from-outcome-btn')?.addEventListener('click', () => {
            this.createNewScenario();
        });
        
        document.getElementById('back-to-scenarios-btn')?.addEventListener('click', () => {
            this.loadScenarioSelection();
        });
        
        // Documents screen
        document.getElementById('back-to-outcome-btn')?.addEventListener('click', () => {
            this.showScreen(CONFIG.SCREENS.OUTCOME);
        });
        
        // Content management
        document.getElementById('back-to-title-from-content')?.addEventListener('click', () => {
            this.showScreen(CONFIG.SCREENS.MENU);
        });
    },
    
    /**
     * Show specific screen
     */
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenId;
            console.log('📺 Showing screen:', screenId);
        }
    },
    
    /**
     * Start new game
     */
    startNewGame() {
        this.showScreen(CONFIG.SCREENS.CHARACTER);
    },
    
    /**
     * Continue existing game
     */
    async continueGame() {
        const session = ScenarioManager.getCurrentSession();
        if (session) {
            await this.loadScenarioSelection();
        } else {
            Utils.showNotification('No existing game found', 'warning');
            this.startNewGame();
        }
    },
    
    /**
     * Create character/session
     */
    async createCharacter() {
        const playerName = document.getElementById('player-name').value;
        const playerEmail = document.getElementById('player-email').value;
        
        if (!playerName) {
            Utils.showNotification('Please enter your name', 'warning');
            return;
        }
        
        try {
            await ScenarioManager.createSession(playerName, playerEmail);
            Utils.showNotification(`Welcome, ${playerName}!`, 'success');
            await this.loadScenarioSelection();
        } catch (error) {
            console.error('Error creating character:', error);
            Utils.showNotification('Error creating session', 'error');
        }
    },
    
    /**
     * Load scenario selection screen
     */
    async loadScenarioSelection() {
        this.showScreen(CONFIG.SCREENS.SCENARIO_SELECTION);
        
        try {
            const scenarios = await ScenarioManager.loadScenarios();
            this.displayScenarios(scenarios);
        } catch (error) {
            console.error('Error loading scenarios:', error);
            document.getElementById('scenario-list').innerHTML = 
                '<p class="text-error">Error loading scenarios</p>';
        }
    },
    
    /**
     * Display scenarios
     */
    displayScenarios(scenarios) {
        const container = document.getElementById('scenario-list');
        
        if (scenarios.length === 0) {
            container.innerHTML = `
                <div class="dialogue-box">
                    <p class="npc-text">
                        No scenarios yet. Create your first scenario to begin exploring possibilities...
                    </p>
                </div>
            `;
            return;
        }
        
        let html = '';
        scenarios.forEach(scenario => {
            const status = scenario.completed ? 'completed' : 'in-progress';
            const statusText = scenario.completed ? 'COMPLETED' : 'IN PROGRESS';
            
            html += `
                <div class="scenario-item" data-id="${scenario.id}">
                    <div class="scenario-info">
                        <h3>${scenario.scenario_name}</h3>
                        <p>State: ${scenario.state ? Utils.getStateName(scenario.state) : 'Not set'}</p>
                        <p>Created: ${Utils.formatDate(scenario.created_at)}</p>
                    </div>
                    <div class="scenario-status ${status}">${statusText}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Add click listeners
        document.querySelectorAll('.scenario-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                const scenarioId = e.currentTarget.dataset.id;
                await this.loadScenario(scenarioId);
            });
        });
    },
    
    /**
     * Create new scenario
     */
    async createNewScenario() {
        const scenarioName = prompt('Enter a name for this scenario:');
        if (!scenarioName) return;
        
        try {
            await ScenarioManager.createScenario(scenarioName);
            Utils.showNotification('Scenario created!', 'success');
            await this.startFactualQuestionnaire();
        } catch (error) {
            console.error('Error creating scenario:', error);
            Utils.showNotification('Error creating scenario', 'error');
        }
    },
    
    /**
     * Load existing scenario
     */
    async loadScenario(scenarioId) {
        try {
            const scenario = await ScenarioManager.loadScenario(scenarioId);
            
            if (scenario.completed) {
                // Show outcomes directly
                const predictions = JSON.parse(scenario.predicted_outcomes);
                this.showScreen(CONFIG.SCREENS.OUTCOME);
                OutcomesDisplay.displayOutcomes(predictions, scenario);
            } else {
                // Continue questionnaire
                await this.startFactualQuestionnaire();
            }
        } catch (error) {
            console.error('Error loading scenario:', error);
            Utils.showNotification('Error loading scenario', 'error');
        }
    },
    
    /**
     * Start factual questionnaire
     */
    async startFactualQuestionnaire() {
        await QuestionnaireSystem.initialize('factual');
        this.showScreen(CONFIG.SCREENS.QUESTIONNAIRE_FACTUAL);
        this.displayCurrentQuestion('factual');
    },
    
    /**
     * Display current question
     */
    displayCurrentQuestion(type) {
        const question = QuestionnaireSystem.getCurrentQuestion();
        
        if (!question) {
            // Questionnaire complete
            this.onQuestionnaireComplete(type);
            return;
        }
        
        // Check condition
        const scenario = ScenarioManager.getCurrentScenario();
        if (!QuestionnaireSystem.shouldShowQuestion(question, scenario)) {
            QuestionnaireSystem.saveAnswer(null);
            this.displayCurrentQuestion(type);
            return;
        }
        
        // Update progress
        const progress = QuestionnaireSystem.getProgress();
        const progressBar = document.getElementById(`${type}-progress`);
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // Display question
        const container = document.getElementById(`${type}-question-container`);
        container.innerHTML = this.renderQuestion(question, type);
        
        // Setup answer listeners
        this.setupAnswerListeners(type);
    },
    
    /**
     * Render question HTML
     */
    renderQuestion(question, type) {
        let html = `
            <div class="question-box">
                <div class="dialogue-box mb-20">
                    <p class="npc-text">${question.npcIntro || 'Answer this question, traveler...'}</p>
                </div>
                <p class="question-text">${question.text}</p>
        `;
        
        // Render input based on question type
        if (question.type === 'select') {
            html += '<div class="answer-options">';
            question.options.forEach(option => {
                html += `
                    <div class="answer-option" data-value="${option.value}">
                        ${option.label}
                    </div>
                `;
            });
            html += '</div>';
        } else if (question.type === 'boolean') {
            html += `
                <div class="answer-options">
                    <div class="answer-option" data-value="true">YES</div>
                    <div class="answer-option" data-value="false">NO</div>
                </div>
            `;
        } else if (question.type === 'scale') {
            html += `
                <div class="form-group">
                    <input type="range" id="scale-input" class="retro-input" 
                        min="${question.scale.min}" max="${question.scale.max}" value="${Math.floor((question.scale.min + question.scale.max) / 2)}">
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                        <span>${question.scale.minLabel}</span>
                        <span id="scale-value">${Math.floor((question.scale.min + question.scale.max) / 2)}</span>
                        <span>${question.scale.maxLabel}</span>
                    </div>
                </div>
                <div class="button-container">
                    <button class="retro-button" id="submit-scale">SUBMIT</button>
                </div>
            `;
        } else if (question.type === 'number' || question.type === 'currency') {
            const placeholder = question.type === 'currency' ? 'Enter amount in dollars' : 'Enter number';
            html += `
                <div class="form-group">
                    <input type="number" id="number-input" class="retro-input" 
                        placeholder="${placeholder}" min="${question.min || 0}" max="${question.max || 999999999}">
                </div>
                <div class="button-container">
                    <button class="retro-button" id="submit-number">SUBMIT</button>
                </div>
            `;
        } else {
            // Text input
            html += `
                <div class="form-group">
                    <input type="text" id="text-input" class="retro-input" 
                        placeholder="Type your answer..." maxlength="${question.maxlength || 100}">
                </div>
                <div class="button-container">
                    <button class="retro-button" id="submit-text">SUBMIT</button>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    },
    
    /**
     * Setup answer listeners
     */
    setupAnswerListeners(type) {
        // Option selection
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const value = e.target.dataset.value;
                let answerValue = value;
                
                // Convert boolean strings
                if (value === 'true') answerValue = true;
                if (value === 'false') answerValue = false;
                
                // Check if this is from a question with score
                const question = QuestionnaireSystem.getCurrentQuestion();
                if (question.options) {
                    const selectedOption = question.options.find(o => o.value === value);
                    if (selectedOption && selectedOption.score !== undefined) {
                        answerValue = selectedOption.score;
                    }
                }
                
                this.submitAnswer(answerValue, type);
            });
        });
        
        // Scale input
        const scaleInput = document.getElementById('scale-input');
        const scaleValue = document.getElementById('scale-value');
        if (scaleInput && scaleValue) {
            scaleInput.addEventListener('input', (e) => {
                scaleValue.textContent = e.target.value;
            });
            
            document.getElementById('submit-scale')?.addEventListener('click', () => {
                this.submitAnswer(parseInt(scaleInput.value), type);
            });
        }
        
        // Number input
        document.getElementById('submit-number')?.addEventListener('click', () => {
            const input = document.getElementById('number-input');
            this.submitAnswer(parseFloat(input.value) || 0, type);
        });
        
        // Text input
        document.getElementById('submit-text')?.addEventListener('click', () => {
            const input = document.getElementById('text-input');
            this.submitAnswer(input.value, type);
        });
    },
    
    /**
     * Submit answer and move to next question
     */
    async submitAnswer(answer, type) {
        QuestionnaireSystem.saveAnswer(answer);
        
        // Small delay for better UX
        await Utils.sleep(200);
        
        this.displayCurrentQuestion(type);
    },
    
    /**
     * Handle questionnaire completion
     */
    async onQuestionnaireComplete(type) {
        const answers = QuestionnaireSystem.getAnswers();
        
        // Save answers to scenario
        await ScenarioManager.saveQuestionnaireAnswers(answers, type);
        
        if (type === 'factual') {
            // Start emotional questionnaire
            await this.startEmotionalQuestionnaire();
        } else if (type === 'emotional') {
            // Calculate outcomes
            await this.calculateAndShowOutcomes();
        }
    },
    
    /**
     * Start emotional questionnaire
     */
    async startEmotionalQuestionnaire() {
        await QuestionnaireSystem.initialize('emotional');
        this.showScreen(CONFIG.SCREENS.QUESTIONNAIRE_EMOTIONAL);
        this.displayCurrentQuestion('emotional');
    },
    
    /**
     * Calculate and show outcomes
     */
    async calculateAndShowOutcomes() {
        // Show loading
        this.showScreen(CONFIG.SCREENS.OUTCOME);
        const container = document.getElementById('outcome-container');
        Utils.showLoading(container);
        
        try {
            // Calculate predictions
            const predictions = await ScenarioManager.calculateOutcomes();
            const scenario = ScenarioManager.getCurrentScenario();
            
            // Display outcomes
            OutcomesDisplay.displayOutcomes(predictions, scenario);
            
            Utils.showNotification('Predictions calculated!', 'success');
        } catch (error) {
            console.error('Error calculating outcomes:', error);
            container.innerHTML = '<p class="text-error">Error calculating outcomes</p>';
        }
    },
    
    /**
     * Show documents screen
     */
    async showDocuments() {
        this.showScreen(CONFIG.SCREENS.DOCUMENTS);
        const scenario = ScenarioManager.getCurrentScenario();
        
        if (scenario && scenario.state) {
            await OutcomesDisplay.displayDocuments(scenario.state, scenario);
        }
    },
    
    /**
     * Logout
     */
    logout() {
        if (confirm('Are you sure you want to exit? Your progress has been saved.')) {
            ScenarioManager.logout();
            this.showScreen(CONFIG.SCREENS.MENU);
            Utils.showNotification('Logged out successfully', 'success');
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}
