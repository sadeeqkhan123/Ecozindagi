import { NextRequest, NextResponse } from 'next/server'

const COUNTRY_NAMES: Record<string, string> = {
  PK: 'Pakistan',
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  AU: 'Australia',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  IN: 'India',
  DE: 'Germany',
  FR: 'France',
}

async function lookupCountryByIp(ip: string): Promise<string | null> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { countryCode?: string }
    return data.countryCode?.toUpperCase() ?? null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const fromVercel = request.headers.get('x-vercel-ip-country')
  const fromCloudflare = request.headers.get('cf-ipcountry')
  const headerCountry = (fromVercel || fromCloudflare)?.toUpperCase()

  if (headerCountry && headerCountry !== 'XX') {
    return NextResponse.json({
      countryCode: headerCountry,
      countryName: COUNTRY_NAMES[headerCountry] ?? headerCountry,
      source: 'header',
    })
  }

  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const ip = forwarded || realIp

  if (ip && ip !== '127.0.0.1' && ip !== '::1') {
    const lookedUp = await lookupCountryByIp(ip)
    if (lookedUp) {
      return NextResponse.json({
        countryCode: lookedUp,
        countryName: COUNTRY_NAMES[lookedUp] ?? lookedUp,
        source: 'ip',
      })
    }
  }

  return NextResponse.json({
    countryCode: 'PK',
    countryName: 'Pakistan',
    source: 'default',
  })
}
