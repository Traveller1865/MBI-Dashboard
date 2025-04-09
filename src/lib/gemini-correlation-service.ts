import { askGemini } from "@/lib/gemini-service";

type CorrelationPayload = {
  xLabel: string;
  yLabel: string;
  description?: string;
};

export async function fetchGeminiCorrelationInsight({
  xLabel,
  yLabel,
  description,
}: CorrelationPayload): Promise<{ insight: string; recommendation: string }> {
  if (!xLabel || !yLabel) {
    throw new Error("Missing correlation labels (xLabel or yLabel).");
  }

  const prompt = `
You're a health assistant reviewing data trends.

Relationship: ${xLabel} and ${yLabel}
${description ? `Context: ${description}` : ""}

1. Write a short key insight (1–2 sentences) explaining the relationship in plain terms. If a correlation is implied, interpret it clearly.
2. Then, write a short recommendation (1–2 sentences) on how the user can improve or maintain ${yLabel}, based on this relationship.

Use clear, friendly language.
`;

  const response = await askGemini(prompt);
  const [insightRaw, recommendationRaw] = response.split("\n\n");

  return {
    insight: insightRaw?.trim() || "No insight returned.",
    recommendation: recommendationRaw?.trim() || "No recommendation returned.",
  };
}
