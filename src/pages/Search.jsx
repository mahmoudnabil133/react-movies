import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { searchMovies, discoverMovies } from "../api/tmdb";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useI18n, useFilters, useGenres } from "../hooks/useStores";
import { SORT_OPTIONS } from "../lib/constants";
import SearchBar from "../components/search/SearchBar";
import MovieFilters from "../components/movies/MovieFilters";
import MovieGrid from "../components/movies/MovieGrid";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { t } = useI18n();
  const { genres } = useGenres();
  const {
    selectedGenre,
    sortBy,
    yearFrom,
    yearTo,
    scrollMode,
    setSelectedGenre,
    setSortBy,
    setYearFrom,
    setYearTo,
    setScrollMode,
  } = useFilters();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadResults = useCallback(
    async (pageNum, append = false) => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }
      setLoading(true);
      try {
        let data;
        const hasFilters = selectedGenre || yearFrom || yearTo || sortBy !== "popularity.desc";

        if (hasFilters) {
          data = await discoverMovies({
            page: pageNum,
            genre: selectedGenre,
            sortBy,
            yearFrom,
            yearTo,
          });
          if (query) {
            data.results = data.results?.filter((m) =>
              m.title?.toLowerCase().includes(query.toLowerCase())
            );
          }
        } else {
          data = await searchMovies(query, pageNum);
        }

        setMovies((prev) => (append ? [...prev, ...(data.results || [])] : data.results || []));
        setTotalPages(data.total_pages || 1);
        setPage(pageNum);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [query, selectedGenre, sortBy, yearFrom, yearTo]
  );

  useEffect(() => {
    setPage(1);
    loadResults(1, false);
  }, [query, selectedGenre, sortBy, yearFrom, yearTo, scrollMode]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) loadResults(page + 1, true);
  }, [loading, page, totalPages, loadResults]);

  const lastElementRef = useInfiniteScroll(
    loadMore,
    scrollMode === "infinite" && page < totalPages,
    loading
  );

  const sortOptions = SORT_OPTIONS.map((opt) => ({
    ...opt,
    label: opt.value.includes("popularity")
      ? t("popular")
      : opt.value.includes("vote_average")
        ? t("topRated")
        : t("upcoming"),
  }));

  return (
    <div className="min-h-screen bg-background pb-16 m-5">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <SearchBar initialQuery={query} autoFocus showSuggestions />
        </div>

        {query && (
          <h1 className="text-2xl font-bold text-foreground">
            {t("resultsFor")} <span className="text-blue-400">"{query}"</span>
          </h1>
        )}

        <MovieFilters
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
          yearFrom={yearFrom}
          yearTo={yearTo}
          onYearFromChange={setYearFrom}
          onYearToChange={setYearTo}
          scrollMode={scrollMode}
          onScrollModeChange={setScrollMode}
          sortOptions={sortOptions}
        />

        <MovieGrid
          movies={movies}
          loading={loading}
          lastElementRef={lastElementRef}
          scrollMode={scrollMode}
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => loadResults(p, false)}
        />
      </div>
    </div>
  );
}
