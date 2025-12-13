/**
 * Divorce Quest - Bayesian Analysis Module
 * Enhanced complexity with advanced prediction models
 * Version: 1.1.0 - Enhanced Edition
 */

const BayesianEngine = (function() {
    'use strict';

    /**
     * Calculate child custody likelihood with enhanced factors
     */
    function calculateCustody(data) {
        if (data.has_children !== 'yes' || !data.num_children) {
            return null;
        }

        const weights = CONFIG.CUSTODY_WEIGHTS;
        let motherScore = CONFIG.BAYESIAN_PRIORS.PRIMARY_CUSTODY_MOTHER * 100;
        let fatherScore = CONFIG.BAYESIAN_PRIORS.PRIMARY_CUSTODY_FATHER * 100;
        let jointScore = CONFIG.BAYESIAN_PRIORS.JOINT_CUSTODY * 100;

        // Income stability factor
        const incomeRatio = data.your_income / (data.spouse_income + 1);
        if (data.character_gender === 'female') {
            motherScore += (incomeRatio > 1 ? 10 : -5) * weights.INCOME_STABILITY * 100;
            fatherScore += (incomeRatio < 1 ? 10 : -5) * weights.INCOME_STABILITY * 100;
        } else {
            fatherScore += (incomeRatio > 1 ? 10 : -5) * weights.INCOME_STABILITY * 100;
            motherScore += (incomeRatio < 1 ? 10 : -5) * weights.INCOME_STABILITY * 100;
        }

        // Current custody arrangement
        if (data.current_custody === 'you') {
            if (data.character_gender === 'female') {
                motherScore += 15;
            } else {
                fatherScore += 15;
            }
            jointScore -= 10;
        } else if (data.current_custody === 'joint') {
            jointScore += 20;
            motherScore -= 5;
            fatherScore -= 5;
        }

        // Child age factor
        if (data.children_ages) {
            const ages = data.children_ages.split(',').map(a => parseInt(a.trim()));
            const hasYoungChildren = ages.some(age => age < 5);
            if (hasYoungChildren) {
                motherScore += 8 * weights.CHILD_AGE * 100;
            }
        }

        // Emotional factors
        if (data.e_child_concern) {
            const concern = parseFloat(data.e_child_concern);
            if (data.character_gender === 'female') {
                motherScore += (concern / 10) * 10;
            } else {
                fatherScore += (concern / 10) * 10;
            }
        }

        // NEW: Domestic violence factor (major impact)
        if (data.domestic_violence) {
            if (data.domestic_violence === 'yes_by_me') {
                if (data.character_gender === 'female') {
                    motherScore -= 30 * weights.DOMESTIC_VIOLENCE * 100;
                } else {
                    fatherScore -= 30 * weights.DOMESTIC_VIOLENCE * 100;
                }
                jointScore -= 20;
            } else if (data.domestic_violence === 'yes_against_me') {
                if (data.character_gender === 'female') {
                    motherScore += 25 * weights.DOMESTIC_VIOLENCE * 100;
                } else {
                    fatherScore += 25 * weights.DOMESTIC_VIOLENCE * 100;
                }
            }
        }

        // NEW: Substance abuse factor
        if (data.substance_abuse) {
            if (data.substance_abuse === 'yes_me') {
                if (data.character_gender === 'female') {
                    motherScore -= 25 * weights.SUBSTANCE_ABUSE * 100;
                } else {
                    fatherScore -= 25 * weights.SUBSTANCE_ABUSE * 100;
                }
                jointScore -= 15;
            } else if (data.substance_abuse === 'yes_spouse') {
                if (data.character_gender === 'female') {
                    motherScore += 20 * weights.SUBSTANCE_ABUSE * 100;
                } else {
                    fatherScore += 20 * weights.SUBSTANCE_ABUSE * 100;
                }
            }
        }

        // NEW: Special needs children factor
        if (data.special_needs_children === 'yes') {
            // Primary caregiver tends to be favored
            if (data.current_custody === 'you') {
                if (data.character_gender === 'female') {
                    motherScore += 12 * weights.SPECIAL_NEEDS * 100;
                } else {
                    fatherScore += 12 * weights.SPECIAL_NEEDS * 100;
                }
            }
        }

        // NEW: Child preference factor (for older children)
        if (data.child_preference_age === 'yes') {
            // Court typically gives weight to preferences of children 12+
            const preferenceWeight = 10 * weights.CHILD_PREFERENCE * 100;
            // Neutral factor - just note it exists
            jointScore += preferenceWeight * 0.5;
        }

        // NEW: Coparenting ability
        if (data.e_coparenting_ability) {
            const ability = parseFloat(data.e_coparenting_ability);
            jointScore += (ability / 10) * 15 * weights.COPARENTING_ABILITY * 100;
            if (ability < 4) {
                jointScore -= 10;
            }
        }

        // Living situation
        if (data.living_situation === 'marital_home') {
            if (data.character_gender === 'female') {
                motherScore += 8 * weights.LIVING_SITUATION * 100;
            } else {
                fatherScore += 8 * weights.LIVING_SITUATION * 100;
            }
        } else if (data.living_situation === 'temporary') {
            if (data.character_gender === 'female') {
                motherScore -= 8;
            } else {
                fatherScore -= 8;
            }
        }

        // Employment status impact
        if (data.employment_status === 'homemaker') {
            if (data.character_gender === 'female') {
                motherScore += 10 * weights.WORK_SCHEDULE * 100;
            } else {
                fatherScore += 10 * weights.WORK_SCHEDULE * 100;
            }
        } else if (data.employment_status === 'full_time' && 
                   data.spouse_employment_status === 'homemaker') {
            if (data.character_gender === 'male') {
                motherScore += 8;
            } else {
                fatherScore += 8;
            }
        }

        // Normalize scores
        const total = motherScore + fatherScore + jointScore;
        return {
            primary_mother: Math.max(0, Math.min(100, (motherScore / total) * 100)),
            primary_father: Math.max(0, Math.min(100, (fatherScore / total) * 100)),
            joint_custody: Math.max(0, Math.min(100, (jointScore / total) * 100)),
            confidence: calculateConfidence(data, 'custody')
        };
    }

    /**
     * Calculate advanced custody analysis
     */
    function calculateAdvancedCustody(data) {
        if (data.has_children !== 'yes') return null;

        const analysis = {
            factors_favoring_you: [],
            factors_favoring_spouse: [],
            neutral_factors: [],
            risk_factors: [],
            recommendations: []
        };

        // Analyze domestic violence
        if (data.domestic_violence === 'yes_against_me') {
            analysis.factors_favoring_you.push('History of domestic violence against you');
            analysis.recommendations.push('Document all incidents and seek protective orders if necessary');
        } else if (data.domestic_violence === 'yes_by_me') {
            analysis.risk_factors.push('History of domestic violence by you - significant custody impact');
            analysis.recommendations.push('Seek anger management counseling and demonstrate rehabilitation');
        }

        // Analyze substance abuse
        if (data.substance_abuse === 'yes_spouse') {
            analysis.factors_favoring_you.push("Spouse's substance abuse issues");
            analysis.recommendations.push('Document evidence of substance abuse and its impact on children');
        } else if (data.substance_abuse === 'yes_me') {
            analysis.risk_factors.push('Your substance abuse - major custody concern');
            analysis.recommendations.push('Complete rehabilitation program and maintain documented sobriety');
        }

        // Special needs children
        if (data.special_needs_children === 'yes') {
            analysis.neutral_factors.push('Special needs children require stable, experienced primary caregiver');
            analysis.recommendations.push('Demonstrate your involvement in special needs care and education');
        }

        // Child preference
        if (data.child_preference_age === 'yes') {
            analysis.neutral_factors.push('Children old enough to express preferences (court will consider)');
            analysis.recommendations.push("Avoid pressuring children; court will interview them privately");
        }

        // Coparenting ability
        if (data.e_coparenting_ability) {
            const ability = parseFloat(data.e_coparenting_ability);
            if (ability >= 7) {
                analysis.factors_favoring_you.push('Strong coparenting ability');
            } else if (ability <= 4) {
                analysis.risk_factors.push('Low coparenting ability may favor primary custody for spouse');
                analysis.recommendations.push('Consider coparenting counseling to improve communication');
            }
        }

        // Current custody arrangement
        if (data.current_custody === 'you') {
            analysis.factors_favoring_you.push('Currently primary caregiver (status quo bias)');
        } else if (data.current_custody === 'spouse') {
            analysis.factors_favoring_spouse.push('Spouse currently primary caregiver');
            analysis.recommendations.push('Document your involvement and request temporary increased parenting time');
        }

        // Employment considerations
        if (data.employment_status === 'homemaker') {
            analysis.factors_favoring_you.push('Full-time availability for children');
        }
        if (data.spouse_employment_status === 'homemaker') {
            analysis.factors_favoring_spouse.push("Spouse's full-time availability for children");
        }

        return analysis;
    }

    /**
     * Calculate asset division with enhanced factors
     */
    function calculateAssetDivision(data) {
        const state = data.scenario_state;
        const isCommunityProperty = CONFIG.PROPERTY_STATES.COMMUNITY.includes(state);
        
        let yourShare = isCommunityProperty ? 50 : 50; // Start at baseline
        
        // Marital duration factor
        const years = parseInt(data.years_married) || 0;
        const durationFactor = years > 20 ? 5 : years > 10 ? 2 : 0;
        
        // Income disparity
        const totalIncome = parseFloat(data.your_income) + parseFloat(data.spouse_income);
        const yourIncomeRatio = parseFloat(data.your_income) / totalIncome;
        const incomeDisparityFactor = (yourIncomeRatio - 0.5) * 10;
        
        // NEW: Separate property adjustment
        if (data.has_separate_property === 'yes' && data.separate_property_value) {
            const separateValue = parseFloat(data.separate_property_value);
            // Separate property typically remains with original owner
            yourShare += 2;
        }
        
        // NEW: Fault-based adjustment
        if (data.fault_state === 'fault') {
            if (data.infidelity === 'yes_by_spouse') {
                yourShare += 5 * CONFIG.ASSET_WEIGHTS.FAULT_FACTOR * 100;
            } else if (data.infidelity === 'yes_by_me') {
                yourShare -= 5 * CONFIG.ASSET_WEIGHTS.FAULT_FACTOR * 100;
            }
        }
        
        // Custody impact on assets
        if (data.has_children === 'yes' && data.current_custody === 'you') {
            yourShare += 3 * CONFIG.ASSET_WEIGHTS.CUSTODY_FACTOR * 100;
        }
        
        // Apply factors
        if (!isCommunityProperty) {
            yourShare += durationFactor * CONFIG.ASSET_WEIGHTS.MARITAL_DURATION * 100;
            yourShare += incomeDisparityFactor * CONFIG.ASSET_WEIGHTS.INCOME_DISPARITY * 100;
        }
        
        // Calculate total marital assets
        let totalAssets = 0;
        if (data.owns_house === 'yes' && data.home_value) {
            totalAssets += parseFloat(data.home_value);
        }
        if (data.other_property === 'yes' && data.other_property_value) {
            totalAssets += parseFloat(data.other_property_value);
        }
        if (data.has_retirement === 'yes' && data.retirement_value) {
            totalAssets += parseFloat(data.retirement_value);
        }
        if (data.has_stock_options === 'yes' && data.stock_value) {
            totalAssets += parseFloat(data.stock_value);
        }
        
        // Subtract debt
        if (data.total_debt) {
            totalAssets -= parseFloat(data.total_debt);
        }
        
        // Normalize percentage
        yourShare = Math.max(30, Math.min(70, yourShare));
        const spouseShare = 100 - yourShare;
        
        return {
            your_percentage: yourShare,
            spouse_percentage: spouseShare,
            your_amount: totalAssets * (yourShare / 100),
            spouse_amount: totalAssets * (spouseShare / 100),
            total_assets: totalAssets,
            property_type: isCommunityProperty ? 'Community Property' : 'Equitable Distribution',
            confidence: calculateConfidence(data, 'assets')
        };
    }

    /**
     * Calculate retirement account division
     */
    function calculateRetirementDivision(data) {
        if (data.has_retirement !== 'yes' || !data.retirement_value) {
            return null;
        }

        const retirementValue = parseFloat(data.retirement_value);
        const years = parseInt(data.years_married) || 0;
        
        // Calculate marital portion (only portion accrued during marriage is divisible)
        // Assumption: retirement account grew linearly over marriage
        const maritalPortion = retirementValue * 0.9; // Assume 90% was during marriage
        
        const state = data.scenario_state;
        const isCommunityProperty = CONFIG.PROPERTY_STATES.COMMUNITY.includes(state);
        
        // Base division
        let yourShare = isCommunityProperty ? 50 : 50;
        
        // Adjust for factors
        if (years > 20) {
            yourShare += 2;
        }
        
        // Income disparity adjustment
        const totalIncome = parseFloat(data.your_income) + parseFloat(data.spouse_income);
        const yourIncomeRatio = parseFloat(data.your_income) / totalIncome;
        if (yourIncomeRatio < 0.4) {
            yourShare += 5; // Lower earner gets slightly more
        }
        
        yourShare = Math.max(40, Math.min(60, yourShare));
        
        return {
            total_value: retirementValue,
            marital_portion: maritalPortion,
            your_share_percent: yourShare,
            your_share_amount: maritalPortion * (yourShare / 100),
            spouse_share_percent: 100 - yourShare,
            spouse_share_amount: maritalPortion * ((100 - yourShare) / 100),
            qdro_required: true, // Qualified Domestic Relations Order
            confidence: 85
        };
    }

    /**
     * Calculate alimony likelihood and amount with enhanced factors
     */
    function calculateAlimony(data) {
        const years = parseInt(data.years_married) || 0;
        const yourIncome = parseFloat(data.your_income) || 0;
        const spouseIncome = parseFloat(data.spouse_income) || 0;
        
        // Short marriages (< 5 years) rarely get alimony
        if (years < 5) {
            return {
                likelihood: 15,
                estimated_amount: 0,
                duration_months: 0,
                type: 'unlikely',
                confidence: 70
            };
        }
        
        const incomeDifference = Math.abs(yourIncome - spouseIncome);
        const totalIncome = yourIncome + spouseIncome;
        const incomeRatio = incomeDifference / totalIncome;
        
        let likelihood = CONFIG.BAYESIAN_PRIORS.ALIMONY_AWARDED * 100;
        
        // Income disparity is the primary factor
        likelihood += incomeRatio * 60 * CONFIG.ALIMONY_WEIGHTS.INCOME_DISPARITY * 100;
        
        // Marriage duration factor
        if (years > 20) {
            likelihood += 15 * CONFIG.ALIMONY_WEIGHTS.MARRIAGE_DURATION * 100;
        } else if (years > 10) {
            likelihood += 10 * CONFIG.ALIMONY_WEIGHTS.MARRIAGE_DURATION * 100;
        }
        
        // Employment status
        if (data.employment_status === 'homemaker' || data.employment_status === 'unemployed') {
            likelihood += 15 * CONFIG.ALIMONY_WEIGHTS.EARNING_CAPACITY * 100;
        }
        
        // NEW: Fault factor (some states consider fault)
        if (data.fault_state === 'fault') {
            if (data.infidelity === 'yes_by_spouse' || data.domestic_violence === 'yes_against_me') {
                likelihood += 8 * CONFIG.ALIMONY_WEIGHTS.FAULT_FACTOR * 100;
            } else if (data.infidelity === 'yes_by_me' || data.domestic_violence === 'yes_by_me') {
                likelihood -= 8 * CONFIG.ALIMONY_WEIGHTS.FAULT_FACTOR * 100;
            }
        }
        
        likelihood = Math.max(0, Math.min(100, likelihood));
        
        // Calculate amount and duration
        let amount = 0;
        let durationMonths = 0;
        let type = 'none';
        
        if (likelihood > 50) {
            // Typical alimony is 30-40% of income difference
            amount = incomeDifference * 0.35 / 12; // Monthly amount
            
            // Duration based on marriage length
            if (years > 20) {
                type = 'permanent';
                durationMonths = 240; // 20 years (often until retirement)
            } else if (years > 10) {
                type = 'long-term';
                durationMonths = years * 12 * 0.5; // Half the marriage length
            } else {
                type = 'rehabilitative';
                durationMonths = years * 6; // Shorter term
            }
        }
        
        return {
            likelihood,
            estimated_amount: Math.round(amount),
            duration_months: Math.round(durationMonths),
            type,
            paying_party: yourIncome > spouseIncome ? 'you' : 'spouse',
            confidence: calculateConfidence(data, 'alimony')
        };
    }

    /**
     * Calculate child support with enhanced factors
     */
    function calculateChildSupport(data) {
        if (data.has_children !== 'yes') {
            return null;
        }

        const numChildren = parseInt(data.num_children) || 1;
        const yourIncome = parseFloat(data.your_income) || 0;
        const spouseIncome = parseFloat(data.spouse_income) || 0;
        const totalIncome = yourIncome + spouseIncome;
        
        // Basic child support calculation (simplified state guideline average)
        const basicPercent = numChildren === 1 ? 0.17 :
                           numChildren === 2 ? 0.25 :
                           numChildren === 3 ? 0.29 :
                           numChildren === 4 ? 0.31 : 0.35;
        
        let yourObligation = 0;
        let spouseObligation = 0;
        
        // Income shares model (most states)
        const yourIncomePercent = yourIncome / totalIncome;
        const spouseIncomePercent = spouseIncome / totalIncome;
        
        const totalSupport = totalIncome * basicPercent;
        yourObligation = totalSupport * yourIncomePercent;
        spouseObligation = totalSupport * spouseIncomePercent;
        
        // Adjust for custody percentage
        let custodyAdjustment = 0;
        if (data.current_custody === 'you') {
            // You have primary custody, spouse pays
            custodyAdjustment = -yourObligation * 0.8;
            spouseObligation += yourObligation * 0.8;
        } else if (data.current_custody === 'spouse') {
            // Spouse has primary custody, you pay
            custodyAdjustment = spouseObligation * 0.8;
            yourObligation += spouseObligation * 0.8;
        } else if (data.current_custody === 'joint') {
            // Shared custody reduces obligation
            custodyAdjustment = yourObligation * 0.3;
        }
        
        // NEW: Special needs adjustment
        let specialNeedsAdjustment = 0;
        if (data.special_needs_children === 'yes') {
            specialNeedsAdjustment = totalSupport * 0.25; // 25% increase for special needs
        }
        
        const netYourObligation = Math.max(0, yourObligation + custodyAdjustment + specialNeedsAdjustment);
        const netSpouseObligation = Math.max(0, spouseObligation - custodyAdjustment + specialNeedsAdjustment);
        
        return {
            your_obligation_monthly: Math.round(netYourObligation / 12),
            spouse_obligation_monthly: Math.round(netSpouseObligation / 12),
            net_payer: netYourObligation > netSpouseObligation ? 'you' : 'spouse',
            net_amount: Math.round(Math.abs(netYourObligation - netSpouseObligation) / 12),
            special_needs_adjustment: Math.round(specialNeedsAdjustment / 12),
            confidence: calculateConfidence(data, 'child_support')
        };
    }

    /**
     * NEW: Calculate mediation success likelihood
     */
    function calculateMediationSuccess(data) {
        let success = CONFIG.BAYESIAN_PRIORS.MEDIATION_SUCCESS * 100;
        const weights = CONFIG.MEDIATION_WEIGHTS;
        
        // Willingness factor
        if (data.mediation_willingness === 'yes_prefer') {
            success += 20 * weights.WILLINGNESS * 100;
        } else if (data.mediation_willingness === 'yes_willing') {
            success += 10 * weights.WILLINGNESS * 100;
        } else if (data.mediation_willingness === 'no') {
            success -= 25 * weights.WILLINGNESS * 100;
        }
        
        // Compromise ability
        if (data.e_compromise_willingness) {
            const compromise = parseFloat(data.e_compromise_willingness);
            success += ((compromise - 5) / 5) * 15 * weights.COMPROMISE_ABILITY * 100;
        }
        
        // Conflict level
        if (data.e_conflict_level) {
            const conflict = parseFloat(data.e_conflict_level);
            success -= ((conflict - 5) / 5) * 20 * weights.CONFLICT_LEVEL * 100;
        }
        
        // Attorney status
        if (data.attorney_status === 'both_have') {
            success += 10 * weights.ATTORNEY_STATUS * 100;
        } else if (data.attorney_status === 'neither') {
            success += 5 * weights.ATTORNEY_STATUS * 100;
        }
        
        // Domestic violence (major negative factor)
        if (data.domestic_violence && data.domestic_violence !== 'no') {
            success += 100 * weights.DOMESTIC_VIOLENCE; // Negative weight
        }
        
        // Substance abuse
        if (data.substance_abuse && data.substance_abuse !== 'no') {
            success += 100 * weights.SUBSTANCE_ABUSE; // Negative weight
        }
        
        success = Math.max(10, Math.min(95, success));
        
        return {
            likelihood: success,
            recommendation: success > 60 ? 'Highly recommended' :
                          success > 40 ? 'Worth attempting' :
                          'May be challenging',
            estimated_sessions: success > 60 ? '3-5 sessions' :
                               success > 40 ? '5-8 sessions' :
                               '8+ sessions or may not succeed',
            confidence: 75
        };
    }

    /**
     * NEW: Calculate settlement vs trial likelihood
     */
    function calculateSettlementLikelihood(data) {
        let settlement = CONFIG.BAYESIAN_PRIORS.SETTLEMENT_SUCCESS * 100;
        const weights = CONFIG.SETTLEMENT_WEIGHTS;
        
        // Compromise willingness
        if (data.e_compromise_willingness) {
            const compromise = parseFloat(data.e_compromise_willingness);
            settlement += ((compromise - 5) / 5) * 20 * weights.COMPROMISE_WILLINGNESS * 100;
        }
        
        // Attorney cooperation
        if (data.attorney_status === 'both_have') {
            settlement += 15 * weights.ATTORNEY_COOPERATION * 100;
        } else if (data.attorney_status === 'neither') {
            settlement += 10 * weights.ATTORNEY_COOPERATION * 100;
        }
        
        // Conflict level
        if (data.e_conflict_level) {
            const conflict = parseFloat(data.e_conflict_level);
            settlement -= ((conflict - 5) / 5) * 18 * weights.CONFLICT_LEVEL * 100;
        }
        
        // Asset complexity
        const hasComplexAssets = (data.has_retirement === 'yes' || 
                                 data.has_stock_options === 'yes' ||
                                 data.has_separate_property === 'yes');
        if (hasComplexAssets) {
            settlement -= 8 * weights.ASSET_COMPLEXITY * 100;
        }
        
        // Domestic violence
        if (data.domestic_violence && data.domestic_violence !== 'no') {
            settlement += 100 * weights.DOMESTIC_VIOLENCE; // Negative weight
        }
        
        // Mediation attempt
        if (data.mediation_willingness === 'yes_prefer' || data.mediation_willingness === 'yes_willing') {
            settlement += 12 * weights.MEDIATION_ATTEMPT * 100;
        }
        
        settlement = Math.max(20, Math.min(95, settlement));
        const trial = 100 - settlement;
        
        return {
            settlement_likelihood: settlement,
            trial_likelihood: trial,
            recommendation: settlement > 70 ? 'Settlement highly probable' :
                          settlement > 50 ? 'Settlement likely with negotiation' :
                          'Trial may be necessary',
            estimated_cost_settlement: CONFIG.AVERAGE_COSTS[data.scenario_state] || 15000,
            estimated_cost_trial: (CONFIG.AVERAGE_COSTS[data.scenario_state] || 15000) * 2.5,
            confidence: 70
        };
    }

    /**
     * Calculate divorce timeline estimation
     */
    function calculateTimeline(data) {
        const state = data.scenario_state;
        let baselineMonths = CONFIG.AVERAGE_TIMELINE[state] || 9;
        
        // Adjust for complexity
        if (data.has_children === 'yes') {
            baselineMonths += 2;
        }
        
        if (data.owns_house === 'yes' || data.other_property === 'yes') {
            baselineMonths += 1;
        }
        
        // NEW: Complex asset adjustments
        if (data.has_retirement === 'yes') {
            baselineMonths += 1;
        }
        if (data.has_stock_options === 'yes') {
            baselineMonths += 1;
        }
        
        // Conflict level adjustment
        if (data.e_conflict_level) {
            const conflict = parseFloat(data.e_conflict_level);
            if (conflict > 7) {
                baselineMonths += 3;
            } else if (conflict < 4) {
                baselineMonths -= 2;
            }
        }
        
        // Attorney status
        if (data.attorney_consulted === 'yes_retained') {
            baselineMonths -= 1;
        }
        
        // Mediation willingness
        if (data.mediation_willingness === 'yes_prefer') {
            baselineMonths -= 2;
        }
        
        baselineMonths = Math.max(3, baselineMonths);
        
        return {
            estimated_months: Math.round(baselineMonths),
            min_months: Math.round(baselineMonths * 0.7),
            max_months: Math.round(baselineMonths * 1.5),
            confidence: calculateConfidence(data, 'timeline')
        };
    }

    /**
     * Calculate estimated costs
     */
    function calculateCosts(data) {
        const state = data.scenario_state;
        let baseCost = CONFIG.AVERAGE_COSTS[state] || 15000;
        
        // Adjust for complexity
        if (data.has_children === 'yes') {
            baseCost *= 1.3;
        }
        
        if (data.owns_house === 'yes' || data.other_property === 'yes') {
            baseCost *= 1.2;
        }
        
        // NEW: Complex asset adjustments
        if (data.has_retirement === 'yes') {
            baseCost *= 1.15;
        }
        if (data.has_stock_options === 'yes') {
            baseCost *= 1.15;
        }
        
        // Conflict level adjustment
        if (data.e_conflict_level) {
            const conflict = parseFloat(data.e_conflict_level);
            if (conflict > 7) {
                baseCost *= 1.5;
            } else if (conflict < 4) {
                baseCost *= 0.8;
            }
        }
        
        // Attorney status
        if (data.attorney_consulted === 'yes_retained') {
            baseCost *= 1.1;
        }
        
        // Mediation vs trial
        const settlementAnalysis = calculateSettlementLikelihood(data);
        if (settlementAnalysis.trial_likelihood > 50) {
            baseCost *= 2.0;
        }
        
        return {
            estimated_total: Math.round(baseCost),
            min_cost: Math.round(baseCost * 0.6),
            max_cost: Math.round(baseCost * 1.8),
            breakdown: {
                attorney_fees: Math.round(baseCost * 0.7),
                court_costs: Math.round(baseCost * 0.15),
                expert_fees: Math.round(baseCost * 0.10),
                misc: Math.round(baseCost * 0.05)
            },
            confidence: calculateConfidence(data, 'costs')
        };
    }

    /**
     * Calculate confidence score
     */
    function calculateConfidence(data, category) {
        let confidence = 70; // Base confidence
        
        // More complete data = higher confidence
        const factualQuestions = Questionnaire.getFactualQuestions();
        const answeredCount = factualQuestions.filter(q => 
            data[q.key] !== undefined && data[q.key] !== null && data[q.key] !== ''
        ).length;
        
        const completeness = answeredCount / factualQuestions.length;
        confidence += completeness * 20;
        
        // Category-specific adjustments
        if (category === 'custody' && data.has_children === 'yes') {
            if (data.children_ages && data.current_custody) confidence += 5;
        }
        
        if (category === 'assets') {
            if (data.home_value && data.other_property_value) confidence += 5;
        }
        
        return Math.min(95, Math.round(confidence));
    }

    /**
     * Main prediction function - generates all outcomes
     */
    function predictOutcomes(data) {
        console.log('Generating Bayesian predictions...');
        
        const outcomes = {
            custody: calculateCustody(data),
            advanced_custody: calculateAdvancedCustody(data),
            asset_division: calculateAssetDivision(data),
            retirement_division: calculateRetirementDivision(data),
            alimony: calculateAlimony(data),
            child_support: calculateChildSupport(data),
            mediation: calculateMediationSuccess(data),
            settlement: calculateSettlementLikelihood(data),
            timeline: calculateTimeline(data),
            costs: calculateCosts(data),
            generated_at: new Date().toISOString()
        };
        
        console.log('✓ Predictions generated:', outcomes);
        return outcomes;
    }

    // Public API
    return {
        predictOutcomes,
        calculateCustody,
        calculateAdvancedCustody,
        calculateAssetDivision,
        calculateRetirementDivision,
        calculateAlimony,
        calculateChildSupport,
        calculateMediationSuccess,
        calculateSettlementLikelihood,
        calculateTimeline,
        calculateCosts
    };
})();

console.log('✓ Bayesian Engine module loaded');
