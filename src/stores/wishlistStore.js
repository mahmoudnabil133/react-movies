import { create } from 'zustand';
import { getWishlist, addWishlistItem, removeWishlistItem } from '../api/wishlist';
import { useAuthStore } from './authStore';

const ANON_WISHLIST_LIMIT = 2;
const ANON_STORAGE_KEY = 'book-wishlist:anon';

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
      ? `book-wishlist:${user.id || user.email}`
      : ANON_STORAGE_KEY;

    set({ isLoading: true });
    try {
      if (user && token) {
        try {
          const data = await getWishlist(token);
          const ids = data?.wishlist || [];
          const localBooks = loadLocalWishlist(storageKey);
          const localByKey = Object.fromEntries(localBooks.map((book) => [book._id, book]));

          const books = ids.map((id) => {
            if (localByKey[id]) return localByKey[id];
            return { _id: id, title: id, cover_i: null };
          });

          const filtered = books.filter(Boolean);
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
    return get().wishlist.some((b) => b._id === id);
  },

  addToWishlist: async (book) => {
    const { user, token } = useAuthStore.getState();
    const id = book.key?.replace("/works/", "") || book._id;
    const storageKey = user && (user.id || user.email)
      ? `book-wishlist:${user.id || user.email}`
      : ANON_STORAGE_KEY;

    if (get().isInWishlist(id)) return true;

    const newBook = {
      _id: id,
      title: book.title,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      author_name: book.author_name,
      ratings_average: book.ratings_average,
      subject: book.subject,
    };

    if (!user) {
      if (get().wishlist.length >= ANON_WISHLIST_LIMIT) return false;
      const updated = [...get().wishlist, newBook];
      set({ wishlist: updated });
      saveLocalWishlist(storageKey, updated);
      return true;
    }

    try {
      await addWishlistItem(id, token);
      const updated = [...get().wishlist, newBook];
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
      ? `book-wishlist:${user.id || user.email}`
      : ANON_STORAGE_KEY;

    if (!get().isInWishlist(id)) return true;

    if (user) {
      try {
        await removeWishlistItem(id, token);
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
      }
    }

    const updated = get().wishlist.filter((b) => b._id !== id);
    set({ wishlist: updated });
    saveLocalWishlist(storageKey, updated);
    return true;
  },

  toggleWishlist: async (book) => {
    const id = book.key?.replace("/works/", "") || book._id;
    if (get().isInWishlist(id)) {
      return get().removeFromWishlist(id);
    }
    return get().addToWishlist(book);
  },

  clearWishlist: () => {
    set({ wishlist: [] });
    localStorage.removeItem(ANON_STORAGE_KEY);
  },
}));
