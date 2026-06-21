import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../api/tmdb";
import { useI18n, useTrailer } from "../hooks/useStores";
import MovieHero from "../components/movie-details/MovieHero";
import CastScroll from "../components/movie-details/CastScroll";
import ReviewsSection from "../components/movie-details/ReviewsSection";
import RecommendationsGrid from "../components/movie-details/RecommendationsGrid";
import { MovieGridSkeleton } from "../components/movies/MovieSkeleton";

export default function MovieDetails() {
  const { id } = useParams();
  const { t } = useI18n();
  const { openTrailer } = useTrailer();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOverview, setExpandedOverview] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovieDetails(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleTrailerClick = () => {
    openTrailer(id, movie?.videos?.results);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4 max-w-7xl mx-auto">
        <MovieGridSkeleton count={1} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{error || t("noResults")}</p>
      </div>
    );
  }

  const cast = movie.credits?.cast || [];
  const crew = movie.credits?.crew || [];
  const reviews = movie.reviews?.results || [];
  const recommendations = movie.recommendations?.results || [];

  return (
    <div className="min-h-screen bg-background pb-16">
      <MovieHero movie={movie} onTrailerClick={handleTrailerClick} />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
            {t("overview")}
          </h2>
          <p
            className={`text-muted-foreground leading-relaxed max-w-4xl ${
              expandedOverview ? "" : "line-clamp-4"
            }`}
          >
            {movie.overview || "—"}
          </p>
          {movie.overview?.length > 300 && (
            <button
              onClick={() => setExpandedOverview(!expandedOverview)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              [{expandedOverview ? t("readLess") : t("readMore")}]
            </button>
          )}
        </section>

        <CastScroll cast={cast} crew={crew} />
        <ReviewsSection reviews={reviews} />
        <RecommendationsGrid movies={recommendations} />
      </div>
    </div>
  );
}
