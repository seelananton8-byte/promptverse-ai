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
    <form onSubmit={handleReset}>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-6 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full mt-4 text-purple-400"
      >
        Back to Login
      </button>

    </form>
  );
}