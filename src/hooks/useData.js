import { useState, useEffect } from 'react'
import mockData from '@/data/mockData.json'

/**
 * Custom hook to access mock data
 * Usage: const { user, portfolio, stockPortfolio } = useData()
 */
export const useData = () => {
  const [data, setData] = useState(mockData)

  return data
}

/**
 * Hook to get user data
 */
export const useUser = () => {
  return mockData.user
}

/**
 * Hook to get portfolio data
 */
export const usePortfolio = () => {
  return mockData.portfolio
}

/**
 * Hook to get asset allocation
 */
export const useAssetAllocation = () => {
  return mockData.assetAllocation
}

/**
 * Hook to get stock portfolio
 */
export const useStockPortfolio = () => {
  return mockData.stockPortfolio
}

/**
 * Hook to get physical assets
 */
export const usePhysicalAssets = () => {
  return mockData.physicalAssets
}

/**
 * Hook to get liquid assets
 */
export const useLiquidAssets = () => {
  return mockData.liquidAssets
}

/**
 * Hook to get crypto holdings
 */
export const useCryptoHoldings = () => {
  return mockData.cryptoHoldings
}

/**
 * Hook to get financial news
 */
export const useFinancialNews = () => {
  return mockData.financialNews
}

/**
 * Hook to get startup opportunities
 */
export const useStartupOpportunities = () => {
  return mockData.startupOpportunities
}

/**
 * Hook to get acquisition opportunities
 */
export const useAcquisitionOpportunities = () => {
  return mockData.acquisitionOpportunities
}

/**
 * Hook to get market opportunities
 */
export const useMarketOpportunities = () => {
  return mockData.marketOpportunities
}

/**
 * Hook to get recent activity
 */
export const useRecentActivity = () => {
  return mockData.recentActivity
}

/**
 * Hook to get notifications
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState(mockData.notifications)

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    markAsRead,
    unreadCount
  }
}

/**
 * Hook to get security events
 */
export const useSecurityEvents = () => {
  return mockData.securityEvents
}

/**
 * Hook to get experts
 */
export const useExperts = () => {
  return mockData.experts
}

/**
 * Hook to get AI insights
 */
export const useAIInsights = () => {
  return mockData.aiInsights
}

export default useData
