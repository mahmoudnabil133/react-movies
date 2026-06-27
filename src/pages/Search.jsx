import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { searchBooks } from "../api/openlibrary";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useI18n, useFilters, useSubjects } from "../hooks/useStores";
import { SORT_OPTIONS } from "../lib/constants";
import SearchBar from "../components/search/SearchBar";
import BookFilters from "../components/books/BookFilters";
import BookGrid from "../components/books/BookGrid";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { t } = useI18n();
  const { subjects } = useSubjects();
  const {
    selectedSubject,
    sortBy,
    yearFrom,
    yearTo,
    scrollMode,
    setSelectedSubject,
    setSortBy,
    setYearFrom,
    setYearTo,
    setScrollMode,
  } = useFilters();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadResults = useCallback(
    async (pageNum, append = false) => {
      if (!query.trim()) {
        setBooks([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchBooks(query, {
          page: pageNum,
          limit: 20,
          sort: sortBy,
          yearFrom,
          yearTo,
          subject: selectedSubject,
        });

        setBooks((prev) => (append ? [...prev, ...(data.docs || [])] : data.docs || []));
        setTotalPages(Math.ceil((data.numFound || 0) / 20) || 1);
        setPage(pageNum);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [query, selectedSubject, sortBy, yearFrom, yearTo]
  );

  useEffect(() => {
    setPage(1);
    loadResults(1, false);
  }, [query, selectedSubject, sortBy, yearFrom, yearTo, scrollMode]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) loadResults(page + 1, true);
  }, [loading, page, totalPages, loadResults]);

  const lastElementRef = useInfiniteScroll(
    loadMore,
    scrollMode === "infinite" && page < totalPages,
    loading
  );

  const sortOptions = SORT_OPTIONS.map((opt) => ({
    ...opt,
    label: opt.value === "relevance"
      ? "Relevance"
      : opt.value === "new"
        ? t("upcoming")
        : opt.value === "old"
          ? "Oldest"
          : t("topRated"),
  }));

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <SearchBar initialQuery={query} autoFocus showSuggestions fullWidth />
        </div>

        {query && (
          <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
            {t("resultsFor")} <span className="text-blue-400">"{query}"</span>
          </h1>
        )}

        <BookFilters
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          sortBy={sortBy}
          onSortChange={setSortBy}
          yearFrom={yearFrom}
          yearTo={yearTo}
          onYearFromChange={setYearFrom}
          onYearToChange={setYearTo}
          scrollMode={scrollMode}
          onScrollModeChange={setScrollMode}
          sortOptions={sortOptions}
        />

        <BookGrid
          books={books}
          loading={loading}
          lastElementRef={lastElementRef}
          scrollMode={scrollMode}
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => loadResults(p, false)}
        />
      </div>
    </div>
  );
}
