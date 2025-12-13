/**
 * DIVORCE QUEST - Content Management System
 * Allows adding and editing game content
 */

const ContentManager = {
    currentTab: 'questions',
    
    /**
     * Initialize content management screen
     */
    async initialize() {
        const container = document.getElementById('content-editor-area');
        await this.loadTab(this.currentTab);
        
        // Setup tab listeners
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const tab = e.target.dataset.tab;
                await this.switchTab(tab);
            });
        });
    },
    
    /**
     * Switch between tabs
     */
    async switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });
        
        await this.loadTab(tab);
    },
    
    /**
     * Load tab content
     */
    async loadTab(tab) {
        const container = document.getElementById('content-editor-area');
        Utils.showLoading(container);
        
        switch(tab) {
            case 'questions':
                await this.loadQuestions();
                break;
            case 'dialogue':
                await this.loadDialogue();
                break;
            case 'state-data':
                await this.loadStateData();
                break;
            case 'documents':
                await this.loadDocuments();
                break;
        }
    },
    
    /**
     * Load questions content
     */
    async loadQuestions() {
        const container = document.getElementById('content-editor-area');
        
        try {
            const response = await API.getContent({
                search: 'question',
                limit: 100
            });
            
            let html = `
                <div class="content-actions mb-20">
                    <button class="retro-button" id="add-question-btn">➕ ADD NEW QUESTION</button>
                </div>
                <div id="questions-list">
            `;
            
            if (response.data && response.data.length > 0) {
                response.data.forEach(item => {
                    if (item.content_type === 'question') {
                        html += this.renderQuestionItem(item);
                    }
                });
            } else {
                html += '<p class="npc-text">No custom questions yet. Add your first question!</p>';
            }
            
            html += '</div>';
            container.innerHTML = html;
            
            // Setup event listeners
            this.setupQuestionListeners();
        } catch (error) {
            console.error('Error loading questions:', error);
            container.innerHTML = '<p class="text-error">Error loading questions.</p>';
        }
    },
    
    /**
     * Render question item
     */
    renderQuestionItem(item) {
        return `
            <div class="content-item" data-id="${item.id}">
                <h4>${item.title || 'Untitled Question'}</h4>
                <p>${item.content}</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    Category: ${item.category || 'N/A'} | Type: ${item.content_type}
                </p>
                <div class="content-actions">
                    <button class="small-btn edit-question-btn" data-id="${item.id}">EDIT</button>
                    <button class="small-btn delete delete-question-btn" data-id="${item.id}">DELETE</button>
                </div>
            </div>
        `;
    },
    
    /**
     * Setup question event listeners
     */
    setupQuestionListeners() {
        document.getElementById('add-question-btn')?.addEventListener('click', () => {
            this.showQuestionForm();
        });
        
        document.querySelectorAll('.edit-question-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await this.editQuestion(id);
            });
        });
        
        document.querySelectorAll('.delete-question-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (confirm('Delete this question?')) {
                    await this.deleteQuestion(id);
                }
            });
        });
    },
    
    /**
     * Show question form
     */
    showQuestionForm(existingData = null) {
        const container = document.getElementById('content-editor-area');
        
        const formData = existingData || {
            title: '',
            content: '',
            category: 'factual',
            metadata: '{}'
        };
        
        let html = `
            <div class="game-form">
                <div class="form-group">
                    <label>Question ID/Title:</label>
                    <input type="text" id="question-title" class="retro-input" value="${formData.title}" required>
                </div>
                <div class="form-group">
                    <label>Question Text:</label>
                    <textarea id="question-content" class="retro-textarea" required>${formData.content}</textarea>
                </div>
                <div class="form-group">
                    <label>Category:</label>
                    <select id="question-category" class="retro-select">
                        <option value="factual" ${formData.category === 'factual' ? 'selected' : ''}>Factual</option>
                        <option value="emotional" ${formData.category === 'emotional' ? 'selected' : ''}>Emotional</option>
                        <option value="validation" ${formData.category === 'validation' ? 'selected' : ''}>Validation</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Metadata (JSON):</label>
                    <textarea id="question-metadata" class="retro-textarea">${formData.metadata}</textarea>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 5px;">
                        Example: {"type": "scale", "min": 1, "max": 10, "npcIntro": "Welcome text..."}
                    </p>
                </div>
                <div class="button-container">
                    <button class="retro-button" id="save-question-btn">SAVE QUESTION</button>
                    <button class="retro-button secondary" id="cancel-question-btn">CANCEL</button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        document.getElementById('save-question-btn').addEventListener('click', async () => {
            const questionData = {
                title: document.getElementById('question-title').value,
                content: document.getElementById('question-content').value,
                category: document.getElementById('question-category').value,
                content_type: 'question',
                metadata: document.getElementById('question-metadata').value,
                active: true,
                sort_order: 0
            };
            
            try {
                if (existingData && existingData.id) {
                    await API.updateContent(existingData.id, questionData);
                } else {
                    questionData.id = Utils.generateId();
                    await API.createContent(questionData);
                }
                Utils.showNotification('Question saved!', 'success');
                await this.loadQuestions();
            } catch (error) {
                Utils.showNotification('Error saving question', 'error');
                console.error(error);
            }
        });
        
        document.getElementById('cancel-question-btn').addEventListener('click', () => {
            this.loadQuestions();
        });
    },
    
    /**
     * Edit existing question
     */
    async editQuestion(id) {
        try {
            const response = await API.get(`${CONFIG.API.CONTENT}/${id}`);
            this.showQuestionForm(response);
        } catch (error) {
            Utils.showNotification('Error loading question', 'error');
        }
    },
    
    /**
     * Delete question
     */
    async deleteQuestion(id) {
        try {
            await API.deleteContent(id);
            Utils.showNotification('Question deleted', 'success');
            await this.loadQuestions();
        } catch (error) {
            Utils.showNotification('Error deleting question', 'error');
        }
    },
    
    /**
     * Load dialogue content
     */
    async loadDialogue() {
        const container = document.getElementById('content-editor-area');
        container.innerHTML = `
            <div class="dialogue-box">
                <p class="npc-text">
                    Dialogue management coming soon! This will allow you to add custom NPC dialogue
                    and narrative text for different game scenarios.
                </p>
            </div>
        `;
    },
    
    /**
     * Load state data
     */
    async loadStateData() {
        const container = document.getElementById('content-editor-area');
        
        try {
            const response = await API.getAllStates();
            
            let html = `
                <div class="content-actions mb-20">
                    <button class="retro-button" id="add-state-btn">➕ ADD STATE DATA</button>
                </div>
                <p class="npc-text mb-20">
                    Configure state-specific divorce laws, average timelines, and statistical data.
                </p>
                <div id="states-list">
            `;
            
            if (response.data && response.data.length > 0) {
                response.data.forEach(state => {
                    html += `
                        <div class="content-item">
                            <h4>${state.state_name} (${state.state_code})</h4>
                            <p>Community Property: ${state.is_community_property ? 'Yes' : 'No'}</p>
                            <p>Avg. Duration: ${state.avg_divorce_duration_days || 'N/A'} days</p>
                            <p>Filing Fee: ${state.filing_fee ? Utils.formatCurrency(state.filing_fee) : 'N/A'}</p>
                            <div class="content-actions">
                                <button class="small-btn edit-state-btn" data-id="${state.id}">EDIT</button>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += '<p class="npc-text">No state data configured yet.</p>';
            }
            
            html += '</div>';
            container.innerHTML = html;
        } catch (error) {
            console.error('Error loading state data:', error);
            container.innerHTML = '<p class="text-error">Error loading state data.</p>';
        }
    },
    
    /**
     * Load documents
     */
    async loadDocuments() {
        const container = document.getElementById('content-editor-area');
        container.innerHTML = `
            <div class="dialogue-box">
                <p class="npc-text">
                    Document management coming soon! This will allow you to add state-specific
                    required documents and filing information.
                </p>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
}
