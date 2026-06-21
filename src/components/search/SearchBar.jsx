import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "../../hooks/useStores";
import { searchMovies } from "../../api/tmdb";
import { useDebounce } from "../../hooks/useDebounce";
import SearchSuggestions from "./SearchSuggestions";
import { cn } from "@/lib/utils";

export default function SearchBar({
  initialQuery = "",
  autoFocus = false,
  showSuggestions = true,
  fullWidth = false,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const navigate = useNavigate();
  const { t } = useI18n();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!showSuggestions || debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    setLoading(true);
    searchMovies(debouncedQuery, 1)
      .then((data) => {
        if (!cancelled) setSuggestions(data.results?.slice(0, 6) || []);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full", fullWidth ? "max-w-none" : "max-w-md")}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t("searchPlaceholder")}
          autoFocus={autoFocus}
          className="flex-1 min-w-0 px-3 sm:px-4 py-2 rounded-lg bg-muted border border-blue-500/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
        />
        <button
          type="submit"
          className="px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition shadow-md shrink-0 text-sm font-medium"
          aria-label={t("search")}
        >
          <span className="hidden sm:inline">{t("search")}</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {showSuggestions && open && query.length >= 2 && (
        <SearchSuggestions
          suggestions={suggestions}
          loading={loading}
          query={query}
          onSelect={(movie) => {
            navigate(`/movie/${movie.id}`);
            setOpen(false);
          }}
          onSearchAll={() => {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
