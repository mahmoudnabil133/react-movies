import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "movie-wishlist";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (id) => wishlist.some((m) => m.id === id);

  const addToWishlist = (movie) => {
    setWishlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, { id: movie.id, title: movie.title, poster_path: movie.poster_path }];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleWishlist = (movie) => {
    if (isInWishlist(movie.id)) removeFromWishlist(movie.id);
    else addToWishlist(movie);
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
