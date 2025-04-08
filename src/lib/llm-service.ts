/*lib/llm-service.ts */

import { askTogether } from "./together-service";
import { askGemini } from "./gemini-service";

export async function askLLM(
  prompt: string,
  source: "gemini" | "together" | "auto" = "auto"
): Promise<string> {
  if (source === "gemini") return await askGemini(prompt);
  if (source === "together") return await askTogether(prompt);

  // Auto mode
  try {
    const reply = await askGemini(prompt);
    if (reply && !reply.includes("Sorry")) return reply;
    throw new Error("Fallback triggered");
  } catch (error) {
    console.warn("Fallback to Together LLM triggered for prompt:", prompt, error.message || error);
    try {
      return await askTogether(prompt);
    } catch (finalError) {
      console.error("Both Gemini and Together LLM failed for prompt:", prompt, finalError.message || finalError);
      return "Sorry, I had trouble processing that.";
    }
  }
}