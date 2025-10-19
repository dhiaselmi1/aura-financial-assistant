import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, TrendingUp, Shield, X } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const notifications = [
  {
    id: 1,
    type: 'opportunity',
    icon: TrendingUp,
    title: 'New Market Opportunity',
    message: 'AI detected a 15% growth potential in Tech sector',
    time: '5 min ago',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    id: 2,
    type: 'risk',
    icon: AlertTriangle,
    title: 'Risk Alert',
    message: 'High volatility detected in your crypto portfolio',
    time: '1 hour ago',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    id: 3,
    type: 'security',
    icon: Shield,
    title: 'Suspicious Activity',
    message: 'Login attempt from new location detected',
    time: '2 hours ago',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
]

export default function NotificationPanel({ onClose }) {
  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 top-12 z-50 w-96"
        >
          <Card className="shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${notification.bg} h-fit`}>
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
