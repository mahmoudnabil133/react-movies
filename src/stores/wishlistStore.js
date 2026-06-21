import { create } from 'zustand';
import { getWishlist, addWishlistItem, removeWishlistItem } from '../api/wishlist';
import { fetchMovieDetails } from '../api/tmdb';
import { useAuthStore } from './authStore';

const ANON_WISHLIST_LIMIT = 2;
const ANON_STORAGE_KEY = 'movie-wishlist:anon';

function loadLocalWishlist(key) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalWishlist(key, wishlist) {
  try {
    localStorage.setItem(key, JSON.stringify(wishlist));
  } catch { }
}

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  isLoading: false,

  initializeWishlist: async () => {
    const { user, token } = useAuthStore.getState();
    const storageKey = user && (user.id || user.email)
      ? `movie-wishlist:${user.id || user.email}`
      : ANON_STORAGE_KEY;

    set({ isLoading: true });
    try {
      if (user && token) {
        try {
          const data = await getWishlist(token);
          const ids = data?.wishlist || [];
          const localMovies = loadLocalWishlist(storageKey);
          const localById = Object.fromEntries(localMovies.map((movie) => [movie.id, movie]));

          const movies = await Promise.all(
            ids.map(async (id) => {
              if (localById[id]) return localById[id];
              try {
                const details = await fetchMovieDetails(id);
                return {
                  id: details.id,
                  title: details.title,
                  poster_path: details.poster_path,
                };
              } catch {
                return null;
              }
            })
          );

          const filtered = movies.filter(Boolean);
          set({ wishlist: filtered, isLoading: false });
          saveLocalWishlist(storageKey, filtered);
        } catch {
          const local = loadLocalWishlist(storageKey);
          set({ wishlist: local, isLoading: false });
        }
      } else {
        const local = loadLocalWishlist(ANON_STORAGE_KEY);
        set({ wishlist: local, isLoading: false });
      }
    } catch (error) {
      console.error('Wishlist initialization failed:', error);
      set({ isLoading: false });
    }
  },

  isInWishlist: (id) => {
    return get().wishlist.some((m) => m.id === id);
  },

  addToWishlist: async (movie) => {
    const { user, token } = useAuthStore.getState();
    const storageKey = user && (user.id || user.email)
      ? `movie-wishlist:${user.id || user.email}`
      : ANON_STORAGE_KEY;

    if (get().isInWishlist(movie.id)) return true;

    if (!user) {
      if (get().wishlist.length >= ANON_WISHLIST_LIMIT) return false;
      const newMovie = { id: movie.id, title: movie.title, poster_path: movie.poster_path };
      const updated = [...get().wishlist, newMovie];
      set({ wishlist: updated });
      saveLocalWishlist(storageKey, updated);
      return true;
    }

    try {
      await addWishlistItem(movie.id, token);
      const newMovie = { id: movie.id, title: movie.title, poster_path: movie.poster_path };
      const updated = [...get().wishlist, newMovie];
      set({ wishlist: updated });
      saveLocalWishlist(storageKey, updated);
      return true;
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      return false;
    }
  },

  removeFromWishlist: async (id) => {
    const { user, token } = useAuthStore.getState();
    const storageKey = user && (user.id || user.email)
      ? `movie-wishlist:${user.id || user.email}`
      : ANON_STORAGE_KEY;

    if (!get().isInWishlist(id)) return true;

    if (user) {
      try {
        await removeWishlistItem(id, token);
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
      }
    }

    const updated = get().wishlist.filter((m) => m.id !== id);
    set({ wishlist: updated });
    saveLocalWishlist(storageKey, updated);
    return true;
  },

  toggleWishlist: async (movie) => {
    if (get().isInWishlist(movie.id)) {
      return get().removeFromWishlist(movie.id);
    }
    return get().addToWishlist(movie);
  },

  clearWishlist: () => {
    set({ wishlist: [] });
    localStorage.removeItem(ANON_STORAGE_KEY);
  },
}));
