import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";

/** Dédupliquée par requête : layout + page peuvent l'appeler sans requêter deux fois la session. */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});
