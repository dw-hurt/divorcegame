/**
 * DIVORCE QUEST - Main Entry Point
 * Bootstraps the game when page loads
 * Version: 1.1.0 - Enhanced Edition
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 DIVORCE QUEST - Initializing...');
    console.log('📅 Version: 1.1.0 - Enhanced Edition');
    console.log('🔧 Environment: Client-side Static Web App');
    console.log('📊 Questions: 45 total (27 factual + 18 emotional)');
    console.log('🎯 Predictions: 10 categories');
    
    // Initialize Questionnaire first
    try {
        Questionnaire.init();
        console.log('✅ Questionnaire initialized');
    } catch (error) {
        console.error('❌ Error initializing questionnaire:', error);
    }
    
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
    // Try to find the disclaimer screen and replace it
    const disclaimerScreen = document.getElementById('disclaimer-screen');
    const body = document.body;
    
    if (disclaimerScreen) {
        disclaimerScreen.innerHTML = `
            <div class="screen-container">
                <div class="disclaimer-box" style="background: #330000; border-color: #ff0000;">
                    <h1 class="pixel-title" style="color: #ff0000;">❌ SYSTEM ERROR ❌</h1>
                    <div class="disclaimer-content">
                        <p class="disclaimer-text" style="color: #ffcccc;">
                            A critical error has occurred while loading the game.
                        </p>
                        <p class="disclaimer-text" style="color: #ffcccc;">
                            <strong>Error:</strong> ${error.message || 'Unknown error'}
                        </p>
                        <p class="disclaimer-text" style="color: #ffcccc;">
                            Please try refreshing the page. If the problem persists, 
                            check the browser console (F12) for more details.
                        </p>
                        <p class="disclaimer-warning" style="color: #ff6666;">
                            <strong>Stack Trace:</strong><br>
                            <code style="font-size: 10px;">${error.stack || 'No stack trace available'}</code>
                        </p>
                    </div>
                    <button class="pixel-button primary" onclick="location.reload()">
                        🔄 REFRESH PAGE
                    </button>
                    <button class="pixel-button secondary" onclick="window.open('test-page.html', '_blank')" style="margin-top: 10px;">
                        🔍 RUN DIAGNOSTICS
                    </button>
                </div>
            </div>
        `;
    } else {
        // Fallback if disclaimer screen doesn't exist
        body.innerHTML = `
            <div style="background: #1a1a1a; color: #ff0000; padding: 40px; font-family: monospace;">
                <h1>❌ FATAL ERROR</h1>
                <p>Error: ${error.message || 'Unknown error'}</p>
                <p>Stack: ${error.stack || 'No stack trace'}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 20px;">
                    REFRESH PAGE
                </button>
            </div>
        `;
    }
}

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('❌ Global error:', event.error);
    console.error('   File:', event.filename);
    console.error('   Line:', event.lineno, 'Column:', event.colno);
    
    // Show error in console but don't show fatal error for every error
    if (event.error && event.error.message) {
        console.error('   Message:', event.error.message);
    }
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled promise rejection:', event.reason);
    if (event.reason && event.reason.stack) {
        console.error('   Stack:', event.reason.stack);
    }
});

/**
 * Prevent page from closing without warning if game in progress
 */
window.addEventListener('beforeunload', (event) => {
    try {
        if (typeof ScenarioManager !== 'undefined') {
            const session = ScenarioManager.getCurrentSession();
            if (session && session.in_progress) {
                // Modern browsers ignore custom messages, but still show a warning
                event.preventDefault();
                event.returnValue = '';
            }
        }
    } catch (error) {
        // Silently fail - don't prevent page close if there's an error
        console.warn('⚠ Error checking session before unload:', error);
    }
});

// Log when script fully loaded
console.log('✅ Main.js loaded successfully');
console.log('🎯 DIVORCE QUEST v1.1.0 - Ready to play!');
console.log('📝 To see all questions: Questionnaire.getAllQuestions()');
console.log('📊 Total questions available:', typeof Questionnaire !== 'undefined' ? 'Loading...' : 'Module not loaded');
