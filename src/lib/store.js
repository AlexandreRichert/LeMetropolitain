import { create } from 'zustand'

export const useStore = create((set) => ({
  destinationUrl: '',
  setDestinationUrl: (destinationUrl) => set({ destinationUrl }),

  isTransitionActive: false,
  setIsTransitionActive: (isTransitionActive) => set({ isTransitionActive }),

  isFirstRender: true,
  setIsFirstRender: (isFirstRender) => set({ isFirstRender }),
}))
