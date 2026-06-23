import { Sparkles, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto text-center pt-16 px-6">

      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,.5)]">
          <Sparkles size={45} />
        </div>
      </div>

      <h1 className="text-6xl md:text-7xl font-black leading-tight">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Generate Better
        </span>

        <br />

        AI Content
      </h1>

      <p className="text-gray-400 text-xl mt-6">
        AI prompts, captions, emails & more...
      </p>

      <div className="mt-12">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center overflow-hidden">

          <input
            className="flex-1 bg-transparent px-6 py-5 outline-none"
            placeholder="Search prompts..."
          />

          <button className="bg-gradient-to-r from-purple-600 to-pink-500 h-full px-8 py-5">
            <Search />
          </button>

        </div>

      </div>

    </section>
  );
}