"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ArtworkImage({
  src,
  alt,
  fallback = "Image indisponible",
  wrapperClassName,
  ...imageProps
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    if (fallback === null) return null;
    return (
      <span
        className={cn(
          "cartel grid place-items-center text-stone",
          wrapperClassName,
        )}
      >
        {fallback}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      {...imageProps}
    />
  );
}
