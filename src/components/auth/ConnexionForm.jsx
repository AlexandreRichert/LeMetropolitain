"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthCanvas from "@/components/auth/AuthCanvas";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { signIn } from "@/lib/auth-client";
import { getAuthErrorField, getAuthErrorMessage } from "@/lib/auth-errors";

export default function ConnexionForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    if (!email || !password) {
      setFormError("Merci de renseigner votre email et votre mot de passe.");
      return;
    }

    setIsSubmitting(true);
    await signIn.email(
      { email, password },
      {
        onSuccess: () => router.push("/compte"),
        onError: (ctx) => {
          const field = getAuthErrorField(ctx.error);
          const message = getAuthErrorMessage(ctx.error);
          setFieldErrors(field ? { [field]: message } : {});
          setFormError(field ? null : message);
          setIsSubmitting(false);
        },
      },
    );
  }

  return (
    <AuthCanvas>
      <form
        onSubmit={handleSubmit}
        className="grid gap-6"
        aria-busy={isSubmitting}
        noValidate
      >
        <AuthField
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={fieldErrors.email}
        />

        <PasswordField
          id="password"
          name="password"
          label="Mot de passe"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
        />

        {formError && (
          <p className="text-sm text-accent" role="alert">
            {formError}
          </p>
        )}

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
    </AuthCanvas>
  );
}
