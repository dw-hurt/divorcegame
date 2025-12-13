/**
 * DIVORCE QUEST - API Module
 * Handles all API interactions with the RESTful Table API
 */

const API = {
    /**
     * Generic GET request
     */
    async get(endpoint, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `${endpoint}?${queryString}` : endpoint;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },
    
    /**
     * Generic POST request
     */
    async post(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },
    
    /**
     * Generic PUT request
     */
    async put(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },
    
    /**
     * Generic PATCH request
     */
    async patch(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API PATCH Error:', error);
            throw error;
        }
    },
    
    /**
     * Generic DELETE request
     */
    async delete(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE'
            });
            
            if (!response.ok && response.status !== 204) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.status === 204 ? null : await response.json();
        } catch (error) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    },
    
    // ============================================
    // GAME SESSIONS
    // ============================================
    
    async createSession(sessionData) {
        return await this.post(CONFIG.API.SESSIONS, sessionData);
    },
    
    async getSession(sessionId) {
        return await this.get(`${CONFIG.API.SESSIONS}/${sessionId}`);
    },
    
    async updateSession(sessionId, data) {
        return await this.patch(`${CONFIG.API.SESSIONS}/${sessionId}`, data);
    },
    
    async listSessions(params = {}) {
        return await this.get(CONFIG.API.SESSIONS, params);
    },
    
    // ============================================
    // SCENARIOS
    // ============================================
    
    async createScenario(scenarioData) {
        return await this.post(CONFIG.API.SCENARIOS, scenarioData);
    },
    
    async getScenario(scenarioId) {
        return await this.get(`${CONFIG.API.SCENARIOS}/${scenarioId}`);
    },
    
    async updateScenario(scenarioId, data) {
        return await this.patch(`${CONFIG.API.SCENARIOS}/${scenarioId}`, data);
    },
    
    async getScenariosBySession(sessionId, params = {}) {
        return await this.get(CONFIG.API.SCENARIOS, {
            search: sessionId,
            ...params
        });
    },
    
    async deleteScenario(scenarioId) {
        return await this.delete(`${CONFIG.API.SCENARIOS}/${scenarioId}`);
    },
    
    // ============================================
    // QUESTIONNAIRE RESPONSES
    // ============================================
    
    async saveResponse(responseData) {
        return await this.post(CONFIG.API.RESPONSES, responseData);
    },
    
    async getResponsesByScenario(scenarioId, params = {}) {
        return await this.get(CONFIG.API.RESPONSES, {
            search: scenarioId,
            ...params
        });
    },
    
    // ============================================
    // GAME CONTENT
    // ============================================
    
    async getContent(params = {}) {
        return await this.get(CONFIG.API.CONTENT, {
            limit: 100,
            ...params
        });
    },
    
    async getContentByType(contentType, params = {}) {
        return await this.get(CONFIG.API.CONTENT, {
            search: contentType,
            limit: 100,
            ...params
        });
    },
    
    async createContent(contentData) {
        return await this.post(CONFIG.API.CONTENT, contentData);
    },
    
    async updateContent(contentId, data) {
        return await this.patch(`${CONFIG.API.CONTENT}/${contentId}`, data);
    },
    
    async deleteContent(contentId) {
        return await this.delete(`${CONFIG.API.CONTENT}/${contentId}`);
    },
    
    // ============================================
    // STATE DATA
    // ============================================
    
    async getStateData(stateCode) {
        const result = await this.get(CONFIG.API.STATE_DATA, {
            search: stateCode,
            limit: 1
        });
        return result.data && result.data.length > 0 ? result.data[0] : null;
    },
    
    async getAllStates(params = {}) {
        return await this.get(CONFIG.API.STATE_DATA, {
            limit: 100,
            ...params
        });
    },
    
    async createStateData(stateData) {
        return await this.post(CONFIG.API.STATE_DATA, stateData);
    },
    
    async updateStateData(stateId, data) {
        return await this.patch(`${CONFIG.API.STATE_DATA}/${stateId}`, data);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
