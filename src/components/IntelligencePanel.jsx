import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2,
  TrendingUp,
  Shield,
  Newspaper,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useIntelligence, usePersonalizedContent } from '@/hooks/useIntelligence'

export default function IntelligencePanel() {
  const { runAnalysis, loading: analysisLoading, apiStatus, error: analysisError } = useIntelligence()
  const { content, loading: contentLoading, fetchContent } = usePersonalizedContent(true)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRunAnalysis = async () => {
    setErrorMessage('')
    setAnalysisComplete(false)
    try {
      await runAnalysis({ threshold: 1 })
      setAnalysisComplete(true)
      // Refresh content after analysis
      setTimeout(() => fetchContent(), 1000)
    } catch (error) {
      console.error('Analysis failed:', error)
      setErrorMessage(error.response?.data?.error || error.message || 'Analysis failed. Check backend logs.')
    }
  }

  const isLoading = analysisLoading || contentLoading

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-500" />
                AI Intelligence Agent
              </CardTitle>
              <CardDescription>
                Analyze web sources for personalized insights
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={apiStatus === 'available' ? 'success' : 'destructive'}
                className="gap-1"
              >
                {apiStatus === 'available' ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    API Ready
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" />
                    API Offline
                  </>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              onClick={handleRunAnalysis}
              disabled={isLoading || apiStatus !== 'available'}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={fetchContent}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-500 font-semibold">
                Analysis complete! Results updated below.
              </p>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-2"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-500 font-semibold mb-1">Analysis Failed</p>
                <p className="text-xs text-red-400">{errorMessage}</p>
                <p className="text-xs text-red-400 mt-2">Check the backend terminal for detailed error logs.</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personalized News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Newspaper className="w-5 h-5 text-blue-500" />
              News
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contentLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : content.news.length > 0 ? (
              <div className="space-y-3">
                {content.news.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {item.title || 'Untitled'}
                      </h4>
                      {item.score && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.score}
                        </Badge>
                      )}
                    </div>
                    {item.summary && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No news available. Run analysis to get personalized news.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contentLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : content.opportunities.length > 0 ? (
              <div className="space-y-3">
                {content.opportunities.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-green-500/30 bg-green-500/5 hover:border-green-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {item.title || 'Untitled'}
                      </h4>
                      {item.score && (
                        <Badge variant="success" className="ml-2 text-xs">
                          {item.score}
                        </Badge>
                      )}
                    </div>
                    {item.summary && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No opportunities found. Run analysis to discover opportunities.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Threats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-red-500" />
              Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contentLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : content.threats.length > 0 ? (
              <div className="space-y-3">
                {content.threats.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-red-500/30 bg-red-500/5 hover:border-red-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {item.title || 'Untitled'}
                      </h4>
                      {item.score && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          {item.score}
                        </Badge>
                      )}
                    </div>
                    {item.summary && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.summary}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No threats detected. Run analysis to identify potential risks.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
