import { Link } from "react-router";
import { cn } from "@/lib/utils";
import "./auth.css";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  className,
}) {
  return (
    <div className={cn("auth-page bg-background", className)}>
      <div className="auth-orb auth-orb-1" aria-hidden="true" />
      <div className="auth-orb auth-orb-2" aria-hidden="true" />
      <div className="auth-orb auth-orb-3" aria-hidden="true" />
      <div className="auth-grid" aria-hidden="true" />

      <div className="auth-card">
        <div className="auth-card-glow" aria-hidden="true" />
        <div className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/40 p-8 sm:p-10">
          <div className="text-center mb-8 auth-field" style={{ animationDelay: "0.05s" }}>
            <Link to="/" className="inline-block mb-5 group">
              <div className="auth-logo-ring mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-border flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-2xl" role="img" aria-label="movie">
                  🎬
                </span>
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}

          {footer && (
            <p className="auth-field mt-6 text-center text-sm text-muted-foreground" style={{ animationDelay: "0.55s" }}>
              {footer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
