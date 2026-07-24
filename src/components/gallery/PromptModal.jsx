import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";
import { useState} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Heart, Share2 } from "lucide-react";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getGalleryStats, incrementViews } from "../../services/galleryStats";
import { toggleGalleryFavorite } from "../../services/galleryActions";

const ads = [
  {
    title: "Learn React Faster",
    desc: "Master React with real projects.",
    button: "Learn More",
  },
  {
    title: "Deploy on Vercel",
    desc: "Host your projects for free.",
    button: "Get Started",
  },
  {
    title: "Master Tailwind CSS",
    desc: "Build beautiful UIs quickly.",
    button: "Start Learning",
  },
  {
    title: "Build AI Apps",
    desc: "Create powerful AI tools.",
    button: "Explore",
  },
  {
    title: "Firebase Essentials",
    desc: "Authentication + Database.",
    button: "Read Guide",
  },
];

export default function PromptModal({
  selectedPrompt,
  setSelectedPrompt,
  isFavorite,
  toggleFavorite,
}) {
  const [sharing, setSharing] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [stats, setStats] = useState({
  likes: 0,
  views: 0,
});

const handleFavorite = async () => {

  const data = await toggleGalleryFavorite({
    item: selectedPrompt,
    isFavorite,
    toggleFavorite,
  });

  setStats(data);

};

// Ad
useEffect(() => {
  if (!selectedPrompt) return;

  setShowAd(true);
  setShowPrompt(false);

  setCurrentAd(Math.floor(Math.random() * ads.length));

  const timer = setTimeout(() => {
    setShowAd(false);
    setShowPrompt(true);
  }, 7000);

  return () => clearTimeout(timer);

}, [selectedPrompt]);

useEffect(() => {
  if (!selectedPrompt) return;

  const loadStats = async () => {
    const promptId = String(selectedPrompt.id);

    const viewedPrompts =
      JSON.parse(localStorage.getItem("viewedPrompts")) || [];

    if (!viewedPrompts.includes(promptId)) {
      await incrementViews(selectedPrompt.id);

      viewedPrompts.push(promptId);

      localStorage.setItem(
        "viewedPrompts",
        JSON.stringify(viewedPrompts)
      );
    }

    try {
      const data = await getGalleryStats(selectedPrompt.id);
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  loadStats();

}, [selectedPrompt]);

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

    if (Capacitor.isNativePlatform()) {

      await Share.share({
        title: selectedPrompt.title,
        text: selectedPrompt.prompt,
        dialogTitle: "Share Prompt",
      });

    } else if (navigator.share) {

      await navigator.share({
        title: selectedPrompt.title,
        text: selectedPrompt.prompt,
      });

    } else {

      await navigator.clipboard.writeText(selectedPrompt.prompt);

      toast.success("Prompt copied 🚀");

    }

  } catch (err) {

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
            max-w-6xl
            max-h-[92vh]
            overflow-y-auto
            overscroll-contain
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
                h-44
                sm:h-56
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
                max-w-[55%]
                sm:max-w-[60%]
                px-4 py-2
                rounded-full
                bg-black/60
                backdrop-blur-xl
                text-purple-300
                text-xs
                sm:text-sm
                truncate
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
                w-10
                h-10
                sm:w-12
                sm:h-12
                shrink-0
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
            {showAd && (
              <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 p-8 text-center mb-8">
                <p className="text-sm uppercase tracking-widest text-white/70">
                  Sponsored
                </p>

                <h2 className="text-3xl font-bold mt-3">
                   {ads[currentAd].title}
                </h2>

                <p className="mt-4 text-white/90">
                   {ads[currentAd].desc}
                </p>

                <button className="mt-6 px-8 py-3 rounded-xl bg-white text-purple-700 font-bold">
                  {ads[currentAd].button}
                </button>
              </div>
            )}

          {showPrompt && (
            <>
            <h2
              className="
                text-2xl
                sm:text-3xl
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
            <div className="flex gap-6 mt-4 text-gray-400">

              <div className="flex items-center gap-1">
                <Heart
                  size={16}
                  className="text-pink-500"
                  fill="currentColor"
                />
                {stats.likes}
              </div>

              <div className="flex items-center gap-1">
                <Eye
                  size={16}
                  className="text-cyan-400"
                />
                {stats.views}
              </div>

            </div>

            {/* Prompt Box */}
            <div
              className="
                mt-8
                bg-white/5
                border border-white/10
                rounded-3xl
                p-6
                max-h-[300px]
                overflow-y-auto
                sm:min-h-[180px]
                text-gray-300
                leading-relaxed
              "
            >
              {selectedPrompt.prompt}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={copyPrompt}
                className="
                  w-full
                  sm:flex-1
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
                onClick={handleFavorite}
                className="
                  w-full
                  sm:w-16
                  h-14
                  shrink-0
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
                  w-full
                  sm:w-16
                  h-14
                  shrink-0
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
              </div>

              {/* Generate Image */}

              <div className="mt-10 border-t border-white/10 pt-8">

                <h3 className="text-2xl font-bold text-white">
                  ✨ Generate Image
                </h3>

                <p className="mt-2 text-gray-400">
                  Choose your favorite AI platform.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                  {aiPlatforms.map((platform) => (

                    <button
                      key={platform.name}
                      onClick={() => generateWithAI(platform)}
                      className="
                        group
                        bg-white/5
                        border border-white/10
                        rounded-2xl
                        p-4
                        sm:p-5
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
            </>
            )}

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}