import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Calculator, 
  Users, 
  Shield, 
  User,
  Sparkles,
  ShoppingCart
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Market Analysis', href: '/app/market', icon: TrendingUp },
  { name: 'Buy/Sell Investments', href: '/app/investments', icon: ShoppingCart },
  { name: 'What-If Simulator', href: '/app/simulator', icon: Calculator },
  { name: 'Network', href: '/app/network', icon: Users },
  { name: 'Security Center', href: '/app/security', icon: Shield },
  { name: 'Profile', href: '/app/profile', icon: User },
]

export default function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            AURA
          </span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/app'}
                      className={({ isActive }) =>
                        cn(
                          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        )
                      }
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
