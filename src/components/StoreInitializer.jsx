import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useI18nStore } from '../stores/i18nStore';
import { useGenresStore } from '../stores/genresStore';
import { LANGUAGES } from '../lib/constants';

export default function StoreInitializer({ children }) {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const lang = useI18nStore((s) => s.lang);

  useEffect(() => {
    useAuthStore.getState().initializeAuth();
    useGenresStore.getState().loadGenres();
  }, []);

  useEffect(() => {
    useWishlistStore.getState().initializeWishlist();
  }, [user, token]);

  useEffect(() => {
    const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = current.dir;
  }, [lang]);

  return children;
}
