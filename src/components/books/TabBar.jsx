import { useI18n } from "../../hooks/useStores";

const tabLabelMap = {
  popular: "popular",
  fiction: "fiction",
  fantasy: "fantasy",
  science_fiction: "scienceFiction",
  mystery: "mystery",
  romance: "romance",
  history: "history",
  science: "science",
  biography: "biography",
  young_adult: "youngAdult",
};

export default function TabBar({ tabs, activeTab, onTabChange }) {
  const { t } = useI18n();

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
          {t(tabLabelMap[tab.id] || tab.id) || tab.label}
        </button>
      ))}
    </div>
  );
}
