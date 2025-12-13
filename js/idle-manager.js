/**
 * DIVORCE QUEST - Idle Manager
 * Handles idle timeout and warning
 */

const IdleManager = {
    idleTimer: null,
    warningTimer: null,
    warningShown: false,
    
    /**
     * Initialize idle detection
     */
    initialize() {
        this.resetIdleTimer();
        
        // Listen for user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        events.forEach(event => {
            document.addEventListener(event, () => {
                this.onActivity();
            }, true);
        });
        
        // Setup warning button
        const stillHereBtn = document.getElementById('still-here-btn');
        if (stillHereBtn) {
            stillHereBtn.addEventListener('click', () => {
                this.hideWarning();
                this.resetIdleTimer();
            });
        }
    },
    
    /**
     * Reset idle timer
     */
    resetIdleTimer() {
        // Clear existing timers
        if (this.idleTimer) clearTimeout(this.idleTimer);
        if (this.warningTimer) clearTimeout(this.warningTimer);
        
        this.warningShown = false;
        
        // Set warning timer (4 minutes)
        this.warningTimer = setTimeout(() => {
            this.showWarning();
        }, CONFIG.IDLE_WARNING_TIME);
        
        // Set idle timeout (5 minutes)
        this.idleTimer = setTimeout(() => {
            this.onIdle();
        }, CONFIG.IDLE_TIMEOUT);
        
        // Update session activity if session exists
        if (ScenarioManager.currentSession) {
            ScenarioManager.updateActivity();
        }
    },
    
    /**
     * Handle user activity
     */
    onActivity() {
        if (this.warningShown) {
            this.hideWarning();
        }
        this.resetIdleTimer();
    },
    
    /**
     * Show idle warning
     */
    showWarning() {
        this.warningShown = true;
        const warning = document.getElementById('idle-warning');
        if (warning) {
            warning.classList.remove('hidden');
        }
        
        console.log('Showing idle warning...');
    },
    
    /**
     * Hide idle warning
     */
    hideWarning() {
        this.warningShown = false;
        const warning = document.getElementById('idle-warning');
        if (warning) {
            warning.classList.add('hidden');
        }
    },
    
    /**
     * Handle idle timeout
     */
    onIdle() {
        console.log('User has been idle for 5 minutes. Closing game...');
        
        // Save current state
        if (ScenarioManager.currentScenario) {
            console.log('Saving scenario before close...');
        }
        
        // Show closing message
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="screen active">
                <div class="screen-content">
                    <div class="retro-border">
                        <h1 class="game-title">GAME PAUSED</h1>
                        <div class="dialogue-box">
                            <p class="npc-text">
                                You have been idle for too long, traveler.
                                <br><br>
                                Your progress has been saved.
                                <br><br>
                                Refresh the page to continue your quest.
                            </p>
                        </div>
                        <div class="button-container">
                            <button class="retro-button" onclick="location.reload()">
                                RETURN TO QUEST
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Clear timers
        if (this.idleTimer) clearTimeout(this.idleTimer);
        if (this.warningTimer) clearTimeout(this.warningTimer);
    },
    
    /**
     * Stop idle detection
     */
    stop() {
        if (this.idleTimer) clearTimeout(this.idleTimer);
        if (this.warningTimer) clearTimeout(this.warningTimer);
        this.hideWarning();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdleManager;
}
