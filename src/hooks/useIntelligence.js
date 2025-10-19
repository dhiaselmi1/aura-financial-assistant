import { useState, useEffect, useCallback } from 'react'
import {
  runFullAnalysis,
  getPersonalizedNews,
  getPersonalizedOpportunities,
  getPersonalizedThreats,
  getAllPersonalizedContent,
  isApiAvailable,
} from '@/services/api'

/**
 * Hook for managing web intelligence and scoring
 */
export const useIntelligence = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)
  const [apiStatus, setApiStatus] = useState('unknown') // 'unknown', 'available', 'unavailable'

  // Check API availability on mount
  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    try {
      const available = await isApiAvailable()
      setApiStatus(available ? 'available' : 'unavailable')
    } catch (error) {
      setApiStatus('unavailable')
    }
  }

  const runAnalysis = useCallback(async (options = {}) => {
    setLoading(true)
    setError(null)

    try {
      const response = await runFullAnalysis(options)
      setResults(response.data)
      return response
    } catch (err) {
      setError(err.message || 'Failed to run analysis')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    results,
    apiStatus,
    runAnalysis,
    checkApiStatus,
  }
}

/**
 * Hook for fetching personalized news
 */
export const usePersonalizedNews = (autoFetch = false) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getPersonalizedNews()
      setNews(response.data || [])
      return response
    } catch (err) {
      setError(err.message || 'Failed to fetch news')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchNews()
    }
  }, [autoFetch, fetchNews])

  return {
    news,
    loading,
    error,
    fetchNews,
    refresh: fetchNews,
  }
}

/**
 * Hook for fetching personalized opportunities
 */
export const usePersonalizedOpportunities = (autoFetch = false) => {
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getPersonalizedOpportunities()
      setOpportunities(response.data || [])
      return response
    } catch (err) {
      setError(err.message || 'Failed to fetch opportunities')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchOpportunities()
    }
  }, [autoFetch, fetchOpportunities])

  return {
    opportunities,
    loading,
    error,
    fetchOpportunities,
    refresh: fetchOpportunities,
  }
}

/**
 * Hook for fetching personalized threats
 */
export const usePersonalizedThreats = (autoFetch = false) => {
  const [threats, setThreats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchThreats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getPersonalizedThreats()
      setThreats(response.data || [])
      return response
    } catch (err) {
      setError(err.message || 'Failed to fetch threats')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchThreats()
    }
  }, [autoFetch, fetchThreats])

  return {
    threats,
    loading,
    error,
    fetchThreats,
    refresh: fetchThreats,
  }
}

/**
 * Hook for fetching all personalized content at once
 */
export const usePersonalizedContent = (autoFetch = false) => {
  const [content, setContent] = useState({
    news: [],
    opportunities: [],
    threats: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getAllPersonalizedContent()
      setContent(response.data)
      return response
    } catch (err) {
      setError(err.message || 'Failed to fetch content')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchContent()
    }
  }, [autoFetch, fetchContent])

  return {
    content,
    news: content.news,
    opportunities: content.opportunities,
    threats: content.threats,
    loading,
    error,
    fetchContent,
    refresh: fetchContent,
  }
}

export default useIntelligence
