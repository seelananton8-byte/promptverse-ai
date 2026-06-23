export default function Login() {
  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-[#111827] mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-[#111827] mb-6 outline-none"
        />

        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500">
          Login
        </button>

      </div>
    </div>
  );
}