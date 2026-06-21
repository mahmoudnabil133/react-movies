import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "next-themes";
import { toast } from "../../lib/toast";
import SearchBar from "../search/SearchBar";
import { useI18n, useWishlist, useAuth } from "../../hooks/useStores";

const NavLink = ({ to, children, active, onClick, className = "" }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`relative block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
      active
        ? "text-blue-400 bg-blue-500/10"
        : "text-muted-foreground hover:text-foreground hover:bg-accent"
    } ${className}`}
  >
    {children}
    {active && (
      <span className="absolute start-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-full" />
    )}
  </Link>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const { t, lang, setLang, languages } = useI18n();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: "/", label: t("home"), active: pathname === "/" },
    { to: "/search", label: t("movies"), active: pathname === "/search" },
    ...(user
      ? [
          {
            to: "/wishlist",
            label: t("wishlist"),
            active: pathname === "/wishlist",
            badge: wishlist.length,
          },
        ]
      : []),
  ];

  return (
    <>
      <nav className="fixed top-0 start-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center gap-2 sm:gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/movie_best-logo-1.png"
              alt="Movie Best"
              className="h-8 sm:h-9 w-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ms-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} active={link.active} className="px-4">
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full border border-border/50 text-foreground tabular-nums leading-none">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block flex-1 max-w-md mx-auto min-w-0">
            <SearchBar showSuggestions />
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 ms-auto shrink-0">
            <Link
              to="/search"
              className="md:hidden w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all active:scale-95"
              aria-label={t("search")}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            <div className="relative hidden sm:block">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="appearance-none px-2.5 py-1.5 pr-6 rounded-lg border border-border/50 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer bg-background"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="text-foreground bg-background">
                    {l.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center transition-all hover:border-border active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-1.5 ps-1.5 border-s border-border/50">
                <span className="hidden md:inline text-xs text-muted-foreground max-w-[100px] truncate">
                  {user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast.success("Logged out");
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 transition-all active:scale-95"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 ps-1.5 border-s border-border/50">
                <Link
                  to="/login"
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-foreground transition-all active:scale-95"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border border-border/50 text-foreground transition-all active:scale-95"
                >
                  {t("signup")}
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden w-9 h-9 rounded-lg border border-border/50 flex items-center justify-center text-foreground hover:bg-accent transition-all active:scale-95"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={closeMenu}
            aria-label="Close menu"
          />
          <div className="absolute top-[57px] start-0 end-0 bottom-0 bg-background border-t border-border overflow-y-auto animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-6">
              <div className="md:hidden">
                <SearchBar showSuggestions />
              </div>

              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} active={link.active} onClick={closeMenu}>
                    <span className="flex items-center justify-between">
                      {link.label}
                      {link.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-500/20 text-blue-400 tabular-nums">
                          {link.badge}
                        </span>
                      )}
                    </span>
                  </NavLink>
                ))}
              </nav>

              <div className="sm:hidden space-y-3 pt-3 border-t border-border">
                <label className="text-xs text-muted-foreground font-medium">{t("language")}</label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:hidden pt-3 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground truncate">{user.name || user.email}</p>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        toast.success("Logged out");
                        closeMenu();
                      }}
                      className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 border border-red-500/30 hover:bg-red-500/10 transition-all"
                    >
                      {t("logout")}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium text-center border border-border hover:bg-accent transition-all"
                    >
                      {t("login")}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium text-center bg-primary text-primary-foreground hover:bg-primary/80 transition-all"
                    >
                      {t("signup")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
