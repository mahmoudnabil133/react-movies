import { useState } from "react";
import { useAuth, useWishlist, useI18n } from "../../hooks/useStores";
import { toast } from "../../lib/toast";

export default function WishlistButton({ book, variant = "default" }) {
  const { user } = useAuth();
  const { wishlist, isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useI18n();
  const [blockedMessage, setBlockedMessage] = useState("");
  const item = book;
  const itemId = book.key?.replace("/works/", "") || book._id;
  const active = isInWishlist(itemId);
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
        : "bg-muted border-border text-foreground hover:bg-accent"
      : active
        ? "bg-red-500/20 text-red-400 border border-red-500/30"
        : "bg-background/50 text-foreground border border-border hover:bg-accent";

  const blockedClasses = isBlocked ? "opacity-60 cursor-not-allowed" : "";

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user && !active) {
      toast.error("Please login to add books to your wishlist");
      return;
    }

    if (isBlocked) {
      toast.error("Login to save more than 2 wishlist items.");
      return;
    }
    setBlockedMessage("");

    try {
      const success = await toggleWishlist(item);
      if (success) {
        if (active) {
          toast.success(`"${book.title}" removed from wishlist`);
        } else {
          toast.success(`"${book.title}" added to wishlist`);
        }
      } else {
        toast.error("Login to save more than 2 wishlist items.");
      }
    } catch (err) {
      toast.error(err?.message || "Unable to update wishlist.");
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
