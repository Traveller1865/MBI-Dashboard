"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts"
import { Brain, Activity, Timer, Zap, Wind } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import BoxBreathingModal from "@/components/modals/box-breathing-modal"
import FourSevenEightModal from "@/components/modals/four-seven-eight-modal"

interface ReadinessPanelProps {
  timeRange: string
}

// Sample data
const readinessScoreData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 82 },
  { day: "Thu", value: 75 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 80 },
  { day: "Sun", value: 72 },
]

const stressLevelData = [
  { day: "Mon", value: 25 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 30 },
  { day: "Thu", value: 50 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 35 },
  { day: "Sun", value: 40 },
]

const mindfulnessData = [
  { day: "Mon", value: 15 },
  { day: "Tue", value: 10 },
  { day: "Wed", value: 20 },
  { day: "Thu", value: 5 },
  { day: "Fri", value: 15 },
  { day: "Sat", value: 25 },
  { day: "Sun", value: 15 },
]

const readinessFactorsData = [
  { factor: "Sleep", value: 80 },
  { factor: "HRV", value: 65 },
  { factor: "Resting HR", value: 85 },
  { factor: "Recovery", value: 70 },
  { factor: "Activity", value: 75 },
]

export default function ReadinessPanel({ timeRange }: ReadinessPanelProps) {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Readiness Score</CardTitle>
          </div>
          <CardDescription>Daily recovery and readiness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readinessScoreData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" name="Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Today</p>
              <p className="text-2xl font-bold">72/100</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm text-amber-500">Moderate Recovery</p>
            </div>
            <div>
              <p className="text-sm font-medium">Recommendation</p>
              <p className="text-sm">Light to moderate activity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Stress Level</CardTitle>
          </div>
          <CardDescription>Daily stress measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressLevelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#ef4444" fill="#fee2e2" name="Stress Level" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Current Level</p>
              <p className="text-sm font-medium">40/100</p>
            </div>
            <Progress value={40} className="h-2 mt-1" />
            <p className="mt-2 text-xs text-muted-foreground">
              Your stress level is moderate. Consider a short breathing exercise.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Mindfulness Minutes</CardTitle>
          </div>
          <CardDescription>Daily mindfulness practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mindfulnessData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 30]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" name="Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Today</p>
              <p className="text-xl font-bold">15 minutes</p>
            </div>
            <div>
              <p className="text-sm font-medium">7-day Total</p>
              <p className="text-xl font-bold">105 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Guided Breathing</CardTitle>
          </div>
          <CardDescription>Breathing exercises and sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-1">
                    <Wind className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Box Breathing</span>
                </div>
                <span className="text-sm text-muted-foreground">5 min</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Equal inhale, hold, exhale, and hold pattern to reduce stress.
              </p>
              <button
                onClick={() => setModalOpen(true)} 
                className="mt-2 w-full rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
                Start Session
              </button>
            </div>
            <BoxBreathingModal open={isModalOpen} onClose={() => setModalOpen(false)} />

            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-100 p-1">
                    <Wind className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="font-medium">4-7-8 Breathing</span>
                </div>
                <span className="text-sm text-muted-foreground">3 min</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Inhale for 4, hold for 7, exhale for 8 to promote relaxation.
              </p>
              <button 
                onClick={() => setModalOpen(true)} 
                className="mt-2 w-full rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
                Start Session
              </button>
            </div>
            <FourSevenEightModal open={isModalOpen} onClose={() => setModalOpen(false)} />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Readiness Factors</CardTitle>
          </div>
          <CardDescription>Components affecting your readiness score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={readinessFactorsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Readiness" dataKey="value" stroke="#8b5cf6" fill="#c4b5fd" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            {readinessFactorsData.map((factor) => (
              <div key={factor.factor} className="text-center">
                <p className="text-sm font-medium">{factor.factor}</p>
                <p
                  className={`text-sm ${factor.value >= 80 ? "text-green-500" : factor.value >= 60 ? "text-amber-500" : "text-red-500"}`}
                >
                  {factor.value}/100
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

