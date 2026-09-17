import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Cursor from "@/components/motion/Cursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { SITE } from "@/lib/constants";

const sans = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.baseline}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Données structurées : Google affiche horaires et type de lieu. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Museum",
              name: SITE.name,
              description: SITE.description,
              url: SITE.url,
              openingHours: "Tu-Su 10:00-17:30",
            }),
          }}
        />

        <SmoothScroll>
          <Cursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
