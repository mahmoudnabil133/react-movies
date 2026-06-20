import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useI18n } from "../../context/I18nContext";

export default function WishlistButton({ movie, variant = "default" }) {
  const { user } = useAuth();
  const { wishlist, isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useI18n();
  const [blockedMessage, setBlockedMessage] = useState("");
  const active = isInWishlist(movie.id);
  const canAddMore = user || wishlist.length < 2;
  const isBlocked = !active && !canAddMore;

  const baseClasses =
    variant === "hero"
      ? "flex flex-col items-start gap-2"
      : "flex flex-col items-center";

  const buttonClasses =
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

  const blockedClasses = isBlocked ? "opacity-60 cursor-not-allowed" : "";

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBlocked) {
      setBlockedMessage("Login to save more than 2 wishlist items.");
      return;
    }
    setBlockedMessage("");

    try {
      const success = await toggleWishlist(movie);
      if (!success) {
        setBlockedMessage("Login to save more than 2 wishlist items.");
      }
    } catch (err) {
      setBlockedMessage(err?.message || "Unable to update wishlist.");
    }
  };

  return (
    <div className={baseClasses}>
      <button
        type="button"
        onClick={handleClick}
        className={`${buttonClasses} ${activeClasses} ${blockedClasses}`}
        aria-label={active ? t("removeWishlist") : t("addWishlist")}
        aria-disabled={isBlocked}
      >
        <span className="text-lg">{active ? "♥" : "♡"}</span>
        {variant === "hero" && (
          <span>{active ? t("removeWishlist") : t("addWishlist")}</span>
        )}
      </button>
      {blockedMessage && (
        <p className="mt-2 text-xs text-yellow-300">{blockedMessage}</p>
      )}
    </div>
  );
}
