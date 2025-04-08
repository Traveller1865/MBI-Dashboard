"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { fetchGeminiInsights } from "@/lib/gemini-insight-service"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import {
  Brain,
  Heart,
  Activity,
  ArrowRight,
  ThumbsUp,
} from "lucide-react"

type MetricKey = "sleep" | "activity" | "nutrition" | "hydration"

const baseData = {
  sleep: {
    current: 7,
    min: 5,
    max: 10,
    step: 0.5,
    unit: "hours",
    impact: { readiness: 0.8, hrv: 0.6, recovery: 0.7 },
  },
  activity: {
    current: 8000,
    min: 4000,
    max: 15000,
    step: 1000,
    unit: "steps",
    impact: { readiness: 0.4, hrv: 0.3, recovery: 0.5 },
  },
  nutrition: {
    current: 2200,
    min: 1500,
    max: 3000,
    step: 100,
    unit: "calories",
    impact: { readiness: 0.3, hrv: 0.2, recovery: 0.4 },
  },
  hydration: {
    current: 2.5,
    min: 1,
    max: 5,
    step: 0.5,
    unit: "liters",
    impact: { readiness: 0.5, hrv: 0.4, recovery: 0.3 },
  },
}

const baseScores = {
  readiness: 72,
  hrv: 45,
  recovery: 68,
}

export default function InteractiveForecasting() {
  const [activeTab, setActiveTab] = useState<MetricKey>("sleep")
  const [sliderValue, setSliderValue] = useState(baseData.sleep.current)
  const [forecastData, setForecastData] = useState<any[]>([])
  const [aiInsight, setAiInsight] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [insightHistory, setInsightHistory] = useState<string[]>([])

  const currentMetric = baseData[activeTab]

  useEffect(() => {
    const currentValue = sliderValue
    const baseValue = currentMetric.current
    const percentChange = (currentValue - baseValue) / (currentMetric.max - currentMetric.min)

    const readinessImpact = Math.round(percentChange * currentMetric.impact.readiness * 30)
    const hrvImpact = Math.round(percentChange * currentMetric.impact.hrv * 20)
    const recoveryImpact = Math.round(percentChange * currentMetric.impact.recovery * 25)

    const newForecastData = Array.from({ length: 6 }, (_, i) => {
      const factor = i === 0 ? 0 : i * 0.2
      return {
        day: i === 0 ? "Current" : `Day ${i}`,
        readiness: baseScores.readiness + readinessImpact * factor,
        hrv: baseScores.hrv + hrvImpact * factor,
        recovery: baseScores.recovery + recoveryImpact * factor,
      }
    })

    setForecastData(newForecastData)
  }, [activeTab, sliderValue])

  const handleGenerateInsight = async () => {
    setLoading(true)
    const payload = {
      sleepScore: activeTab === "sleep" ? sliderValue : baseData.sleep.current,
      hrv: activeTab === "hrv" ? sliderValue : baseScores.hrv,
      restingHR: baseScores.recovery,
      steps: activeTab === "activity" ? sliderValue : baseData.activity.current,
      hydration: activeTab === "hydration" ? sliderValue : baseData.hydration.current,
    }

    try {
      const response = await fetchGeminiInsights(payload)
      setAiInsight(response)

      setInsightHistory(prev => {
        const updated = [response, ...prev]
        return updated.slice(0, 5)
      })
    } catch (error) {
      console.error("Insight error:", error)
      setAiInsight("We couldn't generate an insight right now.")
    } finally {
      setLoading(false)
    }
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
          {/* LEFT PANEL */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={(val: MetricKey) => {
              setActiveTab(val)
              setSliderValue(baseData[val].current)
            }}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="hydration">Hydration</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {/* SLIDER */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium">Adjust {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                  <span className="text-sm font-bold">{sliderValue} {currentMetric.unit}</span>
                </div>
                <Slider
                  value={[sliderValue]}
                  min={currentMetric.min}
                  max={currentMetric.max}
                  step={currentMetric.step}
                  onValueChange={val => setSliderValue(val[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentMetric.min} {currentMetric.unit}</span>
                  <span>{currentMetric.max} {currentMetric.unit}</span>
                </div>
              </div>

              {/* PREDICTED IMPACT */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="text-sm font-medium">Predicted Impact</h3>
                {["readiness", "hrv", "recovery"].map(key => {
                  const iconMap: any = {
                    readiness: <Brain className="h-4 w-4 text-primary" />,
                    hrv: <Heart className="h-4 w-4 text-primary" />,
                    recovery: <Activity className="h-4 w-4 text-primary" />,
                  }
                  const current = Math.round(forecastData[0]?.[key] || 0)
                  const future = Math.round(forecastData[5]?.[key] || 0)
                  const delta = future - current
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          {iconMap[key]}
                          <span className="text-sm capitalize">{key}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{current}</span>
                          <ArrowRight className="h-3 w-3" />
                          <span className="text-sm font-medium">{future}</span>
                          <span className={`text-xs ${delta >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {delta >= 0 ? "+" : ""}{delta}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${delta >= 0 ? "bg-green-500" : "bg-red-500"}`}
                          style={{ width: `${Math.min(100, Math.abs(delta))}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* INSIGHT GENERATION */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="text-sm font-medium">Personalized Recommendation</h3>
                <Button onClick={handleGenerateInsight} disabled={loading}>
                  {loading ? "Generating..." : "Generate Insight"}
                </Button>
                {aiInsight && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {aiInsight}
                    <Button variant="ghost" size="sm" className="ml-2 px-2 py-0.5 text-xs">
                      <ThumbsUp className="h-3 w-3 mr-1" /> Helpful
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
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
            </div>

            {/* LATEST INSIGHTS */}
            {insightHistory.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Latest Insights</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {insightHistory.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
