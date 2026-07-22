import { Link, useNavigate } from "react-router-dom";
import { observeAuth } from "../services/auth";
import AuthModal from "./AuthModal";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Info,
  Send,
  User,
  Menu,
  X,
  Home,
  History,
  Settings,
  CircleHelp,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = observeAuth((currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

const navigate = useNavigate();

  return (
    <>
      <header className="w-full">
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg sm:text-xl">
              ✨
            </div>

            <h1 className="text-sm sm:text-base md:text-2xl font-bold truncate">
              PromptVerse <span className="text-purple-400">AI</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="
            flex
            items-center
            gap-1.5
            sm:gap-2
            md:gap-4
            flex-shrink-0
            ml-2
            ">

            {/* request */}
            <button
             onClick={() => navigate("/request")}
             className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 active:scale-95 transition">
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Profile */}
            <button 
                onClick={() => {
                  if (user) {
                    navigate("/profile");   // later build pannuvom
                  } else {
                    setShowAuthModal(true);
                  }
                }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 active:scale-95 transition">
                {user ? (
                  user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold uppercase">
                      {user.displayName?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "P"}
                    </div>
                  )
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
            </button>

            {/* Mobile Menu */}
           <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
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
                to="/whats-new"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <Sparkles size={20} />
                What's New
              </Link>

              <Link
                to="/privacy-policy"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <ShieldCheck size={20} />
                Privacy Policy
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <Info size={20} />
                About PromptVerse AI
              </Link>

              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <Settings size={20} />
                Settings
              </Link>

              <Link
                to="/help-center"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-purple-400 transition"
              >
                <CircleHelp size={20} />
                Help Center
              </Link>
            </div>
          </div>
        </>
      )}
        <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}