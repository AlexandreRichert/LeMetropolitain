"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/ui/Link";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/compte", label: "Informations personnelles" },
  { href: "/compte/reservations", label: "Réservations" },
  { href: "/compte/favoris", label: "Favoris" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "cartel -mb-px border-b-2 pb-4 transition-colors duration-300",
              isActive
                ? "border-accent text-accent"
                : "border-transparent text-stone hover:text-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
