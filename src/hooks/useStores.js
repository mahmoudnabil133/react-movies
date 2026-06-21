import { useAuthStore } from '../stores/authStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useI18nStore } from '../stores/i18nStore';
import { useFiltersStore } from '../stores/filtersStore';
import { useGenresStore } from '../stores/genresStore';
import { useTrailerStore } from '../stores/trailerStore';
import { LANGUAGES } from '../lib/constants';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isLoading = useAuthStore((s) => s.isLoading);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);

  return { user, token, isLoading, login, register, logout };
}

export function useWishlist() {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const isLoading = useWishlistStore((s) => s.isLoading);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  return { wishlist, isLoading, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist };
}

export function useI18n() {
  const lang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);
  const languages = useI18nStore((s) => s.languages);
  const t = useI18nStore((s) => s.t);
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr';

  return { lang, setLang, languages, t, dir };
}

export function useFilters() {
  const activeTab = useFiltersStore((s) => s.activeTab);
  const selectedGenre = useFiltersStore((s) => s.selectedGenre);
  const sortBy = useFiltersStore((s) => s.sortBy);
  const yearFrom = useFiltersStore((s) => s.yearFrom);
  const yearTo = useFiltersStore((s) => s.yearTo);
  const scrollMode = useFiltersStore((s) => s.scrollMode);
  const setActiveTab = useFiltersStore((s) => s.setActiveTab);
  const setSelectedGenre = useFiltersStore((s) => s.setSelectedGenre);
  const setSortBy = useFiltersStore((s) => s.setSortBy);
  const setYearFrom = useFiltersStore((s) => s.setYearFrom);
  const setYearTo = useFiltersStore((s) => s.setYearTo);
  const setScrollMode = useFiltersStore((s) => s.setScrollMode);
  const resetFilters = useFiltersStore((s) => s.resetFilters);

  const hasFilters =
    selectedGenre || yearFrom || yearTo || sortBy !== 'popularity.desc';

  return {
    activeTab,
    selectedGenre,
    sortBy,
    yearFrom,
    yearTo,
    scrollMode,
    hasFilters,
    setActiveTab,
    setSelectedGenre,
    setSortBy,
    setYearFrom,
    setYearTo,
    setScrollMode,
    resetFilters,
  };
}

export function useGenres() {
  const genres = useGenresStore((s) => s.genres);
  const isLoading = useGenresStore((s) => s.isLoading);
  const loadGenres = useGenresStore((s) => s.loadGenres);

  return { genres, isLoading, loadGenres };
}

export function useTrailer() {
  const videoKey = useTrailerStore((s) => s.videoKey);
  const isOpen = useTrailerStore((s) => s.isOpen);
  const openTrailer = useTrailerStore((s) => s.openTrailer);
  const closeTrailer = useTrailerStore((s) => s.closeTrailer);

  return { videoKey, isOpen, openTrailer, closeTrailer };
}
