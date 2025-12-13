/**
 * Divorce Quest - Questionnaire Module
 * Manages factual and emotional questionnaires with enhanced complexity
 * Version: 1.1.0 - Enhanced Edition with 45 total questions
 */

const Questionnaire = (function() {
    'use strict';

    // Factual Questions (27 questions - enhanced from 18)
    const factualQuestions = [
        {
            id: 'f1',
            category: 'Factual Information',
            text: 'How many years have you been married?',
            type: 'number',
            key: 'years_married',
            required: true,
            min: 0,
            max: 100
        },
        {
            id: 'f2',
            category: 'Factual Information',
            text: 'Do you have children from this marriage?',
            type: 'select',
            key: 'has_children',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'f3',
            category: 'Factual Information',
            text: 'If yes, how many children?',
            type: 'number',
            key: 'num_children',
            required: false,
            min: 0,
            max: 20,
            dependsOn: { key: 'has_children', value: 'yes' }
        },
        {
            id: 'f4',
            category: 'Factual Information',
            text: 'What are the ages of your children? (comma-separated)',
            type: 'text',
            key: 'children_ages',
            required: false,
            dependsOn: { key: 'has_children', value: 'yes' },
            placeholder: 'e.g., 5, 8, 12'
        },
        {
            id: 'f5',
            category: 'Factual Information',
            text: 'Do you own a house together?',
            type: 'select',
            key: 'owns_house',
            required: true,
            options: [
                { value: 'yes', label: 'Yes, jointly owned' },
                { value: 'no', label: 'No' },
                { value: 'separate', label: 'Separately owned' }
            ]
        },
        {
            id: 'f6',
            category: 'Factual Information',
            text: 'Estimated home value (if applicable):',
            type: 'number',
            key: 'home_value',
            required: false,
            min: 0,
            max: 100000000,
            dependsOn: { key: 'owns_house', value: 'yes' },
            placeholder: 'Enter dollar amount'
        },
        {
            id: 'f7',
            category: 'Financial Details',
            text: 'Your annual income:',
            type: 'number',
            key: 'your_income',
            required: true,
            min: 0,
            max: 10000000,
            placeholder: 'Enter annual income'
        },
        {
            id: 'f8',
            category: 'Financial Details',
            text: "Your spouse's annual income:",
            type: 'number',
            key: 'spouse_income',
            required: true,
            min: 0,
            max: 10000000,
            placeholder: 'Enter annual income'
        },
        {
            id: 'f9',
            category: 'Factual Information',
            text: 'Do you have other significant property? (cars, boats, investments)',
            type: 'select',
            key: 'other_property',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'f10',
            category: 'Factual Information',
            text: 'Estimated total value of other property:',
            type: 'number',
            key: 'other_property_value',
            required: false,
            min: 0,
            max: 100000000,
            dependsOn: { key: 'other_property', value: 'yes' },
            placeholder: 'Enter dollar amount'
        },
        {
            id: 'f11',
            category: 'Legal Considerations',
            text: 'What is your political party registration?',
            type: 'select',
            key: 'political_party',
            required: false,
            options: [
                { value: 'democrat', label: 'Democrat' },
                { value: 'republican', label: 'Republican' },
                { value: 'independent', label: 'Independent' },
                { value: 'other', label: 'Other' },
                { value: 'none', label: 'No Party Affiliation' }
            ]
        },
        {
            id: 'f12',
            category: 'Legal Considerations',
            text: 'Do you have any significant driving violations or criminal record?',
            type: 'select',
            key: 'legal_record',
            required: true,
            options: [
                { value: 'none', label: 'None' },
                { value: 'minor', label: 'Minor violations' },
                { value: 'major', label: 'Major violations or criminal record' }
            ]
        },
        {
            id: 'f13',
            category: 'Factual Information',
            text: 'Who currently has primary custody or parenting time?',
            type: 'select',
            key: 'current_custody',
            required: false,
            dependsOn: { key: 'has_children', value: 'yes' },
            options: [
                { value: 'you', label: 'You' },
                { value: 'spouse', label: 'Your spouse' },
                { value: 'joint', label: 'Shared equally' },
                { value: 'other', label: 'Other family member' }
            ]
        },
        {
            id: 'f14',
            category: 'Factual Information',
            text: 'What is your current living situation?',
            type: 'select',
            key: 'living_situation',
            required: true,
            options: [
                { value: 'marital_home', label: 'Living in marital home' },
                { value: 'separate_home', label: 'Living separately (own place)' },
                { value: 'with_family', label: 'Living with family/friends' },
                { value: 'temporary', label: 'Temporary housing' }
            ]
        },
        {
            id: 'f15',
            category: 'Financial Details',
            text: 'Total marital debt (credit cards, loans, etc.):',
            type: 'number',
            key: 'total_debt',
            required: false,
            min: 0,
            max: 10000000,
            placeholder: 'Enter dollar amount'
        },
        {
            id: 'f16',
            category: 'Legal Considerations',
            text: 'Have you consulted with an attorney yet?',
            type: 'select',
            key: 'attorney_consulted',
            required: true,
            options: [
                { value: 'yes_retained', label: 'Yes, retained attorney' },
                { value: 'yes_consulted', label: 'Yes, consulted only' },
                { value: 'no', label: 'No, not yet' }
            ]
        },
        {
            id: 'f17',
            category: 'Factual Information',
            text: 'Is your state a community property or equitable distribution state?',
            type: 'auto',
            key: 'property_division_type',
            required: true,
            autoCalculate: true
        },
        {
            id: 'f18',
            category: 'Factual Information',
            text: 'Estimated timeline you hope to complete divorce:',
            type: 'select',
            key: 'desired_timeline',
            required: true,
            options: [
                { value: '3', label: 'Within 3 months' },
                { value: '6', label: 'Within 6 months' },
                { value: '12', label: 'Within 1 year' },
                { value: '24', label: 'Within 2 years' },
                { value: 'no_preference', label: 'No preference' }
            ]
        },
        // NEW ENHANCED QUESTIONS (f19-f27)
        {
            id: 'f19',
            category: 'Legal Considerations',
            text: 'Is this a fault or no-fault divorce?',
            type: 'select',
            key: 'fault_state',
            required: true,
            options: [
                { value: 'no_fault', label: 'No-fault divorce' },
                { value: 'fault', label: 'Fault-based divorce' },
                { value: 'unsure', label: 'Unsure' }
            ]
        },
        {
            id: 'f20',
            category: 'Financial Details',
            text: 'Do you or your spouse have retirement accounts (401k, IRA, pension)?',
            type: 'select',
            key: 'has_retirement',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'f21',
            category: 'Financial Details',
            text: 'Estimated total value of retirement accounts:',
            type: 'number',
            key: 'retirement_value',
            required: false,
            min: 0,
            max: 50000000,
            dependsOn: { key: 'has_retirement', value: 'yes' },
            placeholder: 'Enter dollar amount'
        },
        {
            id: 'f22',
            category: 'Financial Details',
            text: 'Do you or your spouse have stock options or equity compensation?',
            type: 'select',
            key: 'has_stock_options',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'f23',
            category: 'Financial Details',
            text: 'Estimated value of stock options/equity:',
            type: 'number',
            key: 'stock_value',
            required: false,
            min: 0,
            max: 50000000,
            dependsOn: { key: 'has_stock_options', value: 'yes' },
            placeholder: 'Enter dollar amount'
        },
        {
            id: 'f24',
            category: 'Financial Details',
            text: 'Do you have separate property (inherited, pre-marital assets)?',
            type: 'select',
            key: 'has_separate_property',
            required: true,
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'f25',
            category: 'Financial Details',
            text: 'Estimated value of separate property:',
            type: 'number',
            key: 'separate_property_value',
            required: false,
            min: 0,
            max: 50000000,
            dependsOn: { key: 'has_separate_property', value: 'yes' },
            placeholder: 'Enter dollar amount'
        },
        {
            id: 'f26',
            category: 'Factual Information',
            text: 'Have there been issues of infidelity in your marriage?',
            type: 'select',
            key: 'infidelity',
            required: true,
            options: [
                { value: 'yes_by_spouse', label: 'Yes, by spouse' },
                { value: 'yes_by_me', label: 'Yes, by me' },
                { value: 'yes_both', label: 'Yes, by both' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'f27',
            category: 'Legal Considerations',
            text: 'Have there been any incidents of domestic violence?',
            type: 'select',
            key: 'domestic_violence',
            required: true,
            options: [
                { value: 'yes_against_me', label: 'Yes, against me' },
                { value: 'yes_by_me', label: 'Yes, by me' },
                { value: 'yes_mutual', label: 'Yes, mutual' },
                { value: 'no', label: 'No' }
            ]
        }
    ];

    // Emotional Questions (18 questions - enhanced from 9)
    const emotionalQuestions = [
        {
            id: 'e1',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how emotionally prepared are you for this divorce?',
            type: 'scale',
            key: 'e_emotional_readiness',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Not prepared', 10: 'Fully prepared' }
        },
        {
            id: 'e2',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how would you rate your current stress level?',
            type: 'scale',
            key: 'e_stress_level',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Low stress', 10: 'Extreme stress' }
        },
        {
            id: 'e3',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how contentious is your relationship with your spouse?',
            type: 'scale',
            key: 'e_conflict_level',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Amicable', 10: 'Highly contentious' }
        },
        {
            id: 'e4',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how important is it to you to maintain a positive relationship with your ex-spouse?',
            type: 'scale',
            key: 'e_relationship_priority',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Not important', 10: 'Very important' }
        },
        {
            id: 'e5',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how concerned are you about the impact on your children?',
            type: 'scale',
            key: 'e_child_concern',
            required: false,
            min: 1,
            max: 10,
            labels: { 1: 'Not concerned', 10: 'Extremely concerned' },
            dependsOn: { key: 'has_children', value: 'yes' }
        },
        {
            id: 'e6',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how financially anxious are you about life after divorce?',
            type: 'scale',
            key: 'e_financial_anxiety',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Not anxious', 10: 'Very anxious' }
        },
        {
            id: 'e7',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how supported do you feel by family and friends?',
            type: 'scale',
            key: 'e_support_system',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'No support', 10: 'Strong support' }
        },
        {
            id: 'e8',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how fair do you think the divorce settlement will be?',
            type: 'scale',
            key: 'e_fairness_expectation',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Very unfair', 10: 'Very fair' }
        },
        {
            id: 'e9',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how confident are you in your ability to navigate this process?',
            type: 'scale',
            key: 'e_confidence_level',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Not confident', 10: 'Very confident' }
        },
        // NEW ENHANCED EMOTIONAL QUESTIONS (e10-e18)
        {
            id: 'e10',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how would you rate your ability to co-parent effectively?',
            type: 'scale',
            key: 'e_coparenting_ability',
            required: false,
            min: 1,
            max: 10,
            labels: { 1: 'Very poor', 10: 'Excellent' },
            dependsOn: { key: 'has_children', value: 'yes' }
        },
        {
            id: 'e11',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how financially independent do you feel?',
            type: 'scale',
            key: 'e_financial_independence',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Completely dependent', 10: 'Completely independent' }
        },
        {
            id: 'e12',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how willing are you to compromise on divorce terms?',
            type: 'scale',
            key: 'e_compromise_willingness',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Unwilling to compromise', 10: 'Very willing' }
        },
        {
            id: 'e13',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how much do you feel betrayed by your spouse?',
            type: 'scale',
            key: 'e_betrayal_feeling',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'No betrayal', 10: 'Extreme betrayal' }
        },
        {
            id: 'e14',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how much guilt do you feel about the divorce?',
            type: 'scale',
            key: 'e_guilt_level',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'No guilt', 10: 'Extreme guilt' }
        },
        {
            id: 'e15',
            category: 'Emotional Assessment',
            text: 'Are you or your spouse in a new relationship?',
            type: 'select',
            key: 'e_new_relationship',
            required: true,
            options: [
                { value: 'yes_me', label: 'Yes, I am' },
                { value: 'yes_spouse', label: 'Yes, my spouse is' },
                { value: 'yes_both', label: 'Yes, both of us' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'e16',
            category: 'Emotional Assessment',
            text: 'What is more important to you in this divorce?',
            type: 'select',
            key: 'e_priority_assets_or_time',
            required: true,
            options: [
                { value: 'assets', label: 'Getting my fair share of assets' },
                { value: 'time_with_children', label: 'Maximizing time with children' },
                { value: 'closure', label: 'Getting it done quickly' },
                { value: 'vindication', label: 'Proving spouse is at fault' }
            ]
        },
        {
            id: 'e17',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how much do you regret the decision to divorce?',
            type: 'scale',
            key: 'e_regret_level',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'No regret', 10: 'Strong regret' }
        },
        {
            id: 'e18',
            category: 'Emotional Assessment',
            text: 'On a scale of 1-10, how well can you manage your anger during conflicts?',
            type: 'scale',
            key: 'e_anger_management',
            required: true,
            min: 1,
            max: 10,
            labels: { 1: 'Poor anger management', 10: 'Excellent control' }
        }
    ];

    // Additional questions based on data collected
    const additionalQuestions = [
        {
            id: 'a1',
            category: 'Legal Considerations',
            text: 'Have there been any issues with substance abuse in your marriage?',
            type: 'select',
            key: 'substance_abuse',
            required: true,
            options: [
                { value: 'yes_spouse', label: 'Yes, by spouse' },
                { value: 'yes_me', label: 'Yes, by me' },
                { value: 'yes_both', label: 'Yes, by both' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'a2',
            category: 'Factual Information',
            text: 'Do any of your children have special needs?',
            type: 'select',
            key: 'special_needs_children',
            required: false,
            dependsOn: { key: 'has_children', value: 'yes' },
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'a3',
            category: 'Factual Information',
            text: 'Are any of your children old enough to express custody preferences? (typically 12+)',
            type: 'select',
            key: 'child_preference_age',
            required: false,
            dependsOn: { key: 'has_children', value: 'yes' },
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            id: 'a4',
            category: 'Legal Considerations',
            text: 'Would you be willing to try mediation?',
            type: 'select',
            key: 'mediation_willingness',
            required: true,
            options: [
                { value: 'yes_willing', label: 'Yes, willing to try' },
                { value: 'yes_prefer', label: 'Yes, strongly prefer' },
                { value: 'no', label: 'No, prefer litigation' },
                { value: 'unsure', label: 'Unsure' }
            ]
        },
        {
            id: 'a5',
            category: 'Legal Considerations',
            text: 'What is your attorney status?',
            type: 'select',
            key: 'attorney_status',
            required: true,
            options: [
                { value: 'both_have', label: 'Both have attorneys' },
                { value: 'i_have', label: 'Only I have an attorney' },
                { value: 'spouse_has', label: 'Only spouse has attorney' },
                { value: 'neither', label: 'Neither has attorney yet' }
            ]
        },
        {
            id: 'a6',
            category: 'Financial Details',
            text: 'What is your current employment status?',
            type: 'select',
            key: 'employment_status',
            required: true,
            options: [
                { value: 'full_time', label: 'Full-time employed' },
                { value: 'part_time', label: 'Part-time employed' },
                { value: 'self_employed', label: 'Self-employed' },
                { value: 'unemployed', label: 'Currently unemployed' },
                { value: 'retired', label: 'Retired' },
                { value: 'homemaker', label: 'Stay-at-home parent/homemaker' }
            ]
        },
        {
            id: 'a7',
            category: 'Financial Details',
            text: "What is your spouse's employment status?",
            type: 'select',
            key: 'spouse_employment_status',
            required: true,
            options: [
                { value: 'full_time', label: 'Full-time employed' },
                { value: 'part_time', label: 'Part-time employed' },
                { value: 'self_employed', label: 'Self-employed' },
                { value: 'unemployed', label: 'Currently unemployed' },
                { value: 'retired', label: 'Retired' },
                { value: 'homemaker', label: 'Stay-at-home parent/homemaker' }
            ]
        },
        {
            id: 'a8',
            category: 'Financial Details',
            text: 'Who currently provides health insurance for the family?',
            type: 'select',
            key: 'health_insurance',
            required: true,
            options: [
                { value: 'me', label: 'Through my employer' },
                { value: 'spouse', label: "Through spouse's employer" },
                { value: 'both', label: 'Both have separate plans' },
                { value: 'marketplace', label: 'Private/Marketplace' },
                { value: 'none', label: 'No insurance' }
            ]
        },
        {
            id: 'a9',
            category: 'Financial Details',
            text: 'What types of debt do you have? (select all that apply)',
            type: 'select',
            key: 'debt_types',
            required: true,
            options: [
                { value: 'credit_cards', label: 'Credit cards' },
                { value: 'mortgage', label: 'Mortgage' },
                { value: 'car_loans', label: 'Car loans' },
                { value: 'student_loans', label: 'Student loans' },
                { value: 'medical', label: 'Medical debt' },
                { value: 'business', label: 'Business debt' },
                { value: 'none', label: 'No significant debt' }
            ]
        },
        {
            id: 'a10',
            category: 'Financial Details',
            text: 'How have you and your spouse filed taxes?',
            type: 'select',
            key: 'tax_filing_status',
            required: true,
            options: [
                { value: 'joint', label: 'Married filing jointly' },
                { value: 'separate', label: 'Married filing separately' },
                { value: 'varies', label: 'Varied year to year' }
            ]
        }
    ];

    // Combine all questions
    let allQuestions = [
        ...factualQuestions,
        ...emotionalQuestions,
        ...additionalQuestions
    ];

    // Store custom questions
    let customQuestions = [];

    /**
     * Get all questions (default + custom)
     */
    function getAllQuestions() {
        return [...allQuestions, ...customQuestions];
    }

    /**
     * Get question by ID
     */
    function getQuestionById(id) {
        return getAllQuestions().find(q => q.id === id);
    }

    /**
     * Get questions by category
     */
    function getQuestionsByCategory(category) {
        return getAllQuestions().filter(q => q.category === category);
    }

    /**
     * Add custom question
     */
    function addCustomQuestion(question) {
        const newQuestion = {
            id: `custom_${Date.now()}`,
            ...question,
            isCustom: true
        };
        customQuestions.push(newQuestion);
        saveCustomQuestions();
        return newQuestion;
    }

    /**
     * Remove custom question
     */
    function removeCustomQuestion(id) {
        customQuestions = customQuestions.filter(q => q.id !== id);
        saveCustomQuestions();
    }

    /**
     * Save custom questions to storage
     */
    function saveCustomQuestions() {
        try {
            localStorage.setItem(
                CONFIG.STORAGE_KEYS.CUSTOM_QUESTIONS,
                JSON.stringify(customQuestions)
            );
        } catch (error) {
            console.error('Error saving custom questions:', error);
        }
    }

    /**
     * Load custom questions from storage
     */
    function loadCustomQuestions() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.CUSTOM_QUESTIONS);
            if (saved) {
                customQuestions = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading custom questions:', error);
            customQuestions = [];
        }
    }

    /**
     * Check if question should be shown based on dependencies
     */
    function shouldShowQuestion(question, answers) {
        if (!question.dependsOn) return true;
        
        const dependentValue = answers[question.dependsOn.key];
        return dependentValue === question.dependsOn.value;
    }

    /**
     * Validate answer for a question
     */
    function validateAnswer(question, answer) {
        if (question.required && (answer === null || answer === undefined || answer === '')) {
            return { valid: false, error: 'This question is required' };
        }

        if (question.type === 'number') {
            const num = parseFloat(answer);
            if (isNaN(num)) {
                return { valid: false, error: 'Please enter a valid number' };
            }
            if (question.min !== undefined && num < question.min) {
                return { valid: false, error: `Value must be at least ${question.min}` };
            }
            if (question.max !== undefined && num > question.max) {
                return { valid: false, error: `Value must be at most ${question.max}` };
            }
        }

        return { valid: true };
    }

    /**
     * Initialize questionnaire module
     */
    function init() {
        loadCustomQuestions();
        console.log('✓ Questionnaire module initialized');
        console.log(`  - Total questions: ${getAllQuestions().length}`);
        console.log(`  - Factual: ${factualQuestions.length}`);
        console.log(`  - Emotional: ${emotionalQuestions.length}`);
        console.log(`  - Additional: ${additionalQuestions.length}`);
        console.log(`  - Custom: ${customQuestions.length}`);
    }

    // Public API
    return {
        init,
        getAllQuestions,
        getQuestionById,
        getQuestionsByCategory,
        addCustomQuestion,
        removeCustomQuestion,
        shouldShowQuestion,
        validateAnswer,
        getCustomQuestions: () => customQuestions,
        getFactualQuestions: () => factualQuestions,
        getEmotionalQuestions: () => emotionalQuestions,
        getAdditionalQuestions: () => additionalQuestions
    };
})();
