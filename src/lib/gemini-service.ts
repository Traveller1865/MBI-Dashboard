/*lib/gemini-service.ts */ 

export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return data.text || "No response text found.";
  } catch (error) {
    if (error instanceof Error) {
      console.error("Client Gemini fetch error:", error.stack || error.message);
    } else {
      console.error("Client Gemini fetch error:", error);
    }
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
// Updated function to accommodate ongoing chat with history
export async function askGeminiWithContextAndHistory(prompt: string, context: string, history: Array<{ role: string; content: string }>): Promise<string> {
    // Combine history, context, and the new prompt into a single payload
    const messages = [
      ...history,
      { role: "system", content: `Context: ${context}` },
      { role: "user", content: prompt },
    ];
    return await askGemini(JSON.stringify({messages})
    );  
}