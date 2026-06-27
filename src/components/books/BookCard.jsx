import { Link } from "react-router";
import { getCoverUrl, formatRating } from "../../lib/formatters";

export default function BookCard({ book }) {
  const workId = book.key?.replace("/works/", "");
  const coverId = book.cover_i;
  const rating = book.ratings_average;

  return (
    <Link
      to={`/book/${workId}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={getCoverUrl(coverId)}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {book.author_name && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              by {book.author_name.slice(0, 2).join(", ")}
            </p>
          )}
        </div>
        {rating > 0 && (
          <span className="absolute top-2 end-2 px-2 py-0.5 rounded-md bg-background/70 text-yellow-400 text-xs font-semibold backdrop-blur-sm">
            ★ {formatRating(rating)}
          </span>
        )}
      </div>
      <div className="p-2.5 sm:p-3">
        <h3 className="font-semibold text-foreground text-xs sm:text-sm line-clamp-1 group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {book.first_publish_year || "N/A"}
          {book.author_name && (
            <span className="block truncate">{book.author_name[0]}</span>
          )}
        </p>
      </div>
    </Link>
  );
}
