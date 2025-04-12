//src/app/api/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
//Commenting out your stuff for debugging purposes, you can uncomment it when needed.
//const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY!);
const TimgenAI = new GoogleGenAI({ apiKey: "INSERT YOUR API KEY HERE" }); // Replace with your actual API key or use process.env.GEMINI_API_KEY if set in your environment variables.
// Initialize model
/* api/gemini/route.ts */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // You can change to "gemini-1.5-pro-latest" if needed
console.log("Endpoint reached: /api/gemini/route.ts");
export async function POST(req: NextRequest) {
  try {
   const  prompt  = await req.json();
    
    console.log("Received prompt:", prompt);
    const result = await TimgenAI.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: prompt, // Contents is expecting json with a "text" field, e.g. { "text": "Your prompt here" }
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