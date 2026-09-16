import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ArtworkCard({ artwork, priority = false, className }) {
  const { id, title, artist, date, image } = artwork;

  return (
    <article className={cn("group", className)}>
      <Link href={`/oeuvres/${id}`} data-cursor="Voir" className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 90vw"
              className="object-contain p-4 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] md:p-8"
            />
          ) : (
            <span className="cartel absolute inset-0 grid place-items-center text-stone">
              Image indisponible
            </span>
          )}
        </div>

        <div className="mt-4 border-t border-line pt-3">
          <h3 className="font-display text-xl leading-tight transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>
          <p className="cartel mt-2 text-stone">
            {artist}
            {date && ` · ${date}`}
          </p>
        </div>
      </Link>
    </article>
  );
}
