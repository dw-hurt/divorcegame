/**
 * DIVORCE QUEST - Bayesian Modeling Engine
 * Implements Bayesian inference for divorce outcome predictions
 */

const BayesianEngine = {
    /**
     * Calculate custody probability based on scenario data
     */
    calculateCustodyProbabilities(scenarioData, stateData) {
        // Start with prior probabilities
        let probJoint = CONFIG.BAYESIAN.PRIOR_CUSTODY_JOINT;
        let probMother = CONFIG.BAYESIAN.PRIOR_CUSTODY_MOTHER;
        let probFather = CONFIG.BAYESIAN.PRIOR_CUSTODY_FATHER;
        
        // Adjust based on state preferences
        if (stateData && stateData.custody_default) {
            if (stateData.custody_default.includes('joint')) {
                probJoint *= 1.3;
            } else if (stateData.custody_default.includes('mother')) {
                probMother *= 1.2;
            }
        }
        
        // Adjust based on income disparity
        const incomeDisparity = Utils.calculateIncomeDisparity(
            scenarioData.annual_income || 0,
            scenarioData.spouse_income || 0
        );
        
        if (incomeDisparity > 2) {
            // Significant income disparity
            if (scenarioData.annual_income > scenarioData.spouse_income) {
                probJoint *= 0.9;
                probMother *= 1.1;
            } else {
                probJoint *= 0.9;
                probFather *= 1.2;
            }
        }
        
        // Adjust based on number of children
        if (scenarioData.num_children > 2) {
            probJoint *= 1.2;
        }
        
        // Adjust based on gender (historical trends)
        if (scenarioData.gender === 'female') {
            probMother *= 1.15;
            probFather *= 0.85;
        } else if (scenarioData.gender === 'male') {
            probFather *= 1.2;
            probMother *= 0.9;
        }
        
        // Normalize probabilities
        const total = probJoint + probMother + probFather;
        
        return {
            joint: probJoint / total,
            mother: probMother / total,
            father: probFather / total
        };
    },
    
    /**
     * Calculate asset division probability
     */
    calculateAssetDivision(scenarioData, stateData) {
        const isCommunityProperty = Utils.isCommunityPropertyState(scenarioData.state);
        
        let equitableSplit = !isCommunityProperty ? 0.7 : 0.3;
        let equalSplit = isCommunityProperty ? 0.7 : 0.3;
        
        // Adjust based on years married
        if (scenarioData.years_married > 10) {
            equalSplit *= 1.2;
            equitableSplit *= 0.8;
        }
        
        // Adjust based on income disparity
        const incomeDisparity = Utils.calculateIncomeDisparity(
            scenarioData.annual_income || 0,
            scenarioData.spouse_income || 0
        );
        
        if (incomeDisparity > 2) {
            equitableSplit *= 1.3;
            equalSplit *= 0.7;
        }
        
        // Normalize
        const total = equitableSplit + equalSplit;
        
        const totalAssets = scenarioData.total_assets || 0;
        const totalDebts = scenarioData.total_debts || 0;
        const netWorth = totalAssets - totalDebts;
        
        return {
            method: isCommunityProperty ? 'Community Property (50/50)' : 'Equitable Distribution',
            equalSplitProbability: equalSplit / total,
            equitableSplitProbability: equitableSplit / total,
            estimatedAssets: {
                equal: netWorth / 2,
                equitable: {
                    higher: netWorth * 0.6,
                    lower: netWorth * 0.4
                }
            }
        };
    },
    
    /**
     * Calculate alimony probability and amount
     */
    calculateAlimony(scenarioData, stateData) {
        let probAlimony = CONFIG.BAYESIAN.PRIOR_ALIMONY;
        
        // Adjust based on years married
        if (scenarioData.years_married < 5) {
            probAlimony *= 0.5;
        } else if (scenarioData.years_married > 10) {
            probAlimony *= 1.5;
        }
        
        // Adjust based on income disparity
        const incomeDisparity = Utils.calculateIncomeDisparity(
            scenarioData.annual_income || 0,
            scenarioData.spouse_income || 0
        );
        
        if (incomeDisparity > 2) {
            probAlimony *= 1.5;
        } else if (incomeDisparity < 1.2) {
            probAlimony *= 0.3;
        }
        
        // Cap probability
        probAlimony = Utils.clamp(probAlimony, 0, 0.85);
        
        // Estimate alimony amount
        const higherIncome = Math.max(scenarioData.annual_income || 0, scenarioData.spouse_income || 0);
        const lowerIncome = Math.min(scenarioData.annual_income || 0, scenarioData.spouse_income || 0);
        const incomeDiff = higherIncome - lowerIncome;
        
        // Typical alimony is 30-40% of income difference
        const estimatedMonthlyAlimony = (incomeDiff * 0.35) / 12;
        
        // Duration estimate (rough guideline: 1 year of alimony per 3 years of marriage)
        const estimatedDurationYears = Math.min(scenarioData.years_married / 3, 10);
        
        return {
            probability: probAlimony,
            estimatedMonthlyAmount: estimatedMonthlyAlimony,
            estimatedDurationYears: estimatedDurationYears,
            totalEstimatedAmount: estimatedMonthlyAlimony * 12 * estimatedDurationYears,
            willReceive: scenarioData.annual_income < scenarioData.spouse_income
        };
    },
    
    /**
     * Calculate child support estimates
     */
    calculateChildSupport(scenarioData, stateData) {
        if (!scenarioData.has_children || scenarioData.num_children === 0) {
            return {
                applicable: false,
                estimatedMonthlyAmount: 0
            };
        }
        
        // Simplified child support calculation
        // Actual calculations vary widely by state and use complex formulas
        const combinedIncome = (scenarioData.annual_income || 0) + (scenarioData.spouse_income || 0);
        const higherIncome = Math.max(scenarioData.annual_income || 0, scenarioData.spouse_income || 0);
        
        // Rough estimate: 20-25% of non-custodial parent's income for first child,
        // plus 5% for each additional child
        let percentage = 0.20 + (scenarioData.num_children - 1) * 0.05;
        percentage = Math.min(percentage, 0.40); // Cap at 40%
        
        const estimatedMonthly = (higherIncome * percentage) / 12;
        
        return {
            applicable: true,
            estimatedMonthlyAmount: estimatedMonthly,
            numberOfChildren: scenarioData.num_children,
            willReceive: scenarioData.annual_income < scenarioData.spouse_income,
            basedOnIncome: higherIncome
        };
    },
    
    /**
     * Calculate divorce timeline
     */
    calculateTimeline(scenarioData, stateData) {
        // Base duration
        let estimatedDays = 180; // 6 months average
        
        // Adjust based on state data
        if (stateData && stateData.avg_divorce_duration_days) {
            estimatedDays = stateData.avg_divorce_duration_days;
        }
        
        if (stateData && stateData.required_separation_days) {
            estimatedDays = Math.max(estimatedDays, stateData.required_separation_days);
        }
        
        // Adjust based on complexity
        if (scenarioData.has_children) {
            estimatedDays *= 1.3;
        }
        
        if (scenarioData.total_assets > 500000) {
            estimatedDays *= 1.2;
        }
        
        if (scenarioData.owns_house) {
            estimatedDays *= 1.1;
        }
        
        return {
            estimatedDays: Math.round(estimatedDays),
            estimatedMonths: Math.round(estimatedDays / 30),
            factors: {
                hasChildren: scenarioData.has_children,
                hasComplexAssets: scenarioData.total_assets > 500000,
                ownsHome: scenarioData.owns_house
            }
        };
    },
    
    /**
     * Calculate estimated costs
     */
    calculateCosts(scenarioData, stateData) {
        let filingFee = 300; // Default
        if (stateData && stateData.filing_fee) {
            filingFee = stateData.filing_fee;
        }
        
        // Attorney fees estimate
        let attorneyFees = 5000; // Base uncontested
        
        if (scenarioData.has_children) {
            attorneyFees += 3000;
        }
        
        if (scenarioData.total_assets > 500000) {
            attorneyFees += 5000;
        }
        
        if (scenarioData.owns_house) {
            attorneyFees += 2000;
        }
        
        // If contested (assume 30% chance of contest)
        const contestedFees = attorneyFees * 3;
        
        return {
            filingFee: filingFee,
            estimatedAttorneyFeesUncontested: attorneyFees,
            estimatedAttorneyFeesContested: contestedFees,
            estimatedTotalLow: filingFee + attorneyFees,
            estimatedTotalHigh: filingFee + contestedFees,
            additionalCosts: {
                mediation: 1500,
                appraisals: 500,
                expertWitnesses: 2000
            }
        };
    },
    
    /**
     * Main prediction function - generates all outcomes
     */
    async predictOutcomes(scenarioData) {
        // Get state data
        const stateData = await API.getStateData(scenarioData.state);
        
        // Calculate all predictions
        const predictions = {
            custody: this.calculateCustodyProbabilities(scenarioData, stateData),
            assets: this.calculateAssetDivision(scenarioData, stateData),
            alimony: this.calculateAlimony(scenarioData, stateData),
            childSupport: this.calculateChildSupport(scenarioData, stateData),
            timeline: this.calculateTimeline(scenarioData, stateData),
            costs: this.calculateCosts(scenarioData, stateData),
            stateData: stateData
        };
        
        // Calculate confidence score
        predictions.confidence = this.calculateConfidence(scenarioData);
        
        return predictions;
    },
    
    /**
     * Calculate confidence score for predictions
     */
    calculateConfidence(scenarioData) {
        let confidence = 0.5; // Base confidence
        
        // More complete data = higher confidence
        const fields = [
            'state', 'years_married', 'annual_income', 'spouse_income',
            'total_assets', 'total_debts', 'has_children'
        ];
        
        const completeness = fields.filter(field => 
            scenarioData[field] !== null && 
            scenarioData[field] !== undefined &&
            scenarioData[field] !== ''
        ).length / fields.length;
        
        confidence = 0.3 + (completeness * 0.5);
        
        return Utils.clamp(confidence, 0.3, 0.9);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BayesianEngine;
}
