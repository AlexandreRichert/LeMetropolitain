/**
 * =============================================================================
 *  lib.js — point d'entrée UNIQUE de toute l'animation du site.
 * =============================================================================
 *  Règle : aucun composant n'importe `gsap` directement. Tout passe par ici.
 *  Bénéfices :
 *   - les durées / easings sont centralisés : on change le "feeling" du site
 *     en une ligne ;
 *   - chaque animation est une FONCTION PURE (element, options) -> timeline,
 *     donc réutilisable, testable, et nettoyable par useGSAP().
 *
 *  ⚠️ Ce fichier est "client only" : il touche au DOM. Il ne doit être importé
 *  que depuis des composants marqués "use client".
 * =============================================================================
 */

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export { gsap, useGSAP };

/* -------------------------------------------------------------------------- */
/*  1. Tokens d'animation (miroir des easings CSS de globals.css)              */
/* -------------------------------------------------------------------------- */

export const EASE = {
  out: "expo.out", // sorties longues, "premium"
  inOut: "power4.inOut", // transitions de page / rideaux
  soft: "power2.out", // micro-interactions
};

export const DURATION = {
  fast: 0.4,
  base: 0.9,
  slow: 1.4,
};

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Le catalogue d'animations                                              */
/*     Signature commune : (root, options) => gsap.timeline | gsap.tween       */
/* -------------------------------------------------------------------------- */

/** Compteur numérique. */
export function countTo(
  el,
  { from = 0, to = 100, duration = 1.2, format = (v) => Math.round(v) } = {},
) {
  const state = { value: from };
  return gsap.to(state, {
    value: to,
    duration,
    ease: EASE.soft,
    onUpdate: () => {
      if (el) el.textContent = format(state.value);
    },
  });
}

/** Effet magnétique (boutons, curseur Cuberto-like). Retourne un cleanup. */
export function magnetic(el, { strength = 0.35 } = {}) {
  if (!el || prefersReducedMotion()) return () => {};
  const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE.soft });
  const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE.soft });

  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
  };
}
