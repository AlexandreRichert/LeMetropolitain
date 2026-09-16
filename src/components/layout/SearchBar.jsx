"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/recherche?q=${encodeURIComponent(term)}`,
          {
            signal: controller.signal,
          },
        );
        const data = await res.json();
        setResults(data.results ?? []);
        setIsOpen(true);
      } catch {
        /* requête annulée : on ignore */
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
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
    setIsOpen(false);
    router.push(`/oeuvres?q=${encodeURIComponent(query.trim())}`);
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
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-paper-2"
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-paper-2">
                    {artwork.image && (
                      <Image
                        src={artwork.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-base leading-tight">
                      {artwork.title}
                    </span>
                    <span className="cartel block truncate text-stone">
                      {artwork.artist}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {results.length > 0 && (
            <Link
              href={`/oeuvres?q=${encodeURIComponent(query.trim())}`}
              onClick={() => setIsOpen(false)}
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
