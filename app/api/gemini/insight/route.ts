import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  const { entry } = await req.json()

  const prompt = `Given this journal entry, generate a short health insight:
Date: ${entry.date}
Time: ${entry.time}
Mood: ${entry.mood}
Energy: ${entry.energy}
Symptoms: ${entry.symptoms.join(', ') || 'None'}
Notes: ${entry.notes}
Goal Completed: ${entry.goalProgress?.completed ? 'Yes' : 'No'}
Goal Notes: ${entry.goalProgress?.notes || 'None'}

Return a single helpful paragraph.`

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const result = await model.generateContent(prompt)
  const text = result.response.text()

  return NextResponse.json({ insight: text })
}
