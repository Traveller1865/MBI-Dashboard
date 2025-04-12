/*lib/gemini-service.ts */ 

export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return data.text || "No response text found.";
  } catch (error) {
    console.error("Client Gemini fetch error:", error.stack || error);
    return "Sorry, I had trouble processing that.";
  }
}
export async function askGeminiWithContext(prompt: string, context: string): Promise<string> {
  const fullPrompt = `
    Context: ${context}
    User: ${prompt}
  `;
  return await askGemini(fullPrompt);
}