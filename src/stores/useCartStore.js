import { create } from "zustand";

export { getTotals } from "@/lib/billeterie";

export const useCartStore = create((set) => ({
  tickets: {}, // { [ticketId]: quantité }
  options: {}, // { [optionId]: true }

  setTicket: (id, quantity) =>
    set((state) => {
      const tickets = { ...state.tickets };
      if (quantity <= 0) delete tickets[id];
      else tickets[id] = quantity;
      return { tickets };
    }),

  increment: (id) =>
    set((state) => ({
      tickets: { ...state.tickets, [id]: (state.tickets[id] ?? 0) + 1 },
    })),

  decrement: (id) =>
    set((state) => {
      const next = (state.tickets[id] ?? 0) - 1;
      const tickets = { ...state.tickets };
      if (next <= 0) delete tickets[id];
      else tickets[id] = next;
      return { tickets };
    }),

  toggleOption: (id) =>
    set((state) => {
      const options = { ...state.options };
      if (options[id]) delete options[id];
      else options[id] = true;
      return { options };
    }),

  reset: () => set({ tickets: {}, options: {} }),
}));
