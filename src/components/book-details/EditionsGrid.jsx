import { useI18n } from "../../hooks/useStores";
import { getCoverUrl } from "../../lib/formatters";

export default function EditionsGrid({ editions = [] }) {
  const { t } = useI18n();
  if (!editions.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
        {t("editions")}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {editions.slice(0, 6).map((ed) => (
          <div
            key={ed.key}
            className="rounded-xl overflow-hidden bg-card border border-border transition-all hover:border-blue-500/40"
          >
            <div className="aspect-[2/3] overflow-hidden bg-muted">
              <img
                src={getCoverUrl(ed.covers?.[0] || ed.cover_i)}
                alt={ed.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-2">
              <p className="text-xs font-medium text-foreground line-clamp-1">{ed.title}</p>
              {ed.publish_date && (
                <p className="text-[10px] text-muted-foreground">{ed.publish_date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
