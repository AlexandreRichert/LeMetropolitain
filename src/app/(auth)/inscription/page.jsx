"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import Section from "@/components/ui/Section";
import { signUp } from "@/lib/auth-client";

export default function InscriptionPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    await signUp.email(
      {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        onSuccess: () => router.push("/compte"),
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsSubmitting(false);
        },
      },
    );
  }

  return (
    <Section
      eyebrow="Compte"
      title="Créer un compte"
      intro="Inscrivez-vous pour retrouver vos favoris et vos billets."
      className="pt-24"
    >
      <form
        onSubmit={handleSubmit}
        className="grid max-w-md gap-6"
        aria-busy={isSubmitting}
      >
        <div className="grid gap-2">
          <label htmlFor="name" className="cartel text-stone">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full border-b border-line bg-transparent py-2 text-ink placeholder:text-stone focus:border-accent focus:outline-none"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="cartel text-stone">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full border-b border-line bg-transparent py-2 text-ink placeholder:text-stone focus:border-accent focus:outline-none"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="cartel text-stone">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full border-b border-line bg-transparent py-2 text-ink placeholder:text-stone focus:border-accent focus:outline-none"
          />
          <p className="text-sm text-stone">8 caractères minimum.</p>
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Création…" : "Créer mon compte"}
        </Button>

        <p className="text-sm text-stone">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="link-underline text-ink">
            Se connecter
          </Link>
        </p>
      </form>
    </Section>
  );
}
