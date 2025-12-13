/**
 * Divorce Quest - Configuration File
 * Central configuration for game settings, constants, and data structures
 * Version: 1.1.0 - Enhanced Edition
 */

const CONFIG = {
    // Game Information
    GAME_VERSION: '1.1.0',
    GAME_NAME: 'Divorce Quest - Enhanced Edition',
    
    // Timing Settings (in milliseconds)
    IDLE_WARNING_TIME: 4 * 60 * 1000,  // 4 minutes
    IDLE_TIMEOUT: 5 * 60 * 1000,        // 5 minutes total
    IDLE_COUNTDOWN: 60,                  // 60 seconds countdown
    AUTO_SAVE_INTERVAL: 30 * 1000,      // 30 seconds
    
    // Question Settings
    TOTAL_FACTUAL_QUESTIONS: 27,        // Increased from 18
    TOTAL_EMOTIONAL_QUESTIONS: 18,      // Increased from 9
    
    // Storage Keys
    STORAGE_KEYS: {
        SCENARIOS: 'divorce_quest_scenarios',
        CUSTOM_QUESTIONS: 'divorce_quest_custom_questions',
        SETTINGS: 'divorce_quest_settings',
        CURRENT_SESSION: 'divorce_quest_current_session',
        LAST_SAVE: 'divorce_quest_last_save'
    },
    
    // API Endpoints
    API: {
        BASE_URL: '/tables',
        SCENARIOS: 'scenarios',
        GAME_CONTENT: 'game_content'
    },
    
    // State Property Division Types
    PROPERTY_STATES: {
        COMMUNITY: ['AZ', 'CA', 'ID', 'LA', 'NV', 'NM', 'TX', 'WA', 'WI'],
        EQUITABLE: ['AL', 'AK', 'AR', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IL', 
                   'IN', 'IA', 'KS', 'KY', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 
                   'MO', 'MT', 'NE', 'NH', 'NJ', 'NY', 'NC', 'ND', 'OH', 'OK', 
                   'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'UT', 'VT', 'VA', 'WV', 'WY']
    },
    
    // Fault vs No-Fault States
    FAULT_STATES: {
        FAULT_AVAILABLE: ['AL', 'AK', 'AZ', 'AR', 'CT', 'DE', 'FL', 'GA', 'ID', 
                         'IL', 'LA', 'MD', 'MS', 'NH', 'NJ', 'NM', 'NY', 'NC', 
                         'ND', 'OH', 'PA', 'RI', 'SC', 'SD', 'TN', 'UT', 'VT', 
                         'VA', 'WV', 'WY'],
        NO_FAULT_ONLY: ['CA', 'CO', 'HI', 'IN', 'IA', 'KS', 'KY', 'ME', 'MA', 
                       'MI', 'MN', 'MO', 'MT', 'NE', 'NV', 'OK', 'OR', 'TX', 
                       'WA', 'WI']
    },
    
    // Average Divorce Timeline by State (in months)
    AVERAGE_TIMELINE: {
        'AL': 12, 'AK': 9, 'AZ': 6, 'AR': 13, 'CA': 8, 'CO': 7, 'CT': 9, 'DE': 12,
        'FL': 6, 'GA': 7, 'HI': 9, 'ID': 12, 'IL': 12, 'IN': 9, 'IA': 12, 'KS': 9,
        'KY': 10, 'LA': 12, 'ME': 10, 'MD': 12, 'MA': 12, 'MI': 10, 'MN': 9, 'MS': 12,
        'MO': 12, 'MT': 9, 'NE': 9, 'NV': 6, 'NH': 9, 'NJ': 12, 'NM': 9, 'NY': 12,
        'NC': 12, 'ND': 9, 'OH': 10, 'OK': 10, 'OR': 9, 'PA': 12, 'RI': 10, 'SC': 12,
        'SD': 9, 'TN': 10, 'TX': 9, 'UT': 9, 'VT': 9, 'VA': 12, 'WA': 9, 'WV': 12,
        'WI': 10, 'WY': 9
    },
    
    // Average Divorce Costs by State (in USD)
    AVERAGE_COSTS: {
        'AL': 13500, 'AK': 15000, 'AZ': 14000, 'AR': 12000, 'CA': 17500, 'CO': 14500,
        'CT': 16000, 'DE': 15000, 'FL': 13500, 'GA': 14000, 'HI': 16500, 'ID': 13000,
        'IL': 15500, 'IN': 12500, 'IA': 12000, 'KS': 13000, 'KY': 12500, 'LA': 13500,
        'ME': 14000, 'MD': 15500, 'MA': 16500, 'MI': 14000, 'MN': 14500, 'MS': 12000,
        'MO': 13000, 'MT': 13500, 'NE': 13000, 'NV': 14000, 'NH': 14500, 'NJ': 16500,
        'NM': 13500, 'NY': 17500, 'NC': 14000, 'ND': 12500, 'OH': 14000, 'OK': 13000,
        'OR': 14500, 'PA': 15500, 'RI': 15000, 'SC': 13500, 'SD': 12500, 'TN': 13000,
        'TX': 15500, 'UT': 13500, 'VT': 14500, 'VA': 14500, 'WA': 15000, 'WV': 12500,
        'WI': 14000, 'WY': 13000
    },
    
    // Custody Calculation Weights
    CUSTODY_WEIGHTS: {
        INCOME_STABILITY: 0.15,
        PARENTING_TIME: 0.20,
        CHILD_AGE: 0.15,
        EMOTIONAL_BOND: 0.15,
        LIVING_SITUATION: 0.10,
        WORK_SCHEDULE: 0.10,
        SPECIAL_NEEDS: 0.15,
        DOMESTIC_VIOLENCE: 0.25,
        SUBSTANCE_ABUSE: 0.25,
        COPARENTING_ABILITY: 0.20,
        CHILD_PREFERENCE: 0.15
    },
    
    // Asset Division Weights
    ASSET_WEIGHTS: {
        MARITAL_DURATION: 0.20,
        INCOME_DISPARITY: 0.15,
        SEPARATE_PROPERTY: 0.15,
        FAULT_FACTOR: 0.10,
        CUSTODY_FACTOR: 0.10,
        RETIREMENT_ACCOUNTS: 0.15,
        STOCK_OPTIONS: 0.15
    },
    
    // Alimony Calculation Weights
    ALIMONY_WEIGHTS: {
        INCOME_DISPARITY: 0.30,
        MARRIAGE_DURATION: 0.25,
        EARNING_CAPACITY: 0.20,
        STANDARD_OF_LIVING: 0.15,
        FAULT_FACTOR: 0.10
    },
    
    // Child Support Calculation Weights
    CHILD_SUPPORT_WEIGHTS: {
        INCOME_RATIO: 0.40,
        NUM_CHILDREN: 0.25,
        CUSTODY_PERCENTAGE: 0.20,
        SPECIAL_NEEDS: 0.15
    },
    
    // Mediation Success Weights
    MEDIATION_WEIGHTS: {
        WILLINGNESS: 0.30,
        COMPROMISE_ABILITY: 0.25,
        CONFLICT_LEVEL: 0.20,
        ATTORNEY_STATUS: 0.10,
        DOMESTIC_VIOLENCE: -0.30,
        SUBSTANCE_ABUSE: -0.20
    },
    
    // Settlement Likelihood Weights
    SETTLEMENT_WEIGHTS: {
        COMPROMISE_WILLINGNESS: 0.25,
        ATTORNEY_COOPERATION: 0.20,
        CONFLICT_LEVEL: 0.20,
        ASSET_COMPLEXITY: 0.15,
        DOMESTIC_VIOLENCE: -0.25,
        MEDIATION_ATTEMPT: 0.15
    },
    
    // Bayesian Prior Probabilities
    BAYESIAN_PRIORS: {
        JOINT_CUSTODY: 0.45,
        PRIMARY_CUSTODY_MOTHER: 0.35,
        PRIMARY_CUSTODY_FATHER: 0.20,
        ALIMONY_AWARDED: 0.30,
        SETTLEMENT_SUCCESS: 0.65,
        MEDIATION_SUCCESS: 0.70
    },
    
    // Question Categories
    CATEGORIES: {
        FACTUAL: 'Factual Information',
        EMOTIONAL: 'Emotional Assessment',
        FINANCIAL: 'Financial Details',
        LEGAL: 'Legal Considerations',
        CUSTOM: 'Custom Questions'
    },
    
    // Input Types
    INPUT_TYPES: {
        TEXT: 'text',
        NUMBER: 'number',
        SELECT: 'select',
        SCALE: 'scale',
        BOOLEAN: 'boolean',
        TEXTAREA: 'textarea'
    },
    
    // Scale Ranges
    SCALES: {
        EMOTIONAL: { min: 1, max: 10, step: 1 },
        CONFIDENCE: { min: 0, max: 100, step: 5 },
        AGREEMENT: { min: 1, max: 5, step: 1 }
    },
    
    // Validation Rules
    VALIDATION: {
        NAME_MIN_LENGTH: 2,
        NAME_MAX_LENGTH: 50,
        ZIPCODE_LENGTH: 5,
        INCOME_MIN: 0,
        INCOME_MAX: 10000000,
        YEARS_MARRIED_MIN: 0,
        YEARS_MARRIED_MAX: 100,
        CHILD_AGE_MIN: 0,
        CHILD_AGE_MAX: 25
    },
    
    // UI Messages
    MESSAGES: {
        SAVE_SUCCESS: '✓ Progress saved successfully!',
        SAVE_ERROR: '✗ Error saving progress. Please try again.',
        LOAD_SUCCESS: '✓ Scenario loaded successfully!',
        LOAD_ERROR: '✗ Error loading scenario. Please try again.',
        DELETE_CONFIRM: 'Are you sure you want to delete this scenario?',
        IDLE_WARNING: 'You will be logged out due to inactivity.',
        VALIDATION_ERROR: 'Please fill out all required fields.',
        QUESTION_ADDED: '✓ Custom question added successfully!',
        SETTINGS_SAVED: '✓ Settings saved successfully!'
    },
    
    // Default Settings
    DEFAULT_SETTINGS: {
        idleTimeout: 5,
        autoSave: 'enabled',
        soundEffects: 'enabled',
        theme: 'retro'
    },
    
    // State Full Names
    STATE_NAMES: {
        'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
        'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
        'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
        'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
        'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
        'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
        'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
        'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
        'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
        'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
        'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
        'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
        'WI': 'Wisconsin', 'WY': 'Wyoming'
    }
};

// Freeze configuration to prevent accidental modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.STORAGE_KEYS);
Object.freeze(CONFIG.API);
Object.freeze(CONFIG.PROPERTY_STATES);
Object.freeze(CONFIG.FAULT_STATES);
Object.freeze(CONFIG.AVERAGE_TIMELINE);
Object.freeze(CONFIG.AVERAGE_COSTS);
Object.freeze(CONFIG.CUSTODY_WEIGHTS);
Object.freeze(CONFIG.ASSET_WEIGHTS);
Object.freeze(CONFIG.ALIMONY_WEIGHTS);
Object.freeze(CONFIG.CHILD_SUPPORT_WEIGHTS);
Object.freeze(CONFIG.MEDIATION_WEIGHTS);
Object.freeze(CONFIG.SETTLEMENT_WEIGHTS);
Object.freeze(CONFIG.BAYESIAN_PRIORS);
Object.freeze(CONFIG.CATEGORIES);
Object.freeze(CONFIG.INPUT_TYPES);
Object.freeze(CONFIG.SCALES);
Object.freeze(CONFIG.VALIDATION);
Object.freeze(CONFIG.MESSAGES);
Object.freeze(CONFIG.DEFAULT_SETTINGS);
Object.freeze(CONFIG.STATE_NAMES);

console.log('✓ Configuration loaded:', CONFIG.GAME_NAME, CONFIG.GAME_VERSION);
