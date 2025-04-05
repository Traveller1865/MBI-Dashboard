//src/app/api/gemini/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
//Commenting out your stuff for debugging purposes, you can uncomment it when needed.
//const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY!);
const TimgenAI = new GoogleGenAI({ apiKey: "INSERT YOUR KEY HERE"});
// Initialize model

//const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // You can change to "gemini-1.5-pro-latest" if needed

export async function POST(req: NextRequest) {
  try {
    //const { prompt } = await req.json();
    const prompt  = "Why is the sky blue?";
    console.log("Received prompt:", prompt);
    const result = await TimgenAI.models.generateContent({
      model: "gemini-pro", // You can change to "gemini-pro" or other models as needed
      contents: [{ role: "user", parts: [{ text: prompt }] }], // The contents array should contain the user prompt. Gemini will generate a response based on this.
      config: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
      });
    // Uncomment the above generationConfig if you want to customize the generation parameters});
    console.log("Gemini API response:", result);
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response text found.";
    console.log(text);
    return NextResponse.json({ text: text }, { status: 200 });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ text: "Server error" }, { status: 500 });
  }
}
