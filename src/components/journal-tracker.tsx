"use client"

import { useState } from 'react'
import { useJournalStore } from '@/stores/journal'
import { NewEntryDialog } from '@/components/journal/NewEntryDialog'
import { EntryDetailDialog } from '@/components/journal/EntryDetailDialog'
import { JournalEntryCard } from '@/components/journal/JournalEntryCard'
import { MoodTrendChart } from '@/components/charts/MoodTrendChart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { formatDate } from '@/utils/journal'

export default function JournalPage() {
  const entries = useJournalStore((s) => s.entries)
  const [date, setDate] = useState<Date>(new Date())
  const [newEntryOpen, setNewEntryOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<typeof entries[0] | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const moodData = entries.map((e) => ({
    date: e.date.slice(5),
    value:
      e.mood === 'very-sad'
        ? 1
        : e.mood === 'sad'
          ? 2
          : e.mood === 'neutral'
            ? 3
            : e.mood === 'happy'
              ? 4
              : 5,
  }))

  return (
    <div className="flex flex-col gap-6 px-8 py-6 w-full max-w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journal</h1>
          <p className="text-muted-foreground">Track your mood, symptoms, and daily reflections</p>
        </div>
        <NewEntryDialog open={newEntryOpen} onOpenChange={setNewEntryOpen} />
      </div>

      <MoodTrendChart data={moodData} />

      <Tabs defaultValue="entries">
        <TabsList>
          <TabsTrigger value="entries">Journal Entries</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="mt-4">
          <div className="space-y-4">
            {entries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                onClick={(e) => {
                  setSelectedEntry(e)
                  setDetailOpen(true)
                }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            className="rounded-md border"
            modifiers={{ hasEntry: entries.map((e) => new Date(e.date)) }}
            modifiersClassNames={{ hasEntry: 'bg-primary/20 font-bold' }}
          />

          <div className="mt-6">
            <h3 className="mb-4 font-medium">Entries for {formatDate(date.toISOString().split('T')[0])}</h3>
            <div className="space-y-4">
              {entries
                .filter((e) => e.date === date.toISOString().split('T')[0])
                .map((entry) => (
                  <JournalEntryCard
                    key={entry.id}
                    entry={entry}
                    variant="compact"
                    onClick={(e) => {
                      setSelectedEntry(e)
                      setDetailOpen(true)
                    }}
                  />
                ))}
              {entries.filter((e) => e.date === date.toISOString().split('T')[0]).length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <AlertCircle className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-1 font-medium">No entries for this date</h3>
                  <p className="text-sm text-muted-foreground">Select a different date or create a new entry</p>
                  <Button className="mt-4" onClick={() => setNewEntryOpen(true)}>
                    New Entry
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {selectedEntry && (
        <EntryDetailDialog entry={selectedEntry} open={detailOpen} onOpenChange={setDetailOpen} />
      )}
    </div>
  )
}
