import { create } from 'zustand'

export const useAppStore = create((set) => ({
  isFirstRender: true,
  endFirstRender: () => set({ isFirstRender: false }),

  isMenuOpen: false,
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}))

/** Verrouille le scroll du body  */
export function lockScroll(locked) {
  if (typeof document === 'undefined') return
  document.body.dataset.lock = String(locked)
}
