import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES } from "../lib/constants";

const translations = {
  en: {
    home: "Home",
    movies: "Movies",
    search: "Search",
    wishlist: "Wishlist",
    searchPlaceholder: "Search movies...",
    nowPlaying: "Now Playing",
    popular: "Popular",
    topRated: "Top Rated",
    upcoming: "Upcoming",
    genre: "Genre",
    allGenres: "All Genres",
    sortBy: "Sort By",
    yearFrom: "Year From",
    yearTo: "Year To",
    infiniteScroll: "Infinite Scroll",
    pagination: "Pagination",
    loadMore: "Load More",
    prev: "Previous",
    next: "Next",
    page: "Page",
    overview: "Overview",
    castCrew: "Cast & Crew",
    reviews: "Reviews",
    recommendations: "Recommendations",
    trailer: "Trailer",
    addWishlist: "Add to Wishlist",
    removeWishlist: "Remove from Wishlist",
    readMore: "Read more",
    readLess: "Read less",
    noResults: "No movies found",
    loading: "Loading...",
    votes: "votes",
    watchTrailer: "Watch Trailer",
    close: "Close",
    filters: "Filters",
    resultsFor: "Results for",
    noReviews: "No reviews yet",
    sceneNotFound: "Scene Not Found",
    wrongTurn: "This page took a wrong turn at the credits.",
    backToHome: "Back to Homepage",
    browseMovies: "Browse Movies",
  },
  ar: {
    home: "الرئيسية",
    movies: "الأفلام",
    search: "بحث",
    wishlist: "المفضلة",
    searchPlaceholder: "ابحث عن أفلام...",
    nowPlaying: "يعرض الآن",
    popular: "الأكثر شعبية",
    topRated: "الأعلى تقييماً",
    upcoming: "قريباً",
    genre: "النوع",
    allGenres: "كل الأنواع",
    sortBy: "ترتيب حسب",
    yearFrom: "من سنة",
    yearTo: "إلى سنة",
    infiniteScroll: "تمرير لا نهائي",
    pagination: "صفحات",
    loadMore: "تحميل المزيد",
    prev: "السابق",
    next: "التالي",
    page: "صفحة",
    overview: "نظرة عامة",
    castCrew: "طاقم التمثيل",
    reviews: "المراجعات",
    recommendations: "توصيات",
    trailer: "الإعلان",
    addWishlist: "أضف للمفضلة",
    removeWishlist: "إزالة من المفضلة",
    readMore: "اقرأ المزيد",
    readLess: "اقرأ أقل",
    noResults: "لا توجد أفلام",
    loading: "جاري التحميل...",
    votes: "تصويت",
    watchTrailer: "شاهد الإعلان",
    close: "إغلاق",
    filters: "تصفية",
    resultsFor: "نتائج البحث عن",
    noReviews: "لا توجد مراجعات",
    sceneNotFound: "المشهد غير موجود",
    wrongTurn: "هذه الصفحة أخذت منعطفاً خاطئاً عند الشارة.",
    backToHome: "العودة للرئيسية",
    browseMovies: "تصفح الأفلام",
  },
  fr: {
    home: "Accueil",
    movies: "Films",
    search: "Rechercher",
    wishlist: "Favoris",
    searchPlaceholder: "Rechercher des films...",
    nowPlaying: "À l'affiche",
    popular: "Populaires",
    topRated: "Mieux notés",
    upcoming: "Prochainement",
    genre: "Genre",
    allGenres: "Tous les genres",
    sortBy: "Trier par",
    yearFrom: "Année de",
    yearTo: "Année à",
    infiniteScroll: "Défilement infini",
    pagination: "Pagination",
    loadMore: "Charger plus",
    prev: "Précédent",
    next: "Suivant",
    page: "Page",
    overview: "Synopsis",
    castCrew: "Distribution",
    reviews: "Avis",
    recommendations: "Recommandations",
    trailer: "Bande-annonce",
    addWishlist: "Ajouter aux favoris",
    removeWishlist: "Retirer des favoris",
    readMore: "Lire plus",
    readLess: "Lire moins",
    noResults: "Aucun film trouvé",
    loading: "Chargement...",
    votes: "votes",
    watchTrailer: "Voir la bande-annonce",
    close: "Fermer",
    filters: "Filtres",
    resultsFor: "Résultats pour",
    noReviews: "Pas encore d'avis",
    sceneNotFound: "Scène introuvable",
    wrongTurn: "Cette page a pris un mauvais virage au générique.",
    backToHome: "Retour à l'accueil",
    browseMovies: "Parcourir les films",
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("movie-lang") || "en");

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = current.dir;
    localStorage.setItem("movie-lang", lang);
  }, [lang, current.dir]);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, dir: current.dir, t, languages: LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
