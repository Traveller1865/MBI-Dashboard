"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Plus,
  Footprints,
  Droplets,
  BedDouble,
  Dumbbell,
  MoreHorizontal,
  Check,
  Award,
  Flame,
  Lightbulb,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Goal {
  id: string
  title: string
  type: "daily" | "weekly" | "outcome"
  category: "steps" | "water" | "sleep" | "exercise" | "weight" | "meditation" | "nutrition"
  target: number
  unit: string
  current: number
  dueDate?: string
  startDate: string
  streak?: number
  progress: number
  status: "on-track" | "at-risk" | "completed" | "missed"
  daysCompleted?: number[]
}

export default function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Walk 10,000 steps daily",
      type: "daily",
      category: "steps",
      target: 10000,
      unit: "steps",
      current: 8500,
      startDate: "2025-03-21",
      streak: 5,
      progress: 85,
      status: "on-track",
      daysCompleted: [1, 2, 3, 4, 5],
    },
    {
      id: "2",
      title: "Drink 3L of water daily",
      type: "daily",
      category: "water",
      target: 3,
      unit: "L",
      current: 1.8,
      startDate: "2025-03-15",
      streak: 3,
      progress: 60,
      status: "at-risk",
      daysCompleted: [3, 4, 5],
    },
    {
      id: "3",
      title: "Sleep 7.5 hours each night",
      type: "daily",
      category: "sleep",
      target: 7.5,
      unit: "hours",
      current: 7.25,
      startDate: "2025-03-10",
      streak: 2,
      progress: 97,
      status: "on-track",
      daysCompleted: [4, 5],
    },
    {
      id: "4",
      title: "Lose 5 lbs in 2 months",
      type: "outcome",
      category: "weight",
      target: 5,
      unit: "lbs",
      current: 2,
      startDate: "2025-03-01",
      dueDate: "2025-05-01",
      progress: 40,
      status: "on-track",
    },
    {
      id: "5",
      title: "Meditate 10 minutes daily",
      type: "daily",
      category: "meditation",
      target: 10,
      unit: "minutes",
      current: 10,
      startDate: "2025-03-24",
      streak: 5,
      progress: 100,
      status: "on-track",
      daysCompleted: [1, 2, 3, 4, 5],
    },
    {
      id: "6",
      title: "Exercise 150 minutes per week",
      type: "weekly",
      category: "exercise",
      target: 150,
      unit: "minutes",
      current: 90,
      startDate: "2025-03-25",
      progress: 60,
      status: "on-track",
    },
  ])

  const [newGoalOpen, setNewGoalOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [goalDetailOpen, setGoalDetailOpen] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "steps":
        return <Footprints className="h-5 w-5" />
      case "water":
        return <Droplets className="h-5 w-5" />
      case "sleep":
        return <BedDouble className="h-5 w-5" />
      case "exercise":
        return <Dumbbell className="h-5 w-5" />
      case "weight":
        return <Target className="h-5 w-5" />
      case "meditation":
        return <Flame className="h-5 w-5" />
      case "nutrition":
        return <Target className="h-5 w-5" />
      default:
        return <Target className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-500"
      case "at-risk":
        return "text-yellow-500"
      case "completed":
        return "text-green-500"
      case "missed":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const handleGoalDetail = (goal: Goal) => {
    setSelectedGoal(goal)
    setGoalDetailOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground">Set and track your health and wellness goals</p>
        </div>
        <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Set a New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Goal</DialogTitle>
              <DialogDescription>Set a SMART goal to improve your health and wellness</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Habit</SelectItem>
                    <SelectItem value="weekly">Weekly Target</SelectItem>
                    <SelectItem value="outcome">One-time Outcome</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal-category">Category</Label>
                <Select defaultValue="steps">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steps">Steps</SelectItem>
                    <SelectItem value="water">Water Intake</SelectItem>
                    <SelectItem value="sleep">Sleep</SelectItem>
                    <SelectItem value="exercise">Exercise</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="meditation">Meditation</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input id="goal-title" placeholder="e.g., Walk 10,000 steps daily" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="goal-target">Target Value</Label>
                  <Input id="goal-target" type="number" placeholder="10000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="goal-unit">Unit</Label>
                  <Select defaultValue="steps">
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="steps">steps</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="hours">hours</SelectItem>
                      <SelectItem value="minutes">minutes</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="goal-duration">Duration</Label>
                <Select defaultValue="ongoing">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="2-months">2 Months</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewGoalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewGoalOpen(false)}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1">{getCategoryIcon(goal.category)}</div>
                      <CardTitle className="text-base">{goal.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {goal.type === "daily" && "Daily habit"}
                    {goal.type === "weekly" && "Weekly target"}
                    {goal.type === "outcome" && `Target date: ${goal.dueDate}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-sm font-medium">
                        {goal.current} / {goal.target} {goal.unit}
                      </div>
                    </div>
                    <Progress value={goal.progress} className="h-2" />

                    {goal.type === "daily" && goal.streak && (
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Flame className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{goal.streak} day streak</span>
                      </div>
                    )}

                    {goal.type === "daily" && goal.daysCompleted && (
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <div
                            key={day}
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                              goal.daysCompleted?.includes(day)
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                        {goal.status === "on-track" && "On Track"}
                        {goal.status === "at-risk" && "At Risk"}
                        {goal.status === "completed" && "Completed"}
                        {goal.status === "missed" && "Missed"}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full gap-2">
                    {goal.type === "daily" && (
                      <Button variant="outline" className="flex-1">
                        <Check className="mr-2 h-4 w-4" />
                        Mark Done
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1" onClick={() => handleGoalDetail(goal)}>
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Award className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">Run 5K without stopping</CardTitle>
                  </div>
                </div>
                <CardDescription>Completed on March 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Achievement</div>
                    <div className="text-sm font-medium">5K run</div>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500">
                      <Award className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Goal achieved</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Achievement
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggested" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">Increase Vitamin D levels</CardTitle>
                  </div>
                </div>
                <CardDescription>Suggested based on your lab results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your Vitamin D is low (25 ng/mL). Setting a goal to take a daily supplement and get more sunlight
                  could help improve your levels.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add This Goal</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">Increase step goal</CardTitle>
                  </div>
                </div>
                <CardDescription>Suggested based on your activity data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You've consistently exceeded your 10,000 steps goal. Consider increasing to 12,000 steps for more
                  challenge.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add This Goal</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {selectedGoal && (
        <Dialog open={goalDetailOpen} onOpenChange={setGoalDetailOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedGoal.title}</DialogTitle>
              <DialogDescription>
                {selectedGoal.type === "daily" && "Daily habit goal"}
                {selectedGoal.type === "weekly" && "Weekly target goal"}
                {selectedGoal.type === "outcome" && "Outcome-based goal"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">{getCategoryIcon(selectedGoal.category)}</div>
                    <span className="font-medium">
                      {selectedGoal.category.charAt(0).toUpperCase() + selectedGoal.category.slice(1)}
                    </span>
                  </div>
                  <div className={`text-sm font-medium ${getStatusColor(selectedGoal.status)}`}>
                    {selectedGoal.status === "on-track" && "On Track"}
                    {selectedGoal.status === "at-risk" && "At Risk"}
                    {selectedGoal.status === "completed" && "Completed"}
                    {selectedGoal.status === "missed" && "Missed"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{selectedGoal.progress}%</span>
                </div>
                <Progress value={selectedGoal.progress} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Current: {selectedGoal.current} {selectedGoal.unit}
                  </span>
                  <span>
                    Target: {selectedGoal.target} {selectedGoal.unit}
                  </span>
                </div>
              </div>

              {selectedGoal.type === "daily" && selectedGoal.daysCompleted && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Weekly Progress</span>
                  <div className="grid grid-cols-7 gap-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={i} className="text-center text-xs">
                        {day}
                      </div>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        className={`flex h-8 w-full items-center justify-center rounded-md text-xs ${
                          selectedGoal.daysCompleted?.includes(day)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {selectedGoal.daysCompleted?.includes(day) ? <Check className="h-4 w-4" /> : ""}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-sm font-medium">Goal Details</span>
                <div className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between border-b py-2">
                    <span className="text-muted-foreground">Start Date</span>
                    <span>{selectedGoal.startDate}</span>
                  </div>
                  {selectedGoal.dueDate && (
                    <div className="flex items-center justify-between border-b py-2">
                      <span className="text-muted-foreground">Due Date</span>
                      <span>{selectedGoal.dueDate}</span>
                    </div>
                  )}
                  {selectedGoal.streak && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Current Streak</span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                        {selectedGoal.streak} days
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">AI Insights</span>
                <div className="rounded-md border bg-muted/50 p-3 text-sm">
                  {selectedGoal.category === "steps" &&
                    "You're consistently active on weekdays but tend to be less active on weekends. Consider planning weekend activities to maintain your streak."}
                  {selectedGoal.category === "water" &&
                    "Your water intake is lower in the mornings. Try keeping a water bottle by your bed and drinking a glass when you wake up."}
                  {selectedGoal.category === "sleep" &&
                    "Your sleep quality improves when you go to bed before 11pm. Consider setting a consistent bedtime routine."}
                  {selectedGoal.category === "meditation" &&
                    "Great job maintaining your meditation streak! Your HRV data shows improvement on days following meditation."}
                  {selectedGoal.category === "weight" &&
                    "You're making steady progress toward your weight goal. Your current pace would have you reach your target about 1 week ahead of schedule."}
                  {selectedGoal.category === "exercise" &&
                    "You're currently at 60% of your weekly exercise goal with 2 days remaining. Consider adding a 30-minute session tomorrow to stay on track."}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline">Edit Goal</Button>
              {selectedGoal.type === "daily" && <Button>Mark Today Complete</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

