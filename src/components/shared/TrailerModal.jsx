import { useEffect } from "react";
import { useI18n } from "../../hooks/useStores";

export default function TrailerModal({ videoKey, onClose }) {
  const { t } = useI18n();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!videoKey) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-background/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 end-2 sm:-top-12 sm:end-0 z-10 px-3 py-1.5 rounded-lg bg-background/80 sm:bg-transparent text-foreground hover:text-muted-foreground text-sm font-medium transition-colors backdrop-blur-sm border border-border sm:border-0"
        >
          ✕ <span className="hidden sm:inline">{t("close")}</span>
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title={t("trailer")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
