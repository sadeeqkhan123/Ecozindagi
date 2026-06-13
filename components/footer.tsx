import Link from 'next/link'
import { Logo } from '@/components/logo'
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_MAPS_URL,
  WHATSAPP_DISPLAY,
  SOCIAL_LINKS,
  whatsappUrl,
} from '@/lib/contact'

const footerLinks = {
  products: [
    { label: 'BioLoop-60', href: '/shop/bioloop-60' },
    { label: 'Basic Zero-Waste Bin', href: '/shop/basic-zero-waste-bin' },
    { label: 'Eco Caddy Mini', href: '/shop/eco-caddy-mini' },
    { label: 'BrownBoost', href: '/shop/brownboost-2kg' },
  ],
  company: [
    { label: 'Our Team', href: '/team' },
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'Blog', href: '/blog' },
    { label: 'Impact', href: '/impact' },
    { label: 'Contact', href: '/contact' },
  ],
}

const manifesto = [
  'Segregate Today',
  'Compost Tomorrow',
  'Zero Waste Everyday',
  'Clean Home · Green Future',
]

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/70 transition-all hover:border-white/30 hover:bg-white/20 hover:text-white"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-primary/10 bg-gradient-to-b from-[#1a3d24] to-[#0f2618] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(74,124,68,0.25),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Manifesto bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-white/10 py-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-xs">
          {manifesto.map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              {i > 0 && <span className="hidden text-white/30 sm:inline">|</span>}
              {item}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <div className="mb-4 inline-block rounded-xl bg-white px-3 py-2">
              <Logo size="sm" link={false} />
            </div>
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-white/75">
              Pakistan&apos;s clean-tech startup building smart waste systems for homes, communities, and a greener tomorrow.
            </p>

            <div className="mb-4 flex gap-2">
              <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.facebook} label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.email} label="Email">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.instagram} label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
            </div>

            <p className="text-xs font-medium text-primary-foreground/60">
              Made with purpose in Pakistan 🇵🇰
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white/90">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-white/65">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/65">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-white/65">
              <a href={`mailto:${CONTACT_EMAIL}`} className="block transition-colors hover:text-white">
                {CONTACT_EMAIL}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-white"
              >
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={CONTACT_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-white"
              >
                {CONTACT_LOCATION}
              </a>
              <Link href="/team#interns" className="inline-block pt-2 text-primary-foreground/80 underline-offset-2 hover:underline">
                Join as intern →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} Eco Zindagi. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-white/45">
              <Link href="#" className="hover:text-white/70">Privacy</Link>
              <Link href="#" className="hover:text-white/70">Terms</Link>
              <Link href="#" className="hover:text-white/70">Shipping (PK)</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
