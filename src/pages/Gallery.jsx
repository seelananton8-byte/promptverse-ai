import { useState } from "react";
import { Search } from "lucide-react";

import { categories, galleryData } from "../data/galleryData";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4 py-2
              rounded-full
              bg-purple-500/10
              border border-purple-500/20
              text-purple-300
              text-sm
              mb-6
            "
          >
            ✨ PromptVerse AI Gallery
          </div>

          <h1
            className="
              text-4xl
              md:text-6xl
              font-extrabold
              bg-gradient-to-r
              from-white
              via-purple-300
              to-cyan-300
              bg-clip-text
              text-transparent
              mb-5
            "
          >
            Discover Stunning
            <br />
            AI Image Prompts
          </h1>

          <p
            className="
              text-gray-400
              max-w-2xl
              mx-auto
              text-lg
              leading-relaxed
            "
          >
            Explore cinematic, anime, fantasy and creator-ready
            prompts crafted for the next generation of AI artists.
          </p>

        </div>

        {/* Search Bar */}
        <div
          className="
            relative
            max-w-3xl
            mx-auto
            mb-10
          "
        >
          <Search
            size={22}
            className="
              absolute
              left-6
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search prompts, styles, creators..."
            className="
              w-full
              bg-white/5
              border border-white/10
              rounded-3xl
              py-5
              pl-16
              pr-6
              outline-none
              backdrop-blur-xl
              text-white
              placeholder:text-gray-500
              focus:border-purple-500
              focus:shadow-[0_0_35px_rgba(168,85,247,.25)]
              transition-all
            "
          />
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                whitespace-nowrap
                px-5 py-3
                rounded-full
                border
                transition-all
                duration-300
                ${
                  selectedCategory === category
                    ? "bg-purple-600 border-purple-600 shadow-[0_0_20px_rgba(168,85,247,.4)]"
                    : "bg-white/5 border-white/10 hover:border-purple-500"
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>
         {/* Gallery Grid */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">

  {galleryData.map((item) => (
    <div
      key={item.id}
      className="
        group
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

        {/* Category Badge */}
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

      </div>

      {/* Card Content */}
      <div className="p-5">

        <h3 className="font-bold text-lg mb-3">
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

      </div>
    </div>

  ))}

</div>
</div>
</div>
  );
}
