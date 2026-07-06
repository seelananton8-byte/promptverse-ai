import { useEffect, useState } from "react";
import { observeAuth, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Mail, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = observeAuth((currentUser) => {
      if (!currentUser) {
        navigate("/");
        return;
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully!");

    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white">

        <div className="flex flex-col items-center">

          <img
            src={
              user.photoURL ||
              "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff"
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
          />

          <h1 className="text-3xl font-bold mt-5">
            {user.displayName || "PromptVerse User"}
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back 👋
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">

            <Mail size={20} />

            <span>{user.email}</span>

          </div>

          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">

            <User size={20} />

            <span>
              {user.providerData[0]?.providerId === "google.com"
                ? "Google Account"
                : "Email Account"}
            </span>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 transition flex items-center justify-center gap-3"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </div>
  );
}