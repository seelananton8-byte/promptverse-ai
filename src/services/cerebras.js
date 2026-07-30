export async function generateWithCerebras(prompt) {
  try {
    const response = await fetch("https://promptverse-ai-inky.vercel.app/api/cerebras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Cerebras request failed");
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Cerebras Error:", error);
    throw error;
  }
}