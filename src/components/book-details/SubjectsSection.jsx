import { useI18n } from "../../hooks/useStores";

export default function SubjectsSection({ subjects = [] }) {
  const { t } = useI18n();
  if (!subjects.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
        {t("subjects")}
      </h2>
      <div className="flex flex-wrap gap-2">
        {subjects.map((s) => (
          <span
            key={s}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground hover:bg-accent transition-colors"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
