"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Heart, Brain, Moon } from "lucide-react"
import HealthScoreCard from "@/components/health-score-card"
import SleepMetricsPanel from "@/components/sleep-metrics-panel"
import HeartMetricsPanel from "@/components/heart-metrics-panel"
import BodyMetricsPanel from "@/components/body-metrics-panel"
import ActivityMetricsPanel from "@/components/activity-metrics-panel"
import ReadinessPanel from "@/components/readiness-panel"

// Add imports for our new components at the top of the file
import CorrelatedMetricsPanel from "@/components/correlated-metrics-panel"
import EnhancedHeartMetrics from "@/components/enhanced-heart-metrics"
import InteractiveForecasting from "@/components/interactive-forecasting"

export default function WellnessTrackingOverview() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Wellness Tracking</h1>
        <p className="text-muted-foreground">Comprehensive health metrics from your connected devices</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <HealthScoreCard />

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Heart Health</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">HRV Score</span>
                <span className="text-sm font-medium">78/100</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Sleep Quality</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sleep Score</span>
                <span className="text-sm font-medium">85/100</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Readiness</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Recovery Score</span>
                <span className="text-sm font-medium">72/100</span>
              </div>
              <Progress value={72} className="h-2" />
              <p className="text-xs text-muted-foreground">-3% from last week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Detailed Metrics</h2>
        <div className="flex items-center gap-2">
          <button
            className={`rounded-md px-3 py-1 text-sm ${timeRange === "day" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            onClick={() => setTimeRange("day")}
          >
            Day
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm ${timeRange === "week" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm ${timeRange === "month" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
        </div>
      </div>

      <Tabs defaultValue="sleep" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="heart">Heart</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
        </TabsList>
        <TabsContent value="sleep" className="mt-4">
          <SleepMetricsPanel timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="heart" className="mt-4">
          <HeartMetricsPanel timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="body" className="mt-4">
          <BodyMetricsPanel timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <ActivityMetricsPanel timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="readiness" className="mt-4">
          <ReadinessPanel timeRange={timeRange} />
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
        <div className="space-y-6">
          <CorrelatedMetricsPanel timeRange={timeRange} />
          <EnhancedHeartMetrics timeRange={timeRange} />
          <InteractiveForecasting />
        </div>
      </div>
    </div>
  )
}

