/**
 * DIVORCE QUEST - Questionnaire System
 * Handles all questionnaire logic including factual, emotional, and validation questions
 */

const QuestionnaireSystem = {
    currentQuestionIndex: 0,
    currentQuestionType: null,
    questions: [],
    answers: [],
    
    /**
     * Factual questions about divorce circumstances
     */
    factualQuestions: [
        {
            id: 'q_state',
            type: 'select',
            category: 'factual',
            text: 'In which state do you reside?',
            npcIntro: 'The realm in which you dwell affects the laws that govern your journey...',
            options: CONFIG.STATES.map(s => ({ value: s.code, label: s.name })),
            field: 'state'
        },
        {
            id: 'q_gender',
            type: 'select',
            category: 'factual',
            text: 'How do you identify?',
            npcIntro: 'Tell me, traveler, how do you see yourself?',
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer_not_to_say', label: 'Prefer not to say' }
            ],
            field: 'gender'
        },
        {
            id: 'q_years_married',
            type: 'number',
            category: 'factual',
            text: 'How many years have you been married?',
            npcIntro: 'The length of your union matters in the eyes of the law...',
            min: 0,
            max: 70,
            field: 'years_married'
        },
        {
            id: 'q_has_children',
            type: 'boolean',
            category: 'factual',
            text: 'Do you have children from this marriage?',
            npcIntro: 'Children change the path significantly...',
            field: 'has_children'
        },
        {
            id: 'q_num_children',
            type: 'number',
            category: 'factual',
            text: 'How many children do you have?',
            npcIntro: 'Each child brings their own considerations...',
            min: 0,
            max: 15,
            field: 'num_children',
            condition: (scenario) => scenario.has_children === true
        },
        {
            id: 'q_owns_house',
            type: 'boolean',
            category: 'factual',
            text: 'Do you own your primary residence?',
            npcIntro: 'Property ownership is a significant factor...',
            field: 'owns_house'
        },
        {
            id: 'q_house_value',
            type: 'currency',
            category: 'factual',
            text: 'What is the estimated value of your home?',
            npcIntro: 'Value your dwelling, as it may be divided...',
            min: 0,
            field: 'house_value',
            condition: (scenario) => scenario.owns_house === true
        },
        {
            id: 'q_annual_income',
            type: 'currency',
            category: 'factual',
            text: 'What is your annual income?',
            npcIntro: 'Your earnings will factor into many decisions...',
            min: 0,
            field: 'annual_income'
        },
        {
            id: 'q_spouse_income',
            type: 'currency',
            category: 'factual',
            text: "What is your spouse's annual income?",
            npcIntro: "Your partner's earnings also matter greatly...",
            min: 0,
            field: 'spouse_income'
        },
        {
            id: 'q_total_assets',
            type: 'currency',
            category: 'factual',
            text: 'What is the approximate total value of your marital assets (excluding debts)?',
            npcIntro: 'All treasures accumulated during your union must be accounted for...',
            min: 0,
            field: 'total_assets'
        },
        {
            id: 'q_total_debts',
            type: 'currency',
            category: 'factual',
            text: 'What is the approximate total of your marital debts?',
            npcIntro: 'Debts, like assets, must be divided...',
            min: 0,
            field: 'total_debts'
        },
        {
            id: 'q_zipcode',
            type: 'text',
            category: 'factual',
            text: 'What is your zipcode?',
            npcIntro: 'Your location within the realm affects local customs...',
            maxlength: 10,
            field: 'zipcode'
        },
        {
            id: 'q_political_reg',
            type: 'select',
            category: 'factual',
            text: 'What is your political registration?',
            npcIntro: 'This may affect judicial appointments in your area...',
            options: [
                { value: 'democrat', label: 'Democrat' },
                { value: 'republican', label: 'Republican' },
                { value: 'independent', label: 'Independent' },
                { value: 'other', label: 'Other' },
                { value: 'none', label: 'Not registered' }
            ],
            field: 'political_reg'
        },
        {
            id: 'q_driving_record',
            type: 'select',
            category: 'factual',
            text: 'How would you describe your driving record?',
            npcIntro: 'Character factors, even driving history, may come into play...',
            options: [
                { value: 'clean', label: 'Clean - No violations' },
                { value: 'minor_violations', label: 'Minor violations (parking, speeding)' },
                { value: 'major_violations', label: 'Major violations (DUI, reckless driving)' },
                { value: 'suspended', label: 'Suspended or revoked license' }
            ],
            field: 'driving_record'
        }
    ],
    
    /**
     * Emotional/psychological questions
     */
    emotionalQuestions: [
        {
            id: 'e_decision_certainty',
            type: 'scale',
            category: 'emotional',
            text: 'How certain are you about your decision to divorce?',
            npcIntro: 'The heart must be examined before the journey begins...',
            scale: { min: 1, max: 10, minLabel: 'Very uncertain', maxLabel: 'Completely certain' }
        },
        {
            id: 'e_emotional_state',
            type: 'select',
            category: 'emotional',
            text: 'Which best describes your current emotional state?',
            npcIntro: 'Your emotional armor must be assessed...',
            options: [
                { value: 'calm_resolved', label: 'Calm and resolved', score: 5 },
                { value: 'anxious_hopeful', label: 'Anxious but hopeful', score: 3 },
                { value: 'angry_bitter', label: 'Angry and bitter', score: 1 },
                { value: 'sad_grieving', label: 'Sad and grieving', score: 2 },
                { value: 'relieved', label: 'Relieved', score: 4 }
            ]
        },
        {
            id: 'e_conflict_level',
            type: 'scale',
            category: 'emotional',
            text: 'How would you rate the current conflict level with your spouse?',
            npcIntro: 'The level of discord affects the difficulty of your quest...',
            scale: { min: 1, max: 10, minLabel: 'Very amicable', maxLabel: 'Extremely hostile' }
        },
        {
            id: 'e_communication',
            type: 'select',
            category: 'emotional',
            text: 'How well can you communicate with your spouse currently?',
            npcIntro: 'Communication bridges may ease your passage...',
            options: [
                { value: 'excellent', label: 'Excellent - We can discuss anything', score: 5 },
                { value: 'good', label: 'Good - We can discuss most things civilly', score: 4 },
                { value: 'fair', label: 'Fair - We can discuss basics', score: 3 },
                { value: 'poor', label: 'Poor - Communication is difficult', score: 2 },
                { value: 'none', label: 'None - We cannot communicate', score: 1 }
            ]
        },
        {
            id: 'e_support_system',
            type: 'scale',
            category: 'emotional',
            text: 'How strong is your emotional support system (friends, family)?',
            npcIntro: 'Allies strengthen your resolve in difficult times...',
            scale: { min: 1, max: 10, minLabel: 'No support', maxLabel: 'Very strong support' }
        },
        {
            id: 'e_financial_worry',
            type: 'scale',
            category: 'emotional',
            text: 'How worried are you about your financial situation after divorce?',
            npcIntro: 'Financial fears can cloud judgment...',
            scale: { min: 1, max: 10, minLabel: 'Not worried', maxLabel: 'Extremely worried' }
        },
        {
            id: 'e_children_impact',
            type: 'scale',
            category: 'emotional',
            text: 'If you have children, how concerned are you about the impact on them?',
            npcIntro: 'The young ones weigh heavily on the heart...',
            scale: { min: 1, max: 10, minLabel: 'Not applicable/Not concerned', maxLabel: 'Extremely concerned' }
        },
        {
            id: 'e_future_outlook',
            type: 'select',
            category: 'emotional',
            text: 'How do you view your future after divorce?',
            npcIntro: 'Your vision of the future shapes your path...',
            options: [
                { value: 'very_optimistic', label: 'Very optimistic - New beginning', score: 5 },
                { value: 'somewhat_optimistic', label: 'Somewhat optimistic', score: 4 },
                { value: 'neutral', label: 'Neutral - Taking it day by day', score: 3 },
                { value: 'pessimistic', label: 'Pessimistic - Worried about future', score: 2 },
                { value: 'very_pessimistic', label: 'Very pessimistic - Fearful', score: 1 }
            ]
        },
        {
            id: 'e_stress_coping',
            type: 'select',
            category: 'emotional',
            text: 'How well do you typically handle stress?',
            npcIntro: 'Your resilience will be tested on this journey...',
            options: [
                { value: 'very_well', label: 'Very well - I have good coping strategies', score: 5 },
                { value: 'well', label: 'Well - I manage most of the time', score: 4 },
                { value: 'average', label: 'Average - Sometimes I struggle', score: 3 },
                { value: 'poorly', label: 'Poorly - Stress overwhelms me often', score: 2 },
                { value: 'very_poorly', label: 'Very poorly - I need help coping', score: 1 }
            ]
        },
        {
            id: 'e_relationship_salvage',
            type: 'scale',
            category: 'emotional',
            text: 'Have you considered or attempted to salvage the relationship?',
            npcIntro: 'Sometimes retreat is wiser than advancing...',
            scale: { min: 1, max: 10, minLabel: 'No, beyond repair', maxLabel: 'Yes, extensively tried' }
        }
    ],
    
    /**
     * Validation questions (check consistency)
     */
    validationQuestions: [
        {
            id: 'v_certainty_check',
            type: 'scale',
            category: 'validation',
            text: 'On reflection, how certain are you about proceeding with divorce?',
            npcIntro: 'Let us revisit your certainty, traveler...',
            scale: { min: 1, max: 10, minLabel: 'Not certain', maxLabel: 'Completely certain' },
            validates: 'e_decision_certainty'
        },
        {
            id: 'v_conflict_check',
            type: 'scale',
            category: 'validation',
            text: 'How would you describe your relationship with your spouse right now?',
            npcIntro: 'Tell me again of the discord between you...',
            scale: { min: 1, max: 10, minLabel: 'Very peaceful', maxLabel: 'Very conflicted' },
            validates: 'e_conflict_level'
        },
        {
            id: 'v_stress_check',
            type: 'select',
            category: 'validation',
            text: 'When facing difficult situations, you typically:',
            npcIntro: 'How do you face the storms of life?',
            options: [
                { value: 'stay_calm', label: 'Stay calm and work through it', score: 5 },
                { value: 'seek_help', label: 'Seek help from others', score: 4 },
                { value: 'take_time', label: 'Take time to process', score: 3 },
                { value: 'feel_overwhelmed', label: 'Feel overwhelmed', score: 2 },
                { value: 'shut_down', label: 'Shut down or avoid', score: 1 }
            ],
            validates: 'e_stress_coping'
        }
    ],
    
    /**
     * Initialize questionnaire
     */
    async initialize(questionType) {
        this.currentQuestionType = questionType;
        this.currentQuestionIndex = 0;
        this.answers = [];
        
        if (questionType === 'factual') {
            this.questions = [...this.factualQuestions];
        } else if (questionType === 'emotional') {
            this.questions = [...this.emotionalQuestions];
        } else if (questionType === 'validation') {
            this.questions = [...this.validationQuestions];
        }
        
        // Try to load additional questions from database
        try {
            const contentResponse = await API.getContentByType('question');
            if (contentResponse.data && contentResponse.data.length > 0) {
                const dbQuestions = contentResponse.data
                    .filter(q => q.active && q.category === questionType)
                    .map(q => {
                        const metadata = q.metadata ? JSON.parse(q.metadata) : {};
                        return {
                            id: q.id,
                            type: metadata.type || 'text',
                            category: q.category,
                            text: q.content,
                            npcIntro: metadata.npcIntro || '',
                            ...metadata
                        };
                    });
                this.questions.push(...dbQuestions);
            }
        } catch (error) {
            console.error('Error loading questions from database:', error);
        }
    },
    
    /**
     * Get current question
     */
    getCurrentQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            return null;
        }
        return this.questions[this.currentQuestionIndex];
    },
    
    /**
     * Check if current question should be shown based on conditions
     */
    shouldShowQuestion(question, scenario) {
        if (question.condition && typeof question.condition === 'function') {
            return question.condition(scenario);
        }
        return true;
    },
    
    /**
     * Save answer and move to next question
     */
    saveAnswer(answer) {
        const question = this.getCurrentQuestion();
        if (question) {
            this.answers.push({
                questionId: question.id,
                question: question.text,
                answer: answer,
                timestamp: Date.now()
            });
        }
        this.currentQuestionIndex++;
    },
    
    /**
     * Get progress percentage
     */
    getProgress() {
        return (this.currentQuestionIndex / this.questions.length) * 100;
    },
    
    /**
     * Check if questionnaire is complete
     */
    isComplete() {
        return this.currentQuestionIndex >= this.questions.length;
    },
    
    /**
     * Get all answers
     */
    getAnswers() {
        return this.answers;
    },
    
    /**
     * Calculate emotional profile score
     */
    calculateEmotionalProfile() {
        const emotionalAnswers = this.answers.filter(a => 
            a.questionId.startsWith('e_')
        );
        
        let totalScore = 0;
        let scoreCount = 0;
        
        emotionalAnswers.forEach(answer => {
            if (typeof answer.answer === 'number') {
                totalScore += answer.answer;
                scoreCount++;
            } else if (typeof answer.answer === 'object' && answer.answer.score) {
                totalScore += answer.answer.score;
                scoreCount++;
            }
        });
        
        const averageScore = scoreCount > 0 ? totalScore / scoreCount : 5;
        
        return {
            score: averageScore,
            stability: averageScore >= 7 ? 'high' : averageScore >= 4 ? 'medium' : 'low',
            answers: emotionalAnswers
        };
    },
    
    /**
     * Validate answer consistency
     */
    validateConsistency() {
        const validationAnswers = this.answers.filter(a => 
            a.questionId.startsWith('v_')
        );
        
        const inconsistencies = [];
        
        validationAnswers.forEach(vAnswer => {
            const question = this.validationQuestions.find(q => q.id === vAnswer.questionId);
            if (question && question.validates) {
                const originalAnswer = this.answers.find(a => a.questionId === question.validates);
                if (originalAnswer) {
                    const diff = Math.abs(vAnswer.answer - originalAnswer.answer);
                    if (diff > 3) {
                        inconsistencies.push({
                            question: question.validates,
                            original: originalAnswer.answer,
                            validation: vAnswer.answer,
                            difference: diff
                        });
                    }
                }
            }
        });
        
        return {
            consistent: inconsistencies.length === 0,
            inconsistencies: inconsistencies
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionnaireSystem;
}
