// src/app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Initialize model
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // You can change to "gemini-1.5-pro-latest" if needed

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

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ text: "Server error" }, { status: 500 });
  }
}
