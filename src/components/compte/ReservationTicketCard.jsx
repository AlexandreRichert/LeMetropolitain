import { formatDate, formatPrice, plural } from "@/lib/utils";

export default function ReservationTicketCard({ booking }) {
  const reference = booking.id.slice(0, 8).toUpperCase();

  return (
    <div className="relative flex border border-accent/70 bg-paper shadow-[0_12px_32px_-8px_rgba(35,33,30,0.1)]">
      <div className="flex-1 p-6 sm:p-8">
        <p className="cartel text-stone">Le Métropolitain · Billet d'entrée</p>

        <p className="mt-3 font-display text-2xl leading-tight text-ink">
          {formatDate(booking.createdAt, { dateStyle: "long" })}
          <span className="ml-2 font-sans text-base font-medium text-stone">
            · {formatDate(booking.createdAt, { timeStyle: "short" })}
          </span>
        </p>

        <ul className="mt-4 grid gap-x-8 gap-y-2 border-t border-line pt-4 sm:grid-cols-2">
          {booking.items.map((item) => (
            <li
              key={item.id}
              className="flex items-baseline justify-between gap-4 text-sm"
            >
              <span>
                {item.label}
                <span className="cartel ml-2 text-stone">
                  × {item.quantity}
                </span>
              </span>
              <span className="tabular-nums">{formatPrice(item.subtotal)}</span>
            </li>
          ))}
        </ul>

        <p className="cartel mt-4 text-stone">Réf. {reference}</p>
      </div>

      <div className="relative hidden w-0 sm:block" aria-hidden="true">
        <span className="absolute inset-y-0 left-0 border-l-2 border-dashed border-accent/55" />
        <span className="absolute -left-[13px] -top-[13px] h-[26px] w-[26px] rounded-full border border-accent bg-paper" />
        <span className="absolute -bottom-[13px] -left-[13px] h-[26px] w-[26px] rounded-full border border-accent bg-paper" />
      </div>

      <div className="relative flex w-28 shrink-0 flex-col items-center justify-center gap-2 border-l border-dashed border-accent/30 p-4 text-center sm:w-48 sm:gap-3 sm:border-l-0 sm:p-6">
        <span
          aria-hidden="true"
          className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-accent bg-paper sm:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full border border-accent bg-paper sm:hidden"
        />

        <div>
          <p className="cartel text-stone">Total</p>
          <p className="font-display text-2xl text-accent sm:text-3xl">
            {formatPrice(booking.total)}
          </p>
        </div>

        <p className="cartel text-stone">
          {booking.visitors} {plural(booking.visitors, "visiteur")}
        </p>

        <span
          aria-hidden="true"
          className="hidden w-2/3 border-t border-dashed border-line sm:block"
        />

        <div
          aria-hidden="true"
          className="relative hidden h-14 w-14 items-center justify-center sm:flex"
        >
          <span className="absolute -top-0.5 -left-0.5 h-3.5 w-3.5 rounded-tl-sm border-l-2 border-t-2 border-accent" />
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-tr-sm border-r-2 border-t-2 border-accent" />
          <span className="absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 rounded-bl-sm border-b-2 border-l-2 border-accent" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-br-sm border-b-2 border-r-2 border-accent" />
          <svg
            viewBox="0 0 7 7"
            width="38"
            height="38"
            aria-hidden="true"
            className="text-ink"
          >
            <rect x="0" y="0" width="2" height="2" fill="currentColor" />
            <rect x="5" y="0" width="2" height="2" fill="currentColor" />
            <rect x="0" y="5" width="2" height="2" fill="currentColor" />
            <rect x="3" y="1" width="1" height="1" fill="currentColor" />
            <rect x="3" y="3" width="1" height="1" fill="currentColor" />
            <rect x="1" y="3" width="1" height="1" fill="currentColor" />
            <rect x="5" y="3" width="1" height="1" fill="currentColor" />
            <rect x="3" y="5" width="1" height="1" fill="currentColor" />
            <rect x="6" y="6" width="1" height="1" fill="currentColor" />
          </svg>
        </div>

        <p className="hidden max-w-[9rem] cartel text-stone sm:block">
          Présentez ce billet à l'accueil
        </p>
      </div>
    </div>
  );
}
