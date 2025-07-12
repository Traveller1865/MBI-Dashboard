'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, CheckCircle2, XCircle } from 'lucide-react'
import type { JournalEntry } from '@/types/journal'
import { getMoodEmoji, getEnergyIcon, formatDate } from '@/utils/journal'

interface Props {
  entry: JournalEntry
  onClick?: (entry: JournalEntry) => void
  variant?: 'compact' | 'full'
}

export const JournalEntryCard = ({ entry, onClick, variant = 'full' }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">
                {entry.type === 'morning' && 'Morning Check-in'}
                {entry.type === 'evening' && 'Evening Reflection'}
                {entry.type === 'custom' && 'Journal Entry'}
              </CardTitle>
              <CardDescription>
                {variant === 'full' ? `${formatDate(entry.date)} • ${entry.time}` : entry.time}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getMoodEmoji(entry.mood)}
            {getEnergyIcon(entry.energy)}
          </div>
        </div>
      </CardHeader>
      <CardContent className={variant === 'compact' ? 'pb-2' : ''}>
        <p className={variant === 'compact' ? 'line-clamp-2 text-sm text-muted-foreground' : 'text-sm text-muted-foreground'}>
          {entry.notes}
        </p>
        {variant === 'full' && entry.symptoms.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {entry.symptoms.map((symptom, index) => (
              <span key={index} className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                {symptom}
              </span>
            ))}
          </div>
        )}
        {variant === 'full' && entry.goalProgress && (
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
        <Button variant="outline" size="sm" className="w-full" onClick={() => onClick?.(entry)}>
          View Full Entry
        </Button>
      </CardFooter>
    </Card>
  )
}