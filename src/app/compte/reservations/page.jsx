import ReservationsSection from "@/components/compte/ReservationsSection";
import { getBookings } from "@/lib/reservations";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Réservations",
};

export default async function ReservationsPage() {
  const session = await getSession();
  const bookings = await getBookings(session.user.id);

  return <ReservationsSection bookings={bookings} />;
}
