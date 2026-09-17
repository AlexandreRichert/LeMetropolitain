import { notFound } from "next/navigation";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import ArtworkMeta from "@/components/artwork/ArtworkMeta";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { FEATURED_SLUGS } from "@/lib/constants";
import { getArtwork, getRelated } from "@/lib/museum";
import { stripHtml } from "@/lib/utils";
export const revalidate = 604800;

export async function generateStaticParams() {
  return FEATURED_SLUGS.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) return { title: "Œuvre introuvable" };

  const title = `${artwork.title} - ${artwork.artist}`;
  const description =
    stripHtml(artwork.description).slice(0, 160) ||
    [artwork.artist, artwork.date, artwork.movement]
      .filter(Boolean)
      .join(" · ");

  return {
    title,
    description,
    alternates: { canonical: `/oeuvres/${artwork.id}` },
    openGraph: {
      title,
      description,
      images: artwork.imageLarge ? [{ url: artwork.imageLarge }] : [],
    },
  };
}

export default async function ArtworkPage({ params }) {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) notFound();

  const related = await getRelated(artwork, 3);

  // Evite failles XSS
  const paragraphs = artwork.description
    .split(/<\/p>/i)
    .map((p) => stripHtml(p))
    .filter(Boolean);

  return (
    <>
      <article className="pt-24">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-paper-2">
                <ArtworkImage
                  src={artwork.imageLarge}
                  alt={artwork.title}
                  fill
                  preload
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain p-6 md:p-12"
                  fallback="Image non disponible"
                />
              </div>
            </div>
          </div>

          {/* Colonne cartel */}
          <div className="lg:col-span-5">
            <div>
              <p className="cartel mb-6 text-stone">
                {artwork.movement}
                {artwork.location && ` · ${artwork.location}`}
              </p>
              <h1 className="text-title">{artwork.title}</h1>
              <p className="mt-6 text-lead text-ink-2">
                {artwork.artist}
                {artwork.date && `, ${artwork.date}`}
              </p>
            </div>

            <div className="mt-10">
              <div>
                <ArtworkMeta artwork={artwork} />
              </div>

              {paragraphs.length > 0 && (
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-2">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              )}

              {artwork.locationLink && (
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href={artwork.locationLink} external variant="ghost">
                    Voir le musée ↗
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section
          eyebrow="Dans la même veine"
          title="À découvrir ensuite"
          className="mt-24"
        >
          <ArtworkGrid artworks={related} columns={3} priorityCount={0} />
        </Section>
      )}
    </>
  );
}
