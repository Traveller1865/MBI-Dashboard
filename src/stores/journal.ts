import { create } from 'zustand'
import type { JournalEntry } from '@/types/journal'

interface JournalState {
  entries: JournalEntry[]
  addEntry: (e: JournalEntry) => void
  updateEntry: (e: JournalEntry) => void
  removeEntry: (id: string) => void
}

const initialEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2025-03-28',
    time: '08:15 AM',
    type: 'morning',
    mood: 'happy',
    energy: 'medium',
    symptoms: [],
    notes: "Woke up feeling refreshed after a good night's sleep. Looking forward to completing my goals today.",
    goalProgress: { completed: true },
  },
  {
    id: '2',
    date: '2025-03-27',
    time: '09:30 PM',
    type: 'evening',
    mood: 'neutral',
    energy: 'low',
    symptoms: ['headache', 'stress'],
    notes: 'Had a stressful day at work, which left me with a headache in the afternoon. Skipped the gym, but took a short walk in the evening which helped a bit.',
    goalProgress: { completed: false, notes: 'Felt too busy to exercise' },
  },
  {
    id: '3',
    date: '2025-03-27',
    time: '07:45 AM',
    type: 'morning',
    mood: 'neutral',
    energy: 'medium',
    symptoms: [],
    notes: 'Slept okay but woke up once during the night. Feeling a bit tired but ready for the day.',
    goalProgress: { completed: true },
  },
  {
    id: '4',
    date: '2025-03-26',
    time: '10:00 PM',
    type: 'evening',
    mood: 'happy',
    energy: 'medium',
    symptoms: [],
    notes: 'Had a productive day. Completed all my goals and had a good workout session. Feeling accomplished.',
    goalProgress: { completed: true },
  },
  {
    id: '5',
    date: '2025-03-26',
    time: '08:00 AM',
    type: 'morning',
    mood: 'very-happy',
    energy: 'high',
    symptoms: [],
    notes: 'Woke up energized after 8 hours of sleep. Ready to tackle the day!',
    goalProgress: { completed: true },
  },
]

export const useJournalStore = create<JournalState>((set) => ({
  entries: initialEntries,
  addEntry: (e) => set((state) => ({ entries: [...state.entries, e] })),
  updateEntry: (e) =>
    set((state) => ({
      entries: state.entries.map((item) => (item.id === e.id ? e : item)),
    })),
  removeEntry: (id) => set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
}))

// TODO: persist store to localStorage
// TODO: hook up Supabase backend