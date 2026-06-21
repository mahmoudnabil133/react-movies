import { getImageUrl, formatRating, formatVoteCount, formatRuntime, formatYear } from "../../lib/formatters";
import { useI18n } from "../../hooks/useStores";
import WishlistButton from "../shared/WishlistButton";

export default function MovieHero({ movie, onTrailerClick }) {
  const { t } = useI18n();
  if (!movie) return null;

  const genres = movie.genres?.map((g) => g.name).join(" · ") || "";
  const runtime = formatRuntime(movie.runtime);
  const year = formatYear(movie.release_date);

  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh] flex items-end overflow-hidden -mt-[72px] pt-[72px]">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-40"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-end">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-32 sm:w-44 md:w-56 rounded-xl shadow-2xl shadow-black/50 border border-border shrink-0 mx-auto sm:mx-0"
        />

        <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-start w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground break-words">
            {movie.title}
            {year !== "N/A" && (
              <span className="text-muted-foreground font-normal ms-2 sm:ms-3 text-lg sm:text-2xl">
                ({year})
              </span>
            )}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
            <span className="text-yellow-400 font-semibold">
              ★ {formatRating(movie.vote_average)}/10
              <span className="text-muted-foreground font-normal ms-1">
                ({formatVoteCount(movie.vote_count)} {t("votes")})
              </span>
            </span>
            {genres && <span className="hidden sm:inline">{genres}</span>}
            {runtime !== "N/A" && <span>· {runtime}</span>}
            {movie.original_language && (
              <span className="uppercase text-xs px-2 py-0.5 rounded bg-muted">
                {movie.original_language}
              </span>
            )}
          </div>

          {genres && <p className="sm:hidden text-xs text-muted-foreground">{genres}</p>}

          {movie.tagline && (
            <p className="text-muted-foreground italic text-sm sm:text-base">"{movie.tagline}"</p>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2">
            <button
              onClick={onTrailerClick}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 font-medium transition-all active:scale-95 text-sm sm:text-base"
            >
              ▶ {t("trailer")}
            </button>
            <WishlistButton movie={movie} variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
