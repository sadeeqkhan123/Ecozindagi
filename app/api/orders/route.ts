import { NextResponse } from 'next/server'
import { saveOrder } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, total, customerNote } = body

    if (!Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
    }

    const entry = await saveOrder({
      items,
      total,
      customerNote: customerNote?.trim(),
    })

    return NextResponse.json({ success: true, id: entry.id })
  } catch {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
  }
}
