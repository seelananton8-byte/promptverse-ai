import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const features = [
    "🤖 AI Assistant",
    "🎨 AI Gallery",
    "❤️ Favorites",
    "🕘 History",
    "🔥 Recently Used",
    "📨 Prompt Request",
    "⚡ Multi AI Engine",
    "☁ Firebase Sync",
  ];

  const tech = [
    "React",
    "Vite",
    "Tailwind CSS",
    "Firebase",
    "Gemini AI",
    "Groq",
    "Cerebras",
    "EmailJS",
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        {/* Badge */}

        <motion.div
          initial={{ opacity:0,y:-20 }}
          animate={{ opacity:1,y:0 }}
          className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
        >
          🚀 About PromptVerse AI
        </motion.div>

        {/* Hero */}

        <motion.h1
          initial={{ opacity:0,y:30 }}
          animate={{ opacity:1,y:0 }}
          transition={{ delay:.15 }}
          className="mt-6 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent"
        >
          One AI Platform.
          <br />
          Endless Creativity.
        </motion.h1>

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:.3 }}
          className="mt-8 max-w-3xl text-gray-400 text-lg leading-8"
        >
          Built for Creators • Students • Professionals
        </motion.p>

        {/* Mission */}

        <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
        >
        <h2 className="text-3xl font-bold mb-6">
            Our Mission
        </h2>

        <p className="text-gray-400 leading-8 text-lg">
            PromptVerse AI is built to help creators,
            students, freelancers, and professionals
            generate high-quality AI prompts faster.

            <br /><br />

            Whether you're creating YouTube content,
            Instagram captions, LinkedIn posts,
            professional emails, or studying with AI,
            PromptVerse AI makes your workflow faster,
            smarter, and more creative.
        </p>
        </motion.div>

        {/* Who is this for? */}

        <div className="mt-20">

        <h2 className="text-3xl font-bold mb-10">
            Who is PromptVerse AI for?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">
                🎬 Content Creators
            </h3>

            <p className="text-gray-400 leading-7">
                Create YouTube scripts,
                thumbnail ideas,
                viral captions,
                content strategies,
                and much more.
            </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">
                📱 Social Media Creators
            </h3>

            <p className="text-gray-400 leading-7">
                Generate Instagram captions,
                LinkedIn posts,
                hashtags,
                reels,
                and engaging social content.
            </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">
                🎓 Students
            </h3>

            <p className="text-gray-400 leading-7">
                Learn faster with Study Assistant,
                summaries,
                explanations,
                notes,
                and AI learning prompts.
            </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">
                💼 Professionals
            </h3>

            <p className="text-gray-400 leading-7">
                Write professional emails,
                improve productivity,
                communicate better,
                and save valuable time.
            </p>
            </div>

        </div>

        </div>

        <div className="mt-20">

        <h2 className="text-3xl font-bold mb-10">
            Core Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {features.map((item, index) => (

            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{
                scale: 1.03,
                y: -6,
                }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center"
            >
                {item}
            </motion.div>

            ))}

        </div>

       </div>

        <div className="mt-20">

        <h2 className="text-3xl font-bold mb-10">
            Built With
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {tech.map((item, index) => (

            <motion.div
                key={index}
                initial={{ opacity: 0, scale: .9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * .06 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center font-semibold"
            >
                {item}
            </motion.div>

            ))}

        </div>

        </div>

        <motion.div
            initial={{ opacity:0,y:40 }}
            whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true }}
            className="mt-24 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-white/10 rounded-3xl p-10 text-center"
            >

            <h2 className="text-3xl font-bold">
                Created with ❤️
            </h2>

            <p className="mt-6 text-2xl font-bold text-purple-300">
                Antonseelan
            </p>

            <p className="mt-8 text-gray-400 leading-8 max-w-3xl mx-auto">
                PromptVerse AI is designed to help creators,
                students, and professionals generate
                high-quality AI prompts faster.

                From YouTube content creation to Instagram,
                LinkedIn, professional emails, and study
                assistance, PromptVerse AI makes creativity
                simple, faster, and smarter.
            </p>

            </motion.div>

            <div className="mt-16 flex justify-center">

            <button
                onClick={() => navigate("/")}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
            >
                🏠 Back to Home
            </button>

            </div>

            <div className="mt-20 text-center border-t border-white/10 pt-10">

            <p className="text-2xl font-bold">
                PromptVerse AI
            </p>

            <p className="mt-2 text-gray-400">
                Version 1.0.0
            </p>

            <p className="mt-2 text-gray-500">
                July 2026
            </p>

            <p className="mt-8 text-gray-500">
                © 2026 PromptVerse AI.
                All Rights Reserved.
            </p>

            </div>

      </div>
    </div>
  );
}