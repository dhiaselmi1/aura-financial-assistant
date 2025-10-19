import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone,
  MapPin,
  Clock,
  Activity,
  Key
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RiskMeter } from '@/components/ui/RiskMeter'

const securityAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'New Login Location',
    message: 'Login detected from New York, USA',
    time: '2 hours ago',
    severity: 'medium',
  },
  {
    id: 2,
    type: 'info',
    title: 'Password Changed',
    message: 'Your password was successfully updated',
    time: '1 day ago',
    severity: 'low',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Unusual Transaction',
    message: 'Large transaction detected: $15,000',
    time: '3 days ago',
    severity: 'high',
  },
]

const recentLogins = [
  {
    id: 1,
    location: 'San Francisco, CA',
    device: 'Chrome on MacBook Pro',
    time: '5 minutes ago',
    status: 'current',
  },
  {
    id: 2,
    location: 'New York, NY',
    device: 'Safari on iPhone 14',
    time: '2 hours ago',
    status: 'verified',
  },
  {
    id: 3,
    location: 'Los Angeles, CA',
    device: 'Chrome on Windows',
    time: '1 day ago',
    status: 'verified',
  },
]

const blockchainVerifications = [
  {
    id: 1,
    operation: 'Portfolio Sync',
    hash: '0x7f9f...3a2c',
    timestamp: '2024-01-15 14:32:10',
    status: 'verified',
  },
  {
    id: 2,
    operation: 'Transaction Record',
    hash: '0x4b2e...8d1f',
    timestamp: '2024-01-15 10:15:45',
    status: 'verified',
  },
  {
    id: 3,
    operation: 'Asset Update',
    hash: '0x9c5a...6f4b',
    timestamp: '2024-01-14 18:20:33',
    status: 'verified',
  },
]

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Security Center</h1>
        <p className="text-muted-foreground">
          Protect your financial data with advanced security features
        </p>
      </div>

      {/* Security Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Security Health</CardTitle>
              <CardDescription>Overall security status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <RiskMeter value={85} size="lg" label="Security Score" />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Your account is well protected
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Security Features</CardTitle>
              <CardDescription>Active protection measures</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">2FA Enabled</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication active
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Encryption</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  End-to-end data encryption
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Monitoring</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  24/7 threat detection active
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Blockchain</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Transaction verification enabled
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 2FA Setup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${twoFactorEnabled ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                  {twoFactorEnabled ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">
                    {twoFactorEnabled ? '2FA is Active' : '2FA is Disabled'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {twoFactorEnabled 
                      ? 'Your account is protected with two-factor authentication'
                      : 'Enable 2FA to secure your account'
                    }
                  </p>
                </div>
              </div>
              <Button 
                variant={twoFactorEnabled ? 'outline' : 'default'}
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Alerts
              </CardTitle>
              <CardDescription>Recent security events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg mt-0.5 ${
                        alert.severity === 'high' ? 'bg-red-500/10' :
                        alert.severity === 'medium' ? 'bg-yellow-500/10' :
                        'bg-blue-500/10'
                      }`}>
                        <AlertTriangle className={`w-4 h-4 ${
                          alert.severity === 'high' ? 'text-red-500' :
                          alert.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'warning' :
                      'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground ml-11">{alert.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Logins */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Recent Login Activity
              </CardTitle>
              <CardDescription>Your recent access history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLogins.map((login) => (
                <div
                  key={login.id}
                  className="p-4 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm">{login.location}</h4>
                        <p className="text-sm text-muted-foreground">{login.device}</p>
                      </div>
                    </div>
                    <Badge variant={login.status === 'current' ? 'default' : 'secondary'}>
                      {login.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-8">
                    <Clock className="w-3 h-3" />
                    {login.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Blockchain Verification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Blockchain Verification
            </CardTitle>
            <CardDescription>
              All operations are verified and recorded on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blockchainVerifications.map((verification) => (
                <div
                  key={verification.id}
                  className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{verification.operation}</h4>
                        <Badge variant="success" className="text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {verification.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        Hash: {verification.hash}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {verification.timestamp}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
