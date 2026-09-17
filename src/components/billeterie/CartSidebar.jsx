"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import { getTotals, useCartStore } from "@/stores/useCartStore";
import { countTo, useGSAP } from "@/lib/lib";
import { formatPrice, plural } from "@/lib/utils";


export default function CartSidebar() {
  const tickets = useCartStore((s) => s.tickets);
  const options = useCartStore((s) => s.options);
  const reset = useCartStore((s) => s.reset);

  const { ticketLines, optionLines, visitors, total, hasError, isEmpty } = getTotals({
    tickets,
    options,
  });

  const totalRef = useRef(null);
  const previous = useRef(0);

  useGSAP(() => {
    countTo(totalRef.current, {
      from: previous.current,
      to: total,
      duration: 0.5,
      format: (value) => formatPrice(Math.round(value)),
    });
    previous.current = total;
  }, [total]);

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="border border-ink bg-paper-2 p-6">
        <p className="cartel border-b border-line pb-4 text-stone">Votre visite</p>

        {isEmpty ? (
          <p className="py-8 text-sm text-ink-2">
            Sélectionnez vos billets : le total se met à jour automatiquement.
          </p>
        ) : (
          <ul className="divide-y divide-line py-2">
            {[...ticketLines, ...optionLines].map((line) => (
              <li key={line.id} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-sm">
                  {line.label}
                  <span className="cartel ml-2 text-stone">× {line.quantity}</span>
                </span>
                <span className="text-sm tabular-nums">{formatPrice(line.subtotal)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 border-t border-ink pt-4">
          <div className="flex items-end justify-between">
            <span className="cartel text-stone">
              Total · {visitors} {plural(visitors || 1, "visiteur")}
            </span>
            <span ref={totalRef} className="font-display text-4xl tabular-nums">
              {formatPrice(0)}
            </span>
          </div>

          {hasError && (
            <p className="cartel mt-3 text-accent">
              Le tarif groupe demande au moins 10 personnes.
            </p>
          )}

          <Button
            className="mt-6 w-full"
            disabled={isEmpty || hasError}
            onClick={() => alert("TODO : tunnel de paiement")}
          >
            Réserver
          </Button>

          {!isEmpty && (
            <button type="button" onClick={reset} className="cartel link-underline mt-4 text-stone">
              Vider la sélection
            </button>
          )}
        </div>
      </div>

      <p className="cartel mt-4 text-stone">
        Plan du musée offert à l'accueil · Billets non remboursables
      </p>
    </aside>
  );
}
