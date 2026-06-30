import { Hash, Flame, Clapperboard, Megaphone } from "lucide-react";

export default function InstagramTools({  generateInstagramExtra }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 mb-4">

      <button
       onClick={() => generateInstagramExtra("hashtags")}
       className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
        <Hash size={16} />
        Generate Hashtags
      </button>

      <button 
      onClick={() => generateInstagramExtra("hook")}
      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
        <Flame size={16} />
        Generate Hook
      </button>

      <button
       onClick={() => generateInstagramExtra("reels")}
       className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
        <Clapperboard size={16} />
        Generate Reel Ideas
      </button>

      <button
       onClick={() => generateInstagramExtra("cta")}
       className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium">
        <Megaphone size={16}/>
        Generate CTA
      </button>

    </div>
  );
}