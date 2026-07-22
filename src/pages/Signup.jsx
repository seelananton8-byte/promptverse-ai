import { useState } from "react";
import { signup, loginWithGoogle } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await signup(email, password);

      toast.success("Account Created Successfully!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();

      toast.success("Google Signup Successful!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
  <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 sm:px-6 py-6 text-white">

    <form
      onSubmit={handleSignup}
      className="
        w-full
        max-w-[310px]
        min-[360px]:max-w-[340px]
        sm:max-w-md
        max-h-[90vh]
        overflow-y-auto
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-4
        sm:p-6
        md:p-8
        "
    >

      {/* Heading */}

      <h1 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
        Create Account <span className="inline-block">🚀</span>
      </h1>

      <p className="text-center text-gray-400 text-xs sm:text-sm mt-2 mb-5 sm:mb-8 px-3">
        Join PromptVerse AI
      </p>

      {/* Name */}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
          w-full
          py-3 
          px-4 
          sm:p-4
          rounded-xl
          bg-[#111827]
          border
          border-white/10
          outline-none
          mb-4
        "
      />

      {/* Email */}

      <input
        type="email"
        autoComplete="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          w-full
          py-3 
          px-4 
          sm:p-4
          rounded-xl
          bg-[#111827]
          border
          border-white/10
          outline-none
          mb-4
        "
      />

      {/* Password */}

      <input
        type="password"
        autoComplete="new-password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full
          py-3 
          px-4 
          sm:p-4
          rounded-xl
          bg-[#111827]
          border
          border-white/10
          outline-none
          mb-4
        "
      />

      {/* Confirm */}

      <input
        type="password"
        autoComplete="new-password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="
          w-full
          py-3 
          px-4 
          sm:p-4
          rounded-xl
          bg-[#111827]
          border
          border-white/10
          outline-none
          mb-5
        "
      />

      {/* Signup */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          py-3.5
          sm:py-4
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-cyan-500
          font-semibold
          hover:scale-[1.02]
          transition
        "
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Divider */}

      <div className="flex items-center my-5 sm:my-6">

        <div className="flex-1 h-px bg-white/10"></div>

        <span className="px-4 text-gray-400 text-sm">
          OR
        </span>

        <div className="flex-1 h-px bg-white/10"></div>

      </div>

      {/* Google */}

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="
          w-full
          py-3.5
          sm:py-4
          rounded-xl
          bg-white
          text-black
          font-semibold
          hover:scale-[1.02]
          transition
        "
      >
        Continue with Google
      </button>

      {/* Login */}

      <p className="text-center mt-5 sm:mt-8 text-sm sm:text-base text-gray-400">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-purple-400 hover:text-purple-300"
        >
          Login
        </Link>

      </p>

    </form>

  </div>
)
}