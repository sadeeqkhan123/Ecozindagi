import Link from 'next/link'
import { cn } from '@/lib/utils'

type EzButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'ghost' | 'link'
  className?: string
  onClick?: () => void
}

const variants = {
  primary:
    'relative overflow-hidden rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:brightness-105 active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
  ghost:
    'rounded-xl border border-primary/25 bg-white/50 px-6 py-2.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:border-primary/40 hover:bg-white/70 hover:shadow-md hover:shadow-primary/10 active:scale-[0.98]',
  link:
    'group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80',
}

export function EzButton({ children, href, variant = 'primary', className, onClick }: EzButtonProps) {
  const classes = cn(variants[variant], className)

  if (variant === 'link' && href) {
    return (
      <Link href={href} className={classes}>
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-100 bg-primary transition-transform group-hover:scale-x-110" />
        </span>
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
