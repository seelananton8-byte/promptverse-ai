import { motion } from "framer-motion";
import { addRecent } from "../../services/recentService";
import toast from 'react-hot-toast'
import { useEffect, useState } from "react";
import { getGalleryStats } from "../../services/galleryStats";
import { toggleGalleryFavorite } from "../../services/galleryActions";
import { Heart, Eye } from "lucide-react";
import { Copy } from "lucide-react";

export default function GalleryCard({
  item,
  isFavorite,
  toggleFavorite,
  setSelectedPrompt,
}) {
  const [stats, setStats] = useState({
  likes: 0,
  views: 0,
});

useEffect(() => {
  const loadStats = async () => {
    const data = await getGalleryStats(item.id);
    setStats(data);
  };

  loadStats();
}, [item.id]);

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
        hover:bg-white/[0.08]
        hover:shadow-[0_0_35px_rgba(168,85,247,.25)]
        transition-all
        duration-300
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          loading="lazy"
          decoding="async"
          src={item.image}
          alt={`${item.title} AI Prompt`}
          className="
            w-full
            h-48
            sm:h-56
            md:h-64
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
            text-[11px]
            sm:text-xs
            text-purple-300
          "
        >
          {item.category}
        </div>

        {/* Favorite */}
        <button
          onClick={async (e) => {
            e.stopPropagation();

            const data = await toggleGalleryFavorite({
              item,
              isFavorite,
              toggleFavorite,
            });

            setStats(data);
          }}
          className="
            absolute
            top-4
            right-4
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-full
            bg-black/60
            backdrop-blur-md
            flex
            items-center
            justify-center
            text-lg 
            sm:text-xl
            hover:scale-110
            transition-all
          "
        >
          {isFavorite(item.id) ? "❤️" : "🤍"}
        </button>

      </div>

      {/* Content */}
      <div
        className="
          p-4
          md:p-5
          flex
          flex-col
          min-h-[180px]
        "
      >

        <h3 className="font-bold text-base sm:text-lg md:text-xl line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center gap-5 mt-3 text-gray-400 text-sm">

          <div className="flex items-center gap-1">
            <Heart
              size={16}
              className="text-pink-500"
              fill="currentColor"
            />
            <span>{stats.likes}</span>
          </div>

          <div className="flex items-center gap-1">
            <Eye
              size={16}
              className="text-cyan-400"
            />
            <span>{stats.views}</span>
          </div>

        </div>

        {/* Copy Prompt */}
        <button
          onClick={async (e) => {
            e.stopPropagation();

            await navigator.clipboard.writeText(
              item.prompt
            );
            toast.success("Prompt copied!");
          }}
           className="
                mt-auto
                w-full
                py-2.5
                sm:py-3
                text-sm
                sm:text-base
                rounded-2xl
                bg-gradient-to-r
                from-purple-600
                to-cyan-500
                hover:brightness-110
                active:scale-95
                transition-all
                duration-300
                font-semibold
                flex
                items-center
                justify-center
                gap-2
              "
        >
        <Copy size={16}/>
          Copy Prompt
        </button>

      </div>
    </motion.div>
  );
}