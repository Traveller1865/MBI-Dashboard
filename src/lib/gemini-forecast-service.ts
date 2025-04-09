import { askGemini } from "@/lib/gemini-service"

type ForecastPayload = {
  sleepScore: number
  hrv: number
  restingHR: number
  steps: number
  hydration: number
}

export async function fetchGeminiForecastInsight(data: ForecastPayload): Promise<string> {
  const { sleepScore, hrv, restingHR, steps, hydration } = data

  if (
    sleepScore === undefined ||
    hrv === undefined ||
    restingHR === undefined ||
    steps === undefined ||
    hydration === undefined
  ) {
    throw new Error("Missing one or more required forecast metrics.")
  }

  const prompt = `
You're an AI assistant helping a user interpret health forecast metrics. Based on the following projected values, offer a personalized, 1-2 sentence recommendation to guide their next action. Avoid technical jargon.

Forecasted Health Metrics:
- Sleep: ${sleepScore} hours
- HRV: ${hrv} ms
- Resting HR: ${restingHR} bpm
- Steps: ${steps}
- Hydration: ${hydration} L

Only return a short, friendly health insight to help them optimize wellness.
`

  return await askGemini(prompt)
}
