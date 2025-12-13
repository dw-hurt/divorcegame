/**
 * DIVORCE QUEST - Outcomes Display
 * Handles displaying predicted outcomes and documents
 */

const OutcomesDisplay = {
    currentPredictions: null,
    
    /**
     * Display outcomes on the outcome screen
     */
    displayOutcomes(predictions, scenario) {
        this.currentPredictions = predictions;
        const container = document.getElementById('outcome-container');
        
        let html = `
            <div class="outcome-section">
                <h3>⚖️ PREDICTION CONFIDENCE</h3>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: ${predictions.confidence * 100}%"></div>
                    <div class="probability-label">${Utils.formatPercentage(predictions.confidence)}</div>
                </div>
                <p class="npc-text">These predictions are based on statistical models and your specific situation.</p>
            </div>
        `;
        
        // Custody outcomes
        if (scenario.has_children && scenario.num_children > 0) {
            html += `
                <div class="outcome-section">
                    <h3>👨‍👩‍👧‍👦 CHILD CUSTODY PREDICTIONS</h3>
                    <div class="outcome-stat">
                        <span class="stat-label">Joint Custody:</span>
                        <span class="stat-value">${Utils.formatPercentage(predictions.custody.joint)}</span>
                    </div>
                    <div class="probability-bar">
                        <div class="probability-fill" style="width: ${predictions.custody.joint * 100}%"></div>
                    </div>
                    
                    <div class="outcome-stat">
                        <span class="stat-label">Primary Custody (Mother):</span>
                        <span class="stat-value">${Utils.formatPercentage(predictions.custody.mother)}</span>
                    </div>
                    <div class="probability-bar">
                        <div class="probability-fill" style="width: ${predictions.custody.mother * 100}%"></div>
                    </div>
                    
                    <div class="outcome-stat">
                        <span class="stat-label">Primary Custody (Father):</span>
                        <span class="stat-value">${Utils.formatPercentage(predictions.custody.father)}</span>
                    </div>
                    <div class="probability-bar">
                        <div class="probability-fill" style="width: ${predictions.custody.father * 100}%"></div>
                    </div>
                </div>
            `;
            
            // Child support
            if (predictions.childSupport.applicable) {
                const direction = predictions.childSupport.willReceive ? 'RECEIVE' : 'PAY';
                html += `
                    <div class="outcome-section">
                        <h3>💰 CHILD SUPPORT ESTIMATE</h3>
                        <div class="outcome-stat">
                            <span class="stat-label">You will likely ${direction}:</span>
                            <span class="stat-value">${Utils.formatCurrency(predictions.childSupport.estimatedMonthlyAmount)}/month</span>
                        </div>
                        <div class="outcome-stat">
                            <span class="stat-label">Based on children:</span>
                            <span class="stat-value">${predictions.childSupport.numberOfChildren}</span>
                        </div>
                        <p class="npc-text" style="font-size: 1rem; margin-top: 10px;">
                            Note: Actual child support calculations vary by state and consider many factors.
                        </p>
                    </div>
                `;
            }
        }
        
        // Asset division
        html += `
            <div class="outcome-section">
                <h3>🏠 ASSET DIVISION</h3>
                <div class="outcome-stat">
                    <span class="stat-label">Division Method:</span>
                    <span class="stat-value">${predictions.assets.method}</span>
                </div>
                <div class="outcome-stat">
                    <span class="stat-label">50/50 Split Probability:</span>
                    <span class="stat-value">${Utils.formatPercentage(predictions.assets.equalSplitProbability)}</span>
                </div>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: ${predictions.assets.equalSplitProbability * 100}%"></div>
                </div>
                
                <div class="outcome-stat">
                    <span class="stat-label">Net Marital Assets:</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.assets.estimatedAssets.equal * 2)}</span>
                </div>
                
                <div class="outcome-stat">
                    <span class="stat-label">Your Estimated Share (50/50):</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.assets.estimatedAssets.equal)}</span>
                </div>
                
                <div class="outcome-stat">
                    <span class="stat-label">Possible Range (Equitable):</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.assets.estimatedAssets.equitable.lower)} - ${Utils.formatCurrency(predictions.assets.estimatedAssets.equitable.higher)}</span>
                </div>
            </div>
        `;
        
        // Alimony
        html += `
            <div class="outcome-section">
                <h3>💵 ALIMONY (SPOUSAL SUPPORT)</h3>
                <div class="outcome-stat">
                    <span class="stat-label">Alimony Probability:</span>
                    <span class="stat-value">${Utils.formatPercentage(predictions.alimony.probability)}</span>
                </div>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: ${predictions.alimony.probability * 100}%"></div>
                </div>
        `;
        
        if (predictions.alimony.probability > 0.3) {
            const direction = predictions.alimony.willReceive ? 'RECEIVE' : 'PAY';
            html += `
                <div class="outcome-stat">
                    <span class="stat-label">You will likely ${direction}:</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.alimony.estimatedMonthlyAmount)}/month</span>
                </div>
                <div class="outcome-stat">
                    <span class="stat-label">Estimated Duration:</span>
                    <span class="stat-value">${predictions.alimony.estimatedDurationYears.toFixed(1)} years</span>
                </div>
                <div class="outcome-stat">
                    <span class="stat-label">Total Estimated Amount:</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.alimony.totalEstimatedAmount)}</span>
                </div>
            `;
        } else {
            html += `
                <p class="npc-text">Alimony is unlikely in your situation based on income levels and marriage duration.</p>
            `;
        }
        
        html += `</div>`;
        
        // Timeline
        html += `
            <div class="outcome-section">
                <h3>⏰ ESTIMATED TIMELINE</h3>
                <div class="outcome-stat">
                    <span class="stat-label">Estimated Duration:</span>
                    <span class="stat-value">${predictions.timeline.estimatedMonths} months (${predictions.timeline.estimatedDays} days)</span>
                </div>
                <p class="npc-text" style="font-size: 1rem; margin-top: 10px;">
                    Timeline factors: ${predictions.timeline.factors.hasChildren ? '✓ Children' : ''} 
                    ${predictions.timeline.factors.hasComplexAssets ? '✓ Complex Assets' : ''} 
                    ${predictions.timeline.factors.ownsHome ? '✓ Home Ownership' : ''}
                </p>
            </div>
        `;
        
        // Costs
        html += `
            <div class="outcome-section">
                <h3>💲 ESTIMATED COSTS</h3>
                <div class="outcome-stat">
                    <span class="stat-label">Filing Fee:</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.costs.filingFee)}</span>
                </div>
                <div class="outcome-stat">
                    <span class="stat-label">Attorney Fees (Uncontested):</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.costs.estimatedAttorneyFeesUncontested)}</span>
                </div>
                <div class="outcome-stat">
                    <span class="stat-label">Attorney Fees (Contested):</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.costs.estimatedAttorneyFeesContested)}</span>
                </div>
                <div class="outcome-stat">
                    <span class="stat-label">Total Cost Range:</span>
                    <span class="stat-value">${Utils.formatCurrency(predictions.costs.estimatedTotalLow)} - ${Utils.formatCurrency(predictions.costs.estimatedTotalHigh)}</span>
                </div>
                <p class="npc-text" style="font-size: 1rem; margin-top: 10px;">
                    Additional costs may include: Mediation (${Utils.formatCurrency(predictions.costs.additionalCosts.mediation)}),
                    Appraisals (${Utils.formatCurrency(predictions.costs.additionalCosts.appraisals)}),
                    Expert Witnesses (${Utils.formatCurrency(predictions.costs.additionalCosts.expertWitnesses)})
                </p>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    /**
     * Display required documents
     */
    async displayDocuments(stateCode, scenario) {
        const container = document.getElementById('documents-container');
        const stateNameElement = document.getElementById('doc-state-name');
        
        const stateName = Utils.getStateName(stateCode);
        stateNameElement.textContent = stateName;
        
        // Try to get state-specific data
        let stateData = null;
        try {
            stateData = await API.getStateData(stateCode);
        } catch (error) {
            console.error('Error loading state data:', error);
        }
        
        // Default documents
        let documents = this.getDefaultDocuments(scenario);
        
        // Override with state-specific documents if available
        if (stateData && stateData.documents_required) {
            try {
                const stateDocuments = JSON.parse(stateData.documents_required);
                if (stateDocuments && stateDocuments.length > 0) {
                    documents = stateDocuments;
                }
            } catch (error) {
                console.error('Error parsing state documents:', error);
            }
        }
        
        // Try to get additional documents from content database
        try {
            const contentResponse = await API.getContent({
                search: stateCode,
                limit: 50
            });
            
            if (contentResponse.data) {
                const additionalDocs = contentResponse.data
                    .filter(d => d.content_type === 'document' && d.state_specific === stateCode && d.active)
                    .map(d => ({
                        category: d.category || 'Additional Documents',
                        name: d.title,
                        description: d.content
                    }));
                
                if (additionalDocs.length > 0) {
                    documents = [...documents, ...additionalDocs];
                }
            }
        } catch (error) {
            console.error('Error loading additional documents:', error);
        }
        
        // Group documents by category
        const grouped = {};
        documents.forEach(doc => {
            if (!grouped[doc.category]) {
                grouped[doc.category] = [];
            }
            grouped[doc.category].push(doc);
        });
        
        // Render documents
        let html = '';
        Object.keys(grouped).forEach(category => {
            html += `
                <div class="document-category">
                    <h3>${category}</h3>
                    <ul class="document-list">
            `;
            
            grouped[category].forEach(doc => {
                html += `<li>${doc.name}${doc.description ? ' - ' + doc.description : ''}</li>`;
            });
            
            html += `
                    </ul>
                </div>
            `;
        });
        
        html += `
            <div class="dialogue-box mt-20">
                <p class="npc-text">
                    Remember, traveler: These are general documents. Your specific situation may require 
                    additional forms. Consult with a legal professional in ${stateName} for personalized guidance.
                </p>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    /**
     * Get default document list
     */
    getDefaultDocuments(scenario) {
        const documents = [
            { category: 'Initial Filing', name: 'Petition for Divorce/Dissolution' },
            { category: 'Initial Filing', name: 'Summons' },
            { category: 'Initial Filing', name: 'Civil Case Cover Sheet' },
            
            { category: 'Financial Disclosures', name: 'Income and Expense Declaration' },
            { category: 'Financial Disclosures', name: 'Schedule of Assets and Debts' },
            { category: 'Financial Disclosures', name: 'Property Declaration' },
            { category: 'Financial Disclosures', name: 'Last 2 years of tax returns' },
            { category: 'Financial Disclosures', name: 'Recent pay stubs (3-6 months)' },
            { category: 'Financial Disclosures', name: 'Bank statements (3-6 months)' },
            
            { category: 'Personal Documents', name: 'Marriage Certificate' },
            { category: 'Personal Documents', name: 'Proof of Residence' },
            { category: 'Personal Documents', name: 'Government-issued ID' }
        ];
        
        if (scenario.has_children && scenario.num_children > 0) {
            documents.push(
                { category: 'Child-Related', name: 'Birth Certificates of all children' },
                { category: 'Child-Related', name: 'Parenting Plan Proposal' },
                { category: 'Child-Related', name: 'Child Custody and Visitation Application' },
                { category: 'Child-Related', name: 'Child Support Worksheet' },
                { category: 'Child-Related', name: 'Declaration re: Child Custody' }
            );
        }
        
        if (scenario.owns_house) {
            documents.push(
                { category: 'Property Documents', name: 'Deed to real property' },
                { category: 'Property Documents', name: 'Mortgage statements' },
                { category: 'Property Documents', name: 'Property appraisal' }
            );
        }
        
        if (scenario.total_assets > 100000 || scenario.total_debts > 50000) {
            documents.push(
                { category: 'Complex Financial', name: 'Retirement account statements' },
                { category: 'Complex Financial', name: 'Investment account statements' },
                { category: 'Complex Financial', name: 'Business valuation (if applicable)' },
                { category: 'Complex Financial', name: 'Pension information' }
            );
        }
        
        documents.push(
            { category: 'Final Documents', name: 'Marital Settlement Agreement' },
            { category: 'Final Documents', name: 'Judgment of Dissolution' },
            { category: 'Final Documents', name: 'Notice of Entry of Judgment' }
        );
        
        return documents;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OutcomesDisplay;
}
