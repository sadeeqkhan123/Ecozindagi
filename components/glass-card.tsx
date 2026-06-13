import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ children, className, hover = false, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white/65 to-white/35 shadow-lg shadow-primary/8 backdrop-blur-xl',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-60',
        glow && 'ring-1 ring-primary/15',
        hover &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:from-white/75 hover:shadow-xl hover:shadow-primary/15',
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
