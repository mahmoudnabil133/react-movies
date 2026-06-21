import { Link } from "react-router";
import { useI18n, useWishlist } from "../hooks/useStores";
import MovieCard from "../components/movies/MovieCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("wishlist")}</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">{t("noResults")}</p>
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              {t("home")} →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {wishlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
