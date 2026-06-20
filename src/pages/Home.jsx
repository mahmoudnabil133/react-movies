import { useState, useEffect, useCallback } from "react";
import { toast } from "../lib/toast";
import { MOVIE_TABS, SORT_OPTIONS } from "../lib/constants";
import { fetchMoviesByCategory, discoverMovies, fetchGenres, fetchMovieVideos, fetchTrending } from "../api/tmdb";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useI18n } from "../context/I18nContext";
import TrendingSlider from "../components/movies/TrendingSlider";
import TabBar from "../components/movies/TabBar";
import MovieFilters from "../components/movies/MovieFilters";
import MovieGrid from "../components/movies/MovieGrid";
import TrailerModal from "../components/shared/TrailerModal";

export default function Home() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrollMode, setScrollMode] = useState("infinite");

  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const hasFilters = selectedGenre || yearFrom || yearTo || sortBy !== "popularity.desc";

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres || [])).catch(console.error);
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
  }, [activeTab, selectedGenre, sortBy, yearFrom, yearTo]);

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

  const handleTrailerClick = async (movieId) => {
    const id = movieId || heroMovie?.id;
    if (!id) return;
    try {
      const data = await fetchMovieVideos(id);
      const trailer = data.results?.find(
        (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        toast.error("No trailer available for this movie.");
      }
    } catch (err) {
      toast.error("Failed to load trailer.");
    }
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

      {showTrailer && (
        <TrailerModal videoKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
}
