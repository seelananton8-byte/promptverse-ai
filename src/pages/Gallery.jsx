import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { categories, galleryData } from "../data/galleryData";
import { addRecent } from "../services/recentService";

import GalleryCard from "../components/gallery/GalleryCard";
import PromptModal from "../components/gallery/PromptModal";
import CategoryTabs from "../components/gallery/CategoryTabs";

import useFavorites from "../hooks/useFavorites";

export default function Gallery() {
const [selectedCategory, setSelectedCategory] = useState("All");
const [searchTerm, setSearchTerm] = useState("");
const [selectedPrompt, setSelectedPrompt] = useState(null);

useEffect(() => {
  addRecent("AI Gallery");
}, []);

const {
favorites,
toggleFavorite,
isFavorite,
} = useFavorites();

const filteredData = galleryData.filter((item) => {
const matchesCategory =
  selectedCategory === "All"
    ? true
    : selectedCategory === "Favorites"
    ? favorites.includes(item.id)
    : item.category === selectedCategory;

const matchesSearch =
  item.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  item.category
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

return matchesCategory && matchesSearch;

});

return ( <div className="min-h-screen bg-[#050816] text-white px-6 py-10">

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

    {/* Search */}
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
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
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
    <CategoryTabs
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />

    {/* Gallery Grid */}
    <div className="
      grid
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
      mt-10
    ">
      {filteredData.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          favorites={favorites}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          setSelectedPrompt={setSelectedPrompt}
        />
      ))}
    </div>

    {/* Modal */}
    <PromptModal
      selectedPrompt={selectedPrompt}
      setSelectedPrompt={setSelectedPrompt}
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
    />

  </div>
</div>

);
}
