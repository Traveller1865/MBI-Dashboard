"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Thermometer, Droplets, Wind, Calendar } from "lucide-react"

interface BodyMetricsPanelProps {
  timeRange: string
}

// Sample data
const skinTempData = [
  { day: "Mon", value: 0.2 },
  { day: "Tue", value: 0.5 },
  { day: "Wed", value: 0.3 },
  { day: "Thu", value: -0.1 },
  { day: "Fri", value: -0.3 },
  { day: "Sat", value: 0.1 },
  { day: "Sun", value: 0.4 },
]

const coreTempData = [
  { day: "Mon", value: 36.8 },
  { day: "Tue", value: 36.9 },
  { day: "Wed", value: 37.0 },
  { day: "Thu", value: 36.7 },
  { day: "Fri", value: 36.6 },
  { day: "Sat", value: 36.8 },
  { day: "Sun", value: 36.9 },
]

const spo2Data = [
  { day: "Mon", value: 98 },
  { day: "Tue", value: 97 },
  { day: "Wed", value: 98 },
  { day: "Thu", value: 96 },
  { day: "Fri", value: 97 },
  { day: "Sat", value: 98 },
  { day: "Sun", value: 98 },
]

const respiratoryRateData = [
  { day: "Mon", value: 14 },
  { day: "Tue", value: 15 },
  { day: "Wed", value: 14 },
  { day: "Thu", value: 16 },
  { day: "Fri", value: 15 },
  { day: "Sat", value: 13 },
  { day: "Sun", value: 14 },
]

const cycleData = [
  { day: "1", value: 1, phase: "Menstrual" },
  { day: "2", value: 1, phase: "Menstrual" },
  { day: "3", value: 1, phase: "Menstrual" },
  { day: "4", value: 1, phase: "Menstrual" },
  { day: "5", value: 1, phase: "Menstrual" },
  { day: "6", value: 2, phase: "Follicular" },
  { day: "7", value: 2, phase: "Follicular" },
  { day: "8", value: 2, phase: "Follicular" },
  { day: "9", value: 2, phase: "Follicular" },
  { day: "10", value: 2, phase: "Follicular" },
  { day: "11", value: 3, phase: "Ovulatory" },
  { day: "12", value: 3, phase: "Ovulatory" },
  { day: "13", value: 3, phase: "Ovulatory" },
  { day: "14", value: 3, phase: "Ovulatory" },
  { day: "15", value: 4, phase: "Luteal" },
  { day: "16", value: 4, phase: "Luteal" },
  { day: "17", value: 4, phase: "Luteal" },
  { day: "18", value: 4, phase: "Luteal" },
  { day: "19", value: 4, phase: "Luteal" },
  { day: "20", value: 4, phase: "Luteal" },
  { day: "21", value: 4, phase: "Luteal" },
  { day: "22", value: 4, phase: "Luteal" },
  { day: "23", value: 4, phase: "Luteal" },
  { day: "24", value: 4, phase: "Luteal" },
  { day: "25", value: 4, phase: "Luteal" },
  { day: "26", value: 4, phase: "Luteal" },
  { day: "27", value: 4, phase: "Luteal" },
  { day: "28", value: 4, phase: "Luteal" },
]

export default function BodyMetricsPanel({ timeRange }: BodyMetricsPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Skin Temperature</CardTitle>
          </div>
          <CardDescription>Deviation from baseline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={skinTempData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[-1, 1]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f97316" name="°C Deviation" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-xl font-bold">+0.4°C</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">+0.2°C</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Core Temperature</CardTitle>
          </div>
          <CardDescription>Estimated core body temperature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coreTempData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[36, 38]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f97316" name="°C" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-xl font-bold">36.9°C</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">36.8°C</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Blood Oxygen</CardTitle>
          </div>
          <CardDescription>SpO2 saturation levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spo2Data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" name="%" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-xl font-bold">98%</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">97.4%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Respiratory Rate</CardTitle>
          </div>
          <CardDescription>Breaths per minute during sleep</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={respiratoryRateData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[10, 20]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" name="BPM" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current</p>
              <p className="text-xl font-bold">14 bpm</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Avg</p>
              <p className="text-xl font-bold">14.4 bpm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Menstrual Cycle Prediction</CardTitle>
          </div>
          <CardDescription>Cycle phase and prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cycleData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 5]} hide />
                <Tooltip formatter={(value, name, props) => [props.payload.phase, "Phase"]} />
                <Area type="monotone" dataKey="value" stroke="#d946ef" fill="#fae8ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-md border p-3">
              <p className="text-sm font-medium">Current Phase</p>
              <p className="text-lg font-bold">Luteal (Day 18)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Progesterone dominant phase. May experience PMS symptoms.
              </p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-sm font-medium">Next Period</p>
              <p className="text-lg font-bold">In 10 days</p>
              <p className="text-xs text-muted-foreground mt-1">Expected on April 7, 2025. Cycle length: 28 days.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

