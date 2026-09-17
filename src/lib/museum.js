/**
 * Porte d'entrée vers l'API Museum.
 *
 */

import { PERIODS } from './constants'

const BASE = 'https://api-museum.vercel.app'
const HOUR = 60 * 60
const DAY = 24 * HOUR

async function museumFetch(path, { revalidate = DAY } = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/** Forme unique manipulée par TOUS les composants du site. */
export function normalize(o) {
  if (!o?.slug) return null
  const image = o.image || null
  return {
    id: o.slug,
    title: o.title?.trim() || 'Œuvre sans titre',
    artist: o.artist?.trim() || 'Artiste anonyme',
    year: o.year ?? null,
    date: o.year != null ? String(o.year) : '',
    type: o.type || '',
    movement: o.movement || '',
    color: o.color || '',
    location: o.location || '',
    locationLink: o.locationLink || '',
    description: o.description || '',
    image,
    imageLarge: image,
    gallery: o.gallery ?? [],
  }
}

/** Toute la collection, une fois, mise en cache longtemps. */
export async function getAllArtworks() {
  const data = await museumFetch('/objects?limit=1000')
  return (data?.objects ?? []).map(normalize).filter(Boolean)
}

/** Une œuvre par slug. */
export async function getArtwork(slug) {
  const data = await museumFetch(`/objects/${slug}`)
  return normalize(data)
}

/** Plusieurs œuvres en parallèle (les null sont filtrés). */
export async function getArtworks(slugs = []) {
  const list = await Promise.all(slugs.map((slug) => getArtwork(slug)))
  return list.filter(Boolean)
}

/** Les mouvements présents dans la collection, pour le filtre. */
export async function getMovements() {
  const all = await getAllArtworks()
  const movements = [...new Set(all.map((a) => a.movement).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr'))
  return movements.map((m) => ({ id: m, name: m }))
}

/** Les techniques (type) présentes dans la collection, pour le filtre. */
export async function getTypes() {
  const all = await getAllArtworks()
  const types = [...new Set(all.map((a) => a.type).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr'))
  return types.map((t) => ({ id: t, name: t }))
}

/**
 * Filtre une liste d'œuvres déjà en mémoire selon les mêmes critères que <ArtworkFilters>
 */
export function filterArtworks(artworks, { query = '', movementValue = '', typeValue = '', periodValue = '' } = {}) {
  const q = query.trim().toLowerCase()
  const period = PERIODS.find((p) => p.value === periodValue)

  return artworks.filter((a) => {
    if (q && !`${a.title} ${a.artist}`.toLowerCase().includes(q)) return false
    if (movementValue && a.movement !== movementValue) return false
    if (typeValue && a.type !== typeValue) return false
    if (period?.dateBegin != null && period?.dateEnd != null && (a.year < period.dateBegin || a.year > period.dateEnd))
      return false
    return true
  })
}

/**
 *
 * Retourne la liste déjà filtrée
 */
export async function searchArtworks({ q = '', movement, dateBegin, dateEnd } = {}) {
  const all = await getAllArtworks()
  const query = q.trim().toLowerCase()

  return all.filter((a) => {
    if (query && !`${a.title} ${a.artist}`.toLowerCase().includes(query)) return false
    if (movement && a.movement !== movement) return false
    if (dateBegin != null && dateEnd != null && (a.year < dateBegin || a.year > dateEnd)) return false
    return true
  })
}

/** Œuvres similaires : même mouvement, sinon même artiste. */
export async function getRelated(artwork, limit = 3) {
  if (!artwork) return []
  const all = await getAllArtworks()
  const sameMovement = all.filter((a) => a.id !== artwork.id && a.movement === artwork.movement)
  const sameArtist = all.filter((a) => a.id !== artwork.id && a.artist === artwork.artist && !sameMovement.includes(a))
  return [...sameMovement, ...sameArtist].slice(0, limit)
}
