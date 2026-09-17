"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import Section from "@/components/ui/Section";
import { signIn } from "@/lib/auth-client";

export default function ConnexionPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    await signIn.email(
      {
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
      title="Se connecter"
      intro="Accédez à votre compte pour retrouver vos favoris et vos billets."
      className="pt-24"
    >
      <form
        onSubmit={handleSubmit}
        className="grid max-w-md gap-6"
        aria-busy={isSubmitting}
      >
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
            autoComplete="current-password"
            className="w-full border-b border-line bg-transparent py-2 text-ink placeholder:text-stone focus:border-accent focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion…" : "Se connecter"}
        </Button>

        <p className="text-sm text-stone">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="link-underline text-ink">
            Créer un compte
          </Link>
        </p>
      </form>
    </Section>
  );
}
