import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, TrendingDown, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const categories = ['All', 'Stocks', 'Crypto', 'Real Estate', 'Funds']

const marketData = [
  { time: '9:00', value: 42000 },
  { time: '10:00', value: 43200 },
  { time: '11:00', value: 42800 },
  { time: '12:00', value: 44500 },
  { time: '13:00', value: 45200 },
  { time: '14:00', value: 44800 },
  { time: '15:00', value: 46100 },
]

const assets = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    category: 'Stocks',
    price: 178.45,
    change: 2.34,
    risk: 'Low',
    potential: 'High',
    aiInsight: 'Strong buy signal based on Q2 earnings and market sentiment',
    tags: ['Tech', 'Blue Chip'],
  },
  {
    id: 2,
    name: 'Bitcoin',
    symbol: 'BTC',
    category: 'Crypto',
    price: 43250.00,
    change: -1.23,
    risk: 'High',
    potential: 'High',
    aiInsight: 'Volatility expected, consider dollar-cost averaging',
    tags: ['Crypto', 'Volatile'],
  },
  {
    id: 3,
    name: 'Vanguard 500',
    symbol: 'VOO',
    category: 'Funds',
    price: 412.30,
    change: 0.87,
    risk: 'Low',
    potential: 'Medium',
    aiInsight: 'Stable long-term growth, ideal for conservative portfolios',
    tags: ['Index Fund', 'Diversified'],
  },
  {
    id: 4,
    name: 'Ethereum',
    symbol: 'ETH',
    category: 'Crypto',
    price: 2280.50,
    change: 3.45,
    risk: 'High',
    potential: 'High',
    aiInsight: 'DeFi adoption increasing, watch for network upgrades',
    tags: ['Crypto', 'DeFi'],
  },
  {
    id: 5,
    name: 'Commercial REIT',
    symbol: 'VNQ',
    category: 'Real Estate',
    price: 89.75,
    change: 1.12,
    risk: 'Medium',
    potential: 'Medium',
    aiInsight: 'Recovery in commercial sector, dividend yield attractive',
    tags: ['Real Estate', 'Dividend'],
  },
  {
    id: 6,
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    category: 'Stocks',
    price: 242.80,
    change: -2.15,
    risk: 'High',
    potential: 'High',
    aiInsight: 'High volatility, wait for consolidation before entry',
    tags: ['Tech', 'EV', 'Growth'],
  },
]

export default function MarketAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Market Analysis</h1>
        <p className="text-muted-foreground">
          AI-powered insights across all markets
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search assets or sectors..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Market Trend</CardTitle>
            <CardDescription>Real-time market movement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{formatCurrency(asset.price)}</p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      {asset.change > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {formatPercentage(asset.change)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {asset.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Risk Level</span>
                    <Badge 
                      variant={asset.risk === 'Low' ? 'success' : asset.risk === 'Medium' ? 'warning' : 'destructive'}
                      className="ml-2"
                    >
                      {asset.risk}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Potential</span>
                    <Badge 
                      variant={asset.potential === 'High' ? 'success' : 'secondary'}
                      className="ml-2"
                    >
                      {asset.potential}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">AI Insight</p>
                      <p className="text-sm text-muted-foreground">{asset.aiInsight}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No assets found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
