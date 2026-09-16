import { SITE } from '@/lib/constants'
import { getAllArtworks } from '@/lib/museum'

export default async function sitemap() {
  const now = new Date()

  const pages = ['', '/oeuvres'].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))

  const all = await getAllArtworks()
  const artworks = all.map((artwork) => ({
    url: `${SITE.url}/oeuvres/${artwork.id}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...pages, ...artworks]
}
