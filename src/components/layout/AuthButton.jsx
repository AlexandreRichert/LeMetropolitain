"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

export default function AuthButton({ className }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <span className={cn("cartel text-stone", className)}>···</span>;
  }

  if (!session) {
    return (
      <Button href="/connexion" variant="solid" size="sm" className={className}>
        Connexion
      </Button>
    );
  }

  return (
    <Button
      variant="solid"
      size="sm"
      className={className}
      onClick={async () => {
        await signOut();
        useFavoritesStore.getState().reset();
        router.push("/");
        router.refresh();
      }}
    >
      Déconnexion
    </Button>
  );
}
