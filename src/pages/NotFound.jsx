import { Link } from "react-router";
import { useI18n } from "../context/I18nContext";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md text-center p-10 rounded-2xl bg-card/80 border border-border shadow-2xl shadow-black/40 backdrop-blur-sm animate-fade-in">
        <div className="mb-6">
          <span className="text-5xl" role="img" aria-label="movie">
            🎬
          </span>
          <h1 className="mt-4 text-6xl font-black text-foreground tracking-tight">404</h1>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">{t("sceneNotFound")}</h2>

        <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs mx-auto">
          {t("wrongTurn")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-semibold transition-all hover:shadow-lg hover:shadow-teal-500/25"
          >
            <span aria-hidden="true">←</span>
            {t("backToHome")}
          </Link>
          <Link
            to="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-muted hover:bg-accent text-foreground font-medium border border-border transition-all"
          >
            {t("browseMovies")}
          </Link>
        </div>
      </div>
    </div>
  );
}
