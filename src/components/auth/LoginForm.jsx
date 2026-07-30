import { useState } from "react";
import { login, loginWithGoogle } from "../../services/auth";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const getFriendlyMessage = (code) => {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password is incorrect";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    case "auth/network-request-failed":
      return "Network error. Check your connection";
    default:
      return "Something went wrong. Please try again";
  }
};

export default function LoginForm({ onSuccess, onForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      toast.error(getFriendlyMessage(error.code));
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
      toast.error(getFriendlyMessage(error.code));
    }
  };

  return (
  <>
    <form onSubmit={handleLogin} className="space-y-4">

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

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            py-3
            px-4
            pr-12
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
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-gray-200
            transition
          "
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="text-right">

        <button
          type="button"
          onClick={onForgot}
          className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition"
        >
          Forgot Password?
        </button>

      </div>

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
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    <div className="flex items-center my-5 sm:my-6">

      <div className="flex-1 h-px bg-white/10"></div>

      <span className="px-4 text-gray-400 text-xs sm:text-sm">
        OR
      </span>

      <div className="flex-1 h-px bg-white/10"></div>

    </div>

    <button
      onClick={handleGoogleLogin}
      className="
        w-full
        py-3
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
  </>
)
}