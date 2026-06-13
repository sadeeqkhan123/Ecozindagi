import { NextResponse } from 'next/server'
import { savePartnership } from '@/lib/store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, organization, type, location, message } = body

    if (!name?.trim() || !email?.trim() || !organization?.trim() || !location?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const validTypes = ['society', 'city', 'school', 'commercial', 'other']
    const entry = await savePartnership({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      organization: organization.trim(),
      type: validTypes.includes(type) ? type : 'other',
      location: location.trim(),
      message: message?.trim() || '',
    })

    return NextResponse.json({ success: true, id: entry.id })
  } catch {
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
  }
}
