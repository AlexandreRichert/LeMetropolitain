"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { initGSAP, gsap, ScrollTrigger } from "@/lib/lib";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    initGSAP();

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);

    // Un seul requestAnimationFrame pour tout le site : celui de GSAP.
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
