import { NextResponse } from 'next/server'
import { products } from '@/lib/product-data'

export async function GET() {
  return NextResponse.json(products)
}
