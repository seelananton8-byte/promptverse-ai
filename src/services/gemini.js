export async function generateContent(prompt) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Gemini request failed");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}