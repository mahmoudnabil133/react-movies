import { useI18n } from "../../hooks/useStores";
import MovieCard from "../movies/MovieCard";

export default function RecommendationsGrid({ movies = [] }) {
  const { t } = useI18n();
  if (!movies.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
        {t("recommendations")}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
