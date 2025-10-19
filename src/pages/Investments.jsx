import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart,
  Rocket,
  Building2,
  Bitcoin,
  Car,
  Home,
  Gem,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Info
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'

const investmentCategories = [
  { id: 'startups', name: 'Fund Startups', icon: Rocket, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'acquisitions', name: 'Acquire Companies', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 'realestate', name: 'Real Estate', icon: Home, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'vehicles', name: 'Luxury Vehicles', icon: Car, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'precious', name: 'Gold & Metals', icon: Gem, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
]

// Startup Investment Opportunities
const startupOpportunities = [
  {
    id: 1,
    name: 'NeuralTech AI',
    sector: 'Artificial Intelligence',
    stage: 'Series A',
    seeking: 2500000,
    valuation: 15000000,
    equity: 15,
    minInvestment: 50000,
    description: 'Revolutionary AI platform for enterprise automation and decision-making.',
    metrics: { revenue: '$1.2M ARR', growth: '+320% YoY', customers: 45 },
    team: 'Ex-Google, Stanford PhDs',
    highlight: true,
  },
  {
    id: 2,
    name: 'GreenEnergy Solutions',
    sector: 'Clean Energy',
    stage: 'Seed',
    seeking: 800000,
    valuation: 4000000,
    equity: 20,
    minInvestment: 25000,
    description: 'Solar panel technology with 40% higher efficiency than market standard.',
    metrics: { revenue: 'Pre-revenue', growth: 'Pilot phase', customers: 12 },
    team: 'MIT Engineers, Industry veterans',
    highlight: false,
  },
  {
    id: 3,
    name: 'HealthChain',
    sector: 'HealthTech',
    stage: 'Series B',
    seeking: 5000000,
    valuation: 35000000,
    equity: 12,
    minInvestment: 100000,
    description: 'Blockchain-based medical records platform serving 200+ hospitals.',
    metrics: { revenue: '$4.5M ARR', growth: '+180% YoY', customers: 215 },
    team: 'Healthcare + Blockchain experts',
    highlight: true,
  },
]

// Company Acquisition Opportunities
const acquisitionOpportunities = [
  {
    id: 1,
    name: 'TechFlow Industries',
    industry: 'SaaS',
    price: 12500000,
    revenue: 8200000,
    ebitda: 3100000,
    employees: 45,
    description: 'Established B2B software company with 500+ enterprise clients.',
    highlights: ['Recurring revenue model', 'Strong customer retention', 'Scalable infrastructure'],
    multiple: '4.0x Revenue',
    featured: true,
  },
  {
    id: 2,
    name: 'Urban Real Estate Portfolio',
    industry: 'Real Estate',
    price: 28000000,
    revenue: 4200000,
    ebitda: 2800000,
    employees: 12,
    description: '15 commercial properties in prime downtown locations.',
    highlights: ['100% occupancy rate', 'Long-term leases', 'Appreciation potential'],
    multiple: '10x EBITDA',
    featured: true,
  },
  {
    id: 3,
    name: 'Artisan Coffee Chain',
    industry: 'F&B',
    price: 3500000,
    revenue: 2100000,
    ebitda: 650000,
    employees: 28,
    description: '8 locations across major cities with loyal customer base.',
    highlights: ['Established brand', 'Prime locations', 'Growth potential'],
    multiple: '5.4x EBITDA',
    featured: false,
  },
]

// Other Investment Options
const otherInvestments = {
  crypto: [
    { name: 'Bitcoin', symbol: 'BTC', price: 43250, change: 2.4, available: true },
    { name: 'Ethereum', symbol: 'ETH', price: 2280, change: 3.2, available: true },
    { name: 'Solana', symbol: 'SOL', price: 98.5, change: -1.1, available: true },
  ],
  realestate: [
    { name: 'Downtown Penthouse', location: 'Manhattan, NY', price: 4500000, type: 'Residential' },
    { name: 'Commercial Office', location: 'San Francisco, CA', price: 8200000, type: 'Commercial' },
    { name: 'Beachfront Villa', location: 'Miami, FL', price: 3200000, type: 'Luxury' },
  ],
  vehicles: [
    { name: 'Lamborghini Aventador', year: 2024, price: 450000, condition: 'New' },
    { name: 'Tesla Model S Plaid', year: 2024, price: 135000, condition: 'New' },
    { name: 'Porsche 911 Turbo', year: 2023, price: 220000, condition: 'Certified Pre-owned' },
  ],
  precious: [
    { name: 'Gold Bars (1kg)', quantity: 10, price: 650000, purity: '99.99%' },
    { name: 'Silver Coins', quantity: 500, price: 15000, purity: '99.9%' },
    { name: 'Platinum Ingots', quantity: 5, price: 180000, purity: '99.95%' },
  ],
}

export default function Investments() {
  const [selectedCategory, setSelectedCategory] = useState('startups')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'invest', 'acquire', 'buy', 'sell', 'details'
  const [selectedItem, setSelectedItem] = useState(null)
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [offerAmount, setOfferAmount] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [successMessage, setSuccessMessage] = useState('')

  // Handle Investment in Startup
  const handleInvestStartup = (startup) => {
    setSelectedItem(startup)
    setModalType('invest')
    setShowModal(true)
  }

  // Handle Company Acquisition
  const handleAcquireCompany = (company) => {
    setSelectedItem(company)
    setModalType('acquire')
    setShowModal(true)
  }

  // Handle Buy/Sell Crypto, Real Estate, etc.
  const handleBuy = (item, category) => {
    setSelectedItem({ ...item, category })
    setModalType('buy')
    setShowModal(true)
  }

  const handleSell = (item, category) => {
    setSelectedItem({ ...item, category })
    setModalType('sell')
    setShowModal(true)
  }

  // Handle View Details
  const handleViewDetails = (item) => {
    setSelectedItem(item)
    setModalType('details')
    setShowModal(true)
  }

  // Confirm Transaction
  const handleConfirmTransaction = () => {
    let message = ''
    
    if (modalType === 'invest') {
      message = `Successfully invested ${formatCurrency(Number(investmentAmount))} in ${selectedItem.name}!`
    } else if (modalType === 'acquire') {
      message = `Offer of ${formatCurrency(Number(offerAmount))} submitted for ${selectedItem.name}!`
    } else if (modalType === 'buy') {
      message = `Successfully purchased ${selectedItem.name}!`
    } else if (modalType === 'sell') {
      message = `Successfully sold ${selectedItem.name}!`
    }
    
    setSuccessMessage(message)
    setShowModal(false)
    setInvestmentAmount('')
    setOfferAmount('')
    setQuantity(1)
    
    // Clear success message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000)
  }

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setInvestmentAmount('')
    setOfferAmount('')
    setQuantity(1)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p className="text-green-500 font-semibold">{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Buy & Sell Investments</h1>
        <p className="text-muted-foreground">
          Explore opportunities in startups, acquisitions, crypto, real estate, and more
        </p>
      </div>

      {/* Category Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {investmentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <category.icon className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
                <p className="text-sm font-semibold text-center">{category.name}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Startup Funding Section */}
      {selectedCategory === 'startups' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-purple-500" />
                    Fund Promising Startups
                  </CardTitle>
                  <CardDescription>
                    Invest in early-stage companies for equity ownership
                  </CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  {startupOpportunities.filter(s => s.highlight).length} Featured
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {startupOpportunities.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 ${
                    startup.highlight 
                      ? 'border-purple-500/50 bg-purple-500/5' 
                      : 'border-border'
                  }`}
                >
                  {startup.highlight && (
                    <Badge variant="default" className="mb-3 bg-purple-500">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured Opportunity
                    </Badge>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{startup.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <Badge variant="secondary">{startup.sector}</Badge>
                        <Badge variant="outline">{startup.stage}</Badge>
                        <span>• {startup.team}</span>
                      </div>
                      <p className="text-muted-foreground mb-4">{startup.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">Seeking</p>
                      <p className="text-lg font-bold">{formatCurrency(startup.seeking)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">Valuation</p>
                      <p className="text-lg font-bold">{formatCurrency(startup.valuation)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">Equity Offered</p>
                      <p className="text-lg font-bold">{startup.equity}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">Min. Investment</p>
                      <p className="text-lg font-bold">{formatCurrency(startup.minInvestment)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-semibold">{startup.metrics.revenue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-muted-foreground">Growth:</span>
                      <span className="font-semibold">{startup.metrics.growth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-muted-foreground">Customers:</span>
                      <span className="font-semibold">{startup.metrics.customers}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                      onClick={() => handleInvestStartup(startup)}
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Invest Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(startup)}
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Company Acquisitions Section */}
      {selectedCategory === 'acquisitions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-blue-500" />
                    Acquire Established Companies
                  </CardTitle>
                  <CardDescription>
                    Purchase profitable businesses and real estate portfolios
                  </CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <Target className="w-3 h-3" />
                  {acquisitionOpportunities.filter(a => a.featured).length} Featured
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {acquisitionOpportunities.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 ${
                    company.featured 
                      ? 'border-blue-500/50 bg-blue-500/5' 
                      : 'border-border'
                  }`}
                >
                  {company.featured && (
                    <Badge variant="default" className="mb-3 bg-blue-500">
                      <Target className="w-3 h-3 mr-1" />
                      Featured Acquisition
                    </Badge>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{company.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <Badge variant="secondary">{company.industry}</Badge>
                        <Badge variant="outline">{company.multiple}</Badge>
                        <span>• {company.employees} employees</span>
                      </div>
                      <p className="text-muted-foreground mb-4">{company.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">Asking Price</p>
                      <p className="text-xl font-bold text-blue-500">{formatCurrency(company.price)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">Annual Revenue</p>
                      <p className="text-lg font-bold">{formatCurrency(company.revenue)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <p className="text-xs text-muted-foreground mb-1">EBITDA</p>
                      <p className="text-lg font-bold">{formatCurrency(company.ebitda)}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Key Highlights:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {company.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleAcquireCompany(company)}
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      Make Offer
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(company)}
                    >
                      Request Due Diligence
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Cryptocurrency Section */}
      {selectedCategory === 'crypto' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="w-6 h-6 text-orange-500" />
                Cryptocurrency Trading
              </CardTitle>
              <CardDescription>Buy and sell digital assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {otherInvestments.crypto.map((crypto, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-orange-500/10">
                      <Bitcoin className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{crypto.name}</h4>
                      <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(crypto.price)}</p>
                    <div className="flex items-center gap-1 justify-end">
                      {crypto.change > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSell(crypto, 'crypto')}
                    >
                      Sell
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleBuy(crypto, 'crypto')}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Real Estate Section */}
      {selectedCategory === 'realestate' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-6 h-6 text-green-500" />
                Real Estate Properties
              </CardTitle>
              <CardDescription>Invest in residential and commercial properties</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherInvestments.realestate.map((property, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <Badge variant="secondary" className="mb-3">{property.type}</Badge>
                  <h4 className="font-semibold text-lg mb-1">{property.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{property.location}</p>
                  <p className="text-2xl font-bold text-green-500 mb-4">{formatCurrency(property.price)}</p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBuy(property, 'realestate')}
                    >
                      Purchase
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(property)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Vehicles Section */}
      {selectedCategory === 'vehicles' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-6 h-6 text-red-500" />
                Luxury Vehicles
              </CardTitle>
              <CardDescription>Invest in high-end automobiles</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherInvestments.vehicles.map((vehicle, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <Badge variant="secondary" className="mb-3">{vehicle.condition}</Badge>
                  <h4 className="font-semibold text-lg mb-1">{vehicle.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{vehicle.year}</p>
                  <p className="text-2xl font-bold text-red-500 mb-4">{formatCurrency(vehicle.price)}</p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBuy(vehicle, 'vehicles')}
                    >
                      Purchase
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(vehicle)}
                    >
                      Schedule Test Drive
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Precious Metals Section */}
      {selectedCategory === 'precious' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gem className="w-6 h-6 text-yellow-500" />
                Gold & Precious Metals
              </CardTitle>
              <CardDescription>Invest in physical gold, silver, and platinum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {otherInvestments.precious.map((metal, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-yellow-500/10">
                      <Gem className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{metal.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {metal.quantity} • Purity: {metal.purity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatCurrency(metal.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSell(metal, 'precious')}
                    >
                      Sell
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleBuy(metal, 'precious')}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Transaction Modal */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={handleCloseModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <Card className="w-full max-w-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {modalType === 'invest' && 'Invest in Startup'}
                      {modalType === 'acquire' && 'Make Acquisition Offer'}
                      {modalType === 'buy' && 'Purchase Investment'}
                      {modalType === 'sell' && 'Sell Investment'}
                      {modalType === 'details' && 'Investment Details'}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Investment Details */}
                  <div className="p-4 rounded-lg bg-accent/50">
                    <h3 className="font-bold text-lg mb-2">{selectedItem.name}</h3>
                    {selectedItem.description && (
                      <p className="text-sm text-muted-foreground mb-2">{selectedItem.description}</p>
                    )}
                    {selectedItem.price && (
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(selectedItem.price)}
                      </p>
                    )}
                    {selectedItem.valuation && (
                      <div className="mt-2 space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Valuation:</span> <span className="font-semibold">{formatCurrency(selectedItem.valuation)}</span></p>
                        <p><span className="text-muted-foreground">Equity:</span> <span className="font-semibold">{selectedItem.equity}%</span></p>
                        <p><span className="text-muted-foreground">Min Investment:</span> <span className="font-semibold">{formatCurrency(selectedItem.minInvestment)}</span></p>
                      </div>
                    )}
                  </div>

                  {/* Investment Amount Input for Startups */}
                  {modalType === 'invest' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Investment Amount
                      </label>
                      <Input
                        type="number"
                        placeholder={`Min: ${formatCurrency(selectedItem.minInvestment)}`}
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        min={selectedItem.minInvestment}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You will receive approximately {((Number(investmentAmount) / selectedItem.valuation) * 100).toFixed(2)}% equity
                      </p>
                    </div>
                  )}

                  {/* Offer Amount for Acquisitions */}
                  {modalType === 'acquire' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Your Offer Amount
                      </label>
                      <Input
                        type="number"
                        placeholder={`Asking: ${formatCurrency(selectedItem.price)}`}
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Asking price: {formatCurrency(selectedItem.price)}
                      </p>
                    </div>
                  )}

                  {/* Quantity for Buy/Sell */}
                  {(modalType === 'buy' || modalType === 'sell') && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min={1}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Total: {formatCurrency((selectedItem.price || 0) * quantity)}
                      </p>
                    </div>
                  )}

                  {/* Details View */}
                  {modalType === 'details' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-accent/30">
                        <Info className="w-5 h-5 text-primary mb-2" />
                        <p className="text-sm">
                          Detailed information and documentation will be provided after initial interest confirmation.
                        </p>
                      </div>
                      {selectedItem.metrics && (
                        <div className="space-y-2">
                          <p className="font-semibold">Key Metrics:</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div><span className="text-muted-foreground">Revenue:</span> {selectedItem.metrics.revenue}</div>
                            <div><span className="text-muted-foreground">Growth:</span> {selectedItem.metrics.growth}</div>
                            <div><span className="text-muted-foreground">Customers:</span> {selectedItem.metrics.customers}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    {modalType !== 'details' && (
                      <Button 
                        className="flex-1"
                        onClick={handleConfirmTransaction}
                        disabled={
                          (modalType === 'invest' && (!investmentAmount || Number(investmentAmount) < selectedItem.minInvestment)) ||
                          (modalType === 'acquire' && !offerAmount)
                        }
                      >
                        {modalType === 'invest' && 'Confirm Investment'}
                        {modalType === 'acquire' && 'Submit Offer'}
                        {modalType === 'buy' && 'Confirm Purchase'}
                        {modalType === 'sell' && 'Confirm Sale'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
