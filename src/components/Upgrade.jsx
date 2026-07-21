import { Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ads = [
  {
    title: "Learn React Faster 🚀",
    desc: "Master React with hands-on projects and become job-ready.",
    button: "Learn More",
    color: "from-blue-600 via-cyan-500 to-indigo-600",
  },

  {
    title: "Build AI Apps 🤖",
    desc: "Create AI powered websites using modern tools and frameworks.",
    button: "Start Now",
    color: "from-purple-700 via-pink-600 to-indigo-600",
  },

  {
    title: "Frontend Career 💼",
    desc: "Prepare for interviews and land your first frontend developer job.",
    button: "Explore",
    color: "from-emerald-600 via-green-500 to-teal-600",
  },

  {
    title: "Learn Tailwind CSS 🎨",
    desc: "Build beautiful responsive websites faster with Tailwind CSS.",
    button: "View Course",
    color: "from-sky-500 via-cyan-500 to-blue-600",
  },

  {
    title: "JavaScript Mastery ⚡",
    desc: "Level up your JavaScript skills with practical real-world examples.",
    button: "Get Started",
    color: "from-orange-500 via-red-500 to-pink-500",
  },
];

export default function Upgrade() {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  }, 6000);

  return () => clearInterval(interval);
}, []);

  return (
    <section className="max-w-7xl mx-auto px-6 my-20">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${ads[currentAd].color} p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_70px_rgba(168,85,247,.35)]`}
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

            <AnimatePresence mode="wait">
              <motion.h2
                key={currentAd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-4xl font-bold"
              >
                {ads[currentAd].title}
              </motion.h2>
            </AnimatePresence>

          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentAd + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-white/80 text-lg max-w-xl"
            >
              {ads[currentAd].desc}
            </motion.p>
          </AnimatePresence>

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
          {ads[currentAd].button}
        </motion.button>

      </motion.div>

    </section>
  );
}