import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const investmentTypes = [
  { id: 'stocks', name: 'Stocks', avgReturn: 10, risk: 'Medium' },
  { id: 'crypto', name: 'Cryptocurrency', avgReturn: 25, risk: 'High' },
  { id: 'realestate', name: 'Real Estate', avgReturn: 8, risk: 'Low' },
  { id: 'bonds', name: 'Bonds', avgReturn: 5, risk: 'Very Low' },
]

const riskLevels = [
  { id: 'conservative', name: 'Conservative', multiplier: 0.7 },
  { id: 'moderate', name: 'Moderate', multiplier: 1.0 },
  { id: 'aggressive', name: 'Aggressive', multiplier: 1.3 },
]

export default function Simulator() {
  const [amount, setAmount] = useState(10000)
  const [duration, setDuration] = useState(5)
  const [selectedType, setSelectedType] = useState('stocks')
  const [riskLevel, setRiskLevel] = useState('moderate')
  const [simulationData, setSimulationData] = useState(null)

  const runSimulation = () => {
    const investment = investmentTypes.find(t => t.id === selectedType)
    const risk = riskLevels.find(r => r.id === riskLevel)
    
    const baseReturn = investment.avgReturn / 100
    const adjustedReturn = baseReturn * risk.multiplier
    
    const data = []
    let currentValue = amount
    
    for (let year = 0; year <= duration; year++) {
      const shortTermValue = currentValue * Math.pow(1 + adjustedReturn * 0.8, year)
      const longTermValue = currentValue * Math.pow(1 + adjustedReturn * 1.2, year)
      
      data.push({
        year: year,
        shortTerm: Math.round(shortTermValue),
        longTerm: Math.round(longTermValue),
        conservative: Math.round(currentValue * Math.pow(1 + adjustedReturn * 0.6, year)),
      })
    }
    
    setSimulationData(data)
  }

  const finalValue = simulationData ? simulationData[simulationData.length - 1].longTerm : 0
  const totalReturn = finalValue - amount
  const returnPercentage = ((totalReturn / amount) * 100).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">What-If Simulator</h1>
        <p className="text-muted-foreground">
          Simulate investment scenarios and compare outcomes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Simulation Parameters
              </CardTitle>
              <CardDescription>Configure your investment scenario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Initial Investment
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(amount)}
                </p>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Duration (Years)
                </label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  placeholder="Years"
                  min="1"
                  max="30"
                />
              </div>

              {/* Investment Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Investment Type
                </label>
                <div className="space-y-2">
                  {investmentTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedType === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{type.name}</span>
                        <Badge variant={
                          type.risk === 'Very Low' ? 'success' :
                          type.risk === 'Low' ? 'success' :
                          type.risk === 'Medium' ? 'warning' :
                          'destructive'
                        }>
                          {type.risk}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Avg. Return: {type.avgReturn}% annually
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Risk Preference
                </label>
                <div className="space-y-2">
                  {riskLevels.map((risk) => (
                    <div
                      key={risk.id}
                      onClick={() => setRiskLevel(risk.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        riskLevel === risk.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="font-medium">{risk.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={runSimulation} 
                className="w-full"
                size="lg"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          {simulationData ? (
            <>
              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Initial Investment</p>
                    <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Projected Value</p>
                    <p className="text-2xl font-bold text-green-500">{formatCurrency(finalValue)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Return</p>
                    <p className="text-2xl font-bold text-green-500">+{returnPercentage}%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Projection</CardTitle>
                  <CardDescription>
                    Comparing different scenarios over {duration} years
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#9ca3af"
                        label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        stroke="#9ca3af"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => formatCurrency(value)}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="conservative" 
                        stroke="#eab308" 
                        strokeWidth={2}
                        name="Conservative"
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="shortTerm" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Expected"
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="longTerm" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Optimistic"
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* AI Explanation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Investment Outlook
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Based on historical data and current market conditions, your{' '}
                      <span className="font-semibold text-foreground">
                        {investmentTypes.find(t => t.id === selectedType)?.name}
                      </span>{' '}
                      investment with a{' '}
                      <span className="font-semibold text-foreground">
                        {riskLevels.find(r => r.id === riskLevel)?.name.toLowerCase()}
                      </span>{' '}
                      risk profile shows promising potential.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Insights:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>
                          Your investment could grow to <strong className="text-foreground">{formatCurrency(finalValue)}</strong> in {duration} years
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>
                          Expected annual return: <strong className="text-foreground">
                            {((Math.pow(finalValue / amount, 1 / duration) - 1) * 100).toFixed(2)}%
                          </strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">⚠</span>
                        <span>
                          Market volatility may cause short-term fluctuations
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">ℹ</span>
                        <span>
                          Consider diversifying across multiple asset classes for better risk management
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-20">
                <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Simulate</h3>
                <p className="text-muted-foreground">
                  Configure your parameters and click "Run Simulation" to see projections
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
