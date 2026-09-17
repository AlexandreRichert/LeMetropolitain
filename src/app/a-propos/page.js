import ArtworkImage from "@/components/artwork/ArtworkImage";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { getArtworks } from "@/lib/museum";

export const metadata = {
  title: "À propos",
  description:
    "Le Métropolitain : sa mission, sa collection en accès libre, et les données de l'API Museum qui l'alimentent.",
  alternates: { canonical: "/a-propos" },
};

const ILLUSTRATION_SLUGS = [
  "the-birth-of-venus",
  "the-great-wave-off-kanagawa",
];

export default async function AboutPage() {
  const [imageLeft, imageRight] = await getArtworks(ILLUSTRATION_SLUGS);

  return (
    <section className="py-24">
      <Container>
        <div className="border border-line">
          <div className="border-b border-line px-6 py-10 md:px-10 md:py-14">
            <p className="cartel mb-6 text-stone">À propos</p>
            <h1 className="text-hero">
              Un musée né
              <br />
              pour être visité
              <br />
              de partout
            </h1>
          </div>

          <div className="grid md:grid-cols-2 md:divide-x md:divide-line">
            <Figure artwork={imageLeft} priority />
            <div className="space-y-6 px-6 py-10 md:px-10 md:py-14">
              <p className="text-lead text-ink-2">
                {SITE.name} n'a pas de guichet : c'est un site qui rend une
                sélection de chefs-d'œuvre explorable depuis un navigateur, sans
                rien installer.
              </p>
              <p className="text-lead text-ink-2">
                L'API Museum expose déjà une sélection de tableaux via une API
                ouverte. Notre travail n'est pas de dupliquer cette donnée, mais
                de lui donner une mise en scène : fiches d'œuvres, filtres par
                mouvement et par période.
              </p>
              <dl className="grid grid-cols-3 gap-6 border-t border-line pt-6">
                {[
                  ["39", "Œuvres"],
                  ["21", "Mouvements"],
                  ["508", "Ans d'histoire"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="font-display text-4xl">{value}</dt>
                    <dd className="cartel mt-1 text-stone">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="grid border-t border-line md:grid-cols-2 md:divide-x md:divide-line">
            <div className="space-y-6 px-6 py-10 md:px-10 md:py-14">
              <p className="text-lead text-ink-2">
                Toutes les œuvres, images et métadonnées proviennent de l'API
                Museum. Aucune donnée n'est modifiée : nous n'ajoutons qu'une
                mise en page et des filtres.
              </p>
              <p className="text-sm text-stone">
                <a
                  href="https://api-museum.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  api-museum.vercel.app
                </a>
              </p>
              <ul className="space-y-2 border-t border-line pt-6 text-lead text-ink-2">
                <li>1000 Fifth Avenue</li>
                <li>Ouvert du mardi au dimanche</li>
                <li>10 h – 17 h 30</li>
              </ul>
            </div>
            <Figure artwork={imageRight} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Figure({ artwork, priority = false }) {
  return (
    <div className="relative aspect-[4/5] bg-paper-2">
      <ArtworkImage
        src={artwork?.image}
        alt={artwork?.title}
        fill
        preload={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        wrapperClassName="absolute inset-0"
      />
    </div>
  );
}
