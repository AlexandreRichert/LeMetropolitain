import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import Section from "@/components/ui/Section";
import { auth } from "@/lib/auth";
import { getFavoriteArtworkIds } from "@/lib/favoris";
import { getArtworks } from "@/lib/museum";

export const metadata = {
  title: "Mon compte",
};

export default async function ComptePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/connexion");

  const favoriteIds = await getFavoriteArtworkIds(session.user.id);
  const favorites = await getArtworks(favoriteIds);

  return (
    <>
      <Section
        eyebrow="Compte"
        title={`Bonjour, ${session.user.name}`}
        intro={session.user.email}
        className="pt-24"
      />

      <Section eyebrow="Favoris" title="Mes favoris">
        {favorites.length > 0 ? (
          <ArtworkGrid artworks={favorites} columns={3} priorityCount={0} />
        ) : (
          <p className="cartel border-t border-line py-16 text-center text-stone">
            Vous n'avez pas encore ajouté d'œuvre à vos favoris.
          </p>
        )}
      </Section>
    </>
  );
}
