import { Sparkles, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto text-center pt-16 px-6"
    >
      {/* Animated Icon */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
          className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,.5)]"
        >
          <Sparkles size={45} />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-black leading-tight"
      >
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Generate Better
        </span>

        <br />

        AI Content
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-lg md:text-xl mt-6"
      >
        AI prompts, captions, emails & more...
      </motion.p>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center overflow-hidden shadow-lg"
        >
          <input
            className="flex-1 bg-transparent px-6 py-5 outline-none"
            placeholder="Search prompts..."
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-500 h-full px-8 py-5"
          >
            <Search />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}