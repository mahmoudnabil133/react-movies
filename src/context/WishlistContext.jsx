import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getWishlist, addWishlistItem, removeWishlistItem } from "../api/wishlist";
import { fetchMovieDetails } from "../api/tmdb";

const WishlistContext = createContext(null);
const ANON_WISHLIST_LIMIT = 2;
const ANON_STORAGE_KEY = "movie-wishlist:anon";

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

export function WishlistProvider({ children }) {
  const { user, token } = useAuth() || {};
  const storageKey = user && (user.id || user.email) ? `movie-wishlist:${user.id || user.email}` : ANON_STORAGE_KEY;

  const [wishlist, setWishlist] = useState(() => loadLocalWishlist(storageKey));

  useEffect(() => {
    const loadWishlist = async () => {
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
          setWishlist(filtered);
        } catch {
          setWishlist(loadLocalWishlist(storageKey));
        }
      } else {
        setWishlist(loadLocalWishlist(storageKey));
      }
    };

    loadWishlist();
  }, [storageKey, user, token]);

  useEffect(() => {
    saveLocalWishlist(storageKey, wishlist);
  }, [storageKey, wishlist]);

  const isInWishlist = (id) => wishlist.some((m) => m.id === id);

  const addToWishlistLocal = (movie) => {
    setWishlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, { id: movie.id, title: movie.title, poster_path: movie.poster_path }];
    });
  };

  const removeFromWishlistLocal = (id) => {
    setWishlist((prev) => prev.filter((m) => m.id !== id));
  };

  const addToWishlist = async (movie) => {
    if (isInWishlist(movie.id)) return true;
    if (!user) {
      if (wishlist.length >= ANON_WISHLIST_LIMIT) return false;
      addToWishlistLocal(movie);
      return true;
    }

    await addWishlistItem(movie.id, token);
    addToWishlistLocal(movie);
    return true;
  };

  const removeFromWishlist = async (id) => {
    if (!isInWishlist(id)) return true;
    if (user) {
      await removeWishlistItem(id, token);
    }
    removeFromWishlistLocal(id);
    return true;
  };

  const toggleWishlist = async (movie) => {
    if (isInWishlist(movie.id)) {
      return removeFromWishlist(movie.id);
    }
    return addToWishlist(movie);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
