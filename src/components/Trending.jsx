import { TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const prompts = [
  "Instagram Viral Caption",
  "YouTube Video Script",
  "LinkedIn Professional Post",
  "Business Email Generator",
];

export default function Trending() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="text-pink-500" />
          Trending Prompts
        </h2>

        <button className="text-purple-400 hover:text-purple-300 transition">
          View All
        </button>
      </motion.div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {prompts.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,.35)] transition-all duration-300"
          >
            <h3 className="font-semibold text-lg">
              {item}
            </h3>

            <motion.button
              whileHover={{
                rotate: 45,
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="mt-6 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-lg"
            >
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        ))}
      </div>

    </section>
  );
}