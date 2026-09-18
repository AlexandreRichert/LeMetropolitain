import ArtworkImage from "@/components/artwork/ArtworkImage";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero({ artwork }) {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden pb-24 pt-24">
      {artwork?.imageLarge && (
        <div className="absolute inset-0 -z-10">
          <ArtworkImage
            src={artwork.imageLarge}
            alt={artwork.title}
            fill
            preload
            sizes="100vw"
            className="object-cover opacity-25"
            fallback={null}
          />
        </div>
      )}

      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal as="div" animation="textReveal" className="lg:col-span-8">
          <p className="cartel mb-8 text-stone" data-anim-item>
            Collection permanente · 5 000 ans de création
          </p>
          <h1 className="text-hero" data-anim-item>
            Lorem 
            <br />
            ipsum
          </h1>
        </Reveal>

        <Reveal
          as="div"
          animation="fadeUp"
          options={{ delay: 0.3 }}
          className="lg:col-span-4"
        >
          <p className="text-lead text-ink-2" data-anim-item>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc, eget
            aliquam nisl nunc eget nunc.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-anim-item>
            <Button href="/oeuvres">Explorer la collection</Button>
          </div>
        </Reveal>
      </Container>

    </section>
  );
}
