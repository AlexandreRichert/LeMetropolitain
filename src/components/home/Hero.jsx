import PaintReveal from "@/components/home/PaintReveal";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { PAINT_REVEAL_DURATION } from "@/lib/lib";

export default function Hero({ artwork }) {
  return (
    <PaintReveal
      artwork={artwork}
      as="section"
      className="flex min-h-[88svh] items-end overflow-hidden pb-24 pt-24"
    >
      {/* Scrim clair : le texte est en encre foncée, il faut donc
          éclaircir plutôt qu'assombrir pour garder le contraste. Couvre
          toute la hauteur (pas juste le bas) pour que le cartel du haut
          reste lisible même quand l'œuvre est révélée. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-t from-paper/95 via-paper/70 to-paper/25"
      />

      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal
          as="div"
          animation="textReveal"
          options={{ delay: PAINT_REVEAL_DURATION }}
          className="lg:col-span-8"
        >
          <p className="cartel mb-8 text-ink" data-anim-item>
            Collection permanente · 508 ans de création
          </p>
          <h1 className="text-hero" data-anim-item>
            Cinq siècles
            <br />
            de peinture
          </h1>
        </Reveal>

        <Reveal
          as="div"
          animation="fadeUp"
          options={{ delay: PAINT_REVEAL_DURATION + 0.3 }}
          className="lg:col-span-4"
        >
          <p className="text-lead text-ink" data-anim-item>
            Du Primitif flamand au Cubisme, quarante toiles qui ont façonné
            l'histoire de l'art. Chacune a sa fiche, son mouvement, ses
            œuvres voisines.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-anim-item>
            <Button href="/oeuvres">Explorer la collection</Button>
          </div>
        </Reveal>
      </Container>
    </PaintReveal>
  );
}
