import { create } from 'zustand';
import { fetchGenres } from '../api/tmdb';

export const useGenresStore = create((set, get) => ({
  genres: [],
  isLoading: false,
  error: null,

  loadGenres: async () => {
    if (get().genres.length > 0) return get().genres;

    set({ isLoading: true, error: null });
    try {
      const data = await fetchGenres();
      const genres = data.genres || [];
      set({ genres, isLoading: false });
      return genres;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      return [];
    }
  },
}));
