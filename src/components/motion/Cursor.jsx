"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/lib";


export default function Cursor() {
  const wrapper = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useGSAP(() => {
    // Pas de curseur custom sur écran tactile.
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(wrapper.current, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(wrapper.current, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest?.("[data-cursor], a, button");
      if (!target) return;
      const text = target.dataset?.cursor ?? "";
      label.current.textContent = text;
      gsap.to(dot.current, { scale: text ? 5 : 2.4, duration: 0.35 });
      gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.25 });
    };

    const onOut = () => {
      gsap.to(dot.current, { scale: 1, duration: 0.35 });
      gsap.to(label.current, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden md:block"
    >
      <div
        ref={dot}
        className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-accent mix-blend-multiply will-change-transform"
      />
      <span
        ref={label}
        className="cartel absolute -left-12 -top-2 flex h-4 w-24 items-center justify-center text-paper opacity-0"
      />
    </div>
  );
}
