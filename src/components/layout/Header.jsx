import Container from "@/components/ui/Container";
import Link from "@/components/ui/Link";
import { SITE } from "@/lib/constants";
import AccountMenu from "./AccountMenu";
import Nav from "./Nav";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-4 md:h-20 md:gap-10">
        <Link href="/" className="shrink-0 leading-none" aria-label={SITE.name}>
          <span className="cartel block font-medium">{SITE.shortName}</span>
          <span className="hidden text-[0.6rem] text-stone md:block">
            {SITE.baseline}
          </span>
        </Link>

        <Nav className="hidden md:flex" />

        <div className="ml-auto flex items-center gap-4 md:gap-8">
          <SearchBar />
          <div
            className="hidden h-6 w-px bg-line md:block"
            aria-hidden="true"
          />
          <AccountMenu />
        </div>
      </Container>
    </header>
  );
}
