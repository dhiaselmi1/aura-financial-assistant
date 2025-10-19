import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Sparkles, MessageCircle, Star, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    avatar: '👩‍💼',
    expertise: 'Stock Market Analysis',
    specialties: ['Tech Stocks', 'Growth Investing', 'Portfolio Management'],
    trustScore: 98,
    experience: '15+ years',
    clients: 450,
    description: 'Former Goldman Sachs analyst specializing in tech sector investments and growth strategies.',
  },
  {
    id: 2,
    name: 'James Chen',
    avatar: '👨‍💻',
    expertise: 'Cryptocurrency Expert',
    specialties: ['DeFi', 'Blockchain', 'Crypto Trading'],
    trustScore: 95,
    experience: '8+ years',
    clients: 320,
    description: 'Early Bitcoin adopter and blockchain consultant with deep knowledge of crypto markets.',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    avatar: '👩‍🎓',
    expertise: 'Real Estate Investment',
    specialties: ['Commercial Property', 'REITs', 'Property Development'],
    trustScore: 97,
    experience: '12+ years',
    clients: 280,
    description: 'Real estate mogul with extensive experience in commercial and residential investments.',
  },
  {
    id: 4,
    name: 'David Park',
    avatar: '👨‍🏫',
    expertise: 'Retirement Planning',
    specialties: ['401k', 'IRA', 'Conservative Investing'],
    trustScore: 99,
    experience: '20+ years',
    clients: 520,
    description: 'Certified financial planner helping individuals secure their retirement futures.',
  },
  {
    id: 5,
    name: 'Emma Thompson',
    avatar: '👩‍💼',
    expertise: 'ESG & Sustainable Investing',
    specialties: ['Green Energy', 'Impact Investing', 'ESG Funds'],
    trustScore: 96,
    experience: '10+ years',
    clients: 380,
    description: 'Passionate about sustainable finance and helping investors make ethical choices.',
  },
  {
    id: 6,
    name: 'Michael Zhang',
    avatar: '👨‍💼',
    expertise: 'Options & Derivatives',
    specialties: ['Options Trading', 'Hedging', 'Risk Management'],
    trustScore: 94,
    experience: '11+ years',
    clients: 290,
    description: 'Options specialist with expertise in advanced trading strategies and risk mitigation.',
  },
]

export default function Network() {
  const [query, setQuery] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate AI search
    setTimeout(() => {
      // Simple keyword matching for demo
      const keywords = query.toLowerCase()
      const filtered = experts.filter(expert => 
        expert.expertise.toLowerCase().includes(keywords) ||
        expert.specialties.some(s => s.toLowerCase().includes(keywords)) ||
        expert.description.toLowerCase().includes(keywords)
      )
      setRecommendations(filtered.length > 0 ? filtered : experts.slice(0, 3))
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Expert Network</h1>
        <p className="text-muted-foreground">
          Connect with verified financial experts and mentors
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Find Your Perfect Mentor
          </CardTitle>
          <CardDescription>
            Describe your investment goals and we'll match you with the right experts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="e.g., I want to start investing in the stock market..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
            >
              {isSearching ? 'Searching...' : 'Find Experts'}
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick searches:</span>
            {['Stock Market', 'Cryptocurrency', 'Real Estate', 'Retirement'].map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  setQuery(tag)
                  setTimeout(handleSearch, 100)
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Recommended Experts ({recommendations.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/50 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-5xl">{expert.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                        <p className="text-sm text-primary font-medium mb-2">
                          {expert.expertise}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {expert.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {expert.clients} clients
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold">{expert.trustScore}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Trust Score</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {expert.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Experts */}
      {recommendations.length === 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Featured Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:border-primary/50 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-2">{expert.avatar}</div>
                      <h3 className="font-bold text-lg">{expert.name}</h3>
                      <p className="text-sm text-primary">{expert.expertise}</p>
                    </div>

                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{expert.trustScore}</span>
                      <span className="text-sm text-muted-foreground">/ 100</span>
                    </div>

                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {expert.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
