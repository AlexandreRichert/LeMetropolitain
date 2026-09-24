import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export { gsap, useGSAP, ScrollTrigger }

let isInitialized = false
export function initGSAP() {
  if (isInitialized) return
  gsap.registerPlugin(useGSAP, ScrollTrigger)
  isInitialized = true
}

export const EASE = {
  out: 'expo.out', // sorties longues, "premium"
  inOut: 'power4.inOut', // transitions de page / rideaux
  soft: 'power2.out', // micro-interactions
}

export const DURATION = {
  fast: 0.4,
  base: 0.9,
  slow: 1.4,
}

/* Séquence du hero (PaintReveal) : durées partagées ici plutôt que dans
   PaintReveal.jsx ("use client"), qu'un composant serveur comme Hero.jsx
   ne peut pas importer au-delà de son export par défaut. */
export const PAINT_REVEAL = {
  stroke: 2.2,
  fade: 0.8,
}
export const PAINT_REVEAL_DURATION = PAINT_REVEAL.stroke + PAINT_REVEAL.fade

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Compteur numérique. */
export function countTo(el, { from = 0, to = 100, duration = 1.2, format = (v) => Math.round(v) } = {}) {
  const state = { value: from }
  return gsap.to(state, {
    value: to,
    duration,
    ease: EASE.soft,
    onUpdate: () => {
      if (el) el.textContent = format(state.value)
    },
  })
}

export function fadeUp(root, { y = 24, duration = DURATION.base, ease = EASE.out, stagger = 0.08, delay = 0 } = {}) {
  const items = root.querySelectorAll('[data-anim-item]')
  const targets = items.length ? items : root
  return gsap.from(targets, { y, opacity: 0, duration, ease, stagger, delay })
}

/** Révélation de titre, décalage plus prononcé */
export function textReveal(root, { y = 48, duration = DURATION.slow, ease = EASE.out, stagger = 0.1, delay = 0 } = {}) {
  const items = root.querySelectorAll('[data-anim-item]')
  const targets = items.length ? items : root
  return gsap.from(targets, { y, opacity: 0, duration, ease, stagger, delay })
}

export const ANIMATIONS = {
  fadeUp,
  textReveal,
}

/** Effet magnétique (boutons, curseur Cuberto-like). Retourne un cleanup. */
export function magnetic(el, { strength = 0.35 } = {}) {
  if (!el || prefersReducedMotion()) return () => {}
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: EASE.soft })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: EASE.soft })

  const onMove = (e) => {
    const r = el.getBoundingClientRect()
    xTo((e.clientX - (r.left + r.width / 2)) * strength)
    yTo((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    xTo(0)
    yTo(0)
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}
