import { Suspense } from "react";
import ArtworkFilters from "@/components/artwork/ArtworkFilters";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import {
  filterArtworks,
  getAllArtworks,
  getMovements,
  getTypes,
} from "@/lib/museum";

export const metadata = {
  title: "Les œuvres",
  description:
    "Parcourez la collection : filtrez par département et période, et ouvrez chaque œuvre en détail.",
  alternates: { canonical: "/oeuvres" },
};

export default async function ArtworksPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q ?? "";
  const movementValue = params.mouvement ?? "";
  const typeValue = params.type ?? "";
  const periodValue = params.periode ?? "";

  const [artworks, movements, types] = await Promise.all([
    getAllArtworks(),
    getMovements(),
    getTypes(),
  ]);
  const count = filterArtworks(artworks, {
    query,
    movementValue,
    typeValue,
    periodValue,
  }).length;

  return (
    <>
      <section className="pb-10 pt-24">
        <Container>
          <Reveal animation="textReveal">
            <p className="cartel mb-6 text-stone" data-anim-item>
              {query ? `Recherche : « ${query} »` : null}
            </p>
            <div className="flex flex-wrap items-baseline gap-4" data-anim-item>
              <h1 className="text-title">
                {query ? "Résultats" : "Toutes les œuvres"}
              </h1>
              <p className="cartel text-stone" aria-live="polite">
                {count.toLocaleString("fr-FR")} œuvres
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        {/* Doc Nextjs recommande d'utiliser Suspense en wrapper de useSearchParams */}
        <Suspense fallback={<div className="h-32 border-y border-line" />}>
          <ArtworkFilters
            artworks={artworks}
            movements={movements}
            types={types}
          />
        </Suspense>
      </Container>
    </>
  );
}
