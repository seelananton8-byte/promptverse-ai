import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HelpCenter() {
  const navigate = useNavigate();

  const [openFAQ, setOpenFAQ] = useState(null);

const faqs = [
  {
    question: "How do I use AI Assistant?",
    answer:
      "Choose a toolkit, enter your prompt, and PromptVerse AI will generate content using the best available AI model.",
  },
  {
    question: "How do I use AI Gallery?",
    answer:
      "Open AI Gallery, select any prompt, copy it or generate images directly using your preferred AI platform.",
  },
  {
    question: "How do Favorites work?",
    answer:
      "Tap the ❤️ icon to save prompts. You can access them anytime from the Favorites page.",
  },
  {
    question: "How does History work?",
    answer:
      "Every generated prompt is automatically stored in History so you can revisit it later.",
  },
  {
    question: "What is Recently Used?",
    answer:
      "Recently Used shows the AI tools you've accessed most recently for quick navigation.",
  },
  {
    question: "How do I request a new AI Prompt?",
    answer:
      "Open the Prompt Request page from the menu, fill out the form, and submit your idea. It will be reviewed for future updates.",
  },
  {
    question: "Which AI platforms are supported?",
    answer:
      "PromptVerse AI currently supports ChatGPT, Gemini, Claude, Grok, Leonardo AI, and Flux for image generation workflows.",
  },
  {
    question: "Is PromptVerse AI free?",
    answer:
      "Yes. PromptVerse AI is free to use. Some external AI platforms may require their own accounts or subscriptions.",
  },
];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
        >
          ❓ PromptVerse Support
        </motion.div>

        {/* Hero */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          className="mt-6 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent"
        >
          Help Center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 max-w-3xl text-gray-400 text-lg leading-8"
        >
          Everything you need to know about PromptVerse AI.
          Learn how to use AI Assistant, AI Gallery,
          Favorites, History, Recently Used, and much more.
        </motion.p>

        {/* Quick Help */}

        <div className="mt-20">

        <h2 className="text-3xl font-bold mb-10">
            Quick Help
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
            <div className="text-4xl">🤖</div>

            <h3 className="mt-5 text-xl font-bold">
                AI Assistant
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
                Generate AI content using Gemini, Groq,
                and Cerebras with automatic fallback.
            </p>

            </motion.div>

            <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
            <div className="text-4xl">🎨</div>

            <h3 className="mt-5 text-xl font-bold">
                AI Gallery
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
                Browse premium prompts and generate
                images using your favorite AI platform.
            </p>

            </motion.div>

            <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
            <div className="text-4xl">❤️</div>

            <h3 className="mt-5 text-xl font-bold">
                Favorites
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
                Save your best prompts and access
                them anytime with one click.
            </p>

            </motion.div>

            <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
            >
            <div className="text-4xl">🕘</div>

            <h3 className="mt-5 text-xl font-bold">
                History
            </h3>

            <p className="mt-3 text-gray-400 leading-7">
                View recently generated prompts
                and continue where you left off.
            </p>

            </motion.div>

        </div>

        </div>

        {/* FAQ */}

            <div className="mt-24">

            <h2 className="text-3xl font-bold mb-10">
                Frequently Asked Questions
            </h2>

            <div className="space-y-5">

                {faqs.map((faq, index) => (

                <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >

                    <button
                    onClick={() =>
                        setOpenFAQ(openFAQ === index ? null : index)
                    }
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >

                    <span className="font-semibold text-lg">
                        {faq.question}
                    </span>

                    <span className="text-2xl text-purple-400">
                        {openFAQ === index ? "−" : "+"}
                    </span>

                    </button>

                    <div
                    className={`
                        transition-all
                        duration-300
                        overflow-hidden
                        ${
                        openFAQ === index
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                    `}
                    >

                    <p className="px-6 pb-6 text-gray-400 leading-8">
                        {faq.answer}
                    </p>

                    </div>

                </div>

                ))}

            </div>

            </div>

            {/* Need More Help */}

                <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-white/10 rounded-3xl p-10 text-center"
                >

                <h2 className="text-3xl font-bold">
                    Still Need Help?
                </h2>

                <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-8">
                    Can't find the answer you're looking for?
                    Submit your request and we'll improve PromptVerse AI
                    in future updates.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

                    <button
                    onClick={() => navigate("/request")}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
                    >
                    📨 Request New Prompt
                    </button>

                    <button
                    onClick={() => navigate("/")}
                    className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                    >
                    🏠 Back to Home
                    </button>

                </div>

                </motion.div>

      </div>

                <div className="mt-20 text-center border-t border-white/10 pt-10">

            <p className="text-2xl font-bold">
                PromptVerse AI
            </p>

            <p className="mt-2 text-gray-400">
                Help Center
            </p>

            <p className="mt-2 text-gray-500">
                Version 1.0.0
            </p>

            <p className="mt-2 text-gray-500">
                July 2026
            </p>

            <p className="mt-8 text-gray-500">
                Built with ❤️ by JeyPre Creations
            </p>

            </div>

    </div>
  );
}