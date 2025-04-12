"use client"

import type React from "react"

import { useState } from "react"
import { Award, Trophy, Flame, Target, Zap, Heart, BedDouble, Droplets, Dumbbell, Lock, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Achievement {
  id: string
  title: string
  description: string
  category: "sleep" | "activity" | "nutrition" | "hydration" | "consistency" | "milestone"
  icon: React.ReactNode
  progress: number
  unlocked: boolean
  date?: string
  level?: number
  maxLevel?: number
  reward?: string
}

interface Streak {
  id: string
  title: string
  current: number
  best: number
  active: boolean
  icon: React.ReactNode
  lastUpdated: string
}

export function AchievementsPanel() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Early Bird",
      description: "Wake up before 7am for 5 consecutive days",
      category: "sleep",
      icon: <BedDouble className="h-6 w-6" />,
      progress: 100,
      unlocked: true,
      date: "Mar 15, 2025",
      level: 1,
      maxLevel: 3,
      reward: "Sleep Insight Boost",
    },
    {
      id: "2",
      title: "Step Master",
      description: "Reach 10,000 steps for 7 consecutive days",
      category: "activity",
      icon: <Dumbbell className="h-6 w-6" />,
      progress: 71,
      unlocked: false,
      level: 0,
      maxLevel: 3,
      reward: "Activity Score Boost",
    },
    {
      id: "3",
      title: "Hydration Hero",
      description: "Meet your water intake goal for 10 days",
      category: "hydration",
      icon: <Droplets className="h-6 w-6" />,
      progress: 40,
      unlocked: false,
      level: 0,
      maxLevel: 3,
      reward: "Hydration Insight Boost",
    },
    {
      id: "4",
      title: "Heart Health Champion",
      description: "Maintain optimal HRV for 5 consecutive days",
      category: "milestone",
      icon: <Heart className="h-6 w-6" />,
      progress: 100,
      unlocked: true,
      date: "Mar 20, 2025",
      level: 1,
      maxLevel: 3,
      reward: "Recovery Score Boost",
    },
    {
      id: "5",
      title: "Consistency King",
      description: "Log your health data for 30 consecutive days",
      category: "consistency",
      icon: <Flame className="h-6 w-6" />,
      progress: 83,
      unlocked: false,
      level: 0,
      maxLevel: 1,
      reward: "Premium Badge",
    },
    {
      id: "6",
      title: "Goal Crusher",
      description: "Complete 5 health goals",
      category: "milestone",
      icon: <Target className="h-6 w-6" />,
      progress: 60,
      unlocked: false,
      level: 0,
      maxLevel: 5,
      reward: "Goal Setting Boost",
    },
  ])

  const [streaks, setStreaks] = useState<Streak[]>([
    {
      id: "1",
      title: "Activity Goal",
      current: 5,
      best: 12,
      active: true,
      icon: <Dumbbell className="h-5 w-5 text-green-500" />,
      lastUpdated: "Today",
    },
    {
      id: "2",
      title: "Sleep Goal",
      current: 3,
      best: 8,
      active: true,
      icon: <BedDouble className="h-5 w-5 text-blue-500" />,
      lastUpdated: "Today",
    },
    {
      id: "3",
      title: "Hydration Goal",
      current: 0,
      best: 14,
      active: false,
      icon: <Droplets className="h-5 w-5 text-cyan-500" />,
      lastUpdated: "2 days ago",
    },
    {
      id: "4",
      title: "Journal Entry",
      current: 7,
      best: 21,
      active: true,
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      lastUpdated: "Today",
    },
  ])

  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sleep":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "activity":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "nutrition":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "hydration":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
      case "consistency":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "milestone":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getIconBgColor = (category: string) => {
    switch (category) {
      case "sleep":
        return "bg-blue-500"
      case "activity":
        return "bg-green-500"
      case "nutrition":
        return "bg-amber-500"
      case "hydration":
        return "bg-cyan-500"
      case "consistency":
        return "bg-purple-500"
      case "milestone":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTotalPoints = () => {
    return achievements.reduce((total, achievement) => {
      return total + (achievement.unlocked ? (achievement.level || 0) * 100 : 0)
    }, 0)
  }

  const getLevel = () => {
    const points = getTotalPoints()
    if (points < 500) return 1
    if (points < 1000) return 2
    if (points < 2000) return 3
    if (points < 3500) return 4
    return 5
  }

  const getLevelProgress = () => {
    const points = getTotalPoints()
    const level = getLevel()

    const levelThresholds = [0, 500, 1000, 2000, 3500, 5000]
    const currentLevelPoints = points - levelThresholds[level - 1]
    const pointsToNextLevel = levelThresholds[level] - levelThresholds[level - 1]

    return Math.floor((currentLevelPoints / pointsToNextLevel) * 100)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">Track your progress and earn rewards</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Your Health Journey</CardTitle>
          <CardDescription>Level up by maintaining healthy habits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Trophy className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Level {getLevel()}</p>
                    <p className="text-sm text-muted-foreground">Health Enthusiast</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{getTotalPoints()} points</p>
                    <p className="text-sm text-muted-foreground">
                      {5000 - getTotalPoints()} points to Level {getLevel() + 1}
                    </p>
                  </div>
                </div>
                <Progress value={getLevelProgress()} className="mt-2 h-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm font-medium">Achievements</p>
                <p className="text-2xl font-bold">
                  {achievements.filter((a) => a.unlocked).length}/{achievements.length}
                </p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm font-medium">Active Streaks</p>
                <p className="text-2xl font-bold">
                  {streaks.filter((s) => s.active).length}/{streaks.length}
                </p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm font-medium">Best Streak</p>
                <p className="text-2xl font-bold">{Math.max(...streaks.map((s) => s.best))} days</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-sm font-medium">Rewards</p>
                <p className="text-2xl font-bold">{achievements.filter((a) => a.unlocked).length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full p-1 text-white ${getIconBgColor(achievement.category)}`}>
                        {achievement.icon}
                      </div>
                      <CardTitle className="text-base">{achievement.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className={getCategoryColor(achievement.category)}>
                      {achievement.category}
                    </Badge>
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-sm font-medium">{achievement.progress}%</div>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />

                    {achievement.unlocked ? (
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500">
                          <Award className="h-4 w-4" />
                        </div>
                        <span className="text-sm">Unlocked on {achievement.date}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{100 - achievement.progress}% remaining to unlock</span>
                      </div>
                    )}

                    {achievement.level !== undefined && achievement.maxLevel && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Level</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: achievement.maxLevel }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-2 rounded-full ${
                                i < (achievement.level || 0) ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedAchievement(achievement)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {streaks.map((streak) => (
              <Card key={streak.id} className={streak.active ? "border-green-500" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{streak.title}</CardTitle>
                    {streak.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary">
                      <div className="text-center">
                        <p className="text-3xl font-bold">{streak.current}</p>
                        <p className="text-xs text-muted-foreground">days</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">Best streak: {streak.best} days</p>
                      <p className="mt-1 text-xs">
                        {streak.active ? (
                          <span className="text-green-500">Active - Updated {streak.lastUpdated}</span>
                        ) : (
                          <span className="text-red-500">Broken - Last active {streak.lastUpdated}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievement Detail Dialog */}
      {selectedAchievement && (
        <Dialog>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAchievement.title}</DialogTitle>
              <DialogDescription>{selectedAchievement.description}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full p-4 text-white ${getIconBgColor(selectedAchievement.category)}`}
              >
                {selectedAchievement.icon}
              </div>

              <div className="w-full space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant={selectedAchievement.unlocked ? "default" : "outline"}>
                      {selectedAchievement.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>

                  {selectedAchievement.date && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Unlocked On</span>
                      <span className="text-sm">{selectedAchievement.date}</span>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Category</span>
                    <Badge variant="outline" className={getCategoryColor(selectedAchievement.category)}>
                      {selectedAchievement.category}
                    </Badge>
                  </div>

                  {selectedAchievement.level !== undefined && selectedAchievement.maxLevel && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Level</span>
                      <span className="text-sm">
                        {selectedAchievement.level} / {selectedAchievement.maxLevel}
                      </span>
                    </div>
                  )}

                  {selectedAchievement.reward && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Reward</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-sm">
                              {selectedAchievement.reward}
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Unlock special features and insights</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{selectedAchievement.progress}%</span>
                  </div>
                  <Progress value={selectedAchievement.progress} className="h-2" />
                </div>

                {!selectedAchievement.unlocked && (
                  <div className="rounded-md border bg-muted/50 p-4">
                    <h4 className="mb-2 text-sm font-medium">How to unlock:</h4>
                    <p className="text-sm text-muted-foreground">{selectedAchievement.description}</p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

