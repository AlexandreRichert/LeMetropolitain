# Musée en ligne Next.js: Le Métropolitain

Site vitrine s'appuyant sur l'API publique du Metropolitan Museum of Art, réalisé dans le cadre du module d'introduction à Next.js.

## Stack technique

- **Next.js 16** (App Router) / React 19
- **Zustand** état global (préloader, transitions de page, panier, favoris)
- **GSAP** + **Lenis** animations et smooth scroll
- **Better Auth** authentification
- **Drizzle ORM** + **Neon (Postgres)** comptes utilisateurs, favoris

## Fonctionnalités

- Header / Footer avec recherche en temps réel (autocomplete)
- Accueil : Hero, sélection d'œuvres, section à propos
- Liste des œuvres avec filtres actifs (mouvement, technique, période)
- Page œuvre unique avec section d'œuvres similaires
- Billetterie avec panier et total qui se met à jour en direct
- Favoris (nécessite un compte), galerie dans "mon compte"
- Transition de page, animations de reveal, préloader

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Compte-rendu critique: retour d'expérience sur Next.js

### Un avis pas totalement objectif

Avant de me lancer dans ce genre de retour, une précision s'impose : je n'ai pas découvert Next.js avec ce projet. J'avais déjà pratiqué le framework sur d'autres projets auparavant. Ça m'a clairement aidé à avancer vite sur ce module, mais ça veut aussi dire que je ne suis probablement pas le mieux placé pour juger de la courbe d'apprentissage réelle du framework pour quelqu'un qui le découvre. Ce qui me semble aujourd'hui "logique" ou "simple" l'est peut-être uniquement parce que je l'ai déjà pratiqué.

### Le routing

C'est probablement ce que je préfère dans Next.js. Le système de routing basé sur l'arborescence de fichiers (App Router) est très lisible une fois qu'on a compris la logique : un dossier = une route, et les conventions (`layout`, `template`, `loading`, `error`, groupes de routes entre parenthèses, segments dynamiques) couvrent naturellement la plupart des cas qu'on rencontre sur un vrai projet.

Le seul point qui m'embête, et ça reste vrai sur ce projet, c'est que tous les fichiers de page s'appellent `page.tsx` (ou `page.js`). Dans un IDE avec beaucoup d'onglets ouverts ou une recherche rapide de fichiers, ça devient vite pénible de s'y retrouver puisque tout porte le même nom, et seul le chemin permet de distinguer les fichiers entre eux.

Pour contourner ça sur mes autres projets, j'ai pris l'habitude de ne garder dans `page.tsx` que le point d'entrée du routing (metadata, data fetching éventuel, et l'appel au composant réel), et de déporter le contenu réel dans un fichier nommé explicitement, par exemple `/dashboard/page.tsx` qui ne fait qu'appeler un composant `DashboardPage` défini ailleurs. Je n'ai pas appliqué cette convention de façon systématique sur ce projet, mais c'est l'approche que je privilégierais pour un projet qui grossit.

### Le SEO

Sur ce point, Next.js est un vrai confort. La gestion du SEO (exports `metadata`, `generateMetadata` pour les pages dynamiques, `sitemap.ts`, `robots.ts`, images Open Graph) est simple à mettre en place côté frontend, sans avoir besoin de bibliothèque tierce ni de configuration lourde. Pour quelqu'un qui vient du développement front, c'est probablement l'un des arguments les plus convaincants du framework : on obtient un référencement correct avec très peu d'effort, intégré directement dans la logique des pages.

### L'architecture globale

Je ne suis pas certain que ce soit objectivement "la meilleure" architecture, mais l'organisation type d'un projet Next.js combinée à des briques comme GraphQL ou PostgreSQL (ici Drizzle + Neon) me convient bien. Le fait de pouvoir garder la logique serveur (fetch de données, requêtes base de données, authentification) au plus près des pages via les Server Components, tout en isolant clairement les composants interactifs côté client, donne une structure de projet assez naturelle à suivre.

Cela dit, comme précisé plus haut, j'ai probablement un biais : c'est une architecture à laquelle je suis habitué depuis mes précédents projets Next.js, donc difficile de dire avec certitude si elle est réellement la plus pertinente ou si c'est simplement celle avec laquelle je suis le plus à l'aise.
