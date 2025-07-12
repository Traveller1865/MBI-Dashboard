'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Battery, BatteryFull, BatteryLow, BatteryMedium, Frown, Meh, Plus, Smile } from 'lucide-react'
import { useJournalStore } from '@/stores/journal'
import { format } from 'date-fns'
import { type JournalEntry } from '@/types/journal'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewEntryDialog = ({ open, onOpenChange }: Props) => {
  const addEntry = useJournalStore((s) => s.addEntry)
  const [entryType, setEntryType] = useState<'morning' | 'evening' | 'custom'>('evening')
  const [mood, setMood] = useState<'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad'>('happy')
  const [energy, setEnergy] = useState<'high' | 'medium' | 'low' | 'very-low'>('medium')
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'hh:mm a'),
      type: entryType,
      mood,
      energy,
      symptoms: [],
      notes,
    }
    addEntry(newEntry)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <Select value={entryType} onValueChange={(v) => setEntryType(v as any)}>
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
                {format(new Date(), 'PPpp')}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>How are you feeling?</Label>
            <RadioGroup value={mood} onValueChange={(v) => setMood(v as any)} className="flex justify-between">
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="very-happy" id="very-happy" className="sr-only" />
                <Label htmlFor="very-happy" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <Smile className="h-6 w-6 text-green-500" />
                </Label>
                <span className="text-xs">Great</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="happy" id="happy" className="sr-only" />
                <Label htmlFor="happy" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Smile className="h-6 w-6" />
                </Label>
                <span className="text-xs">Good</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
                <Label htmlFor="neutral" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <Meh className="h-6 w-6 text-amber-400" />
                </Label>
                <span className="text-xs">Okay</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="sad" id="sad" className="sr-only" />
                <Label htmlFor="sad" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <Frown className="h-6 w-6 text-red-400" />
                </Label>
                <span className="text-xs">Bad</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="very-sad" id="very-sad" className="sr-only" />
                <Label htmlFor="very-sad" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <Frown className="h-6 w-6 text-red-500" />
                </Label>
                <span className="text-xs">Awful</span>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Energy Level</Label>
            <RadioGroup value={energy} onValueChange={(v) => setEnergy(v as any)} className="flex justify-between">
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="high" id="high" className="sr-only" />
                <Label htmlFor="high" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <BatteryFull className="h-6 w-6 text-green-500" />
                </Label>
                <span className="text-xs">High</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="medium" id="medium" className="sr-only" />
                <Label htmlFor="medium" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <BatteryMedium className="h-6 w-6" />
                </Label>
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="low" id="low" className="sr-only" />
                <Label htmlFor="low" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <BatteryLow className="h-6 w-6 text-amber-400" />
                </Label>
                <span className="text-xs">Low</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="very-low" id="very-low" className="sr-only" />
                <Label htmlFor="very-low" className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full bg-muted hover:bg-muted/80">
                  <Battery className="h-6 w-6 text-red-500" />
                </Label>
                <span className="text-xs">Depleted</span>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[100px]" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}