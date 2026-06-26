import { useEffect, useState } from "react";
import { Trash2, Copy, Heart, X } from "lucide-react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(storedFavorites);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setSelectedItem(null);
  };

  const removeFavorite = (index) => {
    const updatedFavorites = favorites.filter(
      (_, i) => i !== index
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    if (selectedItem?.index === index) {
      setSelectedItem(null);
    }
  };

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Heart className="text-pink-500" size={34} />
            <h1 className="text-4xl font-bold">
              Favorites
            </h1>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <p className="text-gray-400">
            No favorites found.
          </p>
        ) : (
          <div className="space-y-4">

            {favorites.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedItem({
                    ...item,
                    index,
                  })
                }
             className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-purple-500 hover:bg-white/10 transition"
            >
                <h2 className="text-lg font-semibold text-pink-400 truncate">
                  {item.prompt}
                </h2>

                {item.time && (
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(item.time).toLocaleString()}
                  </p>
                )}
              </div>
            ))}

          </div>
        )}

        {/* Modal */}
        {selectedItem && (
          <>
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setSelectedItem(null)}
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

              <div className="bg-[#0B1023] border border-white/10 rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-pink-400">
                    {selectedItem.prompt}
                  </h2>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Time */}
                {selectedItem.time && (
                  <p className="text-sm text-gray-500 mb-6">
                    {new Date(
                      selectedItem.time
                    ).toLocaleString()}
                  </p>
                )}

                {/* Response */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {selectedItem.response}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() =>
                      copyText(selectedItem.response)
                    }
                    className="bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
                  >
                    <Copy size={16} />
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      removeFavorite(selectedItem.index);
                    }}
                    className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>

                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}