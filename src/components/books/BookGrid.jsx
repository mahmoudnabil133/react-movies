import BookCard from "./BookCard";
import BookSkeleton, { BookGridSkeleton } from "./BookSkeleton";
import Pagination from "../shared/Pagination";
import { useI18n } from "../../hooks/useStores";

export default function BookGrid({
  books,
  loading,
  lastElementRef,
  scrollMode,
  page,
  totalPages,
  onPageChange,
}) {
  const { t } = useI18n();

  if (loading && books.length === 0) {
    return <BookGridSkeleton count={12} />;
  }

  if (!loading && books.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg">{t("noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {books.map((book, index) => {
          const isLast = index === books.length - 1;
          return (
            <div key={book.key} ref={isLast && scrollMode === "infinite" ? lastElementRef : null}>
              <BookCard book={book} />
            </div>
          );
        })}
        {loading &&
          books.length > 0 &&
          Array.from({ length: 6 }).map((_, i) => <BookSkeleton key={`sk-${i}`} />)}
      </div>

      {scrollMode === "pagination" && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
}
