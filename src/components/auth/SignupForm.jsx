import { useState } from "react";
import { signup, loginWithGoogle } from "../../services/auth";
import toast from "react-hot-toast";

export default function SignupForm({ onSuccess }) {
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

      await signup(name, email, password);

      toast.success("Account Created Successfully!");

      onSuccess();
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

      onSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-4 text-white"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-4 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-4 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-6 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-white/10"></div>

        <span className="px-4 text-gray-400 text-sm">
          OR
        </span>

        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <button
        onClick={handleGoogleSignup}
        className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
      >
        Continue with Google
      </button>
    </>
  );
}