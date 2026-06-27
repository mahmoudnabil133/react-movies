import { Link } from "react-router";
import { useI18n } from "../hooks/useStores";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-lg text-center p-10 rounded-2xl bg-card/80 border border-border shadow-2xl shadow-black/40 backdrop-blur-sm animate-fade-in">
        <div className="mb-8 relative">
          <div className="text-7xl select-none" role="img" aria-label="bookshelf">
            📚
          </div>
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce">🔍</div>
          <h1 className="mt-6 text-7xl font-black text-foreground tracking-tight">
            <span className="text-blue-500">4</span>
            <span className="text-amber-500">0</span>
            <span className="text-blue-500">4</span>
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">{t("bookNotFound")}</h2>

        <p className="text-muted-foreground leading-relaxed mb-2 max-w-sm mx-auto">
          This page seems to have wandered off the shelf.
        </p>
        <p className="text-xs text-muted-foreground/60 mb-8 italic font-serif">
          "A book is a dream you hold in your hand." — Neil Gaiman
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t("backToHome")}
          </Link>
          <Link
            to="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-muted hover:bg-accent text-foreground font-medium border border-border transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t("browseBooks")}
          </Link>
        </div>
      </div>
    </div>
  );
}
