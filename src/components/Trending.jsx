import { TrendingUp, ArrowRight } from "lucide-react";

const prompts = [
  "Instagram Viral Caption",
  "YouTube Video Script",
  "LinkedIn Professional Post",
  "Business Email Generator",
];

export default function Trending() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="text-pink-500" />
          Trending Prompts
        </h2>

        <button className="text-purple-400 hover:text-purple-300">
          View All
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {prompts.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500 hover:-translate-y-2 transition"
          >
            <h3 className="font-semibold">{item}</h3>

            <button className="mt-6 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}