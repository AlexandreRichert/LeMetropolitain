import Hero from '@/components/home/Hero'
import HorizontalGallery from '@/components/home/HorizontalGallery'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import { FEATURED_SLUGS, HERO_SLUG, SITE } from '@/lib/constants'
import { getArtwork, getArtworks } from '@/lib/museum'

export const revalidate = 86400

export const metadata = {
  title: `${SITE.name} - ${SITE.baseline}`,
  description: SITE.description,
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  // Les deux requêtes sont indépendantes : on les lance en parallèle.
  const [hero, featured] = await Promise.all([getArtwork(HERO_SLUG), getArtworks(FEATURED_SLUGS)])

  return (
    <>
      <Hero artwork={hero} />

      <HorizontalGallery
        eyebrow='Sélection du conservateur'
        title='Les œuvres à ne pas manquer'
        action={
          <Button href='/oeuvres' variant='outline'>
            Toute la collection
          </Button>
        }
        artworks={featured}
      />

      <Section eyebrow='À propos' title='Un musée qui tient dans un onglet' className='bg-paper-2'>
        <div className='grid gap-12 md:grid-cols-2'>
          <p className='text-lead text-ink-2'>
            Le Métropolitain rassemble une sélection resserrée de chefs-d'œuvre incontournables, du Primitif flamand au
            Cubisme. Chaque œuvre dispose de sa fiche, de son mouvement et de ses œuvres voisines.
          </p>
          <div className='space-y-6'>
            <p className='text-lead text-ink-2'>
              Les données proviennent de l'API Museum, une collection mise à jour régulièrement.
            </p>
            <dl className='grid grid-cols-3 gap-6 border-t border-line pt-6'>
              {[
                ['39', 'Œuvres'],
                ['21', 'Mouvements'],
                ['508', "Ans d'histoire"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className='font-display text-4xl'>{value}</dt>
                  <dd className='cartel mt-1 text-stone'>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  )
}
