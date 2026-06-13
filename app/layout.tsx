import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { CurrencyProvider } from '@/lib/currency-context'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Eco Zindagi — Clean-Tech Zero-Waste for Pakistan',
  description:
    'Pakistan\'s green clean-tech startup. Smart bins, composting systems, and circular living products — segregate today, compost tomorrow, zero waste everyday.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/eco-zindagi-logo.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4CAF50',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light bg-background ${plusJakarta.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <CurrencyProvider>
          <CartProvider>
            {children}
            <WhatsAppButton />
          </CartProvider>
        </CurrencyProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
