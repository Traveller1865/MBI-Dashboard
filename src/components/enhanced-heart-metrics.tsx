"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Legend,
} from "recharts"
import { Heart, AlertTriangle, Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EnhancedHeartMetricsProps {
  timeRange: string
}

// Sample data with risk indicators
const heartRateData = [
  { day: "Mon", value: 68, predicted: 69 },
  { day: "Tue", value: 72, predicted: 71 },
  { day: "Wed", value: 70, predicted: 70 },
  { day: "Thu", value: 69, predicted: 72 },
  { day: "Fri", value: 72, predicted: 74 },
  { day: "Sat", value: 75, predicted: 76 },
  { day: "Sun", value: 72, predicted: 78 },
  { day: "Mon+", predicted: 80 },
  { day: "Tue+", predicted: 82 },
  { day: "Wed+", predicted: 83 },
]

const hrvData = [
  { day: "Mon", value: 48, predicted: 47 },
  { day: "Tue", value: 45, predicted: 44 },
  { day: "Wed", value: 42, predicted: 43 },
  { day: "Thu", value: 44, predicted: 42 },
  { day: "Fri", value: 43, predicted: 41 },
  { day: "Sat", value: 46, predicted: 40 },
  { day: "Sun", value: 45, predicted: 39 },
  { day: "Mon+", predicted: 38 },
  { day: "Tue+", predicted: 37 },
  { day: "Wed+", predicted: 36 },
]

export default function EnhancedHeartMetrics({ timeRange }: EnhancedHeartMetricsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Resting Heart Rate with Risk Indicators</CardTitle>
            </div>
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">About This Chart</h4>
                  <p className="text-sm text-muted-foreground">
                    This chart shows your resting heart rate with risk zones and predictive trends. The yellow area
                    indicates a cautionary zone, while the red area indicates a high-risk zone. The dotted line shows
                    the predicted trend based on your current patterns.
                  </p>
                  <div className="pt-2">
                    <h5 className="text-sm font-medium">Risk Zones:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                      <li>• Yellow (75-85 bpm): Elevated, monitor closely</li>
                      <li>• Red (85+ bpm): High risk, consult healthcare provider</li>
                    </ul>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <CardDescription>Includes risk zones and predictive trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[50, 100]} />
                <Tooltip formatter={(value, name) => [value, name === "predicted" ? "Predicted BPM" : "Actual BPM"]} />
                <Legend />

                {/* Risk zones */}
                <ReferenceArea y1={75} y2={85} fill="#FEF9C3" fillOpacity={0.3} />
                <ReferenceArea y1={85} y2={100} fill="#FEE2E2" fillOpacity={0.3} />

                {/* Current threshold line */}
                <ReferenceLine
                  y={75}
                  stroke="#FBBF24"
                  strokeDasharray="3 3"
                  label={{
                    value: "Caution",
                    position: "insideBottomLeft",
                    fill: "#FBBF24",
                    fontSize: 12,
                  }}
                />

                <ReferenceLine
                  y={85}
                  stroke="#EF4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "High Risk",
                    position: "insideTopLeft",
                    fill: "#EF4444",
                    fontSize: 12,
                  }}
                />

                {/* Actual and predicted lines */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  name="Actual"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#ef4444"
                  strokeDasharray="5 5"
                  name="Predicted"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-2xl font-bold">72 bpm</p>
            </div>
            <div>
              <p className="text-sm font-medium">Predicted (7 days)</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">83 bpm</p>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-2">
              <p className="text-xs text-amber-700">
                <span className="font-medium">Alert:</span> Upward trend detected
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">HRV with Risk Indicators</CardTitle>
            </div>
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">About This Chart</h4>
                  <p className="text-sm text-muted-foreground">
                    This chart shows your heart rate variability (HRV) with risk zones and predictive trends. The yellow
                    area indicates a cautionary zone, while the red area indicates a high-risk zone. The dotted line
                    shows the predicted trend based on your current patterns.
                  </p>
                  <div className="pt-2">
                    <h5 className="text-sm font-medium">Risk Zones:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                      <li>• Yellow (35-40 ms): Reduced HRV, monitor recovery</li>
                      <li>• Red (below 35 ms): Very low HRV, prioritize recovery</li>
                    </ul>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <CardDescription>Includes risk zones and predictive trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrvData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[30, 55]} />
                <Tooltip formatter={(value, name) => [value, name === "predicted" ? "Predicted ms" : "Actual ms"]} />
                <Legend />

                {/* Risk zones */}
                <ReferenceArea y1={35} y2={40} fill="#FEF9C3" fillOpacity={0.3} />
                <ReferenceArea y1={30} y2={35} fill="#FEE2E2" fillOpacity={0.3} />

                {/* Current threshold line */}
                <ReferenceLine
                  y={40}
                  stroke="#FBBF24"
                  strokeDasharray="3 3"
                  label={{
                    value: "Caution",
                    position: "insideBottomLeft",
                    fill: "#FBBF24",
                    fontSize: 12,
                  }}
                />

                <ReferenceLine
                  y={35}
                  stroke="#EF4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "High Risk",
                    position: "insideTopLeft",
                    fill: "#EF4444",
                    fontSize: 12,
                  }}
                />

                {/* Actual and predicted lines */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  name="Actual"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#82ca9d"
                  strokeDasharray="5 5"
                  name="Predicted"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-2xl font-bold">45 ms</p>
            </div>
            <div>
              <p className="text-sm font-medium">Predicted (7 days)</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bold">36 ms</p>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-2">
              <p className="text-xs text-amber-700">
                <span className="font-medium">Alert:</span> Downward trend detected
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

