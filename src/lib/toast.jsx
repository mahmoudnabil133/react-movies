import { toast as sonnerToast } from "sonner";

const icons = {
  success: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#22c55e" />
      <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 21h20L12 3z" fill="#ef4444" />
      <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="white" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#3b82f6" />
      <path d="M12 8v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.5" fill="white" />
    </svg>
  ),
};

function ToastContent({ icon, message, desc }) {
  return (
    <div className="flex items-start gap-3 min-w-[260px] max-w-[380px]">
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white m-0 leading-snug">{message}</p>
        {desc && (
          <p className="text-xs text-white/60 mt-0.5 m-0 leading-snug">{desc}</p>
        )}
      </div>
    </div>
  );
}

export const toast = {
  success(message, desc) {
    return sonnerToast.custom(
      (t) => <ToastContent icon={icons.success} message={message} desc={desc} />,
      { className: "movie-toast" }
    );
  },
  error(message, desc) {
    return sonnerToast.custom(
      (t) => <ToastContent icon={icons.error} message={message} desc={desc} />,
      { className: "movie-toast" }
    );
  },
  info(message, desc) {
    return sonnerToast.custom(
      (t) => <ToastContent icon={icons.info} message={message} desc={desc} />,
      { className: "movie-toast" }
    );
  },
};
