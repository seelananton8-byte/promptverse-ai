import { Link } from "react-router-dom";
import { Moon, Heart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
            ✨
          </div>

          <h1 className="text-2xl font-bold">
            PromptVerse <span className="text-purple-400">AI</span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Dark Mode */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            <Moon size={20} />
          </button>

          {/* Favorites */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition">
            <Heart size={20} />
          </button>

          {/* Profile */}
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition">
            <User size={20} />
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
          >
            Login
          </Link>

          {/* Signup */}
          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            Sign Up
          </Link>

        </div>

      </nav>
    </header>
  );
}