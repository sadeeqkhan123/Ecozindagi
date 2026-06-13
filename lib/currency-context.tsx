'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  COUNTRY_STORAGE_KEY,
  CURRENCY_STORAGE_KEY,
  CURRENCIES,
  type CurrencyCode,
  currencyForCountry,
  convertFromPKR,
  formatMoney,
  SELECTABLE_CURRENCIES,
} from '@/lib/currency'

interface CurrencyContextType {
  currency: CurrencyCode
  countryCode: string
  countryName: string
  isLoading: boolean
  formatPrice: (pkrAmount: number) => string
  convertPrice: (pkrAmount: number) => number
  setCurrency: (code: CurrencyCode) => void
  selectableCurrencies: CurrencyCode[]
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

async function detectCountryClient(): Promise<{ countryCode: string; countryName: string }> {
  try {
    const res = await fetch('/api/geo')
    if (res.ok) {
      const data = (await res.json()) as { countryCode: string; countryName: string; source: string }
      if (data.source !== 'default') {
        return { countryCode: data.countryCode, countryName: data.countryName }
      }
    }
  } catch {
    // fall through to client geo
  }

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
    if (res.ok) {
      const data = (await res.json()) as { country_code?: string; country_name?: string }
      if (data.country_code) {
        return {
          countryCode: data.country_code.toUpperCase(),
          countryName: data.country_name ?? data.country_code,
        }
      }
    }
  } catch {
    // use default
  }

  return { countryCode: 'PK', countryName: 'Pakistan' }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('PKR')
  const [countryCode, setCountryCode] = useState('PK')
  const [countryName, setCountryName] = useState('Pakistan')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function init() {
      const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode | null
      const savedCountry = localStorage.getItem(COUNTRY_STORAGE_KEY)

      const geo = await detectCountryClient()
      if (cancelled) return

      setCountryCode(savedCountry ?? geo.countryCode)
      setCountryName(geo.countryName)

      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrencyState(savedCurrency)
      } else {
        const auto = currencyForCountry(geo.countryCode)
        setCurrencyState(auto)
        localStorage.setItem(CURRENCY_STORAGE_KEY, auto)
      }

      if (!savedCountry) {
        localStorage.setItem(COUNTRY_STORAGE_KEY, geo.countryCode)
      }

      setIsLoading(false)
    }

    init()
    return () => {
      cancelled = true
    }
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code)
    localStorage.setItem(CURRENCY_STORAGE_KEY, code)
  }, [])

  const formatPrice = useCallback(
    (pkrAmount: number) => formatMoney(pkrAmount, currency),
    [currency]
  )

  const convertPrice = useCallback(
    (pkrAmount: number) => convertFromPKR(pkrAmount, currency),
    [currency]
  )

  const value = useMemo(
    () => ({
      currency,
      countryCode,
      countryName,
      isLoading,
      formatPrice,
      convertPrice,
      setCurrency,
      selectableCurrencies: SELECTABLE_CURRENCIES,
    }),
    [currency, countryCode, countryName, isLoading, formatPrice, convertPrice, setCurrency]
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
