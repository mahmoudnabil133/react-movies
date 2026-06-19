import { Link } from "react-router";
import { useI18n } from "../context/I18nContext";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-[#0b1220] px-4 py-16">
      <div className="w-full max-w-md text-center p-10 rounded-2xl bg-[#141b2d]/80 border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-sm animate-fade-in">
        <div className="mb-6">
          <span className="text-5xl" role="img" aria-label="movie">
            🎬
          </span>
          <h1 className="mt-4 text-6xl font-black text-white tracking-tight">404</h1>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">{t("sceneNotFound")}</h2>

        <p className="text-gray-400 leading-relaxed mb-8 max-w-xs mx-auto">
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all"
          >
            {t("browseMovies")}
          </Link>
        </div>
      </div>
    </div>
  );
}
