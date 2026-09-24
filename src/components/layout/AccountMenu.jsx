"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

const LINKS = [
  { href: "/compte", label: "Mon compte" },
  { href: "/compte/reservations", label: "Mes réservations" },
  { href: "/compte/favoris", label: "Mes favoris" },
];

export default function AccountMenu({ className }) {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (isPending) {
    return <span className={cn("cartel text-stone", className)}>···</span>;
  }

  if (!session) {
    return (
      <Button href="/connexion" variant="solid" size="sm" className={className}>
        Se connecter
      </Button>
    );
  }

  const initial = session.user.name?.trim().charAt(0).toUpperCase() || "?";

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    useFavoritesStore.getState().reset();
    router.push("/");
    router.refresh();
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Mon compte"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink bg-ink font-display text-sm text-paper transition-colors duration-300 hover:border-accent hover:bg-accent"
      >
        {initial}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-line bg-paper py-2 shadow-ambient"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-ink transition-colors duration-200 hover:bg-paper-2 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 border-t border-line" />
          <div className="px-4 pt-1">
            <Button
              variant="solid"
              size="sm"
              role="menuitem"
              className="w-full"
              onClick={handleSignOut}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
