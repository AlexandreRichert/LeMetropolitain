import FavoritesSection from "@/components/compte/FavoritesSection";
import { getFavoriteArtworkIds } from "@/lib/favoris";
import { getArtworks } from "@/lib/museum";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Favoris",
};

export default async function FavorisPage() {
  const session = await getSession();
  const favoriteIds = await getFavoriteArtworkIds(session.user.id);
  const favorites = await getArtworks(favoriteIds);

  return <FavoritesSection favorites={favorites} />;
}
