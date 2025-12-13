/**
 * DIVORCE QUEST - Utility Functions
 * Common utility functions used throughout the game
 */

const Utils = {
    /**
     * Generate a unique ID
     */
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Format currency
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    /**
     * Format percentage
     */
    formatPercentage(value) {
        return (value * 100).toFixed(1) + '%';
    },
    
    /**
     * Get state name from code
     */
    getStateName(code) {
        const state = CONFIG.STATES.find(s => s.code === code);
        return state ? state.name : code;
    },
    
    /**
     * Check if state is community property
     */
    isCommunityPropertyState(stateCode) {
        return CONFIG.COMMUNITY_PROPERTY_STATES.includes(stateCode);
    },
    
    /**
     * Save data to localStorage
     */
    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    /**
     * Load data from localStorage
     */
    loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    },
    
    /**
     * Remove data from localStorage
     */
    removeFromLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },
    
    /**
     * Validate email format
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    /**
     * Sanitize HTML to prevent XSS
     */
    sanitizeHTML(html) {
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    },
    
    /**
     * Show loading indicator
     */
    showLoading(element) {
        const loadingHTML = `
            <div class="loading-indicator">
                <p class="blink">LOADING...</p>
            </div>
        `;
        element.innerHTML = loadingHTML;
    },
    
    /**
     * Format date
     */
    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    /**
     * Calculate age from years
     */
    getAgeGroup(years) {
        if (years < 5) return 'Short-term (< 5 years)';
        if (years < 10) return 'Medium-term (5-10 years)';
        if (years < 20) return 'Long-term (10-20 years)';
        return 'Very long-term (20+ years)';
    },
    
    /**
     * Calculate income disparity ratio
     */
    calculateIncomeDisparity(income1, income2) {
        const higher = Math.max(income1, income2);
        const lower = Math.min(income1, income2);
        if (lower === 0) return higher > 0 ? Infinity : 0;
        return higher / lower;
    },
    
    /**
     * Shuffle array (Fisher-Yates algorithm)
     */
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    
    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Deep clone object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    /**
     * Check if object is empty
     */
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },
    
    /**
     * Clamp number between min and max
     */
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },
    
    /**
     * Linear interpolation
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    },
    
    /**
     * Map value from one range to another
     */
    mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },
    
    /**
     * Wait for specified milliseconds
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Simple console notification for now
        // Can be enhanced with toast notifications
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // You can add a visual notification system here
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: var(--secondary-bg);
            border: 2px solid var(--border-color);
            color: var(--text-color);
            font-family: 'Press Start 2P', cursive;
            font-size: 0.7rem;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
