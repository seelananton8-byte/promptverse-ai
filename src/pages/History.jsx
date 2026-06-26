import { useEffect, useState } from "react";
import { Trash2, Copy, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("history") || "[]"
    );

    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
    setSelectedItem(null);
    setShowClearModal(false);
  };

  const reusePrompt = (prompt) => {
    localStorage.setItem("reusePrompt", prompt);
    navigate("/");
  };

  const deleteItem = (index) => {
    const updatedHistory = history.filter(
      (_, i) => i !== index
    );

    localStorage.setItem(
      "history",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);

    if (selectedItem?.index === index) {
      setSelectedItem(null);
    }
  };

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

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
          <p className="text-gray-400">
            No history found.
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
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
                <h2 className="text-lg font-semibold text-purple-400 truncate">
                  {item.prompt}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {new Date(item.time).toLocaleString()}
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
                  {new Date(
                    selectedItem.time
                  ).toLocaleString()}
                </p>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {selectedItem.response}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() =>
                      copyText(selectedItem.response)
                    }
                    className="bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
                  >
                    <Copy size={16} />
                    {copied ? "Copied" : "Copy"}
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
                      setDeleteIndex(selectedItem.index)
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
        {deleteIndex !== null && (
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
                  onClick={() => setDeleteIndex(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    deleteItem(deleteIndex);
                    setDeleteIndex(null);
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
                  onClick={() => {
                    clearHistory();
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