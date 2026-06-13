/** Base product prices in product-data.ts are stored in PKR */

export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED' | 'SAR' | 'INR'

export interface CurrencyConfig {
  code: CurrencyCode
  label: string
  symbol: string
  locale: string
  /** Multiply PKR amount by this to get local currency */
  rateFromPKR: number
  /** 0 = whole numbers, 2 = cents/pence */
  fractionDigits: number
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', label: 'Pakistani Rupee', symbol: 'Rs.', locale: 'en-PK', rateFromPKR: 1, fractionDigits: 0 },
  USD: { code: 'USD', label: 'US Dollar', symbol: '$', locale: 'en-US', rateFromPKR: 1 / 278, fractionDigits: 0 },
  GBP: { code: 'GBP', label: 'British Pound', symbol: '£', locale: 'en-GB', rateFromPKR: 1 / 355, fractionDigits: 0 },
  EUR: { code: 'EUR', label: 'Euro', symbol: '€', locale: 'de-DE', rateFromPKR: 1 / 300, fractionDigits: 0 },
  CAD: { code: 'CAD', label: 'Canadian Dollar', symbol: 'CA$', locale: 'en-CA', rateFromPKR: 1 / 205, fractionDigits: 0 },
  AUD: { code: 'AUD', label: 'Australian Dollar', symbol: 'A$', locale: 'en-AU', rateFromPKR: 1 / 185, fractionDigits: 0 },
  AED: { code: 'AED', label: 'UAE Dirham', symbol: 'AED', locale: 'en-AE', rateFromPKR: 1 / 76, fractionDigits: 0 },
  SAR: { code: 'SAR', label: 'Saudi Riyal', symbol: 'SAR', locale: 'ar-SA', rateFromPKR: 1 / 74, fractionDigits: 0 },
  INR: { code: 'INR', label: 'Indian Rupee', symbol: '₹', locale: 'en-IN', rateFromPKR: 1 / 3.33, fractionDigits: 0 },
}

const EU_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'NO', 'CH',
])

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  PK: 'PKR',
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  AE: 'AED',
  SA: 'SAR',
  IN: 'INR',
}

export const CURRENCY_STORAGE_KEY = 'ez-currency'
export const COUNTRY_STORAGE_KEY = 'ez-country'

export function currencyForCountry(countryCode: string): CurrencyCode {
  const code = countryCode.toUpperCase()
  if (COUNTRY_CURRENCY[code]) return COUNTRY_CURRENCY[code]
  if (EU_COUNTRIES.has(code)) return 'EUR'
  return 'USD'
}

export function convertFromPKR(pkrAmount: number, currency: CurrencyCode): number {
  const { rateFromPKR, fractionDigits } = CURRENCIES[currency]
  const converted = pkrAmount * rateFromPKR
  if (fractionDigits === 0) return Math.round(converted)
  const factor = 10 ** fractionDigits
  return Math.round(converted * factor) / factor
}

export function formatMoney(pkrAmount: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency]
  const amount = convertFromPKR(pkrAmount, currency)

  if (currency === 'PKR') {
    return `Rs. ${amount.toLocaleString('en-PK')}`
  }

  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      minimumFractionDigits: config.fractionDigits,
      maximumFractionDigits: config.fractionDigits,
    }).format(amount)
  } catch {
    return `${config.symbol}${amount.toLocaleString(config.locale)}`
  }
}

export const SELECTABLE_CURRENCIES: CurrencyCode[] = ['PKR', 'USD', 'GBP', 'EUR', 'CAD', 'AUD', 'AED', 'INR']
