/**
 * Game Constants and Configuration
 * Centralized configuration for the Divorce Game
 */

// Game State Constants
const GAME_STATES = {
    MENU: 'MENU',
    CHARACTER: 'CHARACTER',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER'
};

// Game Configuration
const GAME_CONFIG = {
    AUTO_SAVE_INTERVAL: 30000,        // Auto-save every 30 seconds
    MAX_SAVE_SLOTS: 3,                // Maximum save game slots
    DEFAULT_DIFFICULTY: 'normal',      // Default difficulty level
    IDLE_TIME_THRESHOLD: 60000,       // Idle detection after 1 minute
    MAX_UNDO_HISTORY: 10              // Maximum undo steps
};

// UI Constants
const UI_CONFIG = {
    ANIMATION_DURATION: 300,          // Default animation duration (ms)
    NOTIFICATION_TIMEOUT: 3000,       // Notification display time (ms)
    DEBOUNCE_DELAY: 250              // Input debounce delay (ms)
};

// Game Mechanics
const GAME_MECHANICS = {
    STARTING_MONEY: 10000,
    STARTING_HAPPINESS: 50,
    STARTING_STRESS: 30,
    MIN_STAT: 0,
    MAX_STAT: 100
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_STATES,
        GAME_CONFIG,
        UI_CONFIG,
        GAME_MECHANICS
    };
}