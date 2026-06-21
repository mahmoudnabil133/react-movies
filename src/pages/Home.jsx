import { useState, useEffect, useCallback } from "react";
import { MOVIE_TABS, SORT_OPTIONS } from "../lib/constants";
import { fetchMoviesByCategory, discoverMovies, fetchTrending } from "../api/tmdb";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useI18n, useFilters, useGenres, useTrailer } from "../hooks/useStores";
import TrendingSlider from "../components/movies/TrendingSlider";
import TabBar from "../components/movies/TabBar";
import MovieFilters from "../components/movies/MovieFilters";
import MovieGrid from "../components/movies/MovieGrid";

export default function Home() {
  const { t } = useI18n();
  const { genres } = useGenres();
  const { openTrailer } = useTrailer();
  const {
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
  } = useFilters();

  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrending("week").then((data) => {
      setTrendingMovies(data.results || []);
      setHeroMovie(data.results?.[0] || null);
    }).catch(console.error);
  }, []);

  const loadMovies = useCallback(
    async (pageNum, append = false) => {
      setLoading(true);
      try {
        let data;
        if (hasFilters) {
          data = await discoverMovies({
            page: pageNum,
            genre: selectedGenre,
            sortBy,
            yearFrom,
            yearTo,
          });
        } else {
          data = await fetchMoviesByCategory(activeTab, pageNum);
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
    [activeTab, hasFilters, selectedGenre, sortBy, yearFrom, yearTo]
  );

  useEffect(() => {
    setPage(1);
    loadMovies(1, false);
  }, [loadMovies]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      loadMovies(page + 1, true);
    }
  }, [loading, page, totalPages, loadMovies]);

  const lastElementRef = useInfiniteScroll(
    loadMore,
    scrollMode === "infinite" && page < totalPages,
    loading
  );

  const handleTrailerClick = (movieId) => {
    const id = movieId || heroMovie?.id;
    if (id) openTrailer(id);
  };

  const sortOptions = SORT_OPTIONS.map((opt) => ({
    ...opt,
    label: opt.value.includes("popularity")
      ? t("popular")
      : opt.value.includes("vote_average")
        ? t("topRated")
        : t("upcoming"),
  }));

  return (
    <div className="min-h-screen bg-background">
      <TrendingSlider movies={trendingMovies} onTrailerClick={handleTrailerClick} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <TabBar tabs={MOVIE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

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
          onPageChange={(p) => loadMovies(p, false)}
        />
      </div>
    </div>
  );
}
