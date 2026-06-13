'use client'

import { useCurrency } from '@/lib/currency-context'
import { CURRENCIES } from '@/lib/currency'
import { cn } from '@/lib/utils'

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, countryCode, isLoading, setCurrency, selectableCurrencies } = useCurrency()

  if (isLoading) {
    return (
      <span className={cn('inline-flex h-9 items-center rounded-xl border border-primary/10 bg-white/40 px-2.5 text-[10px] text-muted-foreground', className)}>
        …
      </span>
    )
  }

  return (
    <label className={cn('relative inline-flex items-center', className)}>
      <span className="sr-only">Currency for {countryCode}</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="h-9 cursor-pointer appearance-none rounded-xl border border-primary/15 bg-white/50 pl-2.5 pr-7 text-[10px] font-bold uppercase tracking-wide text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-label={`Prices in ${CURRENCIES[currency].label}`}
      >
        {selectableCurrencies.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 h-3 w-3 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </label>
  )
}
