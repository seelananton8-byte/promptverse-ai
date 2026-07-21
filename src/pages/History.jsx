import { auth } from "../services/firebase"; // Import the auth object from your Firebase configuration
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Trash2, Copy, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MarkdownViewer from "../components/MarkdownViewer";
import SponsoredBanner from "../components/SponsoredBanner";
import Skeleton from "../components/Skeleton";
import { getHistory,  deleteHistory, clearAllHistory } from "../services/history";
import { getHistoryLocal, deleteHistoryLocal, clearAllHistoryLocal } from "../services/historyLocal";

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    try {

      let data;

      if (user) {
        data = await getHistory();
      } else {
        data = await getHistoryLocal();
      }

      setHistory(data);
      setLoading(false);

    } catch (err) {

      console.error(err);

      toast.error("Unable to load history.");
      setLoading(false);

    }

  });

  return () => unsubscribe();

}, []);

  // Clear history
  const clearHistory = async () => {
  try {
    if (auth.currentUser) {
      await clearAllHistory();
    } else {
      await clearAllHistoryLocal();
    }

    setHistory([]);
    setSelectedItem(null);
    setShowClearModal(false);
    toast.success("History cleared.");

  } catch (err) {
    console.error(err);
    toast.error("Unable to clear history.");
  }
};

  const reusePrompt = (prompt) => {
    localStorage.setItem("reusePrompt", prompt);
    toast.success("Prompt ready to reuse!");
    navigate("/");
  };

  const deleteItem = async (id) => {

  try {

    if (auth.currentUser) {
      await deleteHistory(id);
    } else {
      await deleteHistoryLocal(id);
    }

    setHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setSelectedItem(null);

    toast.success("History deleted successfully!");

  } catch (err) {

    console.error(err);

    toast.error("Unable to delete history.");

  }

};

  const copyText = async (text) => {
  await navigator.clipboard.writeText(text);

  toast.success("Copied to clipboard!");
};

if (loading) {
  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <Skeleton count={4} />
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            History
          </h1>

          {history.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">

            <div className="text-7xl mb-6">
              📂
            </div>

            <h2 className="text-3xl font-bold">
              No History Yet
            </h2>

            <p className="text-gray-400 mt-4 max-w-md">
              Every AI response you generate will appear here.
              Start creating amazing content with PromptVerse AI.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:scale-105 transition"
            >
              ✨ Generate Now
            </button>

          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedItem(item)
                }
                className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-purple-500 hover:bg-white/10 transition"
              >
                <h2 className="text-lg font-semibold text-purple-400 truncate">
                  {item.prompt}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {item.createdAt?.toDate
                    ? item.createdAt.toDate().toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace("am", "AM")
                      .replace("pm", "PM")
                    : item.createdAt
                    ? new Date(item.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace("am", "AM")
                      .replace("pm", "PM")
                    : "Just now"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        {selectedItem && (
          <>
            <div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setSelectedItem(null)}
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-[#0B1023] border border-white/10 rounded-3xl p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-purple-400">
                    {selectedItem.prompt}
                  </h2>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X size={28} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  {selectedItem.createdAt?.toDate
                    ? selectedItem.createdAt.toDate().toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace("am", "AM")
                      .replace("pm", "PM")
                    : selectedItem.createdAt
                    ? new Date(selectedItem.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace("am", "AM")
                      .replace("pm", "PM")
                    : "Just now"}
                </p>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <MarkdownViewer content={selectedItem.output} />
                </div>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() =>
                      copyText(selectedItem.output)
                    }
                    className="bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
                  >
                    <Copy size={16} />
                    Copy
                  </button>

                  <button
                    onClick={() =>
                      reusePrompt(selectedItem.prompt)
                    }
                    className="bg-cyan-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-700 transition"
                  >
                    🔄 Reuse
                  </button>

                  <button
                    onClick={() =>
                      setDeleteId(selectedItem.id)
                    }
                    className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </div>
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[60]">
            <div className="bg-[#0B1023] p-6 rounded-2xl border border-white/10 w-[320px]">

              <h2 className="text-xl font-semibold mb-4">
                Delete this history?
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
                  onClick={async () => {
                  await deleteItem(deleteId);
                  setDeleteId(null);
                }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        )}

        {/* Clear All History Modal */}
        {showClearModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[70]">
            <div className="bg-[#0B1023] p-6 rounded-2xl border border-white/10 w-[320px]">

              <h2 className="text-xl font-semibold mb-4">
                Delete all history?
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
                  onClick={async () => {
                  await clearHistory();
                }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        )}
      <SponsoredBanner />
      </div>
    </div>
  );
}