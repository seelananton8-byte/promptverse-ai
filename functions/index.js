const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const cors = require("cors")({ origin: true });

const CEREBRAS_API_KEY = defineSecret("CEREBRAS_API_KEY");
const GROQ_API_KEY = defineSecret("GROQ_API_KEY");
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

/* ---------------- CEREBRAS ---------------- */
exports.generateWithCerebras = onRequest(
  { secrets: [CEREBRAS_API_KEY] },
  (req, res) => {
    cors(req, res, async () => {
      try {
        const { prompt } = req.body;
        const response = await fetch(
          "https://api.cerebras.ai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${CEREBRAS_API_KEY.value()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.3-70b",
              messages: [{ role: "user", content: prompt }],
            }),
          }
        );

        if (!response.ok) throw new Error("Cerebras request failed");

        const data = await response.json();
        res.json({ text: data.choices[0].message.content });
      } catch (error) {
        console.error("Cerebras Error:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
);

/* ---------------- GROQ ---------------- */
exports.generateWithGroq = onRequest(
  { secrets: [GROQ_API_KEY] },
  (req, res) => {
    cors(req, res, async () => {
      try {
        const Groq = require("groq-sdk");
        const groq = new Groq({ apiKey: GROQ_API_KEY.value() });

        const { prompt } = req.body;
        const completion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.3-70b-versatile",
        });

        res.json({ text: completion.choices[0].message.content });
      } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
);

/* ---------------- GEMINI ---------------- */
exports.generateWithGemini = onRequest(
  { secrets: [GEMINI_API_KEY] },
  (req, res) => {
    cors(req, res, async () => {
      try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const { prompt } = req.body;
        const result = await model.generateContent(prompt);
        res.json({ text: result.response.text() });
      } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
);