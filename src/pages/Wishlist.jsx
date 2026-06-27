import { Link } from "react-router";
import { useI18n, useWishlist } from "../hooks/useStores";
import BookCard from "../components/books/BookCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const { t } = useI18n();

  const books = wishlist.map((item) => ({
    key: `/works/${item._id}`,
    title: item.title,
    cover_i: item.cover_i,
    first_publish_year: item.first_publish_year,
    author_name: item.author_name,
    ratings_average: item.ratings_average,
    subject: item.subject,
    _id: item._id,
  }));

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">{t("wishlist")}</h1>
        {books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">{t("noResults")}</p>
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              {t("home")} →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {books.map((book) => (
              <BookCard key={book._id || book.key} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
