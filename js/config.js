/**
 * DIVORCE QUEST - Configuration File
 * Central configuration for game constants and settings
 */

const CONFIG = {
    // Idle timeout settings
    IDLE_WARNING_TIME: 4 * 60 * 1000, // 4 minutes in milliseconds
    IDLE_TIMEOUT: 5 * 60 * 1000, // 5 minutes in milliseconds
    
    // API endpoints (relative URLs for RESTful Table API)
    API: {
        BASE_URL: 'tables/',
        SESSIONS: 'tables/game_sessions',
        SCENARIOS: 'tables/scenarios',
        RESPONSES: 'tables/questionnaire_responses',
        CONTENT: 'tables/game_content',
        STATE_DATA: 'tables/state_data'
    },
    
    // Game states
    SCREENS: {
        DISCLAIMER: 'disclaimer-screen',
        TITLE: 'title-screen',
        CHARACTER_CREATION: 'character-creation-screen',
        SCENARIO_SELECTION: 'scenario-selection-screen',
        QUESTIONNAIRE_FACTUAL: 'questionnaire-factual-screen',
        QUESTIONNAIRE_EMOTIONAL: 'questionnaire-emotional-screen',
        OUTCOME: 'outcome-screen',
        DOCUMENTS: 'documents-screen',
        CONTENT_MANAGEMENT: 'content-management-screen'
    },
    
    // US States list
    STATES: [
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' }
    ],
    
    // Community property states
    COMMUNITY_PROPERTY_STATES: ['AZ', 'CA', 'ID', 'LA', 'NV', 'NM', 'TX', 'WA', 'WI'],
    
    // Questionnaire configuration
    QUESTIONNAIRE: {
        FACTUAL_QUESTIONS_MIN: 15,
        EMOTIONAL_QUESTIONS_MIN: 10,
        VALIDATION_QUESTIONS_MIN: 5
    },
    
    // Bayesian model parameters
    BAYESIAN: {
        // Prior probabilities (national averages)
        PRIOR_CUSTODY_JOINT: 0.45,
        PRIOR_CUSTODY_MOTHER: 0.40,
        PRIOR_CUSTODY_FATHER: 0.15,
        PRIOR_ALIMONY: 0.25,
        PRIOR_ASSET_SPLIT_EQUAL: 0.60,
        
        // Weight factors for different variables
        WEIGHTS: {
            STATE: 0.25,
            INCOME_DISPARITY: 0.20,
            YEARS_MARRIED: 0.15,
            CHILDREN: 0.20,
            ASSETS: 0.15,
            EMOTIONAL_STABILITY: 0.05
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
