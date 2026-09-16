"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/ui/Link";
import { NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Nav({ className, onNavigate }) {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className={cn("items-center gap-8", className)}>
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={cn(
            "cartel link-underline transition-colors duration-300",
            isActive(item.href) ? "text-accent" : "text-ink hover:text-accent",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
