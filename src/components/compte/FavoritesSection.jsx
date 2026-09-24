import ArtworkGrid from "@/components/artwork/ArtworkGrid";

export default function FavoritesSection({ favorites }) {
  if (favorites.length === 0) {
    return (
      <p className="cartel border-t border-line py-16 text-center text-stone">
        Vous n'avez pas encore ajouté d'œuvre à vos favoris.
      </p>
    );
  }

  return <ArtworkGrid artworks={favorites} columns={3} priorityCount={0} />;
}
