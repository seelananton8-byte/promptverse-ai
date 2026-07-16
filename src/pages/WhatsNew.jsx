import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WhatsNew() {
  const navigate = useNavigate();

  const updates = [
    "✨ AI Gallery",
    "📨 Prompt Request System",
    "☁ Firebase Synchronization",
    "📧 Email Request Support",
    "⚡ Multi-AI Engine (Gemini + Groq + Cerebras)",
    "🎨 Premium UI Improvements",
    "📱 Better Mobile Experience",
    "🛠 Performance & Stability Improvements",
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
        >
          🚀 PromptVerse AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          className="text-5xl md:text-7xl font-extrabold mt-6 bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent"
        >
          What's New
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-6 text-gray-400 text-lg"
        >
          See what's included in the latest version of PromptVerse AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .45 }}
          className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
        >

          <h2 className="text-3xl font-bold mb-8">
            Version 1.0.0
          </h2>

          <div className="space-y-5">

            {updates.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: .55 + index * .08
                }}
                className="flex items-center gap-4 text-lg"
              >
                {item}
              </motion.div>

            ))}

          </div>

          <div className="mt-10 text-gray-400">
            More exciting updates coming soon 🚀
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
          >
            Continue Exploring →
          </button>

        </motion.div>

      </div>

    </div>
  );
}