// lib/gemini-service.ts

export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await fetch("/api/gemini.route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.text;
  } catch (error) {
    console.error("Client Gemini fetch error:", error);
    return "Sorry, I had trouble processing that.";
  }
}