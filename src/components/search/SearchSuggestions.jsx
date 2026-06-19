import { getImageUrl, formatRating } from "../../lib/formatters";
import { useI18n } from "../../context/I18nContext";

export default function SearchSuggestions({ suggestions, loading, query, onSelect, onSearchAll }) {
  const { t } = useI18n();

  return (
    <div className="absolute top-full mt-2 w-full rounded-xl bg-[#141b2d] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in">
      {loading ? (
        <div className="p-4 text-center text-gray-400 text-sm">{t("loading")}</div>
      ) : suggestions.length === 0 ? (
        <div className="p-4 text-center text-gray-400 text-sm">{t("noResults")}</div>
      ) : (
        <>
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              onClick={() => onSelect(movie)}
              className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-start"
            >
              <img
                src={getImageUrl(movie.poster_path, "w92")}
                alt={movie.title}
                className="w-10 h-14 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                <p className="text-xs text-gray-500">
                  {movie.release_date?.slice(0, 4)} · ★ {formatRating(movie.vote_average)}
                </p>
              </div>
            </button>
          ))}
          <button
            onClick={onSearchAll}
            className="w-full p-3 text-center text-sm text-blue-400 hover:bg-white/5 border-t border-white/5 transition-colors"
          >
            {t("resultsFor")} "{query}" →
          </button>
        </>
      )}
    </div>
  );
}
