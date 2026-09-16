"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";


export default function Link({ href, children, onClick, ...props }) {
  const pathname = usePathname();
  const { setDestinationUrl, setIsTransitionActive } = useStore();

  const handleClick = (event) => {
    onClick?.(event);

    const isModified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;
    const isExternal = typeof href === "string" && /^(https?:)?\/\//.test(href);
    if (
      isModified ||
      isExternal ||
      event.defaultPrevented ||
      href === pathname
    ) {
      return;
    }

    event.preventDefault();
    setDestinationUrl(href);
    setIsTransitionActive(true);
  };

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  );
}
