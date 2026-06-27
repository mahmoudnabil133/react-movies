import { getCoverUrl, formatRating, formatRatingCount, getDescription, formatYear } from "../../lib/formatters";
import { useI18n } from "../../hooks/useStores";
import WishlistButton from "../shared/WishlistButton";

export default function BookHero({ book, authors }) {
  const { t } = useI18n();
  if (!book) return null;

  const description = getDescription(book);
  const year = book.first_publish_year || formatYear(book.created?.value);

  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh] flex items-end overflow-hidden -mt-[72px] pt-[72px]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-end">
        <img
          src={getCoverUrl(book.covers?.[0])}
          alt={book.title}
          className="w-32 sm:w-44 md:w-56 rounded-xl shadow-2xl shadow-black/50 border border-border shrink-0 mx-auto sm:mx-0"
        />

        <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-start w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground break-words">
            {book.title}
            {year && year !== "N/A" && (
              <span className="text-muted-foreground font-normal ms-2 sm:ms-3 text-lg sm:text-2xl">
                ({year})
              </span>
            )}
          </h1>

          {authors && authors.length > 0 && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("by")}{" "}
              {authors.map((a, i) => (
                <span key={a.key || i}>
                  {i > 0 && ", "}
                  {a.name || "Unknown"}
                </span>
              ))}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
            {book.ratings_average > 0 && (
              <span className="text-yellow-400 font-semibold">
                ★ {formatRating(book.ratings_average)}
                <span className="text-muted-foreground font-normal ms-1">
                  ({formatRatingCount(book.ratings_count)} {t("ratings")})
                </span>
              </span>
            )}
            {book.number_of_pages_median && (
              <span>· {book.number_of_pages_median} pages</span>
            )}
          </div>

          {book.subjects && book.subjects.length > 0 && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
              {book.subjects.slice(0, 6).map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {description && (
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3 max-w-3xl">
              {description}
            </p>
          )}

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2">
            <WishlistButton book={book} variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
