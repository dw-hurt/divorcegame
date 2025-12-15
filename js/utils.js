/**
 * Utility Functions for Divorce Game
 * Common helper functions and safe wrappers
 */

/**
 * Safe localStorage wrapper that handles errors and unavailability
 * @returns {Object} localStorage-compatible object
 */
function safeLocalStorage() {
    try {
        const test = '__localStorage_test__';
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);
        return window.localStorage;
    } catch (e) {
        console.warn('localStorage unavailable, using fallback:', e.message);
        // Fallback in-memory storage
        const fallbackStorage = {};
        return {
            getItem: (key) => fallbackStorage[key] || null,
            setItem: (key, value) => { fallbackStorage[key] = value; },
            removeItem: (key) => { delete fallbackStorage[key]; },
            clear: () => { Object.keys(fallbackStorage).forEach(k => delete fallbackStorage[k]); },
            get length() { return Object.keys(fallbackStorage).length; },
            key: (index) => Object.keys(fallbackStorage)[index] || null
        };
    }
}

/**
 * Safely parse JSON with fallback
 * @param {string} jsonString - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*} Parsed object or fallback
 */
function safeJSONParse(jsonString, fallback = null) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.warn('JSON parse failed:', e.message);
        return fallback;
    }
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Clamp a number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        safeLocalStorage,
        safeJSONParse,
        debounce,
        clamp,
        formatCurrency
    };
}