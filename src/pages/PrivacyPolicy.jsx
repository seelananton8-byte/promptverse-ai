import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
        >
          🔒 PromptVerse AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          className="text-5xl md:text-7xl font-extrabold mt-6 bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3 }}
          className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8 leading-8 text-gray-300"
        >

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Information We Collect
            </h2>

            <p>
              PromptVerse AI only collects the information necessary
              to provide authentication, synchronize your favorites,
              history, and improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              How We Use Your Data
            </h2>

            <p>
              Your information is used only to provide personalized
              features such as Favorites, History, Prompt Requests,
              and account synchronization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Data Security
            </h2>

            <p>
              We use Firebase Authentication and Firebase Firestore
              to securely store your data. We never sell or share
              your personal information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              AI Services
            </h2>

            <p>
              PromptVerse AI uses trusted AI providers such as
              Google Gemini, Groq, and Cerebras to generate AI
              responses. Your prompts may be processed by these
              providers according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Contact
            </h2>

            <p>
              If you have any questions regarding this Privacy
              Policy, you can contact the PromptVerse AI team.
            </p>
          </section>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
            Last Updated • July 2026
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold hover:scale-105 transition"
          >
            Back to Home →
          </button>

        </motion.div>

      </div>

    </div>
  );
}