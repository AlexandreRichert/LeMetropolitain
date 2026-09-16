import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn() concatène des classes et résout les conflits Tailwind.
 * Indispensable dès qu'un composant accepte une prop `className`
 * (ex: <Button className="w-full" /> doit pouvoir écraser le w-auto interne).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

export function plural(count, singular, pluralForm = `${singular}s`) {
  return count > 1 ? pluralForm : singular
}

/** Les champs texte de l'API Museum peuvent contenir du HTML : on le neutralise. */
export function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim()
}
