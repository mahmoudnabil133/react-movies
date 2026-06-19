import { useI18n } from "../../context/I18nContext";

function getPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export default function Pagination({ page, totalPages, onPageChange }) {
  const { t } = useI18n();

  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center"
    >
      <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-full bg-[#1a1f2e] border border-white/5 shadow-lg">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500 transition-colors"
        >
          <span aria-hidden="true">&lt;</span>
          <span className="hidden sm:inline">{t("prev")}</span>
        </button>

        <div className="flex items-center gap-1 mx-1 sm:mx-2">
          {pages.map((item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-2 py-1 text-sm text-gray-500 select-none"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={page === item ? "page" : undefined}
                className={`min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  page === item
                    ? "bg-teal-500 text-black shadow-md shadow-teal-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-sm font-medium text-white hover:text-teal-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-white transition-colors"
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>
    </nav>
  );
}
