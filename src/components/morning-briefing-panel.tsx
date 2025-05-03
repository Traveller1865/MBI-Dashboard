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
import { getUserHealthContext } from "@/lib/getUserHealthContext"
import { set } from "date-fns"

export default function MorningBriefingPanel() {
    const today = new Date()
    //const context = getUserHealthContext()
    const [plan, setPlan] = useState<string>("")
    const [summary, setSummary] = useState<string>("")
    const Summaryprompt = `Summarize the user's health data for today in plain english. Limit the summary to 3 sentences.`
    const generatedPlanPrompt = `Generate an action plan for the user to implement today based on their health data. Limit the action plan to 3 steps, and explain it in simple language.`

    useEffect(() => {

        async function fetchSummary() {
            const context = await getUserHealthContext()
            const generatedSummary = await askGeminiWithContext(Summaryprompt,context)
            const generatedPlan = await askGeminiWithContext(generatedPlanPrompt, context)
            setSummary(generatedSummary)
            setPlan(generatedPlan)
        }
        fetchSummary()
    }, [])

    return(
        <Card>
            <CardHeader>
                <CardTitle>Morning Briefing</CardTitle>
                <CardDescription>{today.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {summary || "Loading summary..."}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm font-medium">Sleep</p>
                        <p className="text-lg font-bold">7h 15m</p>
                        <p className="text-xs text-muted-foreground">89% of goal</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm font-medium">HRV</p>
                        <p className="text-lg font-bold">Test</p>
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
                    {plan || "Loading plan..."}
                </p>
            </CardFooter>
        </Card>
    )
}