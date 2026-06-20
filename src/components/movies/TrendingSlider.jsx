import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";
import { getImageUrl, formatRating, formatVoteCount } from "../../lib/formatters";
import { useI18n } from "../../context/I18nContext";
import WishlistButton from "../shared/WishlistButton";

export default function TrendingSlider({ movies, onTrailerClick }) {
  const { t } = useI18n();
  const autoplayRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [emblaApi, isPaused]);

  if (!movies?.length) return null;

  return (
    <div
      className="relative -mt-[72px] pt-[72px] group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {movies.map((movie, movieIdx) => (
            <div
              key={movie.id}
              className="relative min-w-0 flex-[0_0_100%] min-h-[80vh] md:min-h-[75vh] flex items-end overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-[8s]"
                style={{
                  backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
                }}
              />
              <div className="absolute inset-0 backdrop-blur-sm bg-background/60" />
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row gap-8 items-end">
                <Link to={`/movie/${movie.id}`} className="shrink-0 group/poster hidden sm:block">
                  <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-36 md:w-44 lg:w-52 rounded-xl shadow-2xl shadow-black/50 border border-border transition-all duration-500 group-hover/poster:scale-105 group-hover/poster:shadow-blue-500/20"
                  />
                </Link>

                <div className="flex-1 space-y-3 md:space-y-4 animate-fade-in max-w-2xl">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase">
                      Trending Now
                    </span>
                    <span className="text-xs text-muted-foreground">
                      #{movieIdx + 1} · {t("thisWeek") || "This Week"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    {movie.title}
                    {movie.release_date && (
                      <span className="text-muted-foreground font-normal ms-2 md:ms-3 text-lg md:text-2xl">
                        ({new Date(movie.release_date).getFullYear()})
                      </span>
                    )}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {formatRating(movie.vote_average)}
                      <span className="text-muted-foreground font-normal">
                        /10 ({formatVoteCount(movie.vote_count)} {t("votes")})
                      </span>
                    </span>
                    {movie.media_type && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground border border-border">
                        {movie.media_type}
                      </span>
                    )}
                  </div>

                  {movie.tagline && (
                    <p className="text-muted-foreground italic text-base md:text-lg">"{movie.tagline}"</p>
                  )}

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                    {movie.overview}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => onTrailerClick(movie.id)}
                      className="flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 font-medium transition-all active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      {t("watchTrailer")}
                    </button>
                    <WishlistButton movie={movie} variant="hero" />
                    <Link
                      to={`/movie/${movie.id}`}
                      className="px-5 md:px-6 py-2.5 md:py-3 rounded-lg bg-muted hover:bg-accent text-foreground font-medium transition-all border border-border active:scale-95"
                    >
                      {t("overview")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/40 hover:bg-background/70 text-foreground flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-border hover:scale-110"
        aria-label="Previous"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/40 hover:bg-background/70 text-foreground flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-border hover:scale-110"
        aria-label="Next"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-blue-500 w-6 md:w-8 h-2 md:h-2.5 shadow-lg shadow-blue-500/40"
                : "bg-foreground/30 hover:bg-foreground/50 w-2 h-2 md:w-2.5 md:h-2.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-8 z-20 hidden sm:block">
        <span className="text-xs text-muted-foreground font-mono">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(movies.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
