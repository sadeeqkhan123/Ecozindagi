export const WHATSAPP_NUMBER = '923359463244'
export const WHATSAPP_DISPLAY = '+92 335 9463244'
export const CONTACT_EMAIL = 'hello@ecozindagi.pk'
export const CONTACT_LOCATION = 'Alpha Techno Square - NASTP, Rawalpindi, Pakistan'
export const CONTACT_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Alpha+Techno+Square+NASTP+Rawalpindi+Pakistan'

export function whatsappUrl(message?: string): string {
  const text = message ?? 'Hi Eco Zindagi! I would like to know more about your products.'
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/ecozindagi',
  facebook: 'https://facebook.com/ecozindagi',
  instagram: 'https://instagram.com/ecozindagi',
  email: `mailto:${CONTACT_EMAIL}`,
} as const
