import { useI18n } from "../../hooks/useStores";
import CastCard from "./CastCard";

export default function CastScroll({ cast = [], crew = [] }) {
  const { t } = useI18n();
  const topCast = cast.slice(0, 15);
  const keyCrew = crew
    .filter((c) => ["Director", "Writer", "Producer"].includes(c.job))
    .slice(0, 5);

  const people = [...topCast, ...keyCrew];

  if (!people.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
        {t("castCrew")}
      </h2>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
        {people.map((person) => (
          <div key={`${person.id}-${person.character || person.job}`} className="snap-start shrink-0">
            <CastCard person={person} />
          </div>
        ))}
      </div>
    </section>
  );
}
