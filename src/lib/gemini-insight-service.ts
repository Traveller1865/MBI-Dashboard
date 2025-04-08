/* lib/gemini-insight-service.ts */

import { askGemini } from "./gemini-service";

export async function fetchGeminiInsights(data: Record<string, any>): Promise<string> {
  if (!data.sleepScore || !data.hrv || !data.restingHR || !data.steps || !data.vitaminD || !data.ldl) {
    throw new Error("Missing required health metrics in data object.");
  }

  const prompt = `
    Analyze this user's health and offer a brief summary and recommendations:

    - Sleep Score: ${data.sleepScore}
    - HRV: ${data.hrv}
    - Resting HR: ${data.restingHR}
    - Steps: ${data.steps}
    - Vitamin D: ${data.vitaminD}
    - LDL: ${data.ldl}
  `;

  try {
    return await askGemini(prompt);
  } catch (error) {
    console.error("Error fetching Gemini insights:", error.stack || error);
    return "Unable to generate insights at this time.";
  }
}