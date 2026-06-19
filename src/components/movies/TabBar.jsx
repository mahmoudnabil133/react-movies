import { useI18n } from "../../context/I18nContext";

export default function TabBar({ tabs, activeTab, onTabChange }) {
  const { t } = useI18n();

  const labelMap = {
    now_playing: t("nowPlaying"),
    popular: t("popular"),
    top_rated: t("topRated"),
    upcoming: t("upcoming"),
  };

  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {labelMap[tab.id] || tab.label}
        </button>
      ))}
    </div>
  );
}
