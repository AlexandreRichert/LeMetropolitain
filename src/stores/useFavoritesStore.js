import { create } from "zustand";

export const useFavoritesStore = create((set, get) => ({
  ids: [],
  hydrated: false,
  hydrating: false,

  fetchFavorites: async () => {
    if (get().hydrated || get().hydrating) return;
    set({ hydrating: true });
    try {
      const res = await fetch("/api/favoris");
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      set({ ids: data.ids, hydrated: true, hydrating: false });
    } catch {
      set({ hydrating: false });
    }
  },

  toggle: async (artworkId) => {
    const wasFavorite = get().ids.includes(artworkId);
    set((state) => ({
      ids: wasFavorite
        ? state.ids.filter((id) => id !== artworkId)
        : [...state.ids, artworkId],
    }));

    try {
      const res = await fetch("/api/favoris", {
        method: wasFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId }),
      });
      if (!res.ok) throw new Error("toggle failed");
    } catch {
      set((state) => ({
        ids: wasFavorite
          ? [...state.ids, artworkId]
          : state.ids.filter((id) => id !== artworkId),
      }));
    }
  },

  reset: () => set({ ids: [], hydrated: false, hydrating: false }),
}));
