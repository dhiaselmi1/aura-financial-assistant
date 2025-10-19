import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, DollarSign, Home, Car, Briefcase, Edit2, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'

const riskPreferences = ['Conservative', 'Moderate', 'Adventurous']

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    income: 85000,
    riskPreference: 'Moderate',
  })

  const [assets, setAssets] = useState([
    { id: 1, type: 'House', name: 'Primary Residence', value: 450000, icon: Home },
    { id: 2, type: 'Car', name: 'Tesla Model 3', value: 45000, icon: Car },
    { id: 3, type: 'Investment', name: 'Stock Portfolio', value: 67420, icon: Briefcase },
    { id: 4, type: 'Investment', name: 'Crypto Holdings', value: 23500, icon: DollarSign },
  ])

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0)

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? 'default' : 'outline'}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Annual Income</label>
                  <Input
                    type="number"
                    value={profile.income}
                    onChange={(e) => setProfile({ ...profile, income: Number(e.target.value) })}
                    disabled={!isEditing}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(profile.income)} per year
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Risk Preference</label>
                  <div className="flex gap-2">
                    {riskPreferences.map((pref) => (
                      <Button
                        key={pref}
                        variant={profile.riskPreference === pref ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => isEditing && setProfile({ ...profile, riskPreference: pref })}
                        disabled={!isEditing}
                        className="flex-1"
                      >
                        {pref}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Your total assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-600/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Total Assets</p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(totalAssets)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Annual Income</span>
                  <span className="font-semibold">{formatCurrency(profile.income)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk Profile</span>
                  <Badge variant={
                    profile.riskPreference === 'Conservative' ? 'secondary' :
                    profile.riskPreference === 'Moderate' ? 'warning' :
                    'destructive'
                  }>
                    {profile.riskPreference}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Assets</span>
                  <span className="font-semibold">{assets.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Assets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Assets</CardTitle>
                <CardDescription>Properties and investments you own</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Add Asset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <asset.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{asset.type}</p>
                        <h4 className="font-semibold">{asset.name}</h4>
                        <p className="text-lg font-bold text-primary mt-1">
                          {formatCurrency(asset.value)}
                        </p>
                      </div>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
