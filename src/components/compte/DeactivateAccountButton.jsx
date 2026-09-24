"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import { signOut } from "@/lib/auth-client";

export default function DeactivateAccountButton() {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  const router = useRouter();

  function deactivate() {
    startTransition(async () => {
      const res = await fetch("/api/compte", { method: "DELETE" });
      if (!res.ok) {
        setError(true);
        return;
      }
      await signOut();
      router.push("/");
      router.refresh();
    });
  }

  if (!confirming) {
    return (
      <Button variant="outline" size="sm" onClick={() => setConfirming(true)}>
        Désactiver mon compte
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="text-sm text-ink-2">
        Votre compte sera désactivé et vous serez immédiatement déconnecté.
        Confirmer ?
      </p>
      {error && (
        <p className="text-sm text-accent" role="alert">
          Une erreur est survenue, merci de réessayer.
        </p>
      )}
      <div className="flex gap-3">
        <Button
          variant="solid"
          size="sm"
          disabled={isPending}
          onClick={deactivate}
        >
          {isPending ? "Désactivation…" : "Confirmer la désactivation"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirming(false)}
          disabled={isPending}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}
