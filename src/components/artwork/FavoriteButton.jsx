"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

export default function FavoriteButton({ artwork, className }) {
  const { id, title } = artwork;
  const { data: session, isPending } = useSession();
  const isFavorite = useFavoritesStore((s) => s.ids.includes(id));

  useEffect(() => {
    if (session) useFavoritesStore.getState().fetchFavorites();
  }, [session]);

  if (isPending || !session) return null;

  return (
    <button
      type="button"
      data-cursor="♥"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Retirer "${title}" des favoris`
          : `Ajouter "${title}" aux favoris`
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        useFavoritesStore.getState().toggle(id);
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 text-ink backdrop-blur-sm transition-colors duration-300 hover:text-accent",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path d="M12 20.5s-7.6-4.9-10.2-9.6C.2 8 1.4 4.4 4.7 3.4c2.2-.7 4.5.2 5.8 2.1.6.8 1.5.8 2.1 0 1.3-1.9 3.6-2.8 5.8-2.1 3.3 1 4.5 4.6 2.9 7.5C19.6 15.6 12 20.5 12 20.5z" />
      </svg>
    </button>
  );
}
