import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Hero({ artwork }) {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden pb-16 pt-24">
      {artwork?.imageLarge && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={artwork.imageLarge}
            alt={artwork.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
      )}

      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="cartel mb-8 text-stone">
            Collection permanente · 5 000 ans de création
          </p>
          <h1 className="text-hero">
            Voir de
            <br />
            plus près
          </h1>
        </div>

        <div className="lg:col-span-4">
          <p className="text-lead text-ink-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc ut aliquam aliquam, nunc nisl aliquet nunc, eget
            aliquam nisl nunc eget nunc.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/oeuvres">Explorer la collection</Button>
          </div>
        </div>
      </Container>

      {artwork && (
        <p className="cartel absolute bottom-6 right-5 hidden max-w-[14rem] text-right text-stone md:right-10 md:block">
          {artwork.title} — {artwork.artist}
        </p>
      )}
    </section>
  );
}
