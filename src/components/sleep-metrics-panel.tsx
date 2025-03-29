"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Moon, Clock, Zap, Activity, ArrowUpRight } from "lucide-react"

interface SleepMetricsPanelProps {
  timeRange: string
}

// Sample data
const sleepDurationData = [
  { day: "Mon", value: 7.5 },
  { day: "Tue", value: 6.8 },
  { day: "Wed", value: 7.2 },
  { day: "Thu", value: 6.5 },
  { day: "Fri", value: 7.0 },
  { day: "Sat", value: 8.2 },
  { day: "Sun", value: 7.25 },
]

const sleepStagesData = [
  { name: "Deep", value: 20 },
  { name: "REM", value: 25 },
  { name: "Light", value: 45 },
  { name: "Awake", value: 10 },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#a3e635", "#d1d5db"]

const sleepLatencyData = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 8 },
  { day: "Thu", value: 15 },
  { day: "Fri", value: 10 },
  { day: "Sat", value: 7 },
  { day: "Sun", value: 9 },
]

const sleepEfficiencyData = [
  { day: "Mon", value: 92 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 94 },
  { day: "Thu", value: 87 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 93 },
]

const movementData = [
  { day: "Mon", value: 15 },
  { day: "Tue", value: 22 },
  { day: "Wed", value: 12 },
  { day: "Thu", value: 18 },
  { day: "Fri", value: 14 },
  { day: "Sat", value: 8 },
  { day: "Sun", value: 10 },
]

export default function SleepMetricsPanel({ timeRange }: SleepMetricsPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Sleep Duration</CardTitle>
          </div>
          <CardDescription>Total sleep time per night</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepDurationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[5, 9]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Night</p>
              <p className="text-2xl font-bold">7h 15m</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-2xl font-bold">7.2h</p>
            </div>
            <div>
              <p className="text-sm font-medium">Target</p>
              <p className="text-sm">7-8 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Sleep Stages</CardTitle>
          </div>
          <CardDescription>Distribution of sleep stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sleepStagesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sleepStagesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sleepStagesData.map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">
                  {stage.name}: {stage.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Sleep Latency</CardTitle>
          </div>
          <CardDescription>Time to fall asleep</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepLatencyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 25]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" name="Minutes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Night</p>
              <p className="text-xl font-bold">9 min</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">11.3 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Sleep Efficiency</CardTitle>
          </div>
          <CardDescription>Percentage of time in bed spent asleep</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepEfficiencyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Night</p>
              <p className="text-xl font-bold">93%</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">91.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Nighttime Movement</CardTitle>
          </div>
          <CardDescription>Movement events during sleep</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={movementData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 30]} />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" name="Events" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Night</p>
              <p className="text-xl font-bold">10 events</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">14.1 events</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Sleep Score Trend</CardTitle>
          </div>
          <CardDescription>Overall sleep quality score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { day: "Mon", value: 82 },
                  { day: "Tue", value: 78 },
                  { day: "Wed", value: 85 },
                  { day: "Thu", value: 76 },
                  { day: "Fri", value: 80 },
                  { day: "Sat", value: 88 },
                  { day: "Sun", value: 85 },
                ]}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" name="Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Night</p>
              <p className="text-xl font-bold">85/100</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">82/100</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

