import { useI18n } from "../../hooks/useStores";

export default function MovieFilters({
  genres,
  selectedGenre,
  onGenreChange,
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

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 rounded-xl bg-card/80 border border-border backdrop-blur-sm">
      <div className="flex flex-col gap-1.5 min-w-[140px]">
        <label className="text-xs text-muted-foreground font-medium">{t("genre")}</label>
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="">{t("allGenres")}</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px]">
        <label className="text-xs text-muted-foreground font-medium">{t("sortBy")}</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[100px]">
        <label className="text-xs text-muted-foreground font-medium">{t("yearFrom")}</label>
        <input
          type="number"
          min="1900"
          max={currentYear}
          value={yearFrom}
          onChange={(e) => onYearFromChange(e.target.value)}
          placeholder="1900"
          className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      <div className="flex flex-col gap-1.5 min-w-[100px]">
        <label className="text-xs text-muted-foreground font-medium">{t("yearTo")}</label>
        <input
          type="number"
          min="1900"
          max={currentYear + 5}
          value={yearTo}
          onChange={(e) => onYearToChange(e.target.value)}
          placeholder={String(currentYear)}
          className="px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      <div className="flex items-center gap-2 ms-auto">
        <button
          onClick={() => onScrollModeChange("infinite")}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            scrollMode === "infinite"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("infiniteScroll")}
        </button>
        <button
          onClick={() => onScrollModeChange("pagination")}
          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
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
