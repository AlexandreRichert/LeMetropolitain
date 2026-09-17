import { create } from 'zustand'
import { OPTIONS, TICKETS } from '@/lib/constants'

export const useCartStore = create((set) => ({
  tickets: {}, // { [ticketId]: quantité }
  options: {}, // { [optionId]: true }

  setTicket: (id, quantity) =>
    set((state) => {
      const tickets = { ...state.tickets }
      if (quantity <= 0) delete tickets[id]
      else tickets[id] = quantity
      return { tickets }
    }),

  increment: (id) => set((state) => ({ tickets: { ...state.tickets, [id]: (state.tickets[id] ?? 0) + 1 } })),

  decrement: (id) =>
    set((state) => {
      const next = (state.tickets[id] ?? 0) - 1
      const tickets = { ...state.tickets }
      if (next <= 0) delete tickets[id]
      else tickets[id] = next
      return { tickets }
    }),

  toggleOption: (id) =>
    set((state) => {
      const options = { ...state.options }
      if (options[id]) delete options[id]
      else options[id] = true
      return { options }
    }),

  reset: () => set({ tickets: {}, options: {} }),
}))

export function getTotals({ tickets = {}, options = {} }) {
  const ticketLines = Object.entries(tickets).map(([id, quantity]) => {
    const ticket = TICKETS.find((t) => t.id === id)
    return {
      ...ticket,
      quantity,
      subtotal: ticket.price * quantity,
      // Le tarif groupe n'est valable qu'à partir de 10 personnes.
      invalid: ticket.minQuantity ? quantity < ticket.minQuantity : false,
    }
  })

  const visitors = ticketLines.reduce((sum, line) => sum + line.quantity, 0)

  const optionLines = Object.keys(options).map((id) => {
    const option = OPTIONS.find((o) => o.id === id)
    return {
      ...option,
      quantity: visitors,
      // les options sont facturées par personne
      subtotal: option.price * visitors,
    }
  })

  const total = ticketLines.reduce((s, l) => s + l.subtotal, 0) + optionLines.reduce((s, l) => s + l.subtotal, 0)

  return {
    ticketLines,
    optionLines,
    visitors,
    total,
    hasError: ticketLines.some((l) => l.invalid),
    isEmpty: visitors === 0,
  }
}
