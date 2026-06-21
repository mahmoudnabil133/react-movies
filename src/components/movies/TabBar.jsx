import { useI18n } from "../../hooks/useStores";

export default function TabBar({ tabs, activeTab, onTabChange }) {
  const { t } = useI18n();

  const labelMap = {
    now_playing: t("nowPlaying"),
    popular: t("popular"),
    top_rated: t("topRated"),
    upcoming: t("upcoming"),
  };

  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 snap-start shrink-0 ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          {labelMap[tab.id] || tab.label}
        </button>
      ))}
    </div>
  );
}
