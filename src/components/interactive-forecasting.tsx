"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Brain, Moon, Heart, Activity, ArrowRight } from "lucide-react"

type InteractiveForecastingProps = {}

// Base data for forecasting
const baseData = {
  sleep: {
    current: 7,
    min: 5,
    max: 10,
    step: 0.5,
    unit: "hours",
    impact: {
      readiness: 0.8,
      hrv: 0.6,
      recovery: 0.7,
    },
  },
  activity: {
    current: 8000,
    min: 4000,
    max: 15000,
    step: 1000,
    unit: "steps",
    impact: {
      readiness: 0.4,
      hrv: 0.3,
      recovery: 0.5,
    },
  },
  nutrition: {
    current: 2200,
    min: 1500,
    max: 3000,
    step: 100,
    unit: "calories",
    impact: {
      readiness: 0.3,
      hrv: 0.2,
      recovery: 0.4,
    },
  },
  hydration: {
    current: 2.5,
    min: 1,
    max: 5,
    step: 0.5,
    unit: "liters",
    impact: {
      readiness: 0.5,
      hrv: 0.4,
      recovery: 0.3,
    },
  },
}

// Base scores
const baseScores = {
  readiness: 72,
  hrv: 45,
  recovery: 68,
}

export default function InteractiveForecasting({}: InteractiveForecastingProps) {
  const [activeTab, setActiveTab] = useState("sleep")
  const [sliderValue, setSliderValue] = useState(baseData[activeTab as keyof typeof baseData].current)
  const [forecastData, setForecastData] = useState<any[]>([])

  // Calculate the impact of changes on metrics
  useEffect(() => {
    const currentMetric = baseData[activeTab as keyof typeof baseData]
    const currentValue = sliderValue
    const baseValue = currentMetric.current

    // Calculate percentage change
    const percentChange = (currentValue - baseValue) / (currentMetric.max - currentMetric.min)

    // Calculate impact on each score
    const readinessImpact = Math.round(percentChange * currentMetric.impact.readiness * 30)
    const hrvImpact = Math.round(percentChange * currentMetric.impact.hrv * 20)
    const recoveryImpact = Math.round(percentChange * currentMetric.impact.recovery * 25)

    // Generate forecast data
    const newForecastData = [
      { day: "Current", readiness: baseScores.readiness, hrv: baseScores.hrv, recovery: baseScores.recovery },
      {
        day: "Day 1",
        readiness: baseScores.readiness + readinessImpact * 0.2,
        hrv: baseScores.hrv + hrvImpact * 0.2,
        recovery: baseScores.recovery + recoveryImpact * 0.2,
      },
      {
        day: "Day 2",
        readiness: baseScores.readiness + readinessImpact * 0.4,
        hrv: baseScores.hrv + hrvImpact * 0.4,
        recovery: baseScores.recovery + recoveryImpact * 0.4,
      },
      {
        day: "Day 3",
        readiness: baseScores.readiness + readinessImpact * 0.6,
        hrv: baseScores.hrv + hrvImpact * 0.6,
        recovery: baseScores.recovery + recoveryImpact * 0.6,
      },
      {
        day: "Day 4",
        readiness: baseScores.readiness + readinessImpact * 0.8,
        hrv: baseScores.hrv + hrvImpact * 0.8,
        recovery: baseScores.recovery + recoveryImpact * 0.8,
      },
      {
        day: "Day 5",
        readiness: baseScores.readiness + readinessImpact,
        hrv: baseScores.hrv + hrvImpact,
        recovery: baseScores.recovery + recoveryImpact,
      },
    ]

    setForecastData(newForecastData)
  }, [activeTab, sliderValue])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSliderValue(baseData[value as keyof typeof baseData].current)
  }

  const currentMetric = baseData[activeTab as keyof typeof baseData]

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
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sleep" className="flex items-center gap-1">
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline">Sleep</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Activity</span>
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Nutrition</span>
                </TabsTrigger>
                <TabsTrigger value="hydration" className="flex items-center gap-1">
                  <div className="i-lucide-droplets h-4 w-4" />
                  <span className="hidden sm:inline">Hydration</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    Adjust {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h3>
                  <span className="text-sm font-bold">
                    {sliderValue} {currentMetric.unit}
                  </span>
                </div>
                <Slider
                  value={[sliderValue]}
                  min={currentMetric.min}
                  max={currentMetric.max}
                  step={currentMetric.step}
                  onValueChange={(value) => setSliderValue(value[0])}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {currentMetric.min} {currentMetric.unit}
                  </span>
                  <span>
                    {currentMetric.max} {currentMetric.unit}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="text-sm font-medium">Predicted Impact</h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Brain className="h-4 w-4 text-primary" />
                        <span className="text-sm">Readiness Score</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{Math.round(forecastData[0]?.readiness || 0)}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="text-sm font-medium">{Math.round(forecastData[4]?.readiness || 0)}</span>
                        <span
                          className={`text-xs ${forecastData[4]?.readiness > forecastData[0]?.readiness ? "text-green-500" : "text-red-500"}`}
                        >
                          {forecastData[4]?.readiness > forecastData[0]?.readiness ? "+" : ""}
                          {Math.round((forecastData[4]?.readiness || 0) - (forecastData[0]?.readiness || 0))}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${forecastData[4]?.readiness > forecastData[0]?.readiness ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, Math.max(0, forecastData[4]?.readiness || 0))}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-primary" />
                        <span className="text-sm">HRV</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{Math.round(forecastData[0]?.hrv || 0)} ms</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="text-sm font-medium">{Math.round(forecastData[4]?.hrv || 0)} ms</span>
                        <span
                          className={`text-xs ${forecastData[4]?.hrv > forecastData[0]?.hrv ? "text-green-500" : "text-red-500"}`}
                        >
                          {forecastData[4]?.hrv > forecastData[0]?.hrv ? "+" : ""}
                          {Math.round((forecastData[4]?.hrv || 0) - (forecastData[0]?.hrv || 0))}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${forecastData[4]?.hrv > forecastData[0]?.hrv ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, Math.max(0, (forecastData[4]?.hrv || 0) * 2))}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-sm">Recovery</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{Math.round(forecastData[0]?.recovery || 0)}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="text-sm font-medium">{Math.round(forecastData[4]?.recovery || 0)}</span>
                        <span
                          className={`text-xs ${forecastData[4]?.recovery > forecastData[0]?.recovery ? "text-green-500" : "text-red-500"}`}
                        >
                          {forecastData[4]?.recovery > forecastData[0]?.recovery ? "+" : ""}
                          {Math.round((forecastData[4]?.recovery || 0) - (forecastData[0]?.recovery || 0))}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${forecastData[4]?.recovery > forecastData[0]?.recovery ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, Math.max(0, forecastData[4]?.recovery || 0))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <ReferenceLine y={70} stroke="#d1d5db" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="readiness" stroke="#4f46e5" name="Readiness" strokeWidth={2} />
                  <Line type="monotone" dataKey="hrv" stroke="#ef4444" name="HRV" strokeWidth={2} />
                  <Line type="monotone" dataKey="recovery" stroke="#10b981" name="Recovery" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Personalized Recommendations</h3>
              <div className="space-y-2">
                {activeTab === "sleep" && sliderValue > currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Increasing your sleep to {sliderValue} hours could improve your readiness score by approximately{" "}
                    {Math.round((forecastData[4]?.readiness || 0) - (forecastData[0]?.readiness || 0))} points over 5
                    days. Focus on consistent sleep timing for best results.
                  </p>
                )}

                {activeTab === "sleep" && sliderValue < currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Reducing sleep to {sliderValue} hours may decrease your recovery metrics. If you must reduce sleep,
                    consider increasing other recovery practices like meditation or reducing training intensity.
                  </p>
                )}

                {activeTab === "activity" && sliderValue > currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Increasing your daily steps to {sliderValue} could improve your overall health metrics, but ensure
                    you balance this with adequate recovery time to prevent overtraining.
                  </p>
                )}

                {activeTab === "activity" && sliderValue < currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Reducing activity to {sliderValue} steps may help short-term recovery if you're currently fatigued,
                    but could impact cardiovascular health long-term if maintained.
                  </p>
                )}

                {activeTab === "nutrition" && sliderValue > currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Increasing caloric intake to {sliderValue} calories should be paired with higher activity levels to
                    maintain balance. Focus on nutrient-dense foods for optimal recovery.
                  </p>
                )}

                {activeTab === "nutrition" && sliderValue < currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Reducing calories to {sliderValue} may impact recovery metrics. Ensure you're still getting adequate
                    protein and micronutrients even with reduced intake.
                  </p>
                )}

                {activeTab === "hydration" && sliderValue > currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Increasing hydration to {sliderValue} liters could significantly improve your recovery metrics and
                    cognitive function. Try to spread intake throughout the day.
                  </p>
                )}

                {activeTab === "hydration" && sliderValue < currentMetric.current && (
                  <p className="text-sm text-muted-foreground">
                    Reducing hydration to {sliderValue} liters may negatively impact performance and recovery. Consider
                    adding electrolytes to maximize absorption of the water you do consume.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

