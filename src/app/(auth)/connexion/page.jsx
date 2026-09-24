import AuthArtPanel from "@/components/auth/AuthArtPanel";
import ConnexionForm from "@/components/auth/ConnexionForm";
import { getArtwork } from "@/lib/museum";

export default async function ConnexionPage() {
  const artwork = await getArtwork("starry-night");

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2 lg:min-h-[calc(100vh-5rem)]">
      <AuthArtPanel artwork={artwork} className="hidden lg:block" />

      <div className="flex items-center px-gutter py-16 md:px-10 md:py-24">
        <div className="mx-auto w-full max-w-md">
          <div className="border-t border-line pt-6">
            <p className="cartel mb-6 text-stone">Compte</p>
            <h1 className="text-title">Se connecter</h1>
            <p className="mt-6 text-lead text-ink-2">
              Accédez à votre compte pour retrouver vos favoris et vos
              billets.
            </p>
          </div>

          <div className="mt-10">
            <ConnexionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
