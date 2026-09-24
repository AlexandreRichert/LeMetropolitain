import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getTotals } from '@/lib/billeterie'
import { createBooking, getBookings } from '@/lib/reservations'

async function requireSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function GET() {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const bookings = await getBookings(session.user.id)
  return NextResponse.json({ bookings })
}

export async function POST(request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()
  const { ticketLines, optionLines, visitors, total, hasError, isEmpty } = getTotals({
    tickets: body?.tickets ?? {},
    options: body?.options ?? {},
  })

  if (isEmpty || hasError) {
    return NextResponse.json({ error: 'invalid_cart' }, { status: 400 })
  }

  // Le total est recalculé côté serveur à partir des tarifs officiels,
  const items = [
    ...ticketLines.map(({ id, label, price, quantity, subtotal }) => ({
      id,
      label,
      kind: 'ticket',
      price,
      quantity,
      subtotal,
    })),
    ...optionLines.map(({ id, label, price, quantity, subtotal }) => ({
      id,
      label,
      kind: 'option',
      price,
      quantity,
      subtotal,
    })),
  ]

  const booking = await createBooking(session.user.id, {
    items,
    visitors,
    total,
  })
  return NextResponse.json({ booking })
}
