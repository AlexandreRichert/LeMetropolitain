'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { DURATION, EASE, gsap, useGSAP } from '@/lib/lib'
import { useStore } from '@/lib/store'

const PANEL_IDS = ['panel-1', 'panel-2', 'panel-3', 'panel-4', 'panel-5']

export default function Template({ children }) {
  const panelsRef = useRef([])
  const router = useRouter()
  const {
    destinationUrl,
    setDestinationUrl,
    isTransitionActive,
    setIsTransitionActive,
    isFirstRender,
    setIsFirstRender,
  } = useStore()

  useGSAP(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }

    gsap.set(panelsRef.current, { scaleY: 1, transformOrigin: 'top' })
    gsap.to(panelsRef.current, {
      scaleY: 0,
      duration: DURATION.base,
      ease: EASE.inOut,
      stagger: 0.06,
    })
  }, [])

  useGSAP(() => {
    if (!isTransitionActive) return

    gsap.set(panelsRef.current, { transformOrigin: 'top' })
    gsap.to(panelsRef.current, {
      scaleY: 1,
      duration: DURATION.base,
      ease: EASE.inOut,
      stagger: 0.06,
      onComplete: () => {
        router.push(destinationUrl)
        setIsTransitionActive(false)
        setDestinationUrl('')
      },
    })
  }, [destinationUrl, isTransitionActive])

  return (
    <>
      <div aria-hidden='true' className='pointer-events-none fixed inset-0 z-[90] flex'>
        {PANEL_IDS.map((id, i) => (
          <span
            key={id}
            ref={(el) => {
              panelsRef.current[i] = el
            }}
            style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
            className='h-full flex-1 bg-ink'
          />
        ))}
      </div>
      {children}
    </>
  )
}
