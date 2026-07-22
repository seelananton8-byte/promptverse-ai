import { useState } from "react";
import { X } from "lucide-react";

import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";

export default function AuthModal({
  isOpen,
  onClose,
}) {
  const [mode, setMode] = useState("login");

  if (!isOpen) return null;

  const closeModal = () => {
    setMode("login");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">

      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">

        <div
          className="
            relative
            w-full
            max-w-md
            max-h-[92dvh]
            overflow-y-auto
            rounded-2xl
            sm:rounded-3xl
            border
            border-white/10
            bg-[#0B1120]
            p-4
            sm:p-6
            md:p-8
            shadow-2xl
            "
        >

          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white leading-tight mb-2">

            {mode === "login" && "Welcome Back 👋"}

            {mode === "signup" && "Create Account 🚀"}

            {mode === "forgot" && "Forgot Password 🔑"}

          </h1>

          <p className="text-center text-gray-400 text-sm sm:text-base mb-5 sm:mb-8 px-2">

            {mode === "login" &&
              "Login to PromptVerse AI"}

            {mode === "signup" &&
              "Create your PromptVerse AI account"}

            {mode === "forgot" &&
              "Enter your email to receive a reset link"}

          </p>

          {/* Tabs */}

          <div className="flex bg-white/5 rounded-2xl p-1 mb-5 sm:mb-8">

            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition ${
                mode === "login"
                  ? "bg-purple-600 text-white"
                  : "text-gray-300"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition ${
                mode === "signup"
                  ? "bg-purple-600 text-white"
                  : "text-gray-300"
              }`}
            >
              Sign Up
            </button>

            <button
              onClick={() => setMode("forgot")}
              className={`flex-1 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition ${
                mode === "forgot"
                  ? "bg-purple-600 text-white"
                  : "text-gray-300"
              }`}
            >
              Reset
            </button>

          </div>

          {/* Forms */}

          {mode === "login" && (
            <LoginForm
              onSuccess={closeModal}
              onForgot={() => setMode("forgot")}
            />
          )}

          {mode === "signup" && (
            <SignupForm
              onSuccess={closeModal}
            />
          )}

          {mode === "forgot" && (
            <ForgotPasswordForm
              onBack={() => setMode("login")}
            />
          )}

        </div>

      </div>

    </div>
  );
}