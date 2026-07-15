import { motion } from "framer-motion";
import { addRecent } from "../../services/recentService";

export default function GalleryCard({
  item,
  isFavorite,
  toggleFavorite,
  setSelectedPrompt,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.4,
      }}
      onClick={() => {
        addRecent("AI Gallery", item.title);
        setSelectedPrompt(item);
      }}
      className="
        group
        cursor-pointer
        bg-white/5
        border border-white/10
        rounded-3xl
        overflow-hidden
        backdrop-blur-xl
        hover:border-purple-500
        hover:shadow-[0_0_35px_rgba(168,85,247,.25)]
        transition-all
        duration-300
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={item.image}
          alt={item.title}
          className="
            w-full
            h-64
            object-cover
            group-hover:scale-110
            transition-transform
            duration-500
          "
        />

        {/* Category */}
        <div
          className="
            absolute
            top-4
            left-4
            px-3 py-1
            rounded-full
            bg-black/60
            backdrop-blur-md
            text-xs
            text-purple-300
          "
        >
          {item.category}
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item);
          }}
          className="
            absolute
            top-4
            right-4
            w-10
            h-10
            rounded-full
            bg-black/60
            backdrop-blur-md
            flex
            items-center
            justify-center
            text-xl
            hover:scale-110
            transition-all
          "
        >
          {isFavorite(item.id) ? "❤️" : "🤍"}
        </button>

      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col h-[160px] md:h-[180px]">

        <h3 className="font-bold text-lg md:text-xl line-clamp-2">
          {item.title}
        </h3>

        <div
          className="
            flex
            items-center
            justify-between
            text-sm
            text-gray-400
          "
        >
          <span>❤️ {item.likes}</span>
          <span>👁️ {item.views}</span>
        </div>

        {/* Copy Prompt */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            navigator.clipboard.writeText(
              item.prompt
            );
          }}
          className="
            mt-auto
            w-full
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-purple-600
            to-cyan-500
            hover:scale-105
            transition-all
            duration-300
            font-semibold
          "
        >
          📋 Copy Prompt
        </button>

      </div>
    </motion.div>
  );
}