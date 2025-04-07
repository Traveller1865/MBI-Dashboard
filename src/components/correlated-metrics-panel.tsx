"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { Activity, Droplets, Moon, Flame, Brain } from "lucide-react"

interface CorrelatedMetricsPanelProps {
  timeRange: string
}

// Sample correlation data
const correlationData = {
  sleepActivity: [
    { x: 5.5, y: 6500, z: 10, name: "Mon" },
    { x: 6.8, y: 8000, z: 10, name: "Tue" },
    { x: 7.2, y: 11000, z: 10, name: "Wed" },
    { x: 6.5, y: 9500, z: 10, name: "Thu" },
    { x: 7.0, y: 10200, z: 10, name: "Fri" },
    { x: 8.2, y: 7500, z: 10, name: "Sat" },
    { x: 7.25, y: 6000, z: 10, name: "Sun" },
  ],
  hydrationPerformance: [
    { x: 1.8, y: 72, z: 10, name: "Mon" },
    { x: 2.5, y: 78, z: 10, name: "Tue" },
    { x: 3.2, y: 85, z: 10, name: "Wed" },
    { x: 2.7, y: 76, z: 10, name: "Thu" },
    { x: 2.2, y: 70, z: 10, name: "Fri" },
    { x: 3.5, y: 88, z: 10, name: "Sat" },
    { x: 3.0, y: 82, z: 10, name: "Sun" },
  ],
  hrvRecovery: [
    { x: 48, y: 82, z: 10, name: "Mon" },
    { x: 45, y: 78, z: 10, name: "Tue" },
    { x: 42, y: 75, z: 10, name: "Wed" },
    { x: 44, y: 79, z: 10, name: "Thu" },
    { x: 43, y: 77, z: 10, name: "Fri" },
    { x: 46, y: 81, z: 10, name: "Sat" },
    { x: 45, y: 80, z: 10, name: "Sun" },
  ],
  caloriesWeight: [
    { x: 2250, y: 78.5, z: 10, name: "Mon" },
    { x: 2120, y: 78.3, z: 10, name: "Tue" },
    { x: 2220, y: 78.1, z: 10, name: "Wed" },
    { x: 2180, y: 77.9, z: 10, name: "Thu" },
    { x: 2200, y: 77.8, z: 10, name: "Fri" },
    { x: 2100, y: 77.6, z: 10, name: "Sat" },
    { x: 2050, y: 77.5, z: 10, name: "Sun" },
  ],
}

const correlationOptions = [
  {
    id: "sleepActivity",
    title: "Sleep vs. Activity",
    xLabel: "Sleep Duration (hours)",
    yLabel: "Steps Count",
    description: "How sleep duration affects daily activity levels",
    icon: Moon,
    insight: "You tend to be more active on days following 7+ hours of sleep.",
  },
  {
    id: "hydrationPerformance",
    title: "Hydration vs. Performance",
    xLabel: "Water Intake (liters)",
    yLabel: "Performance Score",
    description: "Impact of hydration on overall performance",
    icon: Droplets,
    insight: "Higher water intake correlates with better performance scores.",
  },
  {
    id: "hrvRecovery",
    title: "HRV vs. Recovery",
    xLabel: "Heart Rate Variability (ms)",
    yLabel: "Recovery Score",
    description: "Relationship between HRV and recovery metrics",
    icon: Activity,
    insight: "Higher HRV values typically predict better recovery scores.",
  },
  {
    id: "caloriesWeight",
    title: "Calories vs. Weight",
    xLabel: "Total Calories",
    yLabel: "Weight (kg)",
    description: "How caloric intake relates to weight changes",
    icon: Flame,
    insight: "Consistent caloric deficit shows gradual weight reduction.",
  },
]

export default function CorrelatedMetricsPanel({ timeRange }: CorrelatedMetricsPanelProps) {
  const [selectedCorrelation, setSelectedCorrelation] = useState("sleepActivity")

  const currentOption = correlationOptions.find((option) => option.id === selectedCorrelation)
  const currentData = correlationData[selectedCorrelation as keyof typeof correlationData]

  const IconComponent = currentOption?.icon || Activity

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Correlated Metrics Analysis</CardTitle>
          </div>
          <Select value={selectedCorrelation} onValueChange={setSelectedCorrelation}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select correlation" />
            </SelectTrigger>
            <SelectContent>
              {correlationOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>{currentOption?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name={currentOption?.xLabel}
                    label={{
                      value: currentOption?.xLabel,
                      position: "insideBottom",
                      offset: -10,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name={currentOption?.yLabel}
                    label={{
                      value: currentOption?.yLabel,
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ZAxis type="number" dataKey="z" range={[60, 200]} name="score" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Scatter name={currentOption?.title} data={currentData} fill="#8884d8" shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
                <p className="text-sm text-muted-foreground">{currentOption?.insight}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Correlation Strength</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width:
                          selectedCorrelation === "sleepActivity"
                            ? "78%"
                            : selectedCorrelation === "hydrationPerformance"
                              ? "85%"
                              : selectedCorrelation === "hrvRecovery"
                                ? "72%"
                                : "65%",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {selectedCorrelation === "sleepActivity"
                      ? "78%"
                      : selectedCorrelation === "hydrationPerformance"
                        ? "85%"
                        : selectedCorrelation === "hrvRecovery"
                          ? "72%"
                          : "65%"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {selectedCorrelation === "sleepActivity" && (
                    <>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Moon className="h-3 w-3 text-primary" />
                        </div>
                        <span>Aim for 7-8 hours of sleep to maximize activity potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Activity className="h-3 w-3 text-primary" />
                        </div>
                        <span>Consider lighter activity on days following poor sleep</span>
                      </li>
                    </>
                  )}

                  {selectedCorrelation === "hydrationPerformance" && (
                    <>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Droplets className="h-3 w-3 text-primary" />
                        </div>
                        <span>Increase water intake to 3+ liters on training days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Brain className="h-3 w-3 text-primary" />
                        </div>
                        <span>Track hydration more closely when performance drops</span>
                      </li>
                    </>
                  )}

                  {selectedCorrelation === "hrvRecovery" && (
                    <>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Activity className="h-3 w-3 text-primary" />
                        </div>
                        <span>Focus on recovery techniques when HRV drops below 45ms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Moon className="h-3 w-3 text-primary" />
                        </div>
                        <span>Prioritize sleep quality to improve HRV scores</span>
                      </li>
                    </>
                  )}

                  {selectedCorrelation === "caloriesWeight" && (
                    <>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Flame className="h-3 w-3 text-primary" />
                        </div>
                        <span>Maintain a 300-500 calorie deficit for sustainable weight loss</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Activity className="h-3 w-3 text-primary" />
                        </div>
                        <span>Increase activity on higher calorie days to maintain balance</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

