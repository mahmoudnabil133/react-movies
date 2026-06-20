import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "../../context/I18nContext";
import { searchMovies } from "../../api/tmdb";
import { useDebounce } from "../../hooks/useDebounce";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar({ initialQuery = "", autoFocus = false, showSuggestions = true }) {
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
    <div ref={wrapperRef} className="relative w-full max-w-md">
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
          className="flex-1 px-4 py-2 rounded-lg bg-muted border border-blue-500/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition shadow-md shrink-0"
        >
          {t("search")}
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
