export type Mood = "very-happy" | "happy" | "neutral" | "sad" | "very-sad"
export type Energy = "high" | "medium" | "low" | "very-low"

export interface GoalProgress {
  completed: boolean
  notes?: string
}

export interface JournalEntry {
  id: string
  date: string // YYYY-MM-DD
  time: string // HH:MM AM/PM
  type: "morning" | "evening" | "custom"
  mood: Mood
  energy: Energy
  symptoms: string[]
  notes: string
  goalProgress?: {
    completed: boolean
    notes?: string
  }
}