import { useState, useEffect } from "react";
import { Sparkles, Search, Copy, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { generateContent } from "../services/gemini";
import { generateWithGroq } from "../services/groq";
import { generateWithCerebras } from "../services/cerebras";


export default function Hero() {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [favorites, setFavorites] = useState(
  JSON.parse(localStorage.getItem("favorites")) || []
);

  //Reusing
  useEffect(() => {
  const savedPrompt = localStorage.getItem("reusePrompt");

  if (savedPrompt) {
    setPrompt(savedPrompt);
    localStorage.removeItem("reusePrompt");
  }
}, []);

  // 🚀 Generate AI Content
  const handleGenerate = async () => {
  if (!prompt.trim()) {
    setError("Please enter a prompt.");
    return;
  }

  setError("");
  setLoading(true);

  try {
    let response;

    try {
      // 🥇 Primary AI → Groq
      response = await generateWithGroq(prompt);

    } catch (groqError) {
      console.log(
        "Groq failed, switching to Cerebras...",
        groqError
      );

      try {
        // 🥈 Backup AI → Cerebras
        response = await generateWithCerebras(prompt);

      } catch (cerebrasError) {
        console.log(
          "Cerebras failed, switching to Gemini...",
          cerebrasError
        );

        // 🥉 Final AI → Gemini
        response = await generateContent(prompt);
      }
    }

    setResult(response);
    setLastPrompt(prompt);

    // 💾 Save history
    const newItem = {
      prompt,
      response,
      time: new Date().toISOString(),
    };

    const oldHistory = JSON.parse(
      localStorage.getItem("history") || "[]"
    );

    localStorage.setItem(
      "history",
      JSON.stringify([newItem, ...oldHistory])
    );

    setPrompt("");

  } catch (err) {
    console.error(err);

    setError(
      "All AI services are currently unavailable. Please try again later."
    );

  } finally {
    setLoading(false);
  }
};

  // 📋 Copy
  const copyToClipboard = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() =>
      setCopied(false), 1500);
    } catch (err) {
      setError("Copy failed ❌", err);
    }
  };

  // ⬇️ Download
  const downloadResponse = () => {
    if (!result) return;

    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = `promptverse-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  // ❌ Clear Result
  const clearResult = () => {
    setResult("");
  };
  const saveFavorite = () => {
  if (!result) return;

  const newFavorite = {
    prompt: lastPrompt,
    response: result,
    time: new Date().toISOString(),
  };

  const updatedFavorites = [
    newFavorite,
    ...favorites,
  ];

  setFavorites(updatedFavorites);

  localStorage.setItem(
    "favorites",
    JSON.stringify(updatedFavorites)
  );
      setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1500);
};

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto text-center pt-16 px-6"
    >
      {/* ICON */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,.5)]"
        >
          <Sparkles size={45} />
        </motion.div>
      </div>

      {/* TITLE */}
      <h1 className="text-5xl md:text-7xl font-black leading-tight">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Generate Better
        </span>
        <br />
        AI Content
      </h1>

      <p className="text-gray-400 text-lg md:text-xl mt-6">
        AI prompts, captions, emails & more...
      </p>

      {/* INPUT */}
      <div className="mt-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center overflow-hidden">
          <input
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError("");
            }}
              onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleGenerate();
              }
            }}
            className="flex-1 bg-transparent px-6 py-5 outline-none"
            placeholder="Type your prompt..."
          />

          <motion.button
            onClick={handleGenerate}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-500 h-full px-8 py-5 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">✨</span>
            ) : (
              <Search />
            )}
          </motion.button>
        </div>

        {/* ERROR / STATUS */}
        {error && <p className="text-red-400 mt-4">{error}</p>}

        {/* LOADING */}
        {loading && (
          <p className="text-purple-400 mt-6 animate-pulse">
            ✨ Generating...
          </p>
        )}

        {/* RESULT */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-purple-500/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-6 text-left shadow-xl"
          >
            {/* HEADER WITH ✕ */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-purple-300">
                ✨ AI Response
              </h3>

              <button
                onClick={clearResult}
                className="text-white/70 hover:text-red-400 text-xl"
              >
                ✕
              </button>
            </div>

            {/* TEXT */}
            <p className="whitespace-pre-wrap text-gray-200 leading-relaxed">
              {result}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={saveFavorite}
                className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition flex items-center gap-2"
              >
                <Heart
                    size={16}
                    fill={saved ? "currentColor" : "none"}
                  />

                  {saved ? "Saved" : "Save"}
              </button>

              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Copy size={16} />
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                onClick={downloadResponse}
                className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition"
              >
                ⬇️ Download
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}