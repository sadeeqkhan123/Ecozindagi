import { NextResponse } from 'next/server'
import { saveNewsletter } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body.email?.trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const result = await saveNewsletter(email)

    if (result.duplicate) {
      return NextResponse.json({ success: true, duplicate: true })
    }

    return NextResponse.json({ success: true, id: result.entry.id })
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
