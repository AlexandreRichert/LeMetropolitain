"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import Link from "@/components/ui/Link";

function useHighlightedParts(text, term) {
  return useMemo(() => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return [text];
    const escaped = cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.split(new RegExp(`(${escaped})`, "gi"));
  }, [text, term]);
}

function HighlightedText({ text, term }) {
  const parts = useHighlightedParts(text, term);

  return parts.map((part, i) =>
    part.toLowerCase() === term.trim().toLowerCase() ? (
      <mark key={i} className="bg-accent/30 text-ink">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const container = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const term = query.trim();
    if (term.length < 3) {
      setResults([]);
      return;
    }

    let stale = false;
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/recherche?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        if (stale) return;
        setResults(data.results ?? []);
        setIsOpen(true);
      } catch {
      } finally {
        if (!stale) setIsLoading(false);
      }
    }, 300);

    return () => {
      stale = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Fermeture au clic extérieur.
  useEffect(() => {
    const onClick = (e) => {
      if (!container.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/oeuvres?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    setQuery("");
  };

  const selectResult = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={container} className="relative w-40 md:w-64">
      <form onSubmit={submit} role="search">
        <label htmlFor="search" className="sr-only">
          Rechercher une œuvre
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setIsOpen(true)}
          placeholder="Rechercher…"
          autoComplete="off"
          className="w-full border-b border-line bg-transparent py-2 text-sm text-ink placeholder:text-stone focus:border-accent focus:outline-none"
        />
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-line bg-paper shadow-ambient">
          {isLoading && (
            <p className="cartel px-4 py-4 text-stone">Recherche…</p>
          )}

          {!isLoading && results.length === 0 && (
            <p className="cartel px-4 py-4 text-stone">Aucun résultat</p>
          )}

          <ul>
            {results.map((artwork) => (
              <li
                key={artwork.id}
                className="border-b border-line last:border-0"
              >
                <Link
                  href={`/oeuvres/${artwork.id}`}
                  onClick={selectResult}
                  className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-paper-2"
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-paper-2">
                    <ArtworkImage
                      src={artwork.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                      fallback={null}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-base leading-tight">
                      <HighlightedText text={artwork.title} term={query} />
                    </span>
                    <span className="cartel block truncate text-stone">
                      <HighlightedText text={artwork.artist} term={query} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {results.length > 0 && (
            <Link
              href={`/oeuvres?q=${encodeURIComponent(query.trim())}`}
              onClick={selectResult}
              className="cartel block bg-ink px-4 py-3 text-paper"
            >
              Voir tous les résultats →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
