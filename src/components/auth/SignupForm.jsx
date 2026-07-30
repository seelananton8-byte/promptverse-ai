import { useState } from "react";
import { signup, loginWithGoogle } from "../../services/auth";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const getFriendlyMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/weak-password":
      return "Password is too weak, please choose a stronger one";
    case "auth/network-request-failed":
      return "Network error. Check your connection";
    default:
      return "Something went wrong. Please try again";
  }
};

export default function SignupForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      toast.error(getFriendlyMessage(error.code));
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
      toast.error(getFriendlyMessage(error.code));
    }
  };

  return (
  <>
    <form onSubmit={handleSignup} className="space-y-4">

      <input
        type="text"
        autoComplete="name"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
          autoComplete="new-password"
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

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={() => setShowConfirmPassword((prev) => !prev)}
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
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
        {loading ? "Creating Account..." : "Create Account"}
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
      onClick={handleGoogleSignup}
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
);
}