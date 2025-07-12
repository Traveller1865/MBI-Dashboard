'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { JournalEntry } from '@/types/journal'
import { getEnergyIcon, getMoodEmoji, formatDate } from '@/utils/journal'
import { AIInsight } from './AIInsight'

interface Props {
  entry: JournalEntry
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EntryDetailDialog = ({ entry, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {entry.type === 'morning' && 'Morning Check-in'}
            {entry.type === 'evening' && 'Evening Reflection'}
            {entry.type === 'custom' && 'Journal Entry'}
          </DialogTitle>
          <DialogDescription>
            {formatDate(entry.date)} • {entry.time}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Mood:</span>
              <div className="flex items-center gap-1">
                {getMoodEmoji(entry.mood)}
                <span className="text-sm capitalize">{entry.mood.replace('-', ' ')}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Energy:</span>
              <div className="flex items-center gap-1">
                {getEnergyIcon(entry.energy)}
                <span className="text-sm capitalize">{entry.energy.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          {entry.symptoms.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Symptoms:</span>
              <div className="flex flex-wrap gap-1">
                {entry.symptoms.map((symptom, index) => (
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
              <p className="text-sm">{entry.notes}</p>
            </div>
          </div>

          {entry.goalProgress && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Goal Progress:</span>
              <div className="rounded-md border p-3">
                <div className="flex items-center gap-2">
                  {entry.goalProgress.completed ? (
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
                {entry.goalProgress.notes && (
                  <p className="mt-2 text-sm text-muted-foreground">{entry.goalProgress.notes}</p>
                )}                
              </div>              
            </div>
          )}
          <AIInsight entry={entry} />
        </div>
        <DialogFooter>
          <Button variant="outline">Edit Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}