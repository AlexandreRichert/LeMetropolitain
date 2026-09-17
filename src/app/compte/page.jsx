import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Section from "@/components/ui/Section";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Mon compte",
};

export default async function ComptePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/connexion");

  return (
    <Section
      eyebrow="Compte"
      title={`Bonjour, ${session.user.name}`}
      intro={session.user.email}
      className="pt-24"
    />
  );
}
