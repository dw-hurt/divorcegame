/**
 * Divorce Quest - Outcomes Display Module
 * Enhanced visualization of Bayesian predictions
 * Version: 1.1.0 - Enhanced Edition
 */

const OutcomesDisplay = (function() {
    'use strict';

    /**
     * Display all outcomes on results screen
     */
    function displayOutcomes(outcomes, scenarioData) {
        const container = document.getElementById('results-container');
        if (!container) return;

        container.innerHTML = '';

        // Header with scenario info
        const header = createHeader(scenarioData);
        container.appendChild(header);

        // Display each prediction category
        if (outcomes.custody) {
            container.appendChild(createCustodyCard(outcomes.custody));
        }

        if (outcomes.advanced_custody) {
            container.appendChild(createAdvancedCustodyCard(outcomes.advanced_custody));
        }

        container.appendChild(createAssetCard(outcomes.asset_division));

        if (outcomes.retirement_division) {
            container.appendChild(createRetirementCard(outcomes.retirement_division));
        }

        if (outcomes.alimony) {
            container.appendChild(createAlimonyCard(outcomes.alimony));
        }

        if (outcomes.child_support) {
            container.appendChild(createChildSupportCard(outcomes.child_support));
        }

        if (outcomes.mediation) {
            container.appendChild(createMediationCard(outcomes.mediation));
        }

        if (outcomes.settlement) {
            container.appendChild(createSettlementCard(outcomes.settlement));
        }

        container.appendChild(createTimelineCard(outcomes.timeline));
        container.appendChild(createCostsCard(outcomes.costs));

        // Summary card
        container.appendChild(createSummaryCard(outcomes, scenarioData));
    }

    /**
     * Create header with scenario info
     */
    function createHeader(data) {
        const div = document.createElement('div');
        div.className = 'outcome-header';
        div.innerHTML = `
            <h3 class="pixel-subheading">Scenario Analysis for ${data.character_name}</h3>
            <div class="scenario-meta">
                <span><strong>State:</strong> ${CONFIG.STATE_NAMES[data.scenario_state]}</span>
                <span><strong>Gender:</strong> ${capitalizeFirst(data.character_gender)}</span>
                <span><strong>Years Married:</strong> ${data.years_married}</span>
                <span><strong>Children:</strong> ${data.has_children === 'yes' ? data.num_children : 'None'}</span>
            </div>
        `;
        return div;
    }

    /**
     * Create custody prediction card
     */
    function createCustodyCard(custody) {
        const card = createCard('👨‍👩‍👧 Child Custody Predictions', custody.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="stat-row">
                    <span class="stat-label">Primary Custody - Mother:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${custody.primary_mother}%"></div>
                        <span class="stat-value">${custody.primary_mother.toFixed(1)}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Primary Custody - Father:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${custody.primary_father}%"></div>
                        <span class="stat-value">${custody.primary_father.toFixed(1)}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Joint Custody (50/50):</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${custody.joint_custody}%"></div>
                        <span class="stat-value">${custody.joint_custody.toFixed(1)}%</span>
                    </div>
                </div>
            </div>
            <div class="outcome-interpretation">
                <strong>Most Likely Outcome:</strong> 
                ${getMostLikelyCustody(custody)}
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create advanced custody analysis card
     */
    function createAdvancedCustodyCard(analysis) {
        const card = createCard('⚖️ Advanced Custody Analysis', null, false);
        
        let content = '<div class="advanced-analysis">';
        
        // Factors favoring you
        if (analysis.factors_favoring_you.length > 0) {
            content += '<div class="analysis-section positive">';
            content += '<h4>✓ Factors in Your Favor:</h4><ul>';
            analysis.factors_favoring_you.forEach(factor => {
                content += `<li>${factor}</li>`;
            });
            content += '</ul></div>';
        }
        
        // Factors favoring spouse
        if (analysis.factors_favoring_spouse.length > 0) {
            content += '<div class="analysis-section negative">';
            content += '<h4>⚠ Factors Favoring Spouse:</h4><ul>';
            analysis.factors_favoring_spouse.forEach(factor => {
                content += `<li>${factor}</li>`;
            });
            content += '</ul></div>';
        }
        
        // Risk factors
        if (analysis.risk_factors.length > 0) {
            content += '<div class="analysis-section warning">';
            content += '<h4>🚨 Risk Factors:</h4><ul>';
            analysis.risk_factors.forEach(factor => {
                content += `<li>${factor}</li>`;
            });
            content += '</ul></div>';
        }
        
        // Neutral factors
        if (analysis.neutral_factors.length > 0) {
            content += '<div class="analysis-section neutral">';
            content += '<h4>ℹ️ Neutral Factors:</h4><ul>';
            analysis.neutral_factors.forEach(factor => {
                content += `<li>${factor}</li>`;
            });
            content += '</ul></div>';
        }
        
        // Recommendations
        if (analysis.recommendations.length > 0) {
            content += '<div class="analysis-section recommendations">';
            content += '<h4>💡 Recommendations:</h4><ul>';
            analysis.recommendations.forEach(rec => {
                content += `<li>${rec}</li>`;
            });
            content += '</ul></div>';
        }
        
        content += '</div>';
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create asset division card
     */
    function createAssetCard(assets) {
        const card = createCard('💰 Asset Division Prediction', assets.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="division-summary">
                    <div class="division-item">
                        <span class="division-label">Property Type:</span>
                        <span class="division-value">${assets.property_type}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Total Marital Assets:</span>
                        <span class="division-value">$${formatCurrency(assets.total_assets)}</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Your Expected Share:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${assets.your_percentage}%"></div>
                        <span class="stat-value">${assets.your_percentage.toFixed(1)}% ($${formatCurrency(assets.your_amount)})</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Spouse's Expected Share:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar secondary" style="width: ${assets.spouse_percentage}%"></div>
                        <span class="stat-value">${assets.spouse_percentage.toFixed(1)}% ($${formatCurrency(assets.spouse_amount)})</span>
                    </div>
                </div>
            </div>
            <div class="outcome-interpretation">
                <strong>Interpretation:</strong> Based on ${assets.property_type} state laws and your specific circumstances.
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create retirement division card
     */
    function createRetirementCard(retirement) {
        const card = createCard('🏦 Retirement Account Division', retirement.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="division-summary">
                    <div class="division-item">
                        <span class="division-label">Total Retirement Value:</span>
                        <span class="division-value">$${formatCurrency(retirement.total_value)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Marital Portion:</span>
                        <span class="division-value">$${formatCurrency(retirement.marital_portion)}</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Your Expected Share:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${retirement.your_share_percent}%"></div>
                        <span class="stat-value">${retirement.your_share_percent.toFixed(1)}% ($${formatCurrency(retirement.your_share_amount)})</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Spouse's Expected Share:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar secondary" style="width: ${retirement.spouse_share_percent}%"></div>
                        <span class="stat-value">${retirement.spouse_share_percent.toFixed(1)}% ($${formatCurrency(retirement.spouse_share_amount)})</span>
                    </div>
                </div>
            </div>
            <div class="outcome-interpretation">
                <strong>Note:</strong> ${retirement.qdro_required ? 'A Qualified Domestic Relations Order (QDRO) will be required to divide these accounts.' : 'Special documentation may be required.'}
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create alimony card
     */
    function createAlimonyCard(alimony) {
        const card = createCard('💵 Alimony/Spousal Support Prediction', alimony.confidence);
        
        let content = `
            <div class="outcome-stats">
                <div class="stat-row">
                    <span class="stat-label">Likelihood of Alimony:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${alimony.likelihood}%"></div>
                        <span class="stat-value">${alimony.likelihood.toFixed(1)}%</span>
                    </div>
                </div>
        `;
        
        if (alimony.likelihood > 50) {
            content += `
                <div class="division-summary">
                    <div class="division-item">
                        <span class="division-label">Type:</span>
                        <span class="division-value">${capitalizeFirst(alimony.type)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Estimated Monthly Amount:</span>
                        <span class="division-value">$${formatCurrency(alimony.estimated_amount)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Estimated Duration:</span>
                        <span class="division-value">${alimony.duration_months} months (${(alimony.duration_months / 12).toFixed(1)} years)</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Likely Paying Party:</span>
                        <span class="division-value">${alimony.paying_party === 'you' ? 'You' : 'Your Spouse'}</span>
                    </div>
                </div>
            `;
        } else {
            content += `
                <div class="outcome-interpretation">
                    Alimony appears unlikely in this scenario based on marriage duration and income factors.
                </div>
            `;
        }
        
        content += '</div>';
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create child support card
     */
    function createChildSupportCard(support) {
        const card = createCard('👶 Child Support Calculation', support.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="division-summary">
                    <div class="division-item">
                        <span class="division-label">Your Obligation (Monthly):</span>
                        <span class="division-value">$${formatCurrency(support.your_obligation_monthly)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Spouse's Obligation (Monthly):</span>
                        <span class="division-value">$${formatCurrency(support.spouse_obligation_monthly)}</span>
                    </div>
                    <div class="division-item highlight">
                        <span class="division-label">Net Payer:</span>
                        <span class="division-value">${support.net_payer === 'you' ? 'You' : 'Your Spouse'}</span>
                    </div>
                    <div class="division-item highlight">
                        <span class="division-label">Net Monthly Amount:</span>
                        <span class="division-value">$${formatCurrency(support.net_amount)}</span>
                    </div>
                    ${support.special_needs_adjustment > 0 ? `
                    <div class="division-item">
                        <span class="division-label">Special Needs Adjustment:</span>
                        <span class="division-value">+$${formatCurrency(support.special_needs_adjustment)}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            <div class="outcome-interpretation">
                <strong>Note:</strong> Calculated using income shares model. Actual amounts determined by state guidelines and custody arrangements.
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create mediation success card
     */
    function createMediationCard(mediation) {
        const card = createCard('🤝 Mediation Analysis', mediation.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="stat-row">
                    <span class="stat-label">Mediation Success Likelihood:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${mediation.likelihood}%"></div>
                        <span class="stat-value">${mediation.likelihood.toFixed(1)}%</span>
                    </div>
                </div>
                <div class="division-summary">
                    <div class="division-item">
                        <span class="division-label">Recommendation:</span>
                        <span class="division-value">${mediation.recommendation}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Estimated Sessions:</span>
                        <span class="division-value">${mediation.estimated_sessions}</span>
                    </div>
                </div>
            </div>
            <div class="outcome-interpretation">
                <strong>Analysis:</strong> ${getMediation Analysis(mediation.likelihood)}
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create settlement vs trial card
     */
    function createSettlementCard(settlement) {
        const card = createCard('⚖️ Settlement vs. Trial Prediction', settlement.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="stat-row">
                    <span class="stat-label">Settlement Likelihood:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${settlement.settlement_likelihood}%"></div>
                        <span class="stat-value">${settlement.settlement_likelihood.toFixed(1)}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Trial Likelihood:</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar warning" style="width: ${settlement.trial_likelihood}%"></div>
                        <span class="stat-value">${settlement.trial_likelihood.toFixed(1)}%</span>
                    </div>
                </div>
                <div class="division-summary">
                    <div class="division-item">
                        <span class="division-label">Recommendation:</span>
                        <span class="division-value">${settlement.recommendation}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Est. Cost if Settled:</span>
                        <span class="division-value">$${formatCurrency(settlement.estimated_cost_settlement)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Est. Cost if Trial:</span>
                        <span class="division-value">$${formatCurrency(settlement.estimated_cost_trial)}</span>
                    </div>
                    <div class="division-item highlight">
                        <span class="division-label">Potential Savings:</span>
                        <span class="division-value">$${formatCurrency(settlement.estimated_cost_trial - settlement.estimated_cost_settlement)}</span>
                    </div>
                </div>
            </div>
            <div class="outcome-interpretation">
                <strong>Note:</strong> Settlement typically saves significant time, money, and emotional stress compared to trial.
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create timeline card
     */
    function createTimelineCard(timeline) {
        const card = createCard('⏱️ Timeline Estimation', timeline.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="division-summary">
                    <div class="division-item highlight">
                        <span class="division-label">Estimated Timeline:</span>
                        <span class="division-value">${timeline.estimated_months} months</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Best Case:</span>
                        <span class="division-value">${timeline.min_months} months</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Worst Case:</span>
                        <span class="division-value">${timeline.max_months} months</span>
                    </div>
                </div>
            </div>
            <div class="outcome-interpretation">
                Timeline based on state averages, case complexity, and cooperation level.
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create costs card
     */
    function createCostsCard(costs) {
        const card = createCard('💵 Cost Estimation', costs.confidence);
        
        const content = `
            <div class="outcome-stats">
                <div class="division-summary">
                    <div class="division-item highlight">
                        <span class="division-label">Estimated Total Cost:</span>
                        <span class="division-value">$${formatCurrency(costs.estimated_total)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Best Case:</span>
                        <span class="division-value">$${formatCurrency(costs.min_cost)}</span>
                    </div>
                    <div class="division-item">
                        <span class="division-label">Worst Case:</span>
                        <span class="division-value">$${formatCurrency(costs.max_cost)}</span>
                    </div>
                </div>
                <h4>Cost Breakdown:</h4>
                <div class="cost-breakdown">
                    <div class="breakdown-item">
                        <span>Attorney Fees:</span>
                        <span>$${formatCurrency(costs.breakdown.attorney_fees)}</span>
                    </div>
                    <div class="breakdown-item">
                        <span>Court Costs:</span>
                        <span>$${formatCurrency(costs.breakdown.court_costs)}</span>
                    </div>
                    <div class="breakdown-item">
                        <span>Expert Fees:</span>
                        <span>$${formatCurrency(costs.breakdown.expert_fees)}</span>
                    </div>
                    <div class="breakdown-item">
                        <span>Miscellaneous:</span>
                        <span>$${formatCurrency(costs.breakdown.misc)}</span>
                    </div>
                </div>
            </div>
        `;
        
        card.querySelector('.outcome-content').innerHTML = content;
        return card;
    }

    /**
     * Create summary card
     */
    function createSummaryCard(outcomes, data) {
        const card = createCard('📋 Executive Summary', null, false);
        
        let summary = '<div class="executive-summary">';
        summary += '<p><strong>Key Predictions:</strong></p><ul>';
        
        if (outcomes.custody) {
            const likely = getMostLikelyCustody(outcomes.custody);
            summary += `<li><strong>Custody:</strong> ${likely}</li>`;
        }
        
        summary += `<li><strong>Asset Division:</strong> You: ${outcomes.asset_division.your_percentage.toFixed(0)}%, Spouse: ${outcomes.asset_division.spouse_percentage.toFixed(0)}%</li>`;
        
        if (outcomes.alimony && outcomes.alimony.likelihood > 50) {
            summary += `<li><strong>Alimony:</strong> ${outcomes.alimony.paying_party === 'you' ? 'You pay' : 'Spouse pays'} approximately $${formatCurrency(outcomes.alimony.estimated_amount)}/month</li>`;
        }
        
        if (outcomes.settlement) {
            summary += `<li><strong>Resolution:</strong> ${outcomes.settlement.settlement_likelihood.toFixed(0)}% chance of settlement</li>`;
        }
        
        summary += `<li><strong>Timeline:</strong> ${outcomes.timeline.estimated_months} months estimated</li>`;
        summary += `<li><strong>Cost:</strong> $${formatCurrency(outcomes.costs.estimated_total)} estimated</li>`;
        summary += '</ul>';
        
        summary += '<p class="disclaimer-small">⚠️ Remember: These are statistical projections only. Consult with qualified professionals for your specific case.</p>';
        summary += '</div>';
        
        card.querySelector('.outcome-content').innerHTML = summary;
        return card;
    }

    /**
     * Create outcome card template
     */
    function createCard(title, confidence = null, showConfidence = true) {
        const card = document.createElement('div');
        card.className = 'outcome-card';
        
        const header = document.createElement('div');
        header.className = 'outcome-header';
        
        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        header.appendChild(titleEl);
        
        if (showConfidence && confidence !== null) {
            const confidenceBadge = document.createElement('span');
            confidenceBadge.className = `confidence-badge ${getConfidenceClass(confidence)}`;
            confidenceBadge.textContent = `Confidence: ${confidence}%`;
            header.appendChild(confidenceBadge);
        }
        
        const content = document.createElement('div');
        content.className = 'outcome-content';
        
        card.appendChild(header);
        card.appendChild(content);
        
        return card;
    }

    /**
     * Helper functions
     */
    function getMostLikelyCustody(custody) {
        const max = Math.max(custody.primary_mother, custody.primary_father, custody.joint_custody);
        if (max === custody.joint_custody) {
            return 'Joint custody (50/50 split)';
        } else if (max === custody.primary_mother) {
            return 'Primary custody to mother';
        } else {
            return 'Primary custody to father';
        }
    }

    function getMediationAnalysis(likelihood) {
        if (likelihood > 70) {
            return 'Strong indicators for successful mediation. Both parties appear willing to compromise.';
        } else if (likelihood > 50) {
            return 'Moderate chance of success. Mediation worth attempting with proper preparation.';
        } else if (likelihood > 30) {
            return 'Challenging mediation likely. Consider with caution and be prepared for alternative dispute resolution.';
        } else {
            return 'Low likelihood of successful mediation. Traditional litigation may be necessary.';
        }
    }

    function getConfidenceClass(confidence) {
        if (confidence >= 80) return 'high';
        if (confidence >= 60) return 'medium';
        return 'low';
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    function capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Public API
    return {
        displayOutcomes
    };
})();

console.log('✓ Outcomes Display module loaded');
