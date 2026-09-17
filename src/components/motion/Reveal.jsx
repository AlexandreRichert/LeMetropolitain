"use client";

import { useRef } from "react";
import { ANIMATIONS, prefersReducedMotion, useGSAP } from "@/lib/lib";


export default function Reveal({
  animation = "fadeUp",
  as: Tag = "div",
  options,
  className,
  children,
  ...props
}) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const run = ANIMATIONS[animation];
      if (!run)
        return console.warn(`[Reveal] animation inconnue : ${animation}`);
      if (prefersReducedMotion()) return; // le CSS laisse alors le contenu visible
      run(scope.current, options);
    },
    { scope, dependencies: [animation], revertOnUpdate: true },
  );

  return (
    <Tag ref={scope} data-anim className={className} {...props}>
      {children}
    </Tag>
  );
}
