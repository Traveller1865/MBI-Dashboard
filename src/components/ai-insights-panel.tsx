"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Heart,
  BedDouble,
  Footprints,
  Droplets,
  AlertTriangle,
  MessageSquare,
  Send,
  Zap,
  Award,
} from "lucide-react"
import InsightCard from "@/components/insight-card"
import { InsightsPreferences } from "@/components/insights-preferences"
import { askGeminiWithContext, askGeminiWithContextAndHistory } from "@/lib/gemini-service"
import { getUserHealthContext } from "@/lib/getUserHealthContext" // Import the utility

export default function AiInsightsPanel() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hello! I'm your health assistant. How can I help you today?" },
  ])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessages = [...chatMessages, { role: "user", content: chatInput }]
    setChatMessages(newMessages)
    setChatInput("")

    setChatMessages([
      ...newMessages,
      { role: "assistant", content: "Analyzing your health data..." },
    ])

    try {
      // Dynamically fetch the user's health context
      const userHealthContext = await getUserHealthContext("mock-user-id")

      // Pass the user input and context to the LLM
      //const response = await askGeminiWithContext(chatInput, userHealthContext)
      const response = await askGeminiWithContextAndHistory(chatInput, userHealthContext, chatMessages)
      setChatMessages([
        ...newMessages,
        { role: "assistant", content: response },
      ])
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error)
      setChatMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't process your request. Please try again later.",
        },
      ])
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
              <p className="text-muted-foreground">Personalized health insights based on your data</p>
            </div>
            <InsightsPreferences />
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Insights</TabsTrigger>
              <TabsTrigger value="risks">Risks</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <InsightCard type="risk" title="Stress Impact" description="Your data suggests yesterday's stress might be affecting your recovery. Consider a relaxation exercise." icon={AlertTriangle} iconColor="text-amber-500" confidence={80} />
                <InsightCard type="suggestion" title="Earlier Bedtime" description="Aim for an earlier bedtime tonight to help recover. Your data shows you sleep better when you go to bed before 11pm." icon={BedDouble} iconColor="text-blue-500" />
                <InsightCard type="trend" title="Hydration Trend" description="You're averaging 1.5L water, below your 3L goal. Try keeping a water bottle at your desk." icon={Droplets} iconColor="text-cyan-500" />
                <InsightCard type="achievement" title="Step Goal Streak" description="Great job hitting your step goal 5 days in a row! Keep it up for a longer streak." icon={Footprints} iconColor="text-green-500" />
                <InsightCard type="risk" title="Vitamin D Alert" description="Your recent lab shows Vitamin D at 25 ng/mL, which is below the normal range (30-100 ng/mL). This could affect your immune system and bone health." icon={AlertTriangle} iconColor="text-red-500" confidence={95} />
                <InsightCard type="trend" title="Heart Rate Improving" description="Your resting heart rate has decreased by 5% compared to last week, indicating improved cardiovascular fitness." icon={Heart} iconColor="text-green-500" />
                <InsightCard type="suggestion" title="Increase Protein Intake" description="Based on your goals and activity level, consider increasing your protein intake to support muscle recovery." icon={Zap} iconColor="text-purple-500" />
                <InsightCard type="achievement" title="Meditation Consistency" description="You've meditated for 5 consecutive days. Research shows this can significantly reduce stress levels." icon={Award} iconColor="text-amber-500" />
              </div>
            </TabsContent>

            <TabsContent value="risks" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <InsightCard type="risk" title="Stress Impact" description="Your data suggests yesterday's stress might be affecting your recovery. Consider a relaxation exercise." icon={AlertTriangle} iconColor="text-amber-500" confidence={80} />
                <InsightCard type="risk" title="Vitamin D Alert" description="Your recent lab shows Vitamin D at 25 ng/mL, which is below the normal range (30-100 ng/mL). This could affect your immune system and bone health." icon={AlertTriangle} iconColor="text-red-500" confidence={95} />
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <InsightCard type="trend" title="Hydration Trend" description="You're averaging 1.5L water, below your 3L goal. Try keeping a water bottle at your desk." icon={Droplets} iconColor="text-cyan-500" />
                <InsightCard type="trend" title="Heart Rate Improving" description="Your resting heart rate has decreased by 5% compared to last week, indicating improved cardiovascular fitness." icon={Heart} iconColor="text-green-500" />
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <InsightCard type="suggestion" title="Earlier Bedtime" description="Aim for an earlier bedtime tonight to help recover. Your data shows you sleep better when you go to bed before 11pm." icon={BedDouble} iconColor="text-blue-500" />
                <InsightCard type="suggestion" title="Increase Protein Intake" description="Based on your goals and activity level, consider increasing your protein intake to support muscle recovery." icon={Zap} iconColor="text-purple-500" />
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Morning Briefing</CardTitle>
              <CardDescription>March 28, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Good morning! You slept 7h 15m (reaching 89% of your goal). Your readiness is good – HRV is stable compared to your baseline. Your resting heart rate is 72 bpm, which is 5% lower than last week's average.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm font-medium">Sleep</p>
                  <p className="text-lg font-bold">7h 15m</p>
                  <p className="text-xs text-muted-foreground">89% of goal</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm font-medium">HRV</p>
                  <p className="text-lg font-bold">45 ms</p>
                  <p className="text-xs text-muted-foreground">Stable</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <p className="text-sm font-medium">Resting HR</p>
                  <p className="text-lg font-bold">72 bpm</p>
                  <p className="text-xs text-green-500">-5% vs last week</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Plan: It's a great day for a workout. Don't forget to log your mood after breakfast.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div>
        <Card className="h-[calc(100vh-8rem)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Assistant
            </CardTitle>
            <CardDescription>Ask questions about your health data</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="flex flex-col gap-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Ask about your health data..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
