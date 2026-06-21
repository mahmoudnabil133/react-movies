import { Link } from "react-router";
import { getImageUrl, formatRating, formatVoteCount } from "../../lib/formatters";
import { useI18n } from "../../hooks/useStores";
import WishlistButton from "../shared/WishlistButton";

export default function HeroBanner({ movie, onTrailerClick }) {
  const { t } = useI18n();
  if (!movie) return null;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <section className="relative w-full min-h-[70vh] flex items-end overflow-hidden -mt-[72px] pt-[72px]">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
        }}
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-background/70" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full flex flex-col md:flex-row gap-8 items-end">
        <Link to={`/movie/${movie.id}`} className="shrink-0 group">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-44 md:w-52 rounded-xl shadow-2xl shadow-black/50 border border-border transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex-1 space-y-4 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {movie.title}
            {year && <span className="text-muted-foreground font-normal ms-3">({year})</span>}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              ★ {formatRating(movie.vote_average)}
              <span className="text-muted-foreground font-normal">
                /10 ({formatVoteCount(movie.vote_count)} {t("votes")})
              </span>
            </span>
            {movie.genre_ids?.length > 0 && (
              <span className="text-muted-foreground">
                {movie.genre_ids.slice(0, 3).join(" · ")}
              </span>
            )}
          </div>

          {movie.tagline && (
            <p className="text-muted-foreground italic text-lg">"{movie.tagline}"</p>
          )}

          <p className="text-muted-foreground max-w-2xl line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onTrailerClick}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 font-medium transition-all"
            >
              ▶ {t("watchTrailer")}
            </button>
            <WishlistButton movie={movie} variant="hero" />
            <Link
              to={`/movie/${movie.id}`}
              className="px-6 py-3 rounded-lg bg-muted hover:bg-accent text-foreground font-medium transition-all border border-border"
            >
              {t("overview")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
