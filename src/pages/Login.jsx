import { useState } from "react";
import { login, loginWithGoogle } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email & password");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      toast.success("Login Successful!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      toast.success("Google Login Successful!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 text-white">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
      >

        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login to PromptVerse AI
        </p>

        {/* Email */}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-4"
        />

        {/* Password */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none"
        />

        {/* Forgot Password */}

        <div className="text-right mt-3 mb-6">

          <Link
            to="/forgot-password"
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}

        <div className="flex items-center my-6">

          <div className="flex-1 h-px bg-white/10"></div>

          <span className="px-4 text-gray-400 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10"></div>

        </div>

        {/* Google */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
        >
          Continue with Google
        </button>

        {/* Signup */}

        <p className="text-center mt-8 text-gray-400">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Sign Up
          </Link>

        </p>

      </form>

    </div>
  );
}