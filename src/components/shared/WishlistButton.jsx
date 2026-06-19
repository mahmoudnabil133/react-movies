import { useWishlist } from "../../context/WishlistContext";
import { useI18n } from "../../context/I18nContext";

export default function WishlistButton({ movie, variant = "default" }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useI18n();
  const active = isInWishlist(movie.id);

  const baseClasses =
    variant === "hero"
      ? "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border"
      : "flex items-center justify-center w-10 h-10 rounded-full transition-all";

  const activeClasses =
    variant === "hero"
      ? active
        ? "bg-red-500/20 border-red-500/50 text-red-400"
        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
      : active
        ? "bg-red-500/20 text-red-400 border border-red-500/30"
        : "bg-black/50 text-white border border-white/10 hover:bg-white/10";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(movie);
      }}
      className={`${baseClasses} ${activeClasses}`}
      aria-label={active ? t("removeWishlist") : t("addWishlist")}
    >
      <span className="text-lg">{active ? "♥" : "♡"}</span>
      {variant === "hero" && (
        <span>{active ? t("removeWishlist") : t("addWishlist")}</span>
      )}
    </button>
  );
}
