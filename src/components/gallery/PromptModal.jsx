import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Heart, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { saveHistory } from "../../services/history";

export default function PromptModal({
  selectedPrompt,
  setSelectedPrompt,
  isFavorite,
  toggleFavorite,
}) {
  if (!selectedPrompt) return null;

  const copyPrompt = async () => {
  navigator.clipboard.writeText(selectedPrompt.prompt);

  await saveHistory({
  category: selectedPrompt.category,
  title: selectedPrompt.title,
  prompt: selectedPrompt.prompt,
  output: selectedPrompt.prompt,
});

  toast.success("Prompt copied successfully");
};

  const sharePrompt = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedPrompt.title,
          text: selectedPrompt.prompt,
        });
      } else {
        navigator.clipboard.writeText(selectedPrompt.prompt);
        toast.success("Prompt copied for sharing 🚀");
      }
    } catch (err) {
      console.log(err);
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
              src={selectedPrompt.image}
              alt={selectedPrompt.title}
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
                onClick={() =>
                  toggleFavorite(
                    selectedPrompt.id
                  )
                }
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
                onClick={sharePrompt}
                className="
                  w-16
                  rounded-2xl
                  bg-white/10
                  flex items-center justify-center
                  hover:bg-white/20
                  transition-all
                "
              >
                <Share2 size={24} />
              </button>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}