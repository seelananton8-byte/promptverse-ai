import { useEffect, useState } from "react";
import { Trash2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);

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
};

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            History
          </h1>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-400">
            No history found.
          </p>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(item.time).toLocaleString()}
                </p>

                <h2 className="font-bold text-purple-400">
                  Prompt:
                </h2>

                <p className="mb-4">
                  {item.prompt}
                </p>

                <h2 className="font-bold text-cyan-400">
                  Response:
                </h2>

                <p className="whitespace-pre-wrap text-gray-300">
                  {item.response}
                </p>

            <div className="flex gap-2 mt-4">

                <button
                    onClick={() => copyText(item.response)}
                    className="bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Copy size={16} />
                    Copy
                </button>

                <button
                    onClick={() => deleteItem(index)}
                    className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Trash2 size={16} />
                    Delete
                </button>

                <button
                    onClick={() => reusePrompt(item.prompt)}
                    className="bg-cyan-600 px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                    🔄 Reuse
                </button>

            </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}