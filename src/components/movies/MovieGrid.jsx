import MovieCard from "./MovieCard";
import MovieSkeleton, { MovieGridSkeleton } from "./MovieSkeleton";
import Pagination from "../shared/Pagination";
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
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 m-5">
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

      {scrollMode === "pagination" && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
}
