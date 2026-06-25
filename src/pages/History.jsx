import { useEffect, useState } from "react";
import { Trash2, Copy } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);

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

                <button
                  onClick={() => copyText(item.response)}
                  className="mt-4 bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}