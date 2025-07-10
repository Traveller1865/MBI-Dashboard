"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Activity,
  Droplets,
  BedDouble,
  Footprints,
  AlertTriangle,
  ArrowDownRight,
  Lightbulb,
  MessageSquare,
  Gauge,
} from "lucide-react"
import VitalsPanel from "@/components/vitals-panel"
import InsightCard from "@/components/insight-card"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export default function HomeOverview() {
  const [userName, setUserName] = useState("Sarah")
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Hello, {userName}</h1>
        <p className="text-muted-foreground">Here's your health overview for today, {today}</p>
      </div>

      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Wellness Score</CardTitle>
            </div>
            <Link href="/wellness-tracking" className="text-sm font-medium text-primary">
              View detailed metrics
            </Link>
          </div>
          <CardDescription>Overall health assessment and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center justify-center">
              <div className="relative h-[140px] w-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Score", value: 82 },
                        { name: "Remaining", value: 18 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={60}
                      paddingAngle={0}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#4f46e5" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">82</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { day: "Mar 22", value: 78 },
                      { day: "Mar 23", value: 76 },
                      { day: "Mar 24", value: 79 },
                      { day: "Mar 25", value: 80 },
                      { day: "Mar 26", value: 78 },
                      { day: "Mar 27", value: 80 },
                      { day: "Mar 28", value: 82 },
                    ]}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[70, 90]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" name="Wellness Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-md bg-muted p-2">
                  <p className="text-xs font-medium">Sleep</p>
                  <p className="text-sm font-bold">85/100</p>
                  <p className="text-xs text-green-500">+2%</p>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <p className="text-xs font-medium">Heart</p>
                  <p className="text-sm font-bold">78/100</p>
                  <p className="text-xs text-green-500">+5%</p>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <p className="text-xs font-medium">Activity</p>
                  <p className="text-sm font-bold">80/100</p>
                  <p className="text-xs text-amber-500">-1%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daily Vitals</CardTitle>
            <CardDescription>Your key health metrics today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Heart Rate (Resting)</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">72 bpm</span>
                    <span className="ml-2 flex items-center text-green-500">
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                      5% lower than last week
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">HRV</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">45 ms</span>
                    <span className="ml-2 flex items-center text-red-500">
                      <ArrowDownRight className="mr-1 h-3 w-3" />5 ms from baseline
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <BedDouble className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Sleep</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">7h 15m</span>
                    <span className="ml-2">Quality: 85% (good)</span>
                  </div>
                </div>
              </div>

              <Link href="/vitals" className="text-sm font-medium text-primary">
                View all vitals
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Goal Progress</CardTitle>
            <CardDescription>Your active health goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Daily Steps</p>
                  <p className="text-sm text-muted-foreground">8,500 / 10,000</p>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Water Intake</p>
                  <p className="text-sm text-muted-foreground">1.8L / 3L</p>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <span className="text-xs font-bold">5</span>
                </div>
                <p className="text-sm">Day meditation streak</p>
              </div>

              <Link href="/goals" className="text-sm font-medium text-primary">
                View all goals
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Insights</CardTitle>
            <CardDescription>AI-generated health observations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sleep pattern improving</p>
                    <p className="text-xs text-muted-foreground">
                      Your sleep consistency has improved by 15% this week.
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      <Link href="/ai-insights">Learn more</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Lab result alert</p>
                    <p className="text-xs text-muted-foreground">
                      Your Vitamin D is low (25 ng/mL). Review in Medical Records.
                    </p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      <Link href="/medical-records">View details</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Link href="/ai-insights" className="text-sm font-medium text-primary">
                View all insights
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
        </TabsList>
        <TabsContent value="vitals" className="mt-4">
          <VitalsPanel />
        </TabsContent>
        <TabsContent value="insights" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <InsightCard
              type="risk"
              title="Stress Impact"
              description="Your data suggests yesterday's stress might be affecting your recovery. Consider a relaxation exercise."
              icon={AlertTriangle}
              iconColor="text-amber-500"
              confidence={80}
            />
            <InsightCard
              type="suggestion"
              title="Earlier Bedtime"
              description="Aim for an earlier bedtime tonight to help recover. Your data shows you sleep better when you go to bed before 11pm."
              icon={BedDouble}
              iconColor="text-blue-500"
            />
            <InsightCard
              type="trend"
              title="Hydration Trend"
              description="You're averaging 1.5L water, below your 3L goal. Try keeping a water bottle at your desk."
              icon={Droplets}
              iconColor="text-cyan-500"
            />
            <InsightCard
              type="achievement"
              title="Step Goal Streak"
              description="Great job hitting your step goal 5 days in a row! Keep it up for a longer streak."
              icon={Footprints}
              iconColor="text-green-500"
            />
          </div>
        </TabsContent>
        <TabsContent value="labs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Lab Results</CardTitle>
              <CardDescription>Your most recent lab tests with alerts for out-of-range values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Lipid Panel</h3>
                    <span className="text-sm text-muted-foreground">Jan 15, 2025</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        <span className="text-sm">LDL Cholesterol</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">130 mg/dL</span>
                        <span className="text-xs text-muted-foreground">&lt; 100 mg/dL</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm">HDL Cholesterol</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">50 mg/dL</span>
                        <span className="text-xs text-muted-foreground">&gt; 40 mg/dL</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Nutrition</h3>
                    <span className="text-sm text-muted-foreground">Jan 15, 2025</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span className="text-sm">Vitamin D</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">25 ng/mL</span>
                        <span className="text-xs text-muted-foreground">30-100 ng/mL</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/medical-records">
                    <Button variant="outline">View All Lab Results</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

