"use client"

import type React from "react"
import {useEffect, useState } from "react"
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
  LucideIcon,
} from "lucide-react"
import InsightCard from "@/components/insight-card"
import { InsightsPreferences } from "@/components/insights-preferences"
import { askGeminiWithContext, askGeminiWithContextAndHistory } from "@/lib/gemini-service"
import { getUserHealthContext } from "@/lib/getUserHealthContext" // Import the utility
import {insightCardsConfig} from "@/lib/insightCardsConfig" // Import the insight cards config
import AiChatbot from "./ai-chatbox"

export default function AiInsightsPanel() {
    const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchDescriptions = async () => {
        try {
          const context = await getUserHealthContext("mock-user-id"); // Replace with actual context
          const newDescriptions: { [key: string]: string } = {};
  
          // Fetch data for each card
          for (const card of insightCardsConfig) {
            const response = await askGeminiWithContext(card.prompt, context);
            newDescriptions[card.title] = response;
          }
  
          setDescriptions(newDescriptions); // Update state with fetched descriptions
        } catch (err) {
          console.error("Error fetching descriptions:", err);
          setError("Failed to load descriptions.");
        }
      };
  
      fetchDescriptions();
    }, []);
  

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
              {insightCardsConfig.map((card) => (
        <InsightCard
          key={card.title}
          type={card.type}
          title={card.title}
          description={descriptions[card.title] || "Loading..."} // Use fetched description, error, or loading state
          icon={card.icon}
          iconColor={card.iconColor}
          confidence={card.confidence}
        />
      ))}
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
<AiChatbot>

</AiChatbot>
       
      </div>
    </div>
  )
}
