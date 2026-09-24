import { SITE } from "@/lib/constants";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/compte", "/connexion"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
