import { NextResponse } from 'next/server'
import { searchArtworks } from '@/lib/museum'

export async function GET(request) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''

  if (query.length < 2) {
    return NextResponse.json({ total: 0, results: [] })
  }

  const matches = await searchArtworks({ q: query })

  const results = matches.slice(0, 6).map(({ id, title, artist, image }) => ({ id, title, artist, image }))

  return NextResponse.json(
    { total: matches.length, results },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}
