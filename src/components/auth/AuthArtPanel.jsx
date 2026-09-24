import ArtworkImage from "@/components/artwork/ArtworkImage";
import { cn } from "@/lib/utils";

export default function AuthArtPanel({ artwork, className }) {
  if (!artwork) return null;

  const caption = [artwork.artist, artwork.date].filter(Boolean).join(", ");

  return (
    <div className={cn("relative overflow-hidden bg-ink", className)}>
      <ArtworkImage
        src={artwork.imageLarge}
        alt={artwork.title}
        fill
        preload
        sizes="50vw"
        className="object-cover"
        wrapperClassName="absolute inset-0"
        fallback={null}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
      />

      <div className="absolute inset-x-6 bottom-6 max-w-sm border-l-2 border-accent bg-paper/95 px-6 py-5 shadow-ambient md:inset-x-auto md:bottom-10 md:left-10">
        {(artwork.movement || artwork.location) && (
          <p className="cartel text-stone">
            {artwork.movement || artwork.location}
          </p>
        )}
        <p className="mt-2 font-display text-lg leading-tight text-ink">
          {artwork.title}
        </p>
        {caption && <p className="mt-1 text-sm text-ink-2">{caption}</p>}
      </div>
    </div>
  );
}
