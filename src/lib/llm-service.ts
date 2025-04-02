// lib/llm-service.ts
import { askTogether } from "./together-service";
import { askGemini } from "./gemini-service";

// Smart switch to route based on user setting or fallback logic
export async function askLLM(prompt: string, source: "gemini" | "together" | "auto" = "auto"): Promise<string> {
  if (source === "gemini") return await askGemini(prompt);
  if (source === "together") return await askTogether(prompt);

  // Auto mode
  try {
    const reply = await askGemini(prompt);
    if (reply && !reply.includes("Sorry")) return reply;
    throw new Error("Fallback triggered");
  } catch {
    return await askTogether(prompt);
  }
}
