//src/app/api/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
//Commenting out your stuff for debugging purposes, you can uncomment it when needed.
const TimgenAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});
// Initialize model
/* api/gemini/route.ts */


//const apiKey = process.env.GEMINI_API_KEY;
//if (!apiKey) {
//  throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
//}

export async function POST(req: NextRequest) {
  try {
    
    // Parse the JSON body to get the prompt
   const  prompt  = await req.json();
    
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
    //console.log("Gemini API response:", result);
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response text found.";
    //console.log(text);
    return NextResponse.json({ text: text }, { status: 200 });
      }
      catch (err) {
        console.error("Gemini API error for prompt:", err instanceof Error ? err.stack : err);
        return NextResponse.json({ text: "Server error" }, { status: 500 });
    };
  }
