export async function generateWithGroq(prompt) {
  try {
    const response = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Groq request failed");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
}