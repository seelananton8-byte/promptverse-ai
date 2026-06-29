import { TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const prompts = [
  {
    title: "Instagram Viral Caption",
    description:
      "Generate engaging captions that increase reach and engagement.",
  },
  {
    title: "YouTube Video Script",
    description:
      "Create professional scripts for your next YouTube video.",
  },
  {
    title: "LinkedIn Professional Post",
    description:
      "Write high-converting LinkedIn posts for professionals.",
  },
  {
    title: "Business Email Generator",
    description:
      "Generate polished business emails in seconds.",
  },
];

export default function Trending({ setSelectedPrompt }) {
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
            onClick={() => {
              setSelectedPrompt(item.title);

              localStorage.setItem(
                "showYoutubeTools",
                item.title === "YouTube Video Script"
              );

              document
                .getElementById("hero-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
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
            className="relative group cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500 hover:shadow-[0_0_40px_rgba(168,85,247,.35)] transition-all duration-300"
          >

            {/* Category Badge */}
            <span className="inline-block text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full mb-4">
              Trending
            </span>

            {/* Title */}
            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              {item.description}
            </p>

            {/* Action Button */}
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