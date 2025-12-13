/**
 * DIVORCE QUEST - Main Entry Point
 * Bootstraps the game when page loads
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 DIVORCE QUEST - Initializing...');
    console.log('📅 Version: 1.0.0');
    console.log('🔧 Environment: Client-side Static Web App');
    
    // Initialize the game engine
    try {
        GameEngine.initialize();
        console.log('✅ Game engine initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing game:', error);
        showFatalError(error);
    }
});

/**
 * Show fatal error screen
 */
function showFatalError(error) {
    const container = document.getElementById('game-container');
    if (container) {
        container.innerHTML = `
            <div class="screen active">
                <div class="screen-content">
                    <div class="retro-border">
                        <h1 class="game-title text-error">SYSTEM ERROR</h1>
                        <div class="dialogue-box">
                            <p class="npc-text">
                                A critical error has occurred, traveler.
                                <br><br>
                                Error: ${error.message || 'Unknown error'}
                                <br><br>
                                Please refresh the page to try again.
                            </p>
                        </div>
                        <div class="button-container">
                            <button class="retro-button" onclick="location.reload()">
                                REFRESH PAGE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Don't show fatal error for every error, just log it
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Prevent page from closing without warning if game in progress
window.addEventListener('beforeunload', (event) => {
    const session = ScenarioManager.getCurrentSession();
    if (session) {
        // Modern browsers ignore custom messages, but still show a warning
        event.preventDefault();
        event.returnValue = '';
    }
});

console.log('🎯 DIVORCE QUEST - Ready to play!');
