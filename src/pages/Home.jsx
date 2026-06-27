import { useState, useEffect, useCallback } from "react";
import { BOOK_TABS, SORT_OPTIONS } from "../lib/constants";
import { searchBooks, fetchTrending } from "../api/openlibrary";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useI18n, useFilters, useSubjects } from "../hooks/useStores";
import TrendingSlider from "../components/books/TrendingSlider";
import TabBar from "../components/books/TabBar";
import BookFilters from "../components/books/BookFilters";
import BookGrid from "../components/books/BookGrid";

export default function Home() {
  const { t } = useI18n();
  const { subjects } = useSubjects();
  const {
    activeTab,
    selectedSubject,
    sortBy,
    yearFrom,
    yearTo,
    scrollMode,
    hasFilters,
    setActiveTab,
    setSelectedSubject,
    setSortBy,
    setYearFrom,
    setYearTo,
    setScrollMode,
  } = useFilters();

  const [books, setBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTrending(1).then((data) => {
      setTrendingBooks(data.docs || []);
    }).catch(console.error);
  }, []);

  const loadBooks = useCallback(
    async (pageNum, append = false) => {
      setLoading(true);
      try {
        const searchQuery = hasFilters || activeTab !== "popular"
          ? activeTab === "popular" ? "" : activeTab
          : "";

        const data = await searchBooks(searchQuery, {
          page: pageNum,
          limit: 20,
          sort: sortBy,
          yearFrom,
          yearTo,
          subject: selectedSubject || (activeTab !== "popular" ? activeTab : ""),
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
    [activeTab, hasFilters, selectedSubject, sortBy, yearFrom, yearTo]
  );

  useEffect(() => {
    setPage(1);
    loadBooks(1, false);
  }, [loadBooks]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      loadBooks(page + 1, true);
    }
  }, [loading, page, totalPages, loadBooks]);

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
    <div className="min-h-screen bg-background">
      <TrendingSlider books={trendingBooks} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <TabBar tabs={BOOK_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

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
          onPageChange={(p) => loadBooks(p, false)}
        />
      </div>
    </div>
  );
}
