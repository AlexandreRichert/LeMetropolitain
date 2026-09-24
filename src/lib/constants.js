export const SITE = {
  name: "Le Métropolitain",
  shortName: "MÉTROPOLITAIN",
  baseline: "Musée des beaux-arts",
  url: "https://musee-metropolitain.vercel.app", // TODO: URL Vercel finale
  description:
    "Une quarantaine de chefs-d'œuvre qui ont marqué l'histoire de l'art, du Primitif flamand au Cubisme. Explorez chaque tableau en détail.",
};

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/oeuvres", label: "Œuvres" },
  { href: "/billeterie", label: "Billetterie" },
  { href: "/a-propos", label: "À propos" },
];

export const PERIODS = [
  { value: "", label: "Toutes les périodes" },
  { value: "avant-1600", label: "Avant 1600", dateBegin: 0, dateEnd: 1599 },
  { value: "1600-1800", label: "1600 – 1800", dateBegin: 1600, dateEnd: 1799 },
  { value: "1800-1850", label: "1800 – 1850", dateBegin: 1800, dateEnd: 1849 },
  { value: "1850-1900", label: "1850 – 1900", dateBegin: 1850, dateEnd: 1899 },
  { value: "apres-1900", label: "Après 1900", dateBegin: 1900, dateEnd: 2100 },
];

/* Choix pour la page accueil et évite les requêtes API */
export const FEATURED_SLUGS = [
  "the-last-supper",
  "liberty-leading-the-people",
  "the-great-wave-off-kanagawa",
  "the-raft-of-the-medusa",
  "the-birth-of-venus",
  "guernica",
];

export const HERO_SLUG = "starry-night";

/* Billetterie : tarifs et options, facturés par visiteur */
export const TICKETS = [
  { id: "adulte", label: "Entrée adulte", price: 24, note: "26 – 64 ans" },
  { id: "jeune", label: "Entrée jeune", price: 18, note: "12 – 25 ans" },
  {
    id: "recherche-emploi",
    label: "Entrée personne en recherche d'emploi",
    price: 18,
    note: "Sur présentation d'un justificatif",
  },
  {
    id: "pmr",
    label: "Entrée PMR",
    price: 18,
    note: "Personne à mobilité réduite",
  },
  { id: "senior", label: "Entrée senior", price: 18, note: "65 ans et +" },
  { id: "moins-12", label: "Entrée -12 ans", price: 12, note: "5 – 11 ans" },
  {
    id: "moins-5",
    label: "Moins de 5 ans",
    price: 0,
    note: "Gratuit, sur présentation d'une pièce d'identité",
  },
  {
    id: "groupe",
    label: "Tarif groupe",
    price: 15,
    note: "Par personne, à partir de 10 personnes",
    minQuantity: 10,
  },
];

export const OPTIONS = [
  {
    id: "audioguide",
    label: "Audioguide",
    price: 2,
    note: "Français, anglais, espagnol · par personne",
  },
  {
    id: "guide-papier",
    label: "Guide papier",
    price: 4,
    note: "Parcours commenté de la collection · par personne",
  },
];
