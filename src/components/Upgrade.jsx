import { Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function Upgrade() {
  return (
    <section className="max-w-7xl mx-auto px-6 my-20">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_70px_rgba(168,85,247,.35)]"
      >

        {/* Glow Effect */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-pink-400/20 rounded-full blur-3xl"></div>

        {/* Left */}
        <div className="relative z-10">

          <div className="flex items-center gap-3">

            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
            >
              <Crown size={35} />
            </motion.div>

            <h2 className="text-4xl font-bold">
              Upgrade to Pro
            </h2>

          </div>

          <p className="mt-4 text-white/80 text-lg max-w-xl">
            Unlimited AI generations, premium prompts, lightning-fast responses,
            exclusive templates, and priority access to upcoming AI features.
          </p>

        </div>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="relative z-10 bg-white text-purple-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          ✨ Upgrade Now
        </motion.button>

      </motion.div>

    </section>
  );
}