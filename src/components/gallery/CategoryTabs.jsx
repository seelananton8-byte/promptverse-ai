export default function CategoryTabs({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">

      {["All", "Favorites", ...categories.filter(
        (c) => c !== "All"
        )].map((category) => (
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
          {category === "Favorites"
            ? "❤️ Favorites"
            : category}
        </button>
      ))}

    </div>
  );
}