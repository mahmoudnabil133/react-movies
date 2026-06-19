import { Link } from "react-router";
import SearchBar from "../search/SearchBar";
import { useI18n } from "../../context/I18nContext";
import { useWishlist } from "../../context/WishlistContext";

const Navbar = () => {
  const { t, lang, setLang, languages } = useI18n();
  const { wishlist } = useWishlist();

  return (
    <nav className="fixed top-0 start-0 w-full z-50 bg-[#0b1220]/90 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/movie_best-logo-1.png"
            alt="Movie Best Logo"
            className="h-10 w-auto"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span className="text-xl font-bold text-white hidden sm:block">MovieBest</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-gray-300 text-sm">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">{t("home")}</Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-blue-400 transition">{t("movies")}</Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:text-blue-400 transition flex items-center gap-1">
              {t("wishlist")}
              {wishlist.length > 0 && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-blue-600 text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </li>
        </ul>

        <div className="hidden md:block flex-1 max-w-sm mx-4">
          <SearchBar showSuggestions />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-[#0b1220]">
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
