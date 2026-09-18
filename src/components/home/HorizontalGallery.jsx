'use client'

import { useRef } from 'react'
import ArtworkImage from '@/components/artwork/ArtworkImage'
import Container from '@/components/ui/Container'
import Link from '@/components/ui/Link'
import Reveal from '@/components/motion/Reveal'
import { prefersReducedMotion, useGSAP } from '@/lib/lib'
import { initHorizontalGallery } from '@/lib/horizontalGallery'

export default function HorizontalGallery({ artworks = [], eyebrow, title, action }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      initHorizontalGallery(sectionRef.current, trackRef.current)
    },
    { scope: sectionRef },
  )

  if (!artworks.length) return null

  return (
    <section
      ref={sectionRef}
      className='relative flex h-dvh flex-col overflow-hidden bg-paper-2 pt-20 pb-16 md:pt-28 md:pb-20'
    >
      <Container className='shrink-0'>
        <div className='mb-8 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-end md:justify-between'>
          <Reveal className='max-w-3xl'>
            {eyebrow && (
              <p className='cartel mb-6 text-stone' data-anim-item>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className='text-title' data-anim-item>
                {title}
              </h2>
            )}
          </Reveal>
          {action && <div className='shrink-0'>{action}</div>}
        </div>
      </Container>

      <div className='min-h-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <div ref={trackRef} className='flex h-full w-max items-center gap-10 md:gap-16'>
          {artworks.map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/oeuvres/${artwork.id}`}
              data-cursor='Voir'
              data-gallery-item
              className='flex shrink-0 flex-col'
            >
              <div className='relative aspect-[3/2] h-[42vh] overflow-hidden bg-paper-2 sm:h-[48vh] lg:h-[54vh]'>
                <ArtworkImage
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  preload={index < 3}
                  sizes='(min-width: 1024px) 70vh, 50vh'
                  className='object-contain p-4 md:p-6'
                  wrapperClassName='absolute inset-0'
                />
              </div>
              <div className='mt-4 border-t border-line pt-3'>
                <h3 className='font-display text-xl leading-tight'>{artwork.title}</h3>
                <p className='cartel mt-2 text-stone'>
                  {artwork.artist}
                  {artwork.date && ` · ${artwork.date}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
