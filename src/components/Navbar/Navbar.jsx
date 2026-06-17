import React from "react";
import { Link } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b1220]/80 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" >
        <div className="flex items-center gap-2 overflow-hidden">
            <img
                src="/movie_best-logo-1.png"
                alt="Movie Best Logo"
                className="h-12 w-70"
            />
        </div>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li className="hover:text-blue-400 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            Movies
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            Trending
          </li>
          <li className="hover:text-blue-400 cursor-pointer transition">
            Favorites
          </li>
        </ul>

        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search movies..."
            className="hidden sm:block px-4 py-2 rounded-lg bg-white/5 border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
          />

          {/* Button / icon */}
          <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition shadow-md">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;