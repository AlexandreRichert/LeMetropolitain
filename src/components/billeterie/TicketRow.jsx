"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";

export default function TicketRow({ ticket }) {
  const quantity = useCartStore((s) => s.tickets[ticket.id] ?? 0);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);

  const isBelowMinimum =
    ticket.minQuantity && quantity > 0 && quantity < ticket.minQuantity;

  return (
    <div
      data-anim-item
      className="flex items-center justify-between gap-6 border-b border-line py-6"
    >
      <div>
        <h3 className="font-display text-2xl leading-none">{ticket.label}</h3>
        <p className="cartel mt-2 text-stone">
          {ticket.price === 0 ? "Gratuit" : formatPrice(ticket.price)}
          {ticket.note && ` · ${ticket.note}`}
        </p>
        {isBelowMinimum && (
          <p className="cartel mt-2 text-accent">
            Minimum {ticket.minQuantity} personnes pour ce tarif
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          onClick={() => decrement(ticket.id)}
          disabled={quantity === 0}
          aria-label={`Retirer un billet ${ticket.label}`}
          className="h-9 w-9 border border-line text-lg leading-none transition-colors hover:border-ink disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center font-display text-xl tabular-nums">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => increment(ticket.id)}
          aria-label={`Ajouter un billet ${ticket.label}`}
          className="h-9 w-9 border border-ink bg-ink text-lg leading-none text-paper transition-colors hover:bg-accent hover:border-accent"
        >
          +
        </button>
      </div>
    </div>
  );
}
