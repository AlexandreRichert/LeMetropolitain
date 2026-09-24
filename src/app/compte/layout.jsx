import { redirect } from "next/navigation";
import AccountNav from "@/components/compte/AccountNav";
import Section from "@/components/ui/Section";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Mon compte",
};

export default async function CompteLayout({ children }) {
  const session = await getSession();
  if (!session) redirect("/connexion");

  return (
    <Section
      eyebrow="Compte"
      title={`Bonjour, ${session.user.name}`}
      intro={session.user.email}
      className="pt-24"
    >
      <AccountNav />
      {children}
    </Section>
  );
}
