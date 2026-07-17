import { useState} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Heart, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PromptModal({
  selectedPrompt,
  setSelectedPrompt,
  isFavorite,
  toggleFavorite,
}) {
  const [sharing, setSharing] = useState(false);
  if (!selectedPrompt) return null;

  const aiPlatforms = [
  {
    name: "ChatGPT",
    icon: "🤖",
    desc: "OpenAI Image Generator",
    url: "https://chatgpt.com",
  },
  {
    name: "Gemini",
    icon: "💎",
    desc: "Google AI",
    url: "https://gemini.google.com",
  },
  {
    name: "Leonardo AI",
    icon: "🟠",
    desc: "Professional Images",
    url: "https://app.leonardo.ai",
  },
  {
    name: "Flux",
    icon: "⚡",
    desc: "Fast Image Generation",
    url: "https://playground.bfl.ai",
  },
  {
    name: "Claude",
    icon: "🧠",
    desc: "Anthropic AI",
    url: "https://claude.ai",
  },
  {
    name: "Grok",
    icon: "⚫",
    desc: "xAI",
    url: "https://grok.com",
  },
];

  const copyPrompt = async () => {
  await navigator.clipboard.writeText(selectedPrompt.prompt);

  toast.success("Prompt copied 📋");
};

const generateWithAI = async (platform) => {

  try {

    await navigator.clipboard.writeText(
      selectedPrompt.prompt
    );

    toast.success(
      `Prompt copied! Opening ${platform.name} 🚀`
    );

    setTimeout(() => {
      window.open(platform.url, "_blank");
    }, 600);

  } catch (err) {

    toast.error("Failed to copy prompt");

  }

};

  const sharePrompt = async () => {

  if (sharing) return;

  setSharing(true);

  try {

    if (navigator.share) {

      await navigator.share({
        title: selectedPrompt.title,
        text: selectedPrompt.prompt,
      });
      toast.success('Shared successfully');

    } else {

      await navigator.clipboard.writeText(selectedPrompt.prompt);

      toast.success("Prompt copied for sharing 🚀");

    }

  } catch (err) {

    // User Cancel panna error varum.
    if (err.name !== "AbortError") {
      console.error(err);
    }

  } finally {

    setSharing(false);

  }

};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedPrompt(null)}
        className="
          fixed inset-0
          bg-black/80
          backdrop-blur-md
          z-50
          flex items-center justify-center
          p-4
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            bg-[#0B1120]
            border border-white/10
            rounded-3xl
            overflow-hidden
            w-full
            max-w-5xl
            max-h-[90vh]
            overflow-y-auto
          "
        >
          {/* Image */}
          <div className="relative">

            <img
              loading='lazy'
              src={selectedPrompt.image}
              alt={`${selectedPrompt.title} AI Prompt`}
              className="
                w-full
                h-[250px]
                md:h-[420px]
                object-cover
              "
            />

            {/* Category */}
            <div
              className="
                absolute
                top-5
                left-5
                px-4 py-2
                rounded-full
                bg-black/60
                backdrop-blur-xl
                text-purple-300
                text-sm
              "
            >
              {selectedPrompt.category}
            </div>

            {/* Close */}
            <button
              onClick={() =>
                setSelectedPrompt(null)
              }
              className="
                absolute
                top-5
                right-5
                w-12
                h-12
                rounded-full
                bg-black/60
                backdrop-blur-xl
                flex items-center justify-center
                hover:bg-red-500
                transition-all
              "
            >
              <X size={24} />
            </button>

          </div>

          {/* Content */}
          <div className="p-6 md:p-8">

            <h2
              className="
                text-3xl
                md:text-5xl
                font-bold
                bg-gradient-to-r
                from-white
                via-purple-300
                to-cyan-300
                bg-clip-text
                text-transparent
              "
            >
              {selectedPrompt.title}
            </h2>

            {/* Stats */}
            <div
              className="
                flex gap-6
                mt-4
                text-gray-400
              "
            >
              <span>
                ❤️ {selectedPrompt.likes}
              </span>

              <span>
                👁️ {selectedPrompt.views}
              </span>
            </div>

            {/* Prompt Box */}
            <div
              className="
                mt-8
                bg-white/5
                border border-white/10
                rounded-3xl
                p-6
                min-h-[180px]
                text-gray-300
                leading-relaxed
              "
            >
              {selectedPrompt.prompt}
            </div>

            {/* Buttons */}
            <div
              className="
                flex flex-wrap
                gap-4
                mt-8
              "
            >
              <button
                onClick={copyPrompt}
                className="
                  flex-1
                  min-w-[180px]
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-purple-600
                  to-cyan-500
                  font-semibold
                  flex items-center justify-center gap-2
                  hover:scale-105
                  transition-all
                "
              >
                <Copy size={20} />
                Copy Prompt
              </button>

              <button
                onClick={() => {
                  toggleFavorite(selectedPrompt);
                }}
                className="
                  w-16
                  rounded-2xl
                  bg-white/10
                  flex items-center justify-center
                  hover:bg-white/20
                  transition-all
                "
              >
                <Heart
                  size={24}
                  fill={
                    isFavorite(
                      selectedPrompt.id
                    )
                      ? "#ef4444"
                      : "transparent"
                  }
                />
              </button>

              <button
                disabled={sharing}
                onClick={sharePrompt}
                className="
                  w-16
                  rounded-2xl
                  bg-white/10
                  flex items-center justify-center
                  hover:bg-white/20
                  transition-all
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <Share2 size={24} />
              </button>

              {/* Generate Image */}

              <div className="mt-10 border-t border-white/10 pt-8">

                <h3 className="text-2xl font-bold text-white">
                  ✨ Generate Image
                </h3>

                <p className="mt-2 text-gray-400">
                  Choose your favorite AI platform.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                  {aiPlatforms.map((platform) => (

                    <button
                      key={platform.name}
                      onClick={() => generateWithAI(platform)}
                      className="
                        group
                        bg-white/5
                        border border-white/10
                        rounded-2xl
                        p-5
                        text-left
                        hover:border-purple-500
                        hover:bg-purple-500/10
                        hover:shadow-[0_0_30px_rgba(168,85,247,.35)]
                        transition-all
                        duration-300
                        hover:scale-[1.03]
                      "
                    >

                      <div className="text-3xl">
                        {platform.icon}
                      </div>

                      <h4 className="mt-3 font-bold text-white">
                        {platform.name}
                      </h4>

                      <p className="text-sm text-gray-400 mt-1">
                        {platform.desc}
                      </p>

                      <div
                        className="
                          mt-4
                          text-purple-400
                          font-medium
                          group-hover:translate-x-1
                          transition
                        "
                      >
                        Generate →
                      </div>

                    </button>

                  ))}

                </div>

                <p className="text-xs text-gray-500 mt-6">
                  💡 Your prompt will be copied automatically.
                  After generating your image, simply close the AI tab to continue using PromptVerse AI.
                </p>

              </div>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}