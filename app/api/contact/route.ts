import { NextResponse } from 'next/server'
import { saveContact } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const entry = await saveContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
    })

    return NextResponse.json({ success: true, id: entry.id })
  } catch {
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 })
  }
}
