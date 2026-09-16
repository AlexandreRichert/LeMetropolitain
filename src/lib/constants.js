export const SITE = {
  name: 'Le Métropolitain',
  shortName: 'MÉTROPOLITAIN',
  baseline: 'Musée des beaux-arts',
  url: 'https://musee-metropolitain.vercel.app', // TODO: URL Vercel finale
  description:
    "Une quarantaine de chefs-d'œuvre qui ont marqué l'histoire de l'art, du Primitif flamand au Cubisme. Explorez chaque tableau en détail.",
}

export const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/oeuvres', label: 'Œuvres' },
  { href: '/a-propos', label: 'À propos' },
]

export const PERIODS = [
  { value: '', label: 'Toutes les périodes' },
  { value: 'avant-1600', label: 'Avant 1600', dateBegin: 0, dateEnd: 1599 },
  { value: '1600-1800', label: '1600 – 1800', dateBegin: 1600, dateEnd: 1799 },
  { value: '1800-1850', label: '1800 – 1850', dateBegin: 1800, dateEnd: 1849 },
  { value: '1850-1900', label: '1850 – 1900', dateBegin: 1850, dateEnd: 1899 },
  { value: 'apres-1900', label: 'Après 1900', dateBegin: 1900, dateEnd: 2100 },
]

/* Choix pour la page accueil et évite les requêtes API */
export const FEATURED_SLUGS = [
  'starry-night',
  'mona-lisa',
  'the-great-wave-off-kanagawa',
  'girl-with-a-pearl-earring',
  'the-birth-of-venus',
  'guernica',
]

export const HERO_SLUG = 'starry-night'
