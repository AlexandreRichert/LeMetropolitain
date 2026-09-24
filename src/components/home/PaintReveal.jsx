"use client";

import { useRef } from "react";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import { PAINT_REVEAL, gsap, prefersReducedMotion, useGSAP } from "@/lib/lib";
import { cn } from "@/lib/utils";

const { stroke: STROKE_DURATION, fade: FADE_DURATION } = PAINT_REVEAL;

/**
 * Révèle l'œuvre par une animation de pinceau scriptée au chargement :
 * un canvas opaque (teinte "paper") se fait "peindre" en transparence
 * le long d'une courbe, puis le reste s'efface en fondu. Séquence
 * déterministe, sans interaction — voir Hero.jsx pour l'enchaînement
 * avec la révélation du texte.
 */
export default function PaintReveal({
  artwork,
  as: Tag = "div",
  className,
  children,
  ...props
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useGSAP(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    const coverColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-paper")
      .trim();

    const paintCover = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = coverColor || "#fbf9f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-out";
    };

    const resize = () => {
      const { width, height } = root.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      paintCover();
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion()) {
      canvas.style.display = "none";
      return () => window.removeEventListener("resize", resize);
    }

    const erase = (x, y, radius) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const w = canvas.width;
    const h = canvas.height;
    const rand = (min, max) => min + Math.random() * (max - min);
    const baseRadius = Math.max(w, h) * 0.11;

    const bezier = (t, p0, p1, p2) => ({
      x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
      y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
    });

    // Plusieurs coups de pinceau courts et irréguliers plutôt qu'un
    // seul tracé lisse : positions, rayon et léger tremblement varient
    // à chaque coup pour une allure moins mécanique.
    const STROKE_COUNT = 5;
    const strokes = Array.from({ length: STROKE_COUNT }, () => ({
      start: { x: w * rand(-0.1, 0.5), y: h * rand(-0.05, 1.05) },
      control: { x: w * rand(0.2, 0.8), y: h * rand(-0.15, 1.15) },
      end: { x: w * rand(0.5, 1.1), y: h * rand(-0.05, 1.05) },
    }));

    const tl = gsap.timeline();
    strokes.forEach((s, i) => {
      const state = { t: 0 };
      tl.to(
        state,
        {
          t: 1,
          duration: STROKE_DURATION / STROKE_COUNT,
          ease: "power1.inOut",
          onUpdate: () => {
            const { x, y } = bezier(state.t, s.start, s.control, s.end);
            const jitter = baseRadius * 0.5;
            erase(
              x + rand(-jitter, jitter),
              y + rand(-jitter, jitter),
              baseRadius * rand(0.7, 1.3),
            );
          },
        },
        i === 0 ? undefined : "-=0.08",
      );
    });
    tl.to(canvas, { opacity: 0, duration: FADE_DURATION, ease: "power1.out" });

    return () => {
      window.removeEventListener("resize", resize);
      tl.kill();
    };
  }, []);

  return (
    <Tag ref={rootRef} className={cn("relative", className)} {...props}>
      <div className="absolute inset-0 -z-10">
        {artwork?.imageLarge && (
          <ArtworkImage
            src={artwork.imageLarge}
            alt={artwork.title}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            fallback={null}
          />
        )}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {children}
    </Tag>
  );
}
