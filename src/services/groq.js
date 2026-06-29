import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateWithGroq(prompt) {
  try {
    const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return completion.choices[0].message.content;
  } catch (error) {
    console.error("Grog Error: ", error);
    throw error;
  }
} 