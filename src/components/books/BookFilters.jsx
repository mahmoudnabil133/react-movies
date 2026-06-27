import { useI18n } from "../../hooks/useStores";

export default function BookFilters({
  subjects,
  selectedSubject,
  onSubjectChange,
  sortBy,
  onSortChange,
  yearFrom,
  yearTo,
  onYearFromChange,
  onYearToChange,
  scrollMode,
  onScrollModeChange,
  sortOptions,
}) {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const fieldClass =
    "px-3 py-2 w-full rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50";

  return (
    <div className="p-3 sm:p-4 rounded-xl bg-card/80 border border-border backdrop-blur-sm space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1 min-w-0">
          <label className="text-xs text-muted-foreground font-medium">{t("subject")}</label>
          <select value={selectedSubject} onChange={(e) => onSubjectChange(e.target.value)} className={fieldClass}>
            <option value="">{t("allSubjects")}</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1 min-w-0">
          <label className="text-xs text-muted-foreground font-medium">{t("sortBy")}</label>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className={fieldClass}>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-xs text-muted-foreground font-medium">{t("yearFrom")}</label>
          <input
            type="number"
            min="1400"
            max={currentYear}
            value={yearFrom}
            onChange={(e) => onYearFromChange(e.target.value)}
            placeholder="1400"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-xs text-muted-foreground font-medium">{t("yearTo")}</label>
          <input
            type="number"
            min="1400"
            max={currentYear + 5}
            value={yearTo}
            onChange={(e) => onYearToChange(e.target.value)}
            placeholder={String(currentYear)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <button
          onClick={() => onScrollModeChange("infinite")}
          className={`flex-1 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            scrollMode === "infinite"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("infiniteScroll")}
        </button>
        <button
          onClick={() => onScrollModeChange("pagination")}
          className={`flex-1 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            scrollMode === "pagination"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("pagination")}
        </button>
      </div>
    </div>
  );
}
