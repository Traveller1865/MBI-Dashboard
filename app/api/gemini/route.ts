/* api/gemini/route.ts */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response text found.";
    if (!text) {
      console.warn("No candidates found in Gemini API response for prompt:", prompt);
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Gemini API error for prompt:", err.stack || err);
    return NextResponse.json({ text: "Server error" }, { status: 500 });
  }
}