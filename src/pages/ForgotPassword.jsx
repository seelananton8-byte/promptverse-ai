import { useState } from "react";
import { forgotPassword } from "../services/auth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      toast.success("Password reset email sent successfully!");

      setEmail("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 text-white">

      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
      >

        <h1 className="text-4xl font-bold text-center mb-2">
          Forgot Password 🔑
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Enter your email to receive a password reset link.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-center mt-8 text-gray-400">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300"
          >
            Back to Login
          </Link>
        </p>

      </form>

    </div>
  );
}