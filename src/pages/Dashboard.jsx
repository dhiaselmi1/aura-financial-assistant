import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Landmark,
  Coins,
  Wallet,
  Home,
  Gem,
  Newspaper,
  ExternalLink,
  Clock,
  Flame,
  Scale,
  Twitter,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { RiskMeter } from '@/components/ui/RiskMeter'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import IntelligencePanel from '@/components/IntelligencePanel'

const portfolioData = [
  { month: 'Jan', value: 45000 },
  { month: 'Feb', value: 52000 },
  { month: 'Mar', value: 48000 },
  { month: 'Apr', value: 61000 },
  { month: 'May', value: 58000 },
  { month: 'Jun', value: 67000 },
]

// Asset Allocation Data
const assetAllocation = [
  { name: 'Stocks', value: 28500, percentage: 42.3, color: '#3b82f6' },
  { name: 'Real Estate', value: 18200, percentage: 27.0, color: '#8b5cf6' },
  { name: 'Liquid Cash', value: 9800, percentage: 14.5, color: '#22c55e' },
  { name: 'Gold & Precious Metals', value: 6500, percentage: 9.6, color: '#f59e0b' },
  { name: 'Crypto', value: 4420, percentage: 6.6, color: '#ec4899' },
]

// Stock Portfolio by Company
const stockPortfolio = [
  { company: 'Apple', ticker: 'AAPL', value: 8500, shares: 47, change: 2.4 },
  { company: 'Microsoft', ticker: 'MSFT', value: 7200, shares: 19, change: 1.8 },
  { company: 'Tesla', ticker: 'TSLA', value: 5800, shares: 24, change: -1.2 },
  { company: 'Amazon', ticker: 'AMZN', value: 4200, shares: 28, change: 3.1 },
  { company: 'Google', ticker: 'GOOGL', value: 2800, shares: 20, change: 0.9 },
]

// Physical Assets
const physicalAssets = [
  { type: 'Primary Residence', location: 'San Francisco, CA', value: 850000, icon: Home },
  { type: 'Rental Property', location: 'Austin, TX', value: 420000, icon: Building2 },
  { type: 'Land', location: 'Colorado', value: 180000, icon: Landmark },
  { type: 'Gold Bars', location: 'Secure Vault', value: 45000, icon: Gem },
  { type: 'Luxury Vehicle', location: 'Garage', value: 85000, icon: Activity },
]

// Liquid Assets
const liquidAssets = [
  { type: 'Savings Account', bank: 'Chase Bank', value: 45000, apy: 4.5 },
  { type: 'Money Market', bank: 'Vanguard', value: 28000, apy: 5.2 },
  { type: 'Emergency Fund', bank: 'Ally Bank', value: 15000, apy: 4.8 },
]

// Monthly comparison data
const monthlyComparison = [
  { month: 'Jan', stocks: 25000, realEstate: 17000, liquid: 8500, physical: 6000 },
  { month: 'Feb', stocks: 26500, realEstate: 17200, liquid: 9000, physical: 6200 },
  { month: 'Mar', stocks: 24800, realEstate: 17500, liquid: 8800, physical: 6100 },
  { month: 'Apr', stocks: 27200, realEstate: 17800, liquid: 9500, physical: 6300 },
  { month: 'May', stocks: 27800, realEstate: 18000, liquid: 9600, physical: 6400 },
  { month: 'Jun', stocks: 28500, realEstate: 18200, liquid: 9800, physical: 6500 },
]

// Financial News & Updates
const financialNews = [
  {
    id: 1,
    type: 'regulation',
    source: 'SEC',
    title: 'SEC Proposes New Crypto Regulation Framework',
    summary: 'New regulations require crypto exchanges to register as securities dealers by Q2 2025.',
    impact: 'High',
    time: '2 hours ago',
    trending: true,
    icon: Scale,
    sourceIcon: Globe,
    url: '#',
  },
  {
    id: 2,
    type: 'market',
    source: 'Bloomberg',
    title: 'Federal Reserve Signals Rate Cut in March',
    summary: 'Fed officials hint at potential 0.25% rate reduction following inflation data.',
    impact: 'High',
    time: '4 hours ago',
    trending: true,
    icon: TrendingUp,
    sourceIcon: Newspaper,
    url: '#',
  },
  {
    id: 3,
    type: 'social',
    source: 'Twitter',
    title: 'Tech Stocks Rally on AI Breakthrough',
    summary: '#AIStocks trending as major tech companies announce new AI partnerships.',
    impact: 'Medium',
    time: '6 hours ago',
    trending: true,
    icon: Flame,
    sourceIcon: Twitter,
    url: '#',
  },
  {
    id: 4,
    type: 'regulation',
    source: 'IRS',
    title: 'New Tax Rules for Digital Assets 2025',
    summary: 'IRS updates reporting requirements for cryptocurrency transactions above $10,000.',
    impact: 'Medium',
    time: '8 hours ago',
    trending: false,
    icon: Scale,
    sourceIcon: Globe,
    url: '#',
  },
  {
    id: 5,
    type: 'market',
    source: 'CNBC',
    title: 'Real Estate Market Shows Signs of Recovery',
    summary: 'Housing prices stabilize in major metro areas after 18-month decline.',
    impact: 'Low',
    time: '12 hours ago',
    trending: false,
    icon: Home,
    sourceIcon: Newspaper,
    url: '#',
  },
  {
    id: 6,
    type: 'social',
    source: 'Reddit',
    title: 'ESG Investing Gains Momentum Among Millennials',
    summary: 'r/investing discusses shift toward sustainable investment strategies.',
    impact: 'Low',
    time: '1 day ago',
    trending: false,
    icon: TrendingUp,
    sourceIcon: Globe,
    url: '#',
  },
]

const opportunities = [
  {
    id: 1,
    title: 'Tech Sector Growth',
    category: 'Stocks',
    potential: '+15.2%',
    risk: 'Medium',
    description: 'AI-driven companies showing strong Q2 performance',
  },
  {
    id: 2,
    title: 'Real Estate Investment',
    category: 'Real Estate',
    potential: '+8.5%',
    risk: 'Low',
    description: 'Emerging markets with stable growth patterns',
  },
  {
    id: 3,
    title: 'Crypto Diversification',
    category: 'Crypto',
    potential: '+22.8%',
    risk: 'High',
    description: 'DeFi protocols gaining institutional adoption',
  },
]

const recentActivity = [
  { action: 'Bought', asset: 'AAPL', amount: '$5,000', time: '2 hours ago', type: 'buy' },
  { action: 'Sold', asset: 'BTC', amount: '$3,200', time: '5 hours ago', type: 'sell' },
  { action: 'Alert', asset: 'Portfolio', amount: 'Risk detected', time: '1 day ago', type: 'alert' },
]

const stats = [
  {
    title: 'Total Portfolio',
    value: '$67,420',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Monthly Return',
    value: '+$9,420',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Active Investments',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: Activity,
  },
  {
    title: 'Risk Alerts',
    value: '3',
    change: '-1',
    trend: 'down',
    icon: AlertTriangle,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>Your investment performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={portfolioData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Score */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Your current risk profile</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <RiskMeter value={87} size="lg" label="Overall Score" />
              <div className="mt-6 space-y-2 w-full">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Financial Health</span>
                  <span className="font-medium text-green-500">Excellent</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Diversification</span>
                  <span className="font-medium text-green-500">Good</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Security Status</span>
                  <span className="font-medium text-yellow-500">Monitor</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Asset Allocation & Monthly Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Distribution of your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {assetAllocation.map((asset) => (
                  <div key={asset.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: asset.color }}
                    />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{asset.name}</p>
                      <p className="text-sm font-semibold">{formatCurrency(asset.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Asset Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Asset Growth Trends</CardTitle>
              <CardDescription>6-month performance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend />
                  <Bar dataKey="stocks" fill="#3b82f6" name="Stocks" />
                  <Bar dataKey="realEstate" fill="#8b5cf6" name="Real Estate" />
                  <Bar dataKey="liquid" fill="#22c55e" name="Liquid" />
                  <Bar dataKey="physical" fill="#f59e0b" name="Physical" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stock Portfolio Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Stock Portfolio by Company
            </CardTitle>
            <CardDescription>Your invested companies and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stockPortfolio.map((stock, index) => (
                <motion.div
                  key={stock.ticker}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-blue-500/10">
                        <Building2 className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{stock.company}</h4>
                        <p className="text-sm text-muted-foreground">{stock.ticker} • {stock.shares} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatCurrency(stock.value)}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {stock.change > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatPercentage(stock.change)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Physical Assets & Liquid Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Physical Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Physical Assets
              </CardTitle>
              <CardDescription>Real estate, land, gold, and valuables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {physicalAssets.map((asset, index) => (
                <motion.div
                  key={asset.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-violet-500/10">
                        <asset.icon className="w-5 h-5 text-violet-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{asset.type}</h4>
                        <p className="text-xs text-muted-foreground">{asset.location}</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm">{formatCurrency(asset.value)}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Liquid Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Liquid Assets
              </CardTitle>
              <CardDescription>Cash, savings, and money market accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {liquidAssets.map((asset, index) => (
                <motion.div
                  key={asset.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Coins className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{asset.type}</h4>
                        <p className="text-xs text-muted-foreground">{asset.bank}</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm">{formatCurrency(asset.value)}</p>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <span className="text-xs text-muted-foreground">APY</span>
                    <Badge variant="success" className="text-xs">{asset.apy}%</Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Intelligence Panel - Web Intelligence & Scoring Agents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <IntelligencePanel />
      </motion.div>

      {/* Financial News & Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  Financial News & Regulatory Updates
                </CardTitle>
                <CardDescription>
                  Latest news from social media, news sites, and regulatory changes
                </CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <Flame className="w-3 h-3" />
                {financialNews.filter(n => n.trending).length} Trending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                >
                  {news.trending && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="gap-1 text-xs">
                        <Flame className="w-3 h-3" />
                        Trending
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      news.type === 'regulation' ? 'bg-purple-500/10' :
                      news.type === 'market' ? 'bg-blue-500/10' :
                      'bg-orange-500/10'
                    }`}>
                      <news.icon className={`w-5 h-5 ${
                        news.type === 'regulation' ? 'text-purple-500' :
                        news.type === 'market' ? 'text-blue-500' :
                        'text-orange-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <news.sourceIcon className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {news.source}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{news.time}</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {news.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={
                            news.impact === 'High' ? 'destructive' : 
                            news.impact === 'Medium' ? 'warning' : 
                            'secondary'
                          }
                          className="text-xs"
                        >
                          {news.impact} Impact
                        </Badge>
                        <a 
                          href={news.url}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          Read more
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>AI Market Opportunities</CardTitle>
              <CardDescription>Personalized investment suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{opp.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {opp.description}
                      </p>
                    </div>
                    <Badge variant={opp.risk === 'Low' ? 'success' : opp.risk === 'Medium' ? 'warning' : 'destructive'}>
                      {opp.risk}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">{opp.category}</span>
                    <span className="text-sm font-semibold text-green-500">{opp.potential}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'buy' ? 'bg-green-500/10' :
                    activity.type === 'sell' ? 'bg-blue-500/10' :
                    'bg-yellow-500/10'
                  }`}>
                    {activity.type === 'buy' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : activity.type === 'sell' ? (
                      <TrendingDown className="w-5 h-5 text-blue-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.action} {activity.asset}</p>
                      <span className="text-sm font-semibold">{activity.amount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
