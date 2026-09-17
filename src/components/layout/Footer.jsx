import Container from "@/components/ui/Container";
import Link from "@/components/ui/Link";
import { NAV, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-title">{SITE.name}</p>
          <p className="mt-4 max-w-sm text-sm text-paper/60">
            {SITE.description}
          </p>
        </div>

        <div>
          <p className="cartel mb-4 text-paper/40">Navigation</p>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="cartel mb-4 text-paper/40">Informations</p>
          <ul className="space-y-2 text-sm text-paper/70">
            <li>1000 Fifth Avenue</li>
            <li>Ouvert du mardi au dimanche</li>
            <li>10 h – 17 h 30</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-paper/10 py-6 md:flex-row md:justify-between">
        <p className="cartel text-paper/40">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}
