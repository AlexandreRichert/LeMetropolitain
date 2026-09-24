import PersonalInfoSection from "@/components/compte/PersonalInfoSection";
import { getSession } from "@/lib/session";

export default async function ComptePage() {
  const session = await getSession();

  return <PersonalInfoSection user={session.user} />;
}
