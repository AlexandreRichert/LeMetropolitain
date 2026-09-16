import Link from "next/link";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
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

        <div className="ml-auto flex items-center gap-3 md:gap-6">
          <SearchBar />
        </div>
      </Container>
    </header>
  );
}
