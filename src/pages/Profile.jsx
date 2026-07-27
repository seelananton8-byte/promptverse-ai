import { useEffect, useState } from "react";
import { observeAuth, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Mail, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = observeAuth((currentUser) => {
      if (!currentUser) {
        navigate("/");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed, please try again");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  const providerLabel =
    user.providerData?.[0]?.providerId === "google.com"
      ? "Google Account"
      : "Email Account";

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 text-white">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || DEFAULT_AVATAR}
            alt={user.displayName || "User profile"}
            onError={(e) => {
              e.target.src = DEFAULT_AVATAR;
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-500"
          />

          <h1 className="text-2xl sm:text-3xl font-bold mt-5 text-center">
            {user.displayName || "PromptVerse User"}
          </h1>

          <p className="text-gray-400 mt-2 text-sm sm:text-base text-center">
            Welcome back 👋
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl overflow-hidden">
            <Mail size={20} />
            <span className="truncate flex-1 text-sm sm:text-base">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
            <User size={20} />
            <span className="text-sm sm:text-base truncate">
              {providerLabel}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          aria-label="Logout"
          className="mt-10 w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
        >
          <LogOut size={20} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}