"use client"

import type React from "react"

import { useState } from "react"
import { Settings, Save, Sliders, Heart, BedDouble, Droplets, Dumbbell, Brain, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

interface MetricPreference {
  id: string
  name: string
  enabled: boolean
  priority: number
  icon: React.ReactNode
  category: string
}

export function InsightsPreferences() {
  const [preferences, setPreferences] = useState<MetricPreference[]>([
    {
      id: "sleep",
      name: "Sleep",
      enabled: true,
      priority: 1,
      icon: <BedDouble className="h-5 w-5 text-blue-500" />,
      category: "recovery",
    },
    {
      id: "heart",
      name: "Heart Health",
      enabled: true,
      priority: 2,
      icon: <Heart className="h-5 w-5 text-red-500" />,
      category: "vitals",
    },
    {
      id: "activity",
      name: "Activity",
      enabled: true,
      priority: 3,
      icon: <Dumbbell className="h-5 w-5 text-green-500" />,
      category: "fitness",
    },
    {
      id: "hydration",
      name: "Hydration",
      enabled: true,
      priority: 4,
      icon: <Droplets className="h-5 w-5 text-cyan-500" />,
      category: "nutrition",
    },
    {
      id: "stress",
      name: "Stress & Recovery",
      enabled: true,
      priority: 5,
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      category: "recovery",
    },
    {
      id: "nutrition",
      name: "Nutrition",
      enabled: false,
      priority: 6,
      icon: <Apple className="h-5 w-5 text-amber-500" />,
      category: "nutrition",
    },
  ])

  const [insightFrequency, setInsightFrequency] = useState("daily")
  const [alertThreshold, setAlertThreshold] = useState("medium")
  const [showWeeklyReport, setShowWeeklyReport] = useState(true)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(preferences)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update priorities based on new order
    const updatedItems = items.map((item, index) => ({
      ...item,
      priority: index + 1,
    }))

    setPreferences(updatedItems)
  }

  const toggleMetric = (id: string) => {
    setPreferences((prev) => prev.map((pref) => (pref.id === id ? { ...pref, enabled: !pref.enabled } : pref)))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Customize Insights
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Insights Preferences</DialogTitle>
          <DialogDescription>
            Customize which health metrics you want to prioritize and how you receive insights.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="mb-3 flex items-center gap-2 font-medium">
            <Sliders className="h-4 w-4" />
            Metric Priorities
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Drag and drop to reorder metrics based on your priorities. Toggle to enable or disable.
          </p>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="metrics">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {preferences
                    .sort((a, b) => a.priority - b.priority)
                    .map((pref, index) => (
                      <Draggable key={pref.id} draggableId={pref.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="rounded-md border bg-card p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                  {pref.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{pref.name}</p>
                                  <p className="text-xs text-muted-foreground">Priority: {pref.priority}</p>
                                </div>
                              </div>
                              <Switch checked={pref.enabled} onCheckedChange={() => toggleMetric(pref.id)} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insight-frequency">Insight Frequency</Label>
                <Select value={insightFrequency} onValueChange={setInsightFrequency}>
                  <SelectTrigger id="insight-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-threshold">Alert Threshold</Label>
                <Select value={alertThreshold} onValueChange={setAlertThreshold}>
                  <SelectTrigger id="alert-threshold">
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority Only</SelectItem>
                    <SelectItem value="medium">Medium & High</SelectItem>
                    <SelectItem value="all">All Alerts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-report">Weekly Health Report</Label>
                <p className="text-sm text-muted-foreground">Receive a comprehensive weekly summary</p>
              </div>
              <Switch id="weekly-report" checked={showWeeklyReport} onCheckedChange={setShowWeeklyReport} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

