import DeactivateAccountButton from "@/components/compte/DeactivateAccountButton";
import { formatDate } from "@/lib/utils";

export default function PersonalInfoSection({ user }) {
  return (
    <div className="max-w-md">
      <dl className="grid gap-6">
        <div>
          <dt className="cartel text-stone">Nom</dt>
          <dd className="mt-1 text-lg">{user.name}</dd>
        </div>
        <div>
          <dt className="cartel text-stone">Email</dt>
          <dd className="mt-1 text-lg">{user.email}</dd>
        </div>
        <div>
          <dt className="cartel text-stone">Membre depuis</dt>
          <dd className="mt-1 text-lg">{formatDate(user.createdAt)}</dd>
        </div>
      </dl>

      <div className="mt-12 border-t border-line pt-8">
        <p className="cartel mb-4 text-accent">Zone de danger</p>
        <DeactivateAccountButton />
      </div>
    </div>
  );
}
