import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchBookDetails, fetchEditions } from "../api/openlibrary";
import { useI18n } from "../hooks/useStores";
import BookHero from "../components/book-details/BookHero";
import AuthorInfo from "../components/book-details/AuthorInfo";
import SubjectsSection from "../components/book-details/SubjectsSection";
import EditionsGrid from "../components/book-details/EditionsGrid";
import { BookGridSkeleton } from "../components/books/BookSkeleton";
import { getDescription } from "../lib/formatters";

export default function BookDetails() {
  const { id } = useParams();
  const { t } = useI18n();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const workId = id.startsWith("/works/") ? id : `/works/${id}`;

    Promise.all([
      fetchBookDetails(workId),
      fetchEditions(workId).catch(() => ({ entries: [] })),
    ])
      .then(([workData, edData]) => {
        const bookWithMeta = {
          ...workData,
          _id: workData._id || id,
        };
        setBook(bookWithMeta);
        setAuthors(workData._authors || []);
        setEditions(edData.entries || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 px-4 max-w-7xl mx-auto">
        <BookGridSkeleton count={1} />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{error || t("noResults")}</p>
      </div>
    );
  }

  const description = getDescription(book);
  const subjects = book.subjects || [];

  return (
    <div className="min-h-screen bg-background pb-16">
      <BookHero book={book} authors={authors} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-12">
        {description && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
              {t("description")}
            </h2>
            <p
              className={`text-muted-foreground leading-relaxed max-w-4xl ${
                expandedDesc ? "" : "line-clamp-4"
              }`}
            >
              {description}
            </p>
            {description.length > 300 && (
              <button
                onClick={() => setExpandedDesc(!expandedDesc)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                [{expandedDesc ? t("readLess") : t("readMore")}]
              </button>
            )}
          </section>
        )}

        <AuthorInfo authors={authors} />
        <SubjectsSection subjects={subjects} />
        <EditionsGrid editions={editions} />
      </div>
    </div>
  );
}
