"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import Select from "@/components/ui/Select";
import { PERIODS } from "@/lib/constants";
import { filterArtworks } from "@/lib/museum";
import { cn } from "@/lib/utils";


export default function ArtworkFilters({ artworks = [], movements = [], types = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = searchParams.get("q") ?? "";
  const movementValue = searchParams.get("mouvement") ?? "";
  const typeValue = searchParams.get("type") ?? "";
  const periodValue = searchParams.get("periode") ?? "";

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    startTransition(() =>
      router.push(`${pathname}?${params}`, { scroll: false }),
    );
  };

  const reset = () =>
    startTransition(() => router.push(pathname, { scroll: false }));

  const hasFilters = ["q", "mouvement", "type", "periode"].some((key) =>
    searchParams.get(key),
  );

  const filtered = useMemo(
    () => filterArtworks(artworks, { query, movementValue, typeValue, periodValue }),
    [artworks, query, movementValue, typeValue, periodValue],
  );

  return (
    <>
      <div
        className={cn(
          "border-y border-line py-6 transition-opacity duration-300",
          isPending && "opacity-40",
        )}
      >
        <div className="grid gap-6 md:grid-cols-4">
          <Select
            label="Mouvement"
            value={movementValue}
            onChange={(e) => setFilter("mouvement", e.target.value)}
            options={[
              { value: "", label: "Tous les mouvements" },
              ...movements.map((m) => ({ value: m.id, label: m.name })),
            ]}
          />

          <Select
            label="Technique"
            value={typeValue}
            onChange={(e) => setFilter("type", e.target.value)}
            options={[
              { value: "", label: "Toutes les techniques" },
              ...types.map((t) => ({ value: t.id, label: t.name })),
            ]}
          />

          <Select
            label="Période"
            value={periodValue}
            onChange={(e) => setFilter("periode", e.target.value)}
            options={PERIODS}
          />

          <div className="flex items-end justify-end">
            {hasFilters && (
              <button
                type="button"
                onClick={reset}
                className="cartel link-underline text-accent"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="py-14">
        <ArtworkGrid artworks={filtered} columns={4} />
      </div>
    </>
  );
}
