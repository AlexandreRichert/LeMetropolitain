import ReservationTicketCard from "@/components/compte/ReservationTicketCard";
import Link from "@/components/ui/Link";

export default function ReservationsSection({ bookings }) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 border border-dashed border-accent/40 bg-paper py-20 text-center">
        <p className="cartel text-stone">
          Vous n'avez pas encore réservé de billets.
        </p>
        <Link href="/billeterie" className="link-underline cartel text-accent">
          Réserver une visite
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {bookings.map((booking) => (
        <ReservationTicketCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
