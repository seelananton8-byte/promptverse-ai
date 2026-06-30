import { Target, Hash, Megaphone, Lightbulb } from "lucide-react";

export default function LinkedinTools({
  generateLinkedinExtra,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 mb-4">

      <button
        onClick={() => generateLinkedinExtra("hook")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Target size={16} />
        Generate Hook
      </button>

      <button
        onClick={() => generateLinkedinExtra("hashtags")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Hash size={16} />
        Generate Hashtags
      </button>

      <button
        onClick={() => generateLinkedinExtra("ideas")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Lightbulb size={16} />
        Generate Ideas
      </button>

      <button
        onClick={() => generateLinkedinExtra("cta")}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Megaphone size={16} />
        Generate CTA
      </button>

    </div>
  );
}