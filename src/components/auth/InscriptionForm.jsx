"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthCanvas from "@/components/auth/AuthCanvas";
import AuthField from "@/components/auth/AuthField";
import PasswordField from "@/components/auth/PasswordField";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { signUp } from "@/lib/auth-client";
import { getAuthErrorField, getAuthErrorMessage } from "@/lib/auth-errors";
import { validatePassword } from "@/lib/password";

export default function InscriptionForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    if (!name || !email) {
      setFormError("Merci de renseigner votre nom et votre email.");
      return;
    }

    const passwordIssues = validatePassword(password, { email, name });
    if (passwordIssues.length) {
      setFieldErrors({ password: passwordIssues.join(" ") });
      return;
    }
    if (password !== confirmPassword) {
      setFieldErrors({
        confirmPassword: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setIsSubmitting(true);
    await signUp.email(
      { name, email, password },
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
          id="name"
          name="name"
          label="Nom"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={fieldErrors.name}
        />

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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
          showRequirements
        />

        <PasswordField
          id="confirm-password"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={fieldErrors.confirmPassword}
        />

        {formError && (
          <p className="text-sm text-accent" role="alert">
            {formError}
          </p>
        )}

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
    </AuthCanvas>
  );
}
