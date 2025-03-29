"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  BookOpen,
  Plus,
  Smile,
  Frown,
  Meh,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  CheckCircle2,
  XCircle,
  AlertCircle,
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface JournalEntry {
  id: string
  date: string
  time: string
  type: "morning" | "evening" | "custom"
  mood: "very-happy" | "happy" | "neutral" | "sad" | "very-sad"
  energy: "high" | "medium" | "low" | "very-low"
  symptoms: string[]
  notes: string
  goalProgress?: {
    completed: boolean
    notes?: string
  }
}

export default function JournalTracker() {
  const [date, setDate] = useState<Date>(new Date())
  const [newEntryOpen, setNewEntryOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [entryDetailOpen, setEntryDetailOpen] = useState(false)

  // Sample journal entries
  const journalEntries: JournalEntry[] = [
    {
      id: "1",
      date: "2025-03-28",
      time: "08:15 AM",
      type: "morning",
      mood: "happy",
      energy: "medium",
      symptoms: [],
      notes: "Woke up feeling refreshed after a good night's sleep. Looking forward to completing my goals today.",
      goalProgress: {
        completed: true,
      },
    },
    {
      id: "2",
      date: "2025-03-27",
      time: "09:30 PM",
      type: "evening",
      mood: "neutral",
      energy: "low",
      symptoms: ["headache", "stress"],
      notes:
        "Had a stressful day at work, which left me with a headache in the afternoon. Skipped the gym, but took a short walk in the evening which helped a bit.",
      goalProgress: {
        completed: false,
        notes: "Felt too busy to exercise",
      },
    },
    {
      id: "3",
      date: "2025-03-27",
      time: "07:45 AM",
      type: "morning",
      mood: "neutral",
      energy: "medium",
      symptoms: [],
      notes: "Slept okay but woke up once during the night. Feeling a bit tired but ready for the day.",
      goalProgress: {
        completed: true,
      },
    },
    {
      id: "4",
      date: "2025-03-26",
      time: "10:00 PM",
      type: "evening",
      mood: "happy",
      energy: "medium",
      symptoms: [],
      notes: "Had a productive day. Completed all my goals and had a good workout session. Feeling accomplished.",
      goalProgress: {
        completed: true,
      },
    },
    {
      id: "5",
      date: "2025-03-26",
      time: "08:00 AM",
      type: "morning",
      mood: "very-happy",
      energy: "high",
      symptoms: [],
      notes: "Woke up energized after 8 hours of sleep. Ready to tackle the day!",
      goalProgress: {
        completed: true,
      },
    },
  ]

  // Sample mood data for chart
  const moodData = [
    { date: "03/22", value: 2 },
    { date: "03/23", value: 3 },
    { date: "03/24", value: 4 },
    { date: "03/25", value: 4 },
    { date: "03/26", value: 5 },
    { date: "03/27", value: 3 },
    { date: "03/28", value: 4 },
  ]

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "very-happy":
        return <Smile className="h-5 w-5 text-green-500" />
      case "happy":
        return <Smile className="h-5 w-5 text-green-400" />
      case "neutral":
        return <Meh className="h-5 w-5 text-amber-400" />
      case "sad":
        return <Frown className="h-5 w-5 text-red-400" />
      case "very-sad":
        return <Frown className="h-5 w-5 text-red-500" />
      default:
        return <Meh className="h-5 w-5" />
    }
  }

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case "high":
        return <BatteryFull className="h-5 w-5 text-green-500" />
      case "medium":
        return <BatteryMedium className="h-5 w-5 text-amber-400" />
      case "low":
        return <BatteryLow className="h-5 w-5 text-red-400" />
      case "very-low":
        return <Battery className="h-5 w-5 text-red-500" />
      default:
        return <BatteryMedium className="h-5 w-5" />
    }
  }

  const handleEntryDetail = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setEntryDetailOpen(true)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journal</h1>
          <p className="text-muted-foreground">Track your mood, symptoms, and daily reflections</p>
        </div>
        <Dialog open={newEntryOpen} onOpenChange={setNewEntryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Journal Entry</DialogTitle>
              <DialogDescription>Record how you're feeling and any notable events</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Entry Type</Label>
                  <Select defaultValue="evening">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning Check-in</SelectItem>
                      <SelectItem value="evening">Evening Reflection</SelectItem>
                      <SelectItem value="custom">Custom Entry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Date & Time</Label>
                  <div className="flex h-10 items-center rounded-md border border-input bg-background pl-3 text-sm">
                    {new Date().toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>How are you feeling?</Label>
                <RadioGroup defaultValue="happy" className="flex justify-between">
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="very-happy" id="very-happy" className="sr-only" />
                    <Label
                      htmlFor="very-happy"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <Smile className="h-6 w-6 text-green-500" />
                    </Label>
                    <span className="text-xs">Great</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="happy" id="happy" className="sr-only" />
                    <Label
                      htmlFor="happy"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Smile className="h-6 w-6" />
                    </Label>
                    <span className="text-xs">Good</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
                    <Label
                      htmlFor="neutral"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <Meh className="h-6 w-6 text-amber-400" />
                    </Label>
                    <span className="text-xs">Okay</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="sad" id="sad" className="sr-only" />
                    <Label
                      htmlFor="sad"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <Frown className="h-6 w-6 text-red-400" />
                    </Label>
                    <span className="text-xs">Bad</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="very-sad" id="very-sad" className="sr-only" />
                    <Label
                      htmlFor="very-sad"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <Frown className="h-6 w-6 text-red-500" />
                    </Label>
                    <span className="text-xs">Awful</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Energy Level</Label>
                <RadioGroup defaultValue="medium" className="flex justify-between">
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="high" id="high" className="sr-only" />
                    <Label
                      htmlFor="high"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <BatteryFull className="h-6 w-6 text-green-500" />
                    </Label>
                    <span className="text-xs">High</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="medium" id="medium" className="sr-only" />
                    <Label
                      htmlFor="medium"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-primary text-primary-foreground"
                    >
                      <BatteryMedium className="h-6 w-6" />
                    </Label>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="low" id="low" className="sr-only" />
                    <Label
                      htmlFor="low"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <BatteryLow className="h-6 w-6 text-amber-400" />
                    </Label>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RadioGroupItem value="very-low" id="very-low" className="sr-only" />
                    <Label
                      htmlFor="very-low"
                      className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80"
                    >
                      <Battery className="h-6 w-6 text-red-500" />
                    </Label>
                    <span className="text-xs">Depleted</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Any symptoms or notable feelings?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="headache" />
                    <label
                      htmlFor="headache"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Headache
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="stress" />
                    <label
                      htmlFor="stress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Stress
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anxiety" />
                    <label
                      htmlFor="anxiety"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Anxiety
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="muscle-soreness" />
                    <label
                      htmlFor="muscle-soreness"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Muscle soreness
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Write about anything notable today... (e.g. mood triggers, diet, achievements)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Goal Progress</Label>
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Did you accomplish your goals today?</span>
                    </div>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="goal-yes" />
                        <Label htmlFor="goal-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="goal-no" />
                        <Label htmlFor="goal-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewEntryOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewEntryOpen(false)}>Save Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood Trend</CardTitle>
          <CardDescription>Your mood patterns over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip
                  formatter={(value) => {
                    const moodMap: { [key: number]: string } = {
                      1: "Very Sad",
                      2: "Sad",
                      3: "Neutral",
                      4: "Happy",
                      5: "Very Happy",
                    }
                    return [moodMap[value as number], "Mood"]
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#8884d8" name="Mood" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="entries">
        <TabsList>
          <TabsTrigger value="entries">Journal Entries</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="mt-4">
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {entry.type === "morning" && "Morning Check-in"}
                          {entry.type === "evening" && "Evening Reflection"}
                          {entry.type === "custom" && "Journal Entry"}
                        </CardTitle>
                        <CardDescription>
                          {formatDate(entry.date)} • {entry.time}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMoodEmoji(entry.mood)}
                      {getEnergyIcon(entry.energy)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{entry.notes}</p>

                  {entry.symptoms.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entry.symptoms.map((symptom, index) => (
                        <span key={index} className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.goalProgress && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Goals:</span>
                      {entry.goalProgress.completed ? (
                        <span className="flex items-center gap-1 text-xs text-green-500">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-red-500">
                          <XCircle className="h-3 w-3" />
                          Not completed
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleEntryDetail(entry)}>
                    View Full Entry
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal Calendar</CardTitle>
              <CardDescription>View your entries by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border"
                  modifiers={{
                    hasEntry: [new Date("2025-03-26"), new Date("2025-03-27"), new Date("2025-03-28")],
                  }}
                  modifiersClassNames={{
                    hasEntry: "bg-primary/20 font-bold",
                  }}
                />
              </div>

              <div className="mt-6">
                <h3 className="mb-4 font-medium">Entries for {formatDate(date.toISOString().split("T")[0])}</h3>
                <div className="space-y-4">
                  {journalEntries
                    .filter((entry) => entry.date === date.toISOString().split("T")[0])
                    .map((entry) => (
                      <Card key={entry.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-1">
                                <BookOpen className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-base">
                                  {entry.type === "morning" && "Morning Check-in"}
                                  {entry.type === "evening" && "Evening Reflection"}
                                  {entry.type === "custom" && "Journal Entry"}
                                </CardTitle>
                                <CardDescription>{entry.time}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getMoodEmoji(entry.mood)}
                              {getEnergyIcon(entry.energy)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{entry.notes}</p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleEntryDetail(entry)}
                          >
                            View Full Entry
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                  {journalEntries.filter((entry) => entry.date === date.toISOString().split("T")[0]).length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <AlertCircle className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="mb-1 font-medium">No entries for this date</h3>
                      <p className="text-sm text-muted-foreground">Select a different date or create a new entry</p>
                      <Button className="mt-4" onClick={() => setNewEntryOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Entry
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedEntry && (
        <Dialog open={entryDetailOpen} onOpenChange={setEntryDetailOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedEntry.type === "morning" && "Morning Check-in"}
                {selectedEntry.type === "evening" && "Evening Reflection"}
                {selectedEntry.type === "custom" && "Journal Entry"}
              </DialogTitle>
              <DialogDescription>
                {formatDate(selectedEntry.date)} • {selectedEntry.time}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Mood:</span>
                  <div className="flex items-center gap-1">
                    {getMoodEmoji(selectedEntry.mood)}
                    <span className="text-sm">
                      {selectedEntry.mood === "very-happy" && "Very Happy"}
                      {selectedEntry.mood === "happy" && "Happy"}
                      {selectedEntry.mood === "neutral" && "Neutral"}
                      {selectedEntry.mood === "sad" && "Sad"}
                      {selectedEntry.mood === "very-sad" && "Very Sad"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Energy:</span>
                  <div className="flex items-center gap-1">
                    {getEnergyIcon(selectedEntry.energy)}
                    <span className="text-sm">
                      {selectedEntry.energy === "high" && "High"}
                      {selectedEntry.energy === "medium" && "Medium"}
                      {selectedEntry.energy === "low" && "Low"}
                      {selectedEntry.energy === "very-low" && "Very Low"}
                    </span>
                  </div>
                </div>
              </div>

              {selectedEntry.symptoms.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Symptoms:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedEntry.symptoms.map((symptom, index) => (
                      <span key={index} className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-sm font-medium">Notes:</span>
                <div className="rounded-md border p-3">
                  <p className="text-sm">{selectedEntry.notes}</p>
                </div>
              </div>

              {selectedEntry.goalProgress && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Goal Progress:</span>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      {selectedEntry.goalProgress.completed ? (
                        <span className="flex items-center gap-1 text-sm text-green-500">
                          <CheckCircle2 className="h-4 w-4" />
                          Goals completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-red-500">
                          <XCircle className="h-4 w-4" />
                          Goals not completed
                        </span>
                      )}
                    </div>
                    {selectedEntry.goalProgress.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">{selectedEntry.goalProgress.notes}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-sm font-medium">AI Insights:</span>
                <div className="rounded-md border bg-muted/50 p-3">
                  <p className="text-sm">
                    {selectedEntry.mood === "happy" || selectedEntry.mood === "very-happy"
                      ? "Your positive mood correlates with good sleep quality from the previous night. Continue your current sleep routine to maintain this pattern."
                      : selectedEntry.symptoms.includes("headache")
                        ? "Headaches often correlate with stress in your patterns. Consider trying the breathing exercises in your meditation goal to help manage stress levels."
                        : selectedEntry.energy === "low" || selectedEntry.energy === "very-low"
                          ? "Your energy levels tend to be lower when your hydration goal isn't met. Try increasing water intake earlier in the day."
                          : "Your mood and energy patterns show consistency with your sleep and activity data. Keep maintaining your healthy routines."}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Edit Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

