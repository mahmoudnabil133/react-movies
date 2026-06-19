import MovieCard from "./MovieCard";
import MovieSkeleton, { MovieGridSkeleton } from "./MovieSkeleton";
import { useI18n } from "../../context/I18nContext";

export default function MovieGrid({
  movies,
  loading,
  lastElementRef,
  scrollMode,
  page,
  totalPages,
  onPageChange,
}) {
  const { t } = useI18n();

  if (loading && movies.length === 0) {
    return <MovieGridSkeleton count={12} />;
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1;
          return (
            <div key={movie.id} ref={isLast && scrollMode === "infinite" ? lastElementRef : null}>
              <MovieCard movie={movie} />
            </div>
          );
        })}
        {loading &&
          movies.length > 0 &&
          Array.from({ length: 6 }).map((_, i) => <MovieSkeleton key={`sk-${i}`} />)}
      </div>

      {scrollMode === "pagination" && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-30 hover:bg-white/10 transition-all"
          >
            {t("prev")}
          </button>
          <span className="text-gray-400 text-sm">
            {t("page")} {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-30 hover:bg-white/10 transition-all"
          >
            {t("next")}
          </button>
        </div>
      )}
    </div>
  );
}
