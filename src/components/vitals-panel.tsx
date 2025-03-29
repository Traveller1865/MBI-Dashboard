"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, BedDouble, Footprints } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Sample data for charts
const heartRateData = [
  { day: "Mon", value: 68 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 70 },
  { day: "Thu", value: 69 },
  { day: "Fri", value: 72 },
  { day: "Sat", value: 75 },
  { day: "Sun", value: 72 },
]

const hrvData = [
  { day: "Mon", value: 48 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 42 },
  { day: "Thu", value: 44 },
  { day: "Fri", value: 43 },
  { day: "Sat", value: 46 },
  { day: "Sun", value: 45 },
]

const sleepData = [
  { day: "Mon", value: 7.5 },
  { day: "Tue", value: 6.8 },
  { day: "Wed", value: 7.2 },
  { day: "Thu", value: 6.5 },
  { day: "Fri", value: 7.0 },
  { day: "Sat", value: 8.2 },
  { day: "Sun", value: 7.25 },
]

const stepsData = [
  { day: "Mon", value: 12000 },
  { day: "Tue", value: 8000 },
  { day: "Wed", value: 11000 },
  { day: "Thu", value: 9500 },
  { day: "Fri", value: 10200 },
  { day: "Sat", value: 7500 },
  { day: "Sun", value: 6000 },
]

export default function VitalsPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Heart Rate</CardTitle>
          </div>
          <CardDescription>Resting heart rate over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[60, 80]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" name="BPM" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-2xl font-bold">72 bpm</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-2xl font-bold">71 bpm</p>
            </div>
            <div>
              <p className="text-sm font-medium">Trend</p>
              <p className="text-sm text-green-500">-5% vs last week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Heart Rate Variability</CardTitle>
          </div>
          <CardDescription>HRV measurements over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrvData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[35, 55]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" name="ms" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-2xl font-bold">45 ms</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-2xl font-bold">44.7 ms</p>
            </div>
            <div>
              <p className="text-sm font-medium">Trend</p>
              <p className="text-sm text-red-500">-5 ms from baseline</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BedDouble className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Sleep</CardTitle>
          </div>
          <CardDescription>Sleep duration over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
              <p className="text-sm font-medium">Quality</p>
              <p className="text-sm text-green-500">85% (good)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Activity</CardTitle>
          </div>
          <CardDescription>Daily steps over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 15000]} />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Today</p>
              <p className="text-2xl font-bold">8,500</p>
            </div>
            <div>
              <p className="text-sm font-medium">Goal</p>
              <p className="text-2xl font-bold">10,000</p>
            </div>
            <div>
              <p className="text-sm font-medium">Progress</p>
              <p className="text-sm text-amber-500">85% of daily goal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

