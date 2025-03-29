"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Heart, Activity, Zap, AlertTriangle } from "lucide-react"

interface HeartMetricsPanelProps {
  timeRange: string
}

// Sample data
const restingHeartRateData = [
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

const continuousHeartRateData = [
  { time: "00:00", value: 62 },
  { time: "02:00", value: 58 },
  { time: "04:00", value: 56 },
  { time: "06:00", value: 60 },
  { time: "08:00", value: 75 },
  { time: "10:00", value: 85 },
  { time: "12:00", value: 92 },
  { time: "14:00", value: 88 },
  { time: "16:00", value: 95 },
  { time: "18:00", value: 110 },
  { time: "20:00", value: 85 },
  { time: "22:00", value: 72 },
]

const ecgData = [
  { time: "1", value: 0 },
  { time: "2", value: 0.2 },
  { time: "3", value: 0.5 },
  { time: "4", value: 1 },
  { time: "5", value: 0.8 },
  { time: "6", value: 0.2 },
  { time: "7", value: -0.5 },
  { time: "8", value: -1 },
  { time: "9", value: -0.8 },
  { time: "10", value: -0.2 },
  { time: "11", value: 0 },
  { time: "12", value: 0.2 },
  { time: "13", value: 0.5 },
  { time: "14", value: 1 },
  { time: "15", value: 0.8 },
  { time: "16", value: 0.2 },
  { time: "17", value: -0.5 },
  { time: "18", value: -1 },
  { time: "19", value: -0.8 },
  { time: "20", value: -0.2 },
  { time: "21", value: 0 },
]

export default function HeartMetricsPanel({ timeRange }: HeartMetricsPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Resting Heart Rate</CardTitle>
          </div>
          <CardDescription>Average heart rate at rest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={restingHeartRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[50, 80]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ef4444" name="BPM" />
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
          <CardDescription>HRV measurements over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
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
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Continuous Heart Rate</CardTitle>
          </div>
          <CardDescription>24-hour heart rate pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={continuousHeartRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[50, 120]} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#ef4444" fill="#fee2e2" name="BPM" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Min</p>
              <p className="text-xl font-bold">56 bpm</p>
            </div>
            <div>
              <p className="text-sm font-medium">Max</p>
              <p className="text-xl font-bold">110 bpm</p>
            </div>
            <div>
              <p className="text-sm font-medium">Avg</p>
              <p className="text-xl font-bold">78 bpm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">ECG Waveform</CardTitle>
          </div>
          <CardDescription>Most recent electrocardiogram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ecgData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <YAxis domain={[-1.2, 1.2]} hide />
                <Line type="monotone" dataKey="value" stroke="#ef4444" dot={false} name="mV" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Recorded</p>
              <p className="text-sm">Today, 8:30 AM</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm text-green-500">Normal sinus rhythm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Irregular Rhythm</CardTitle>
          </div>
          <CardDescription>Notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium">No irregularities detected</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Your heart rhythm has been regular for the past 30 days. Continue monitoring for early detection.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Monitoring History</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Last check</span>
                <span>Today, 6:00 AM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Monitoring period</span>
                <span>30 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Alert sensitivity</span>
                <span>Medium</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

