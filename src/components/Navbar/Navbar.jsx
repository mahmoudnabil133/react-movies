import { Link, useLocation } from "react-router";
import { useTheme } from "next-themes";
import { toast } from "../../lib/toast";
import SearchBar from "../search/SearchBar";
import { useI18n } from "../../context/I18nContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const NavLink = ({ to, children, active }) => (
  <li>
    <Link
      to={to}
      className={`relative px-1 py-1 text-sm font-medium transition-all duration-200 ${
        active ? "text-blue-400" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
      )}
    </Link>
  </li>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const { t, lang, setLang, languages } = useI18n();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 start-0 w-full z-50 bg-transparent backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">

        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/movie_best-logo-1.png"
            alt="Movie Best"
            className="h-9 w-auto"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-6">
          <NavLink to="/" active={pathname === "/"}>{t("home")}</NavLink>
          <NavLink to="/search" active={pathname === "/search"}>{t("movies")}</NavLink>
          <NavLink to="/wishlist" active={pathname === "/wishlist"}>
            <span className="flex items-center gap-1.5">
              {t("wishlist")}
              {wishlist.length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full border border-border/50 text-foreground tabular-nums leading-none">
                  {wishlist.length}
                </span>
              )}
            </span>
          </NavLink>
        </ul>

        <div className="hidden md:block flex-1 max-w-md mx-auto">
          <SearchBar showSuggestions />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none px-2.5 py-1.5 pr-6 rounded-lg border border-border/50 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="text-foreground bg-background">
                  {l.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center transition-all hover:border-border active:scale-95"
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
            <div className="flex items-center gap-1.5 ms-1.5 ps-1.5 border-s border-border/50">
              <span className="hidden sm:inline text-xs text-muted-foreground max-w-[100px] truncate">
                {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={() => { logout(); toast.success("Logged out"); }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 transition-all active:scale-95"
              >
                {t("logout") || "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 ms-1.5 ps-1.5 border-s border-border/50">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-foreground transition-all active:scale-95"
              >
                {t("login") || "Login"}
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border/50 text-foreground transition-all active:scale-95"
              >
                {t("signup") || "Sign Up"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
