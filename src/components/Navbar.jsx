import { Link } from "react-router-dom";
import {
  Moon,
  Heart,
  User,
  Menu,
  X,
  Home,
  History,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full">
        <nav className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
              ✨
            </div>

            <h1 className="text-base md:text-2xl font-bold whitespace-nowrap">
              PromptVerse <span className="text-purple-400">AI</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 ml-4">

            {/* Dark Mode */}
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition">
              <Moon size={20} />
            </button>

            {/* Favorites */}
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 active:scale-95 transition">
              <Heart size={20} />
            </button>

            {/* Profile */}
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 active:scale-95 transition">
              <User size={20} />
            </button>

            {/* Mobile Menu */}
           <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <Menu size={22} />
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 h-screen w-72 bg-[#0B1023] border-l border-white/10 z-50 p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">
                PromptVerse AI
              </h2>

              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-white">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <Home size={20} />
                Home
              </Link>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <User size={20} />
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <User size={20} />
                Sign Up
              </Link>

              <Link
                to="/history"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <History size={20} />
                History
              </Link>

              <Link
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <Heart size={20} />
                Favorites
              </Link>

              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <Settings size={20} />
                Settings
              </Link>

            </div>
          </div>
        </>
      )}
    </>
  );
}