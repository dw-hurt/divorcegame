/**
 * DIVORCE QUEST - Scenario Management
 * Handles scenario creation, loading, and management
 */

const ScenarioManager = {
    currentSession: null,
    currentScenario: null,
    scenarios: [],
    
    /**
     * Create new game session
     */
    async createSession(playerName, email = '') {
        const sessionData = {
            id: Utils.generateId(),
            player_name: playerName,
            email: email,
            created_at: Date.now(),
            last_activity: Date.now(),
            current_screen: CONFIG.SCREENS.SCENARIO_SELECTION,
            scenarios_count: 0
        };
        
        try {
            const session = await API.createSession(sessionData);
            this.currentSession = session;
            Utils.saveToLocalStorage('currentSession', session);
            return session;
        } catch (error) {
            console.error('Error creating session:', error);
            // Fallback to localStorage only
            this.currentSession = sessionData;
            Utils.saveToLocalStorage('currentSession', sessionData);
            return sessionData;
        }
    },
    
    /**
     * Load existing session
     */
    async loadSession(sessionId) {
        try {
            const session = await API.getSession(sessionId);
            this.currentSession = session;
            Utils.saveToLocalStorage('currentSession', session);
            return session;
        } catch (error) {
            console.error('Error loading session:', error);
            // Try localStorage
            const localSession = Utils.loadFromLocalStorage('currentSession');
            if (localSession && localSession.id === sessionId) {
                this.currentSession = localSession;
                return localSession;
            }
            throw error;
        }
    },
    
    /**
     * Update session activity
     */
    async updateActivity() {
        if (!this.currentSession) return;
        
        this.currentSession.last_activity = Date.now();
        
        try {
            await API.updateSession(this.currentSession.id, {
                last_activity: this.currentSession.last_activity
            });
        } catch (error) {
            console.error('Error updating activity:', error);
        }
        
        Utils.saveToLocalStorage('currentSession', this.currentSession);
    },
    
    /**
     * Get current session from localStorage
     */
    getCurrentSession() {
        if (!this.currentSession) {
            this.currentSession = Utils.loadFromLocalStorage('currentSession');
        }
        return this.currentSession;
    },
    
    /**
     * Create new scenario
     */
    async createScenario(scenarioName) {
        if (!this.currentSession) {
            throw new Error('No active session');
        }
        
        const scenarioData = {
            id: Utils.generateId(),
            session_id: this.currentSession.id,
            scenario_name: scenarioName,
            state: null,
            gender: null,
            years_married: null,
            has_children: false,
            num_children: 0,
            owns_house: false,
            house_value: 0,
            annual_income: 0,
            spouse_income: 0,
            total_assets: 0,
            total_debts: 0,
            zipcode: '',
            political_reg: '',
            driving_record: 'clean',
            emotional_profile: JSON.stringify({}),
            predicted_outcomes: JSON.stringify({}),
            completed: false,
            created_at: Date.now()
        };
        
        try {
            const scenario = await API.createScenario(scenarioData);
            this.currentScenario = scenario;
            this.scenarios.push(scenario);
            
            // Update session scenario count
            this.currentSession.scenarios_count++;
            await API.updateSession(this.currentSession.id, {
                scenarios_count: this.currentSession.scenarios_count
            });
            
            Utils.saveToLocalStorage('currentScenario', scenario);
            return scenario;
        } catch (error) {
            console.error('Error creating scenario:', error);
            // Fallback to localStorage
            this.currentScenario = scenarioData;
            const localScenarios = Utils.loadFromLocalStorage('scenarios') || [];
            localScenarios.push(scenarioData);
            Utils.saveToLocalStorage('scenarios', localScenarios);
            Utils.saveToLocalStorage('currentScenario', scenarioData);
            return scenarioData;
        }
    },
    
    /**
     * Load scenarios for current session
     */
    async loadScenarios() {
        if (!this.currentSession) {
            throw new Error('No active session');
        }
        
        try {
            const response = await API.getScenariosBySession(this.currentSession.id, {
                limit: 100
            });
            this.scenarios = response.data || [];
            return this.scenarios;
        } catch (error) {
            console.error('Error loading scenarios:', error);
            // Fallback to localStorage
            const localScenarios = Utils.loadFromLocalStorage('scenarios') || [];
            this.scenarios = localScenarios.filter(s => s.session_id === this.currentSession.id);
            return this.scenarios;
        }
    },
    
    /**
     * Load specific scenario
     */
    async loadScenario(scenarioId) {
        try {
            const scenario = await API.getScenario(scenarioId);
            this.currentScenario = scenario;
            Utils.saveToLocalStorage('currentScenario', scenario);
            return scenario;
        } catch (error) {
            console.error('Error loading scenario:', error);
            // Try localStorage
            const localScenarios = Utils.loadFromLocalStorage('scenarios') || [];
            const scenario = localScenarios.find(s => s.id === scenarioId);
            if (scenario) {
                this.currentScenario = scenario;
                return scenario;
            }
            throw error;
        }
    },
    
    /**
     * Update current scenario with questionnaire data
     */
    async updateScenario(data) {
        if (!this.currentScenario) {
            throw new Error('No active scenario');
        }
        
        // Merge data with current scenario
        this.currentScenario = { ...this.currentScenario, ...data };
        
        try {
            const updated = await API.updateScenario(this.currentScenario.id, data);
            this.currentScenario = updated;
            Utils.saveToLocalStorage('currentScenario', updated);
            return updated;
        } catch (error) {
            console.error('Error updating scenario:', error);
            // Update localStorage
            const localScenarios = Utils.loadFromLocalStorage('scenarios') || [];
            const index = localScenarios.findIndex(s => s.id === this.currentScenario.id);
            if (index !== -1) {
                localScenarios[index] = this.currentScenario;
                Utils.saveToLocalStorage('scenarios', localScenarios);
            }
            Utils.saveToLocalStorage('currentScenario', this.currentScenario);
            return this.currentScenario;
        }
    },
    
    /**
     * Save questionnaire answers to scenario
     */
    async saveQuestionnaireAnswers(answers, questionType) {
        if (!this.currentScenario) {
            throw new Error('No active scenario');
        }
        
        // Extract factual data and save to scenario
        const scenarioUpdates = {};
        
        answers.forEach(answer => {
            const question = QuestionnaireSystem.factualQuestions.find(q => q.id === answer.questionId);
            if (question && question.field) {
                scenarioUpdates[question.field] = answer.answer;
            }
        });
        
        // Save emotional profile separately
        if (questionType === 'emotional') {
            const emotionalProfile = QuestionnaireSystem.calculateEmotionalProfile();
            scenarioUpdates.emotional_profile = JSON.stringify(emotionalProfile);
        }
        
        // Save individual responses to database
        try {
            for (const answer of answers) {
                await API.saveResponse({
                    id: Utils.generateId(),
                    scenario_id: this.currentScenario.id,
                    question_id: answer.questionId,
                    question_type: questionType,
                    question_text: answer.question,
                    answer: typeof answer.answer === 'object' ? JSON.stringify(answer.answer) : String(answer.answer),
                    answer_value: typeof answer.answer === 'number' ? answer.answer : 0,
                    timestamp: answer.timestamp
                });
            }
        } catch (error) {
            console.error('Error saving responses:', error);
        }
        
        // Update scenario
        return await this.updateScenario(scenarioUpdates);
    },
    
    /**
     * Calculate and save outcome predictions
     */
    async calculateOutcomes() {
        if (!this.currentScenario) {
            throw new Error('No active scenario');
        }
        
        // Use Bayesian engine to predict outcomes
        const predictions = await BayesianEngine.predictOutcomes(this.currentScenario);
        
        // Save predictions to scenario
        await this.updateScenario({
            predicted_outcomes: JSON.stringify(predictions),
            completed: true
        });
        
        return predictions;
    },
    
    /**
     * Get current scenario
     */
    getCurrentScenario() {
        if (!this.currentScenario) {
            this.currentScenario = Utils.loadFromLocalStorage('currentScenario');
        }
        return this.currentScenario;
    },
    
    /**
     * Delete scenario
     */
    async deleteScenario(scenarioId) {
        try {
            await API.deleteScenario(scenarioId);
            this.scenarios = this.scenarios.filter(s => s.id !== scenarioId);
            
            if (this.currentScenario && this.currentScenario.id === scenarioId) {
                this.currentScenario = null;
                Utils.removeFromLocalStorage('currentScenario');
            }
            
            return true;
        } catch (error) {
            console.error('Error deleting scenario:', error);
            // Update localStorage
            const localScenarios = Utils.loadFromLocalStorage('scenarios') || [];
            const updated = localScenarios.filter(s => s.id !== scenarioId);
            Utils.saveToLocalStorage('scenarios', updated);
            return true;
        }
    },
    
    /**
     * Clear current session
     */
    logout() {
        this.currentSession = null;
        this.currentScenario = null;
        this.scenarios = [];
        Utils.removeFromLocalStorage('currentSession');
        Utils.removeFromLocalStorage('currentScenario');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScenarioManager;
}
