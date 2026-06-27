import { OL_COVER_BASE } from "../../lib/constants";
import { useI18n } from "../../hooks/useStores";

export default function AuthorInfo({ authors = [] }) {
  const { t } = useI18n();
  if (!authors.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground border-b border-border pb-3">
        {t("aboutAuthor")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {authors.map((author, i) => {
          const bio = author.bio;
          const bioText = typeof bio === "string" ? bio : bio?.value || "";
          const photo = author.photos?.[0];

          return (
            <div key={author.key || i} className="p-4 rounded-xl bg-card border border-border space-y-3">
              <div className="flex items-center gap-3">
                {photo ? (
                  <img
                    src={`${OL_COVER_BASE}/id/${photo}-M.jpg`}
                    alt={author.name}
                    className="w-14 h-14 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-foreground text-xl">
                    {author.name?.[0] || "?"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{author.name}</p>
                  {author.birth_date && (
                    <p className="text-xs text-muted-foreground">
                      {author.birth_date}{author.death_date ? ` - ${author.death_date}` : ""}
                    </p>
                  )}
                </div>
              </div>
              {bioText && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {bioText}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
