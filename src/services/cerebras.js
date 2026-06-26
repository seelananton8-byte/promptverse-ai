export async function generateWithCerebras(prompt) {
  const response = await fetch(
    "https://api.cerebras.ai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CEREBRAS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Cerebras request failed");
  }

  const data = await response.json();

  return data.choices[0].message.content;
}