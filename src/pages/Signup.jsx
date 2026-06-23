export default function Signup() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-8">
          Create Account
        </h1>

        <input
          placeholder="Name"
          className="w-full p-4 rounded-xl bg-[#111827] mb-4 outline-none"
        />

        <input
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-[#111827] mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-[#111827] mb-6 outline-none"
        />

        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600">
          Sign Up
        </button>

      </div>
    </div>
  );
}