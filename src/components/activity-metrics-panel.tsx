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
  AreaChart,
  Area,
} from "recharts"
import { Footprints, Flame, Clock, Map, Activity, Timer } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ActivityMetricsPanelProps {
  timeRange: string
}

// Sample data
const stepsData = [
  { day: "Mon", value: 12000 },
  { day: "Tue", value: 8000 },
  { day: "Wed", value: 11000 },
  { day: "Thu", value: 9500 },
  { day: "Fri", value: 10200 },
  { day: "Sat", value: 7500 },
  { day: "Sun", value: 6000 },
]

const caloriesData = [
  { day: "Mon", active: 450, total: 2250 },
  { day: "Tue", active: 320, total: 2120 },
  { day: "Wed", active: 420, total: 2220 },
  { day: "Thu", active: 380, total: 2180 },
  { day: "Fri", active: 400, total: 2200 },
  { day: "Sat", active: 300, total: 2100 },
  { day: "Sun", active: 250, total: 2050 },
]

const activeMinutesData = [
  { day: "Mon", light: 120, moderate: 45, intense: 20 },
  { day: "Tue", light: 90, moderate: 30, intense: 10 },
  { day: "Wed", light: 110, moderate: 40, intense: 15 },
  { day: "Thu", light: 100, moderate: 35, intense: 12 },
  { day: "Fri", light: 105, moderate: 38, intense: 14 },
  { day: "Sat", light: 80, moderate: 25, intense: 8 },
  { day: "Sun", light: 70, moderate: 20, intense: 5 },
]

const vo2MaxData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 42 },
  { day: "Wed", value: 42.5 },
  { day: "Thu", value: 42.5 },
  { day: "Fri", value: 43 },
  { day: "Sat", value: 43 },
  { day: "Sun", value: 43.5 },
]

const movementConsistencyData = [
  { hour: "12am", value: 5 },
  { hour: "2am", value: 0 },
  { hour: "4am", value: 0 },
  { hour: "6am", value: 10 },
  { hour: "8am", value: 80 },
  { hour: "10am", value: 45 },
  { hour: "12pm", value: 65 },
  { hour: "2pm", value: 30 },
  { hour: "4pm", value: 70 },
  { hour: "6pm", value: 85 },
  { hour: "8pm", value: 40 },
  { hour: "10pm", value: 15 },
]

const recoveryTimeData = [
  { day: "Mon", value: 8 },
  { day: "Tue", value: 12 },
  { day: "Wed", value: 6 },
  { day: "Thu", value: 10 },
  { day: "Fri", value: 8 },
  { day: "Sat", value: 4 },
  { day: "Sun", value: 24 },
]

export default function ActivityMetricsPanel({ timeRange }: ActivityMetricsPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Daily Steps</CardTitle>
          </div>
          <CardDescription>Step count over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 15000]} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Today</p>
              <p className="text-2xl font-bold">8,500</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-2xl font-bold">9,171</p>
            </div>
            <div>
              <p className="text-sm font-medium">Goal</p>
              <p className="text-sm">10,000 steps</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Calories Burned</CardTitle>
          </div>
          <CardDescription>Active and total calories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={caloriesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 2500]} />
                <Tooltip />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#94a3b8" fill="#f1f5f9" name="Total" />
                <Area type="monotone" dataKey="active" stackId="2" stroke="#f97316" fill="#ffedd5" name="Active" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-xl font-bold">400 kcal</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total</p>
              <p className="text-xl font-bold">2,200 kcal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Active Minutes</CardTitle>
          </div>
          <CardDescription>Activity intensity breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeMinutesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 200]} />
                <Tooltip />
                <Bar dataKey="light" stackId="a" fill="#94a3b8" name="Light" />
                <Bar dataKey="moderate" stackId="a" fill="#3b82f6" name="Moderate" />
                <Bar dataKey="intense" stackId="a" fill="#8b5cf6" name="Intense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-slate-400"></div>
                <p className="text-sm">Light: 105 min</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <p className="text-sm">Moderate: 38 min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <p className="text-sm">Intense: 14 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Workout Tracking</CardTitle>
          </div>
          <CardDescription>Recent workouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-medium">Running</span>
                </div>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Distance</p>
                  <p className="font-medium">5.2 km</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">28:45</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pace</p>
                  <p className="font-medium">5:32/km</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-1">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Cycling</span>
                </div>
                <span className="text-sm text-muted-foreground">Yesterday</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Distance</p>
                  <p className="font-medium">15.8 km</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">45:20</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Speed</p>
                  <p className="font-medium">20.9 km/h</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">VO2 Max</CardTitle>
          </div>
          <CardDescription>Cardiorespiratory fitness level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vo2MaxData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[35, 50]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" name="ml/kg/min" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-xl font-bold">43.5 ml/kg/min</p>
            </div>
            <div>
              <p className="text-sm font-medium">Fitness Level</p>
              <p className="text-sm text-green-500">Very Good</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Movement Consistency</CardTitle>
          </div>
          <CardDescription>Activity distribution throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={movementConsistencyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="#dcfce7" name="Activity %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Movement Score</p>
              <p className="text-sm font-medium">78/100</p>
            </div>
            <Progress value={78} className="h-2 mt-1" />
            <p className="mt-2 text-xs text-muted-foreground">
              You've been active throughout the day with good movement patterns.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Recovery Time</CardTitle>
          </div>
          <CardDescription>Recommended recovery hours after workouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recoveryTimeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 30]} />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current Status</p>
              <p className="text-xl font-bold text-green-500">Fully Recovered</p>
            </div>
            <div>
              <p className="text-sm font-medium">Next Workout</p>
              <p className="text-sm">Ready for high intensity</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

