import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { observeAuth } from "../services/auth";
import { useEffect, useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = observeAuth((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
        >
          ⚙️ PromptVerse Settings
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          className="mt-6 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent"
        >
          Settings
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 text-gray-400 text-lg leading-8"
        >
          Manage your PromptVerse AI account,
          application preferences, and useful links.
        </motion.p>

        {/* Account */}

        <div className="mt-20">

        <h2 className="text-3xl font-bold mb-8">
            Account
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            {user ? (

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div className="flex items-center gap-5">

                {user.photoURL ? (
                    <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold uppercase">
                    {user.displayName?.charAt(0) ||
                        user.email?.charAt(0)}
                    </div>
                )}

                <div>

                    <h3 className="text-xl font-bold">
                    {user.displayName || "PromptVerse User"}
                    </h3>

                    <p className="text-gray-400 mt-1">
                    {user.email}
                    </p>

                </div>

                </div>

                <button
                onClick={() => navigate("/profile")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 transition"
                >
                Open Profile →
                </button>

            </div>

            ) : (

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                <h3 className="text-xl font-bold">
                    Guest User
                </h3>

                <p className="text-gray-400 mt-2">
                    Sign in to sync your favorites,
                    history and profile.
                </p>

                </div>

                <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105 transition"
                >
                Login →
                </button>

            </div>

            )}

        </div>

        </div>

        {/* App Settings */}

                <div className="mt-20">

                <h2 className="text-3xl font-bold mb-8">
                    App Settings
                </h2>

                <div className="space-y-4">

                    {/* Version */}

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">App Version</h3>
                        <p className="text-sm text-gray-400 mt-1">
                        Current installed version
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-bold">1.0.0</p>
                        <p className="text-xs text-green-400 mt-1">
                        Up to date
                        </p>
                    </div>
                    </div>

                    {/* What's New */}

                    <button
                    onClick={() => navigate("/whats-new")}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-purple-500 hover:bg-purple-500/10 transition-all"
                    >
                    <div className="text-left">
                        <h3 className="font-semibold">✨ What's New</h3>
                        <p className="text-sm text-gray-400 mt-1">
                        View latest features and updates
                        </p>
                    </div>

                    <span className="text-purple-400 text-xl">→</span>
                    </button>

                    {/* Rate App */}

                    <button
                    onClick={() => {
                        window.open(
                        "https://play.google.com/store/apps",
                        "_blank"
                        );
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-purple-500 hover:bg-purple-500/10 transition-all"
                    >
                    <div className="text-left">
                        <h3 className="font-semibold">⭐ Rate PromptVerse AI</h3>
                        <p className="text-sm text-gray-400 mt-1">
                        Support us with a rating
                        </p>
                    </div>

                    <span className="text-purple-400 text-xl">→</span>
                    </button>

                </div>

                </div>

                {/* Information */}

                        <div className="mt-16">

                        <h2 className="text-3xl font-bold mb-8">
                            Information
                        </h2>

                        <div className="space-y-4">

                            <button
                            onClick={() => navigate("/help-center")}
                            className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
                            >
                            <div>
                                <h3 className="font-semibold text-lg">
                                ❓ Help Center
                                </h3>

                                <p className="text-gray-400 text-sm mt-1">
                                Learn how to use PromptVerse AI.
                                </p>
                            </div>

                            <span className="text-purple-400 text-xl">→</span>
                            </button>

                            <button
                            onClick={() => navigate("/privacy-policy")}
                            className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
                            >
                            <div>
                                <h3 className="font-semibold text-lg">
                                🛡 Privacy Policy
                                </h3>

                                <p className="text-gray-400 text-sm mt-1">
                                Read how your data is protected.
                                </p>
                            </div>

                            <span className="text-purple-400 text-xl">→</span>
                            </button>

                            <button
                            onClick={() => navigate("/about")}
                            className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
                            >
                            <div>
                                <h3 className="font-semibold text-lg">
                                ℹ️ About PromptVerse AI
                                </h3>

                                <p className="text-gray-400 text-sm mt-1">
                                Learn more about the application.
                                </p>
                            </div>

                            <span className="text-purple-400 text-xl">→</span>
                            </button>

                        </div>

                        </div>

                        {/* Support */}

                            <div className="mt-16">

                            <h2 className="text-3xl font-bold mb-8">
                                Support
                            </h2>

                            <div className="space-y-4">

                                {/* Request Prompt */}

                                <button
                                onClick={() => navigate("/request")}
                                className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
                                >
                                <div>
                                    <h3 className="font-semibold text-lg">
                                    📨 Request New Prompt
                                    </h3>

                                    <p className="text-gray-400 text-sm mt-1">
                                    Suggest a new AI Gallery prompt.
                                    </p>
                                </div>

                                <span className="text-purple-400 text-xl">→</span>
                                </button>

                                {/* Back Home */}

                                <button
                                onClick={() => navigate("/")}
                                className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
                                >
                                <div>
                                    <h3 className="font-semibold text-lg">
                                    🏠 Back to Home
                                    </h3>

                                    <p className="text-gray-400 text-sm mt-1">
                                    Return to PromptVerse AI Home.
                                    </p>
                                </div>

                                <span className="text-purple-400 text-xl">→</span>
                                </button>

                            </div>

                            </div>

                            <div className="mt-20 text-center border-t border-white/10 pt-10">

                        <p className="text-2xl font-bold">
                            PromptVerse AI
                        </p>

                        <p className="mt-2 text-gray-400">
                            Settings
                        </p>

                        <p className="mt-2 text-gray-500">
                            Version 1.0.0
                        </p>

                        <p className="mt-2 text-gray-500">
                            July 2026
                        </p>

                        <p className="mt-8 text-gray-500">
                            Built with ❤️ by JeyPre Creations
                        </p>

                        </div>

      </div>

    </div>
  );
}