"use client"

import { useState, useEffect } from "react"
import { fetchGeminiInsights } from "@/lib/gemini-insight-service"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts"
import { Brain, ThumbsUp } from "lucide-react" /*removed  Moon, Heart, Activity, ArrowRight,*/
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

// Forecasting base data
const baseData = {
  sleep: {
    current: 7,
    min: 5,
    max: 10,
    step: 0.5,
    unit: "hours",
    impact: { readiness: 0.8, hrv: 0.6, recovery: 0.7 }
  },
  activity: {
    current: 8000,
    min: 4000,
    max: 15000,
    step: 1000,
    unit: "steps",
    impact: { readiness: 0.4, hrv: 0.3, recovery: 0.5 }
  },
  nutrition: {
    current: 2200,
    min: 1500,
    max: 3000,
    step: 100,
    unit: "calories",
    impact: { readiness: 0.3, hrv: 0.2, recovery: 0.4 }
  },
  hydration: {
    current: 2.5,
    min: 1,
    max: 5,
    step: 0.5,
    unit: "liters",
    impact: { readiness: 0.5, hrv: 0.4, recovery: 0.3 }
  }
}

// Baseline scores
const baseScores = {
  readiness: 72,
  hrv: 45,
  recovery: 68
}

export default function InteractiveForecasting() {
  const [activeTab, setActiveTab] = useState("sleep")
  const [sliderValue, setSliderValue] = useState(baseData["sleep"].current)
  const [forecastData, setForecastData] = useState<any[]>([])
  const [aiInsight, setAiInsight] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [insightHistory, setInsightHistory] = useState<string[]>([])

  const currentMetric = baseData[activeTab as keyof typeof baseData]

  useEffect(() => {
    const metric = baseData[activeTab as keyof typeof baseData]
    const percentChange = (sliderValue - metric.current) / (metric.max - metric.min)

    const readinessImpact = Math.round(percentChange * metric.impact.readiness * 30)
    const hrvImpact = Math.round(percentChange * metric.impact.hrv * 20)
    const recoveryImpact = Math.round(percentChange * metric.impact.recovery * 25)

    const newForecastData = Array.from({ length: 6 }).map((_, i) => ({
      day: i === 0 ? "Current" : `Day ${i}`,
      readiness: baseScores.readiness + readinessImpact * (i / 5),
      hrv: baseScores.hrv + hrvImpact * (i / 5),
      recovery: baseScores.recovery + recoveryImpact * (i / 5)
    }))

    setForecastData(newForecastData)
  }, [activeTab, sliderValue])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSliderValue(baseData[value as keyof typeof baseData].current)
    setAiInsight("")
  }

  const handleGenerateInsight = async () => {
    setLoading(true)
    const data = {
      sleepScore: activeTab === "sleep" ? sliderValue : baseData.sleep.current,
      hrv: activeTab === "hrv" ? sliderValue : baseScores.hrv,
      restingHR: baseScores.readiness,
      steps: activeTab === "activity" ? sliderValue : baseData.activity.current,
      vitaminD: 25,
      ldl: 145
    }

    try {
      const insight = await fetchGeminiInsights(data)
      setAiInsight(insight)

      // Save latest 5 insights in state
      setInsightHistory(prev => {
        const updated = [insight, ...prev].slice(0, 5)
        localStorage.setItem("forecast-insights", JSON.stringify(updated))
        return updated
      })
    } catch (err) {
      console.error(err)
      setAiInsight("Unable to generate insights at this time.")
    } finally {
      setLoading(false)
    }
  }

  const handleThumbsUp = () => {
    toast({
      title: "Thanks for your feedback!",
      description: "This insight will be used to improve future recommendations."
    })
    // (Optional) Post to backend or analytics endpoint
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Interactive Forecasting</CardTitle>
        </div>
        <CardDescription>Explore how changes in one metric affect others</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="hydration">Hydration</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    Adjust {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h3>
                  <span className="text-sm font-bold">{sliderValue} {currentMetric.unit}</span>
                </div>
                <Slider
                  value={[sliderValue]}
                  min={currentMetric.min}
                  max={currentMetric.max}
                  step={currentMetric.step}
                  onValueChange={(value) => setSliderValue(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentMetric.min} {currentMetric.unit}</span>
                  <span>{currentMetric.max} {currentMetric.unit}</span>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="text-sm font-medium">Personalized Recommendation</h3>
                <Button onClick={handleGenerateInsight} disabled={loading}>
                  {loading ? "Generating..." : "Generate Insight"}
                </Button>

                {aiInsight && (
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>{aiInsight}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleThumbsUp}
                      className="flex items-center gap-2"
                    >
                      <ThumbsUp className="h-4 w-4" /> Helpful
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <ReferenceLine y={70} stroke="#d1d5db" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="readiness" stroke="#4f46e5" strokeWidth={2} />
                <Line type="monotone" dataKey="hrv" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <div className="rounded-lg border p-4 space-y-2">
              <h3 className="text-sm font-medium">Latest Insights</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                {insightHistory.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
