import { useI18n } from "../../context/I18nContext";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection({ reviews = [] }) {
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
        {t("reviews")}
      </h2>
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("noReviews")}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.slice(0, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
