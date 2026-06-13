import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  createdAt: string
}

export interface OrderSubmission {
  id: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  customerNote?: string
  createdAt: string
}

export interface PartnershipInquiry {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  type: 'society' | 'city' | 'school' | 'commercial' | 'other'
  location: string
  message: string
  createdAt: string
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export async function saveContact(data: Omit<ContactSubmission, 'id' | 'createdAt'>) {
  const records = await readJson<ContactSubmission[]>('contacts.json', [])
  const entry: ContactSubmission = { ...data, id: newId(), createdAt: new Date().toISOString() }
  records.unshift(entry)
  await writeJson('contacts.json', records)
  return entry
}

export async function saveNewsletter(email: string) {
  const records = await readJson<NewsletterSubscriber[]>('newsletters.json', [])
  if (records.some((r) => r.email.toLowerCase() === email.toLowerCase())) {
    return { duplicate: true as const }
  }
  const entry: NewsletterSubscriber = { id: newId(), email, createdAt: new Date().toISOString() }
  records.unshift(entry)
  await writeJson('newsletters.json', records)
  return { duplicate: false as const, entry }
}

export async function saveOrder(data: Omit<OrderSubmission, 'id' | 'createdAt'>) {
  const records = await readJson<OrderSubmission[]>('orders.json', [])
  const entry: OrderSubmission = { ...data, id: newId(), createdAt: new Date().toISOString() }
  records.unshift(entry)
  await writeJson('orders.json', records)
  return entry
}

export async function savePartnership(data: Omit<PartnershipInquiry, 'id' | 'createdAt'>) {
  const records = await readJson<PartnershipInquiry[]>('partnerships.json', [])
  const entry: PartnershipInquiry = { ...data, id: newId(), createdAt: new Date().toISOString() }
  records.unshift(entry)
  await writeJson('partnerships.json', records)
  return entry
}

export async function getStats() {
  const [contacts, newsletters, orders, partnerships] = await Promise.all([
    readJson<ContactSubmission[]>('contacts.json', []),
    readJson<NewsletterSubscriber[]>('newsletters.json', []),
    readJson<OrderSubmission[]>('orders.json', []),
    readJson<PartnershipInquiry[]>('partnerships.json', []),
  ])
  return {
    contacts: contacts.length,
    newsletters: newsletters.length,
    orders: orders.length,
    partnerships: partnerships.length,
  }
}
