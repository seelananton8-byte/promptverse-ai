import { auth } from "../services/firebase";
import { getFavorites, deleteFavorite, clearAllFavorites } from "../services/favorites";
import { getFavoritesLocal, deleteFavoriteLocal, clearAllFavoritesLocal } from "../services/favoritesLocal";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Trash2, Copy, Heart, X } from "lucide-react";
import toast from "react-hot-toast";
import MarkdownViewer from "../components/MarkdownViewer";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteId,setDeleteId] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    let data;

    if (user) {
      data = await getFavorites();
    } else {
      data = await getFavoritesLocal();
    }

    setFavorites(data);

  });

  return () => unsubscribe();

}, []);

  const clearFavorites = async () => {
    if (auth.currentUser) {
      await clearAllFavorites();
    } else {
      await clearAllFavoritesLocal();
    }

    setFavorites([]);
    setSelectedItem(null);
    setShowClearModal(false);
  };

  const removeFavorite = async (id) => {
    if (auth.currentUser) {
      await deleteFavorite(id);
    } else {
      await deleteFavoriteLocal(id);
    }

    setFavorites((prev) => prev.filter((item) => item.id !== id)
  );

  setSelectedItem(null);
  toast.success("Favorite removed successfully");
  };

  const copyText = async (text) => {

  await navigator.clipboard.writeText(text);

  toast.success("Copied to clipboard!");

}

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
              onClick={() => setShowClearModal(true)}
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
                key={item.id}
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

                <p className="text-sm text-gray-500 mt-2">
                  {item.createdAt?.toDate
                    ? item.createdAt.toDate().toLocaleString()
                    : item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Just Now"}
                </p>
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
                <p className="text-sm text-gray-500 mb-6">
                  {selectedItem.createdAt?.toDate
                    ? selectedItem.createdAt.toDate().toLocaleString()
                    : selectedItem.createdAt
                    ? new Date(selectedItem.createdAt).toLocaleString()
                    : "Just Now"}
                </p>

                {/* Response */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <MarkdownViewer content={selectedItem.response} />
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
                    onClick={() => setDeleteId(selectedItem.id)}
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

                {deleteId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[60]">
            <div className="bg-[#0B1023] p-6 rounded-2xl border border-white/10 w-[320px]">

              <h2 className="text-xl font-semibold mb-4">
                Remove this favorite?
              </h2>

              <p className="text-gray-400 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    removeFavorite(deleteId);
                    setDeleteId(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Remove
                </button>

              </div>

            </div>
          </div>
        )}

              {showClearModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[70]">
            <div className="bg-[#0B1023] p-6 rounded-2xl border border-white/10 w-[320px]">

              <h2 className="text-xl font-semibold mb-4">
                Remove all favorites?
              </h2>

              <p className="text-gray-400 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    clearFavorites();
                    setShowClearModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}