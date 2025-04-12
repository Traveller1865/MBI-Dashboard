// lib/getUserHealthContext.ts

import { mockUserHealthContext } from "./mock-user-context";

export async function getUserHealthContext(userId?: string): Promise<string> {
  // This is static for now, but you can later switch to DB via userId
  const data = mockUserHealthContext;

  return `
Name: ${data.name}
Sleep Score: ${data.sleepScore}%
Sleep Duration: ${data.sleepDuration}
HRV: ${data.hrv} ms
Resting Heart Rate: ${data.restingHR} bpm
Hydration: ${data.hydration.current}L (Goal: ${data.hydration.goal}L)
Vitamin D: ${data.vitaminD} ng/mL
LDL Cholesterol: ${data.ldl} mg/dL
HDL Cholesterol: ${data.hdl} mg/dL
Step Streak: ${data.stepStreak} days
Meditation: ${data.meditationDays} consecutive days
  `.trim();
}
