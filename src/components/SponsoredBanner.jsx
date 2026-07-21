import { motion } from "framer-motion";

const ads = [
  {
    title: "🚀 Learn React Faster",
    desc: "Master React with real-world projects.",
    button: "Learn More",
  },
  {
    title: "☁️ Deploy on Vercel",
    desc: "Host your projects for free.",
    button: "Get Started",
  },
  {
    title: "🎨 Master Tailwind CSS",
    desc: "Build beautiful modern UIs quickly.",
    button: "Start Learning",
  },
  {
    title: "🤖 Build AI Apps",
    desc: "Create powerful AI tools using modern APIs.",
    button: "Explore",
  },
  {
    title: "🔥 Firebase Essentials",
    desc: "Authentication, Firestore & Hosting made easy.",
    button: "Read Guide",
  },
];

export default function SponsoredBanner() {
  const ad = ads[Math.floor(Math.random() * ads.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-12 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 p-8 text-center shadow-xl"
    >
      <p className="text-sm uppercase tracking-widest text-white/70">
        Sponsored
      </p>

      <h2 className="text-3xl font-bold mt-3">
        {ad.title}
      </h2>

      <p className="mt-4 text-white/90">
        {ad.desc}
      </p>

      <button className="mt-6 px-8 py-3 rounded-xl bg-white text-purple-700 font-bold">
        {ad.button}
      </button>
    </motion.div>
  );
}