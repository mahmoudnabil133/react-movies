export const OL_BASE_URL = "https://openlibrary.org";
export const OL_COVER_BASE = "https://covers.openlibrary.org/b";
export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || "";

export const COVER_SIZE_SMALL = "S";
export const COVER_SIZE_MEDIUM = "M";
export const COVER_SIZE_LARGE = "L";

export const BOOK_TABS = [
  { id: "popular", label: "Popular" },
  { id: "fiction", label: "Fiction" },
  { id: "fantasy", label: "Fantasy" },
  { id: "science_fiction", label: "Science Fiction" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "history", label: "History" },
  { id: "science", label: "Science" },
  { id: "biography", label: "Biography" },
  { id: "young_adult", label: "Young Adult" },
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "new", label: "Newest" },
  { value: "old", label: "Oldest" },
  { value: "rating", label: "Highest Rated" },
];

export const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "fr", label: "Français", dir: "ltr" },
];

export const PLACEHOLDER_COVER = "/placeholder-poster.svg";
