import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchMovieDetails, fetchMovieVideos } from "../api/tmdb";
import { useI18n } from "../context/I18nContext";
import MovieHero from "../components/movie-details/MovieHero";
import CastScroll from "../components/movie-details/CastScroll";
import ReviewsSection from "../components/movie-details/ReviewsSection";
import RecommendationsGrid from "../components/movie-details/RecommendationsGrid";
import TrailerModal from "../components/shared/TrailerModal";
import { MovieGridSkeleton } from "../components/movies/MovieSkeleton";

export default function MovieDetails() {
  const { id } = useParams();
  const { t } = useI18n();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [expandedOverview, setExpandedOverview] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovieDetails(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleTrailerClick = async () => {
    const videos = movie?.videos?.results || [];
    let trailer = videos.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );
    if (!trailer) {
      try {
        const data = await fetchMovieVideos(id);
        trailer = data.results?.find(
          (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
        );
      } catch {
        /* ignore */
      }
    }
    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1220] pt-24 px-4 max-w-7xl mx-auto">
        <MovieGridSkeleton count={1} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0b1220] flex items-center justify-center">
        <p className="text-gray-400">{error || t("noResults")}</p>
      </div>
    );
  }

  const cast = movie.credits?.cast || [];
  const crew = movie.credits?.crew || [];
  const reviews = movie.reviews?.results || [];
  const recommendations = movie.recommendations?.results || [];

  return (
    <div className="min-h-screen bg-[#0b1220] pb-16">
      <MovieHero movie={movie} onTrailerClick={handleTrailerClick} />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
            {t("overview")}
          </h2>
          <p
            className={`text-gray-300 leading-relaxed max-w-4xl ${
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

      {showTrailer && (
        <TrailerModal videoKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
}
