import { useState } from "react";
import { forgotPassword } from "../../services/auth";
import toast from "react-hot-toast";

export default function ForgotPasswordForm({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter your email");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      toast.success("Password reset email sent!");

      onBack();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <form onSubmit={handleReset} className="space-y-5">

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
        sm:py-4
        rounded-xl
        bg-[#111827]
        border
        border-white/10
        outline-none
        text-white
        text-sm
        sm:text-base
      "
    />

    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        py-3
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
      {loading ? "Sending..." : "Send Reset Link"}
    </button>

    <button
      type="button"
      onClick={onBack}
      className="
        w-full
        py-3
        rounded-xl
        border
        border-white/10
        text-purple-400
        hover:bg-white/5
        transition
      "
    >
      ← Back to Login
    </button>

  </form>
);
}