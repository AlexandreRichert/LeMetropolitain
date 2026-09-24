import { OPTIONS, TICKETS } from "@/lib/constants";

/** Calcule les lignes et le total d'un panier { tickets, options } à partir des tarifs officiels. */
export function getTotals({ tickets = {}, options = {} }) {
  const ticketLines = Object.entries(tickets).map(([id, quantity]) => {
    const ticket = TICKETS.find((t) => t.id === id);
    return {
      ...ticket,
      quantity,
      subtotal: ticket.price * quantity,
      // Le tarif groupe n'est valable qu'à partir de 10 personnes.
      invalid: ticket.minQuantity ? quantity < ticket.minQuantity : false,
    };
  });

  const visitors = ticketLines.reduce((sum, line) => sum + line.quantity, 0);

  const optionLines = Object.keys(options).map((id) => {
    const option = OPTIONS.find((o) => o.id === id);
    return {
      ...option,
      quantity: visitors,
      // les options sont facturées par personne
      subtotal: option.price * visitors,
    };
  });

  const total =
    ticketLines.reduce((s, l) => s + l.subtotal, 0) +
    optionLines.reduce((s, l) => s + l.subtotal, 0);

  return {
    ticketLines,
    optionLines,
    visitors,
    total,
    hasError: ticketLines.some((l) => l.invalid),
    isEmpty: visitors === 0,
  };
}
