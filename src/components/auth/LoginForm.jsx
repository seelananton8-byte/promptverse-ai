import { useState } from "react";
import { login, loginWithGoogle } from "../../services/auth";
import toast from "react-hot-toast";

export default function LoginForm({ onSuccess, onForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

      onSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      toast.success("Google Login Successful!");

      onSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>

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
          className="w-full p-4 rounded-xl bg-[#111827] border border-white/10 outline-none mb-3 text-white"
        />

        <div className="text-right mb-5">

          <button
            type="button"
            onClick={onForgot}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Forgot Password?
          </button>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
        >
          {loading ? "Logging in..." : "Login"}
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
        onClick={handleGoogleLogin}
        className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
      >
        Continue with Google
      </button>
    </>
  );
}