import { gsap, ScrollTrigger } from '@/lib/lib'

export function initHorizontalGallery(section, track, options = {}) {
  const { scaleMin = 0.72, scaleMax = 1, opacityMin = 0.4 } = options
  if (!section || !track) return

  const items = gsap.utils.toArray(track.querySelectorAll('[data-gallery-item]'))
  if (!items.length) return

  const setEdges = () => {
    const edge = Math.max((window.innerWidth - items[0].getBoundingClientRect().width) / 2, 0)
    gsap.set(track, { paddingLeft: edge, paddingRight: edge })
  }

  const updateScale = () => {
    const center = window.innerWidth / 2
    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const proximity = gsap.utils.clamp(0, 1, 1 - Math.abs(rect.left + rect.width / 2 - center) / center)
      gsap.set(item, {
        scale: gsap.utils.interpolate(scaleMin, scaleMax, proximity),
        opacity: gsap.utils.interpolate(opacityMin, 1, proximity),
      })
    })
  }

  setEdges()
  updateScale()

  const distance = () => track.scrollWidth - window.innerWidth
  const tween = gsap.to(track, { x: () => -distance(), ease: 'none' })

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${distance()}`,
    pin: true,
    scrub: 1,
    animation: tween,
    invalidateOnRefresh: true,
    onRefreshInit: setEdges,
    onRefresh: updateScale,
    onUpdate: updateScale,
  })
}
