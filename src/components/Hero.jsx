import { auth } from "../services/firebase"; // Import the auth object from your Firebase configuration
import { useState, useEffect } from "react";
import { Sparkles, Search, Copy, Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { generateContent } from "../services/gemini";
import { generateWithGroq } from "../services/groq";
import { generateWithCerebras } from "../services/cerebras";
import { addRecent } from "../services/recentService";
import { saveHistory } from "../services/history";
import { saveHistoryLocal } from "../services/historyLocal";
import { saveFavorite as saveFavoriteFirestore } from "../services/favorites";
import { getFavorites } from "../services/favorites";
import { saveFavoriteLocal } from "../services/favoritesLocal";
import { getFavoritesLocal } from "../services/favoritesLocal";
import MarkdownViewer from "./MarkdownViewer";
import YoutubeTools from "../extra-tools/YoutubeTools";
import InstagramTools from "../extra-tools/InstagramTools";
import LinkedinTools from "../extra-tools/LinkedinTools";
import EmailTools from "../extra-tools/EmailTools";
import StudyTools from "../extra-tools/StudyTools";


export default function Hero({ selectedPrompt, setSelectedPrompt, activeTool, setActiveTool }) {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [titles, setTitles] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [thumbnailIdeas, setThumbnailIdeas] = useState("");
  const [cta, setCta] = useState("");
  const [instaHashtags, setInstaHashtags] = useState("");
  const [instaHook, setInstaHook] = useState("");
  const [reelIdeas, setReelIdeas] = useState("");
  const [instaCTA, setInstaCTA] = useState("");
  const [linkedinHook, setLinkedinHook] = useState("");
  const [linkedinHashtags, setLinkedinHashtags] = useState("");
  const [linkedinCTA, setLinkedinCTA] = useState("");
  const [linkedinIdeas, setLinkedinIdeas] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailRewrite, setEmailRewrite] = useState("");
  const [emailFollowup, setEmailFollowup] = useState("");
  const [emailClosing, setEmailClosing] = useState("");
  const [showYoutubeTools, setShowYoutubeTools] = useState(false);
  const [showInstagramTools, setShowInstagramTools] = useState(false);
  const [showLinkedinTools, setShowLinkedinTools] = useState(false);
  const [showEmailTools, setShowEmailTools] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showStudyTools, setShowStudyTools] = useState(false);
  const [studyNotes, setStudyNotes] = useState("");
  const [studySummary, setStudySummary] = useState("");
  const [studyQuiz, setStudyQuiz] = useState("");
  const [studyMCQ, setStudyMCQ] = useState("");
  const [studyExplain, setStudyExplain] = useState("");

  //Reusing
  useEffect(() => {
  const savedPrompt = localStorage.getItem("reusePrompt");

  if (savedPrompt) {
    setPrompt(savedPrompt);
    localStorage.removeItem("reusePrompt");
  }
}, []);

useEffect(() => {
  const loadFavorites = async () => {
    let data;

    if (auth.currentUser) {
      data = await getFavorites();
    } else {
      data = await getFavoritesLocal();
    }

    setFavorites(data);
  };

  loadFavorites();
}, []);

  // Trending Prompt Auto Fill
  useEffect(() => {
  // Hide all tool panels first
  setShowStudyTools(false);
  setShowYoutubeTools(false);
  setShowInstagramTools(false);
  setShowLinkedinTools(false);
  setShowEmailTools(false);

  if (selectedPrompt === "Study Assistant") {
    setPrompt("");
    setActiveTool("study");
  } else if (selectedPrompt) {
    setPrompt(selectedPrompt);
  }
}, [selectedPrompt]);

  // 🚀 Generate AI Content
  const handleGenerate = async () => {
  if (!prompt.trim()) {
    setError("Please enter a prompt.");
    return;
  }

  setError("");
  setLoading(true);

  let finalPrompt = prompt;
  try {
    let response;

    try {
      // Primary AI → Gemini

      if (activeTool === "study") {
        finalPrompt = `
      You are an expert Study Assistant.

      The user will provide ONLY the study topic.

      Your job is to:
      - Explain the topic clearly.
      - Use simple language.
      - Give examples.
      - Mention important points.
      - End with a short recap.

      Study Topic:
      ${prompt}
      `;
      }
      response = await generateContent(finalPrompt);

    } catch (geminiError) {
      console.log(
        "Gemini failed, switching to Groq...",
        geminiError
      );

      try {
        // Backup AI → Groq
        response = await generateWithGroq(finalPrompt);

      } catch (groqError) {
        console.log(
          "Groq failed, switching to Cerebras...",
          groqError
        );

        // Final AI → Cerebras
        response = await generateWithCerebras(finalPrompt);
      }
    }

    setResult(response);
    if (activeTool === "study") {
      setShowStudyTools(true);
    }

    if (activeTool === "youtube") {
      setShowYoutubeTools(true);
    }

    if (activeTool === "instagram") {
      setShowInstagramTools(true);
    }

    if (activeTool === "linkedin") {
      setShowLinkedinTools(true);
    }

    if (activeTool === "email") {
      setShowEmailTools(true);
    }

    setTitles("");
    setDescription("");
    setHashtags("");
    setThumbnailIdeas("");
    setCta("");
    setInstaHashtags("");
    setInstaHook("");
    setInstaCTA("");
    setReelIdeas("");
    setLinkedinHook("");
    setLinkedinHashtags("");
    setLinkedinCTA("");
    setLinkedinIdeas("");
    setEmailSubject("");
    setEmailRewrite("");
    setEmailFollowup("");
    setEmailClosing("");
    setStudyNotes("");
    setStudySummary("");
    setStudyQuiz("");
    setStudyMCQ("");
    setStudyExplain("");

    setLastPrompt(prompt);

// Recently Used
if (selectedPrompt === "Study Assistant") {
  addRecent("Study Assistant", "Study Assistant");
}

else if (selectedPrompt === "YouTube Script Generator") {
  addRecent("YouTube Toolkit", "YouTube Toolkit");
}

else if (selectedPrompt === "Instagram Viral Caption") {
  addRecent("Instagram Toolkit", "Instagram Toolkit");
}

else if (selectedPrompt === "LinkedIn Post Generator") {
  addRecent("LinkedIn Toolkit", "LinkedIn Toolkit");
}

else if (selectedPrompt === "Professional Email Writer") {
  addRecent("Email Toolkit", "Email Toolkit");
}

    // 💾 Save history
  // Store values before clearing
const promptText = prompt;
const aiResponse = response;
const categoryName = selectedPrompt || "AI Assistant";

// Clear UI immediately
setPrompt("");
setResult(aiResponse);
toast.success("Content generated!");

// Save to Firestore (don't block UI)
if (auth.currentUser) {
  saveHistory({
    category: categoryName,
    title: promptText,
    prompt: promptText,
    output: aiResponse,
  })
    .then(() => {
      console.log("✅ History Saved (Firestore)");
    })
    .catch((err) => {
      console.error("❌ SAVE ERROR", err);
    });
} else {
  saveHistoryLocal({
    category: categoryName,
    title: promptText,
    prompt: promptText,
    output: aiResponse,
  });

  console.log("✅ History Saved (LocalStorage)");
}

  

  } catch (err) {
    console.error("AI Generation Error: ",err);
    
    if (!navigator.onLine) {
      setError(
        "No internet connection. Please check your network."
      );
    } else {
    setError(
      "Unable to generate response. Please try again later."
    );
  }

  } finally {
    setLoading(false);
  }
};

const generateExtra = async (type) => {
  if (!result) return;

  setLoading(true);

  try {
    let promptText = "";

    switch (type) {
      case "title":
        promptText =
          `Generate 5 catchy YouTube titles for this content:\n\n${result}`;
        break;

      case "description":
        promptText =
          `Generate a professional YouTube description for this content:\n\n${result}`;
        break;

      case "hashtags":
        promptText =
          `Generate 20 SEO friendly YouTube hashtags for this content:\n\n${result}`;
        break;

      case "thumbnail":
        promptText =
          `Generate 5 clickable YouTube thumbnail ideas for this content:\n\n${result}`;
        break;

        case "cta":
        promptText =
          `Generate 5 powerful YouTube call-to-actions (CTA) for this content:\n\n${result}`;
        break;

      default:
        return;
    }

    let extraResult;

      try {
        extraResult = await generateContent(promptText);
      } catch (geminiError) {
        try {
          extraResult = await generateWithGroq(promptText);
        } catch (groqError) {
          extraResult = await generateWithCerebras(promptText);
        }
      }

      switch (type) {
      case "title":
        setTitles(extraResult);
        break;

      case "description":
        setDescription(extraResult);
        break;

      case "hashtags":
        setHashtags(extraResult);
        break;

      case "thumbnail":
        setThumbnailIdeas(extraResult);
        break;

              case "cta":
        setCta(extraResult);
        break;

      default:
        break;
    }

  } catch (err) {
    console.error(err);
    setError("Failed to generate extra content.");
  } finally {
    setLoading(false);
  }
};

const generateInstagramExtra = async (type) => {
  if (!result) return;

  setLoading(true);

  try {
    let promptText = "";

    switch (type) {
      case "hashtags":
        promptText =
          `Generate 20 viral Instagram hashtags for this post:\n\n${result}`;
        break;

      case "hook":
        promptText =
          `Generate 5 viral Instagram hooks for this post:\n\n${result}`;
        break;

      case "reels":
        promptText =
          `Generate 5 Instagram reel ideas related to this content:\n\n${result}`;
        break;

        case "cta":
        promptText =
          `Generate 5 engaging Instagram CTAs for this content:\n\n${result}`;
        break;

      default:
        return;
    }

    let extraResult;

    try {
      extraResult = await generateContent(promptText);
    } catch (geminiError) {
      try {
        extraResult = await generateWithGroq(promptText);
      } catch (groqError) {
        extraResult = await generateWithCerebras(promptText);
      }
    }

    switch (type) {
      case "hashtags":
        setInstaHashtags(extraResult);
        break;

      case "hook":
        setInstaHook(extraResult);
        break;

      case "reels":
        setReelIdeas(extraResult);
        break;

        case "cta":
        setInstaCTA(extraResult);
        break;

      default:
        break;
    }
  } catch (err) {
    console.error(err);
    setError("Failed to generate Instagram content.");
  } finally {
    setLoading(false);
  }
};

const generateLinkedinExtra = async (type) => {
  if (!result) return;

  setLoading(true);

  try {
    let promptText = "";

    switch (type) {
      case "hook":
        promptText =
          `Generate 5 professional LinkedIn hooks for this post:\n\n${result}`;
        break;

      case "hashtags":
        promptText =
          `Generate 15 professional LinkedIn hashtags for this post:\n\n${result}`;
        break;

      case "ideas":
        promptText =
          `Generate 5 LinkedIn thought leadership ideas based on this content:\n\n${result}`;
        break;

      case "cta":
        promptText =
          `Generate 5 engaging LinkedIn CTAs for this post:\n\n${result}`;
        break;

      default:
        return;
    }

    let extraResult;

    try {
      extraResult = await generateContent(promptText);
    } catch (geminiError) {
      try {
        extraResult = await generateWithGroq(promptText);
      } catch (groqError) {
        extraResult = await generateWithCerebras(promptText);
      }
    }

    switch (type) {
      case "hook":
        setLinkedinHook(extraResult);
        break;

      case "hashtags":
        setLinkedinHashtags(extraResult);
        break;

      case "ideas":
      setLinkedinIdeas(extraResult);
      break;

      case "cta":
        setLinkedinCTA(extraResult);
        break;

      default:
        break;
    }

  } catch (err) {
    console.error(err);
    setError("Failed to generate LinkedIn content.");
  } finally {
    setLoading(false);
  }
};

const generateEmailExtra = async (type) => {
  if (!result) return;

  setLoading(true);

  try {
    let promptText = "";

    switch (type) {
      case "subject":
        promptText =
          `Generate 10 professional email subject lines for:\n\n${result}`;
        break;

      case "rewrite":
        promptText =
          `Rewrite this email professionally:\n\n${result}`;
        break;

      case "followup":
        promptText =
          `Generate a professional follow-up email for:\n\n${result}`;
        break;

      case "closing":
        promptText =
          `Generate 10 professional email closing statements for:\n\n${result}`;
        break;

      default:
        return;
    }

    let extraResult;

    try {
      extraResult = await generateContent(promptText);
    } catch {
      try {
        extraResult = await generateWithGroq(promptText);
      } catch {
        extraResult = await generateWithCerebras(promptText);
      }
    }

    switch (type) {
      case "subject":
        setEmailSubject(extraResult);
        break;

      case "rewrite":
        setEmailRewrite(extraResult);
        break;

      case "followup":
        setEmailFollowup(extraResult);
        break;

      case "closing":
        setEmailClosing(extraResult);
        break;
    }
  } catch (err) {
    console.error(err);
    setError("Failed to generate email content.");
  } finally {
    setLoading(false);
  }
};

const generateStudyExtra = async (type) => {
  if (!result) return;

  setLoading(true);

  try {
    let promptText = "";

    switch (type) {
      case "notes":
        promptText = `Create detailed study notes based on this content:\n\n${result}`;
        break;

      case "summary":
        promptText = `Summarize this content in easy-to-understand study notes:\n\n${result}`;
        break;

      case "quiz":
        promptText = `Generate 20 quiz questions with answers based on this content:\n\n${result}`;
        break;

      case "mcq":
        promptText = `Generate 20 multiple-choice questions (MCQs) with correct answers based on this content:\n\n${result}`;
        break;

      case "explain":
        promptText = `Explain this topic like a teacher with simple examples:\n\n${result}`;
        break;

      default:
        return;
    }

    let extraResult;

    try {
      extraResult = await generateContent(promptText);
    } catch {
      try {
        extraResult = await generateWithGroq(promptText);
      } catch {
        extraResult = await generateWithCerebras(promptText);
      }
    }

    switch (type) {
      case "notes":
        setStudyNotes(extraResult);
        break;

      case "summary":
        setStudySummary(extraResult);
        break;

      case "quiz":
        setStudyQuiz(extraResult);
        break;

      case "mcq":
        setStudyMCQ(extraResult);
        break;

      case "explain":
        setStudyExplain(extraResult);
        break;

      default:
        break;
    }

  } catch (err) {
    console.error(err);
    setError("Failed to generate study content.");
  } finally {
    setLoading(false);
  }
};

  // 📋 Copy
  const copyToClipboard = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!");
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
    toast.success("Downloaded!");
  };

  // ❌ Clear Result
  const clearResult = () => {
    setResult("");

    setShowStudyTools(false);

    setActiveTool("");
};

  // Save Favorites
  const saveFavorite = async () => {
  if (!result) return;

  const alreadyExists = favorites.some(
    (item) =>
      item.prompt === lastPrompt &&
      item.response === result
  );

  if (alreadyExists) {
    toast.error("Already saved");
    return;
  }

  const newFavorite = {
    id: Date.now().toString(),
    prompt: lastPrompt,
    response: result,
    createdAt:new Date().toISOString(),
  };

  if (auth.currentUser) {
  await saveFavoriteFirestore({
    prompt: lastPrompt,
    response: result,
  });

  setFavorites((prev) => [newFavorite, ...prev]);

} else {
  saveFavoriteLocal(newFavorite);

  setFavorites((prev) => [newFavorite, ...prev]);
}

  toast.success("Added to Favorites ❤️");
  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 1500);
};

  return (
    <motion.section
      id="hero-section"
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
      <p className="text-gray-400 text-lg md:text-xl mt-6">
        Create anything in seconds.
      </p>

      {/* INPUT */}
      <div className="mt-12">
        <div className="flex items-stretch rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
          <input
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError("");

              if (activeTool !== "study") {
                setSelectedPrompt("");
              }
            }}
              onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleGenerate();
              }
            }}
            className={`flex-1 bg-transparent px-6 outline-none ${
              activeTool === "study"
                ? "py-6 text-lg"
                : "py-5"
            }`}
            placeholder={
                activeTool === "study"
                  ? "Study topic... (e.g. Photosynthesis)"
                  : "Search prompts anything..."
              }
          />
        
          <motion.button
            onClick={handleGenerate}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`bg-gradient-to-r from-purple-600 to-pink-500 px-6 md:px-8 transition-all duration-300 ${
              selectedPrompt === "Study Assistant"
                ? "rounded-r-2xl"
                : "rounded-r-2xl"
            }`}
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
            <MarkdownViewer content={result} />

            {titles && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-pink-400 mb-3">
                  ✨ Generated Titles
                </h4>

                <MarkdownViewer content={titles} />
              </div>
            )}

            {description && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                  📝 Generated Description
                </h4>

                <MarkdownViewer content={description} />
              </div>
            )}

            {hashtags && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-green-400 mb-3">
                  #️⃣ Generated Hashtags
                </h4>

                <MarkdownViewer content={hashtags} />
              </div>
            )}

            {thumbnailIdeas && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">
                  🖼️ Thumbnail Ideas
                </h4>

                <MarkdownViewer content={thumbnailIdeas} />
              </div>
            )}

            {cta && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-orange-400 mb-3">
                  🚀 Call To Actions
                </h4>

                <MarkdownViewer content={cta} />
              </div>
            )}

            {/* Insta Display */}
            {instaHashtags && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-pink-400 mb-3">
                  #️⃣ Instagram Hashtags
                </h4>

                <MarkdownViewer content={instaHashtags} />
              </div>
            )}

            {instaHook && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-orange-400 mb-3">
                  🎣 Instagram Hooks
                </h4>

                <MarkdownViewer content={instaHook} />
              </div>
            )}

            {reelIdeas && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-green-400 mb-3">
                  🎬 Reel Ideas
                </h4>

                <MarkdownViewer content={reelIdeas} />
              </div>
            )}

            {instaCTA && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                  📣 Instagram CTAs
                </h4>

                <MarkdownViewer content={instaCTA} />
              </div>
            )}

            {/* Linkedin Display */}
            {linkedinHook && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">
                  🎯 LinkedIn Hooks
                </h4>

                <MarkdownViewer content={linkedinHook} />
              </div>
            )}

            {linkedinHashtags && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-green-400 mb-3">
                  📈 LinkedIn Hashtags
                </h4>

                <MarkdownViewer content={linkedinHashtags} />
              </div>
            )}

            {linkedinIdeas && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">
                  💡 Thought Leadership Ideas
                </h4>

                <MarkdownViewer content={linkedinIdeas} />
              </div>
            )}

            {linkedinCTA && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-semibold text-orange-400 mb-3">
                  📣 LinkedIn CTA
                </h4>

                <MarkdownViewer content={linkedinCTA} />
              </div>
            )}

            {/* Examil Display */}
            {emailSubject && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-emerald-400 mb-3">
                    📧 Email Subjects
                  </h4>

                  <MarkdownViewer content={emailSubject} />
                </div>
              )}

              {emailRewrite && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                    ✍️ Professional Rewrite
                  </h4>

                  <MarkdownViewer content={emailRewrite} />
                </div>
              )}

              {emailFollowup && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">
                    📨 Follow-up Email
                  </h4>

                  <MarkdownViewer content={emailFollowup} />
                </div>
              )}

              {emailClosing && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-pink-400 mb-3">
                    🙏 Professional Closings
                  </h4>

                  <MarkdownViewer content={emailClosing} />
                </div>
              )}

              {/* Study Assistant */}
              {studyNotes && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">
                    📚 Study Notes
                  </h4>

                  <MarkdownViewer content={studyNotes} />
                </div>
              )}

              {studySummary && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    📝 Study Summary
                  </h4>

                  <MarkdownViewer content={studySummary} />
                </div>
              )}

              {studyQuiz && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">
                    ❓ Quiz Questions
                  </h4>

                  <MarkdownViewer content={studyQuiz} />
                </div>
              )}

              {studyMCQ && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-pink-400 mb-3">
                    📄 Multiple Choice Questions
                  </h4>

                  <MarkdownViewer content={studyMCQ} />
                </div>
              )}

              {studyExplain && (
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">
                    🧠 Detailed Explanation
                  </h4>

                  <MarkdownViewer content={studyExplain} />
                </div>
              )}

            {/* Extra AI Buttons */}
              {showYoutubeTools && (
                <YoutubeTools generateExtra={generateExtra} />
              )}

              {showInstagramTools && (
                <InstagramTools  generateInstagramExtra={generateInstagramExtra} />
              )}

              {showLinkedinTools && (
                <LinkedinTools generateLinkedinExtra={generateLinkedinExtra} />
              )}

              {showEmailTools && (
                <EmailTools  generateEmailExtra={generateEmailExtra} />
              )}

              {showStudyTools && (
                <StudyTools generateStudyExtra={generateStudyExtra} />
              )}

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
                Copy
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