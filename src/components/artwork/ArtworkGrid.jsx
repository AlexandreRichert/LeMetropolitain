import { cn } from "@/lib/utils";
import ArtworkCard from "./ArtworkCard";

export default function ArtworkGrid({
  artworks = [],
  columns = 4,
  priorityCount = 4,
  className,
}) {
  if (!artworks.length) {
    return (
      <p className="cartel border-t border-line py-16 text-center text-stone">
        Aucune œuvre ne correspond à ces critères.
      </p>
    );
  }

  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-14",
        columnClass,
        className,
      )}
    >
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
