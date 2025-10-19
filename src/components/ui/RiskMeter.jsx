import { cn } from '@/lib/utils'

export function RiskMeter({ value, size = 'md', label = 'Risk Score' }) {
  const sizes = {
    sm: { container: 'w-24 h-24', text: 'text-xl' },
    md: { container: 'w-32 h-32', text: 'text-2xl' },
    lg: { container: 'w-40 h-40', text: 'text-3xl' },
  }

  const getColor = (val) => {
    if (val >= 80) return 'text-green-500'
    if (val >= 60) return 'text-yellow-500'
    if (val >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getStrokeColor = (val) => {
    if (val >= 80) return '#22c55e'
    if (val >= 60) return '#eab308'
    if (val >= 40) return '#f97316'
    return '#ef4444'
  }

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn('relative', sizes[size].container)}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/20"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={getStrokeColor(value)}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', sizes[size].text, getColor(value))}>
            {value}
          </span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
