import axios from 'axios'

// Base URL for the Flask API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds timeout for long-running operations
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// ============================================
// Health Check
// ============================================

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health')
    return response.data
  } catch (error) {
    throw error
  }
}

// ============================================
// User Profile APIs
// ============================================

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile')
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.post('/user/profile', profileData)
    return response.data
  } catch (error) {
    throw error
  }
}

// ============================================
// Web Intelligence Agent APIs
// ============================================

/**
 * Run web intelligence analysis
 * @param {Object} options - Options for analysis
 * @param {Object} options.user_profile - Optional user profile override
 * @returns {Promise} Analysis results
 */
export const runWebIntelligence = async (options = {}) => {
  try {
    const response = await apiClient.post('/intelligence/analyze', options)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get latest web intelligence results
 * @returns {Promise} Analysis results
 */
export const getIntelligenceResults = async () => {
  try {
    const response = await apiClient.get('/intelligence/results')
    return response.data
  } catch (error) {
    throw error
  }
}

// ============================================
// Scoring Agent APIs
// ============================================

/**
 * Run scoring agent to filter results
 * @param {Object} options - Options for scoring
 * @param {Object} options.user_profile - Optional user profile override
 * @param {number} options.threshold - Score threshold (default: 1)
 * @returns {Promise} Filtered results
 */
export const runScoringAgent = async (options = {}) => {
  try {
    const response = await apiClient.post('/scoring/filter', options)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get latest scoring results
 * @returns {Promise} Scoring results
 */
export const getScoringResults = async () => {
  try {
    const response = await apiClient.get('/scoring/results')
    return response.data
  } catch (error) {
    throw error
  }
}

// ============================================
// Full Analysis (Combined)
// ============================================

/**
 * Run full analysis (web intelligence + scoring)
 * @param {Object} options - Options for analysis
 * @param {Object} options.user_profile - Optional user profile override
 * @param {number} options.threshold - Score threshold (default: 1)
 * @returns {Promise} Complete analysis results
 */
export const runFullAnalysis = async (options = {}) => {
  try {
    const response = await apiClient.post('/intelligence/full-analysis', options)
    return response.data
  } catch (error) {
    throw error
  }
}

// ============================================
// Personalized Content APIs
// ============================================

/**
 * Get personalized news based on user profile
 * @returns {Promise} Personalized news items
 */
export const getPersonalizedNews = async () => {
  try {
    const response = await apiClient.get('/news/personalized')
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get personalized investment opportunities
 * @returns {Promise} Personalized opportunities
 */
export const getPersonalizedOpportunities = async () => {
  try {
    const response = await apiClient.get('/opportunities/personalized')
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get personalized threats/risks
 * @returns {Promise} Personalized threats
 */
export const getPersonalizedThreats = async () => {
  try {
    const response = await apiClient.get('/threats/personalized')
    return response.data
  } catch (error) {
    throw error
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Check if API is available
 * @returns {Promise<boolean>}
 */
export const isApiAvailable = async () => {
  try {
    await checkHealth()
    return true
  } catch (error) {
    return false
  }
}

/**
 * Get all personalized content (news, opportunities, threats)
 * @returns {Promise} All personalized content
 */
export const getAllPersonalizedContent = async () => {
  try {
    const [news, opportunities, threats] = await Promise.all([
      getPersonalizedNews(),
      getPersonalizedOpportunities(),
      getPersonalizedThreats(),
    ])

    return {
      success: true,
      data: {
        news: news.data || [],
        opportunities: opportunities.data || [],
        threats: threats.data || [],
      },
    }
  } catch (error) {
    throw error
  }
}

export default {
  checkHealth,
  getUserProfile,
  updateUserProfile,
  runWebIntelligence,
  getIntelligenceResults,
  runScoringAgent,
  getScoringResults,
  runFullAnalysis,
  getPersonalizedNews,
  getPersonalizedOpportunities,
  getPersonalizedThreats,
  isApiAvailable,
  getAllPersonalizedContent,
}
