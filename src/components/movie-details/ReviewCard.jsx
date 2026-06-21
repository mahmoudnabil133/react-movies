import { useState } from "react";
import { useI18n } from "../../hooks/useStores";

export default function ReviewCard({ review }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const content = review.content || "";
  const isLong = content.length > 200;
  const displayText = expanded || !isLong ? content : content.slice(0, 200) + "…";

  const rating = review.author_details?.rating;
  const avatar = review.author_details?.avatar_path;

  return (
    <div className="p-4 rounded-xl bg-card border border-border space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1a2235] flex items-center justify-center shrink-0">
          {avatar ? (
            <img
              src={`https://image.tmdb.org/t/p/w45${avatar}`}
              alt={review.author}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-muted-foreground text-sm">👤</span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{review.author}</p>
          {rating != null && (
            <p className="text-xs text-yellow-400">★ {rating}/10</p>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        "{displayText}"
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ms-1 text-blue-400 hover:text-blue-300 text-sm"
          >
            [{expanded ? t("readLess") : t("readMore")}]
          </button>
        )}
      </p>
    </div>
  );
}
