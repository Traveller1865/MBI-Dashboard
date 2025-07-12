'use client'

import { useEffect, useState } from 'react'
import { JournalEntry } from '@/types/journal'
import { Loader2 } from 'lucide-react'

export function AIInsight({ entry }: { entry: JournalEntry }) {
  const [insight, setInsight] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/gemini/insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entry }),
        })
        const data = await res.json()
        setInsight(data.insight || 'No insight generated.')
      } catch (e) {
        setInsight('AI service failed to generate insight.')
      } finally {
        setLoading(false)
      }
    }

    fetchInsight()
  }, [entry.id]) // only refetch when entry changes

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">AI Insights:</span>
      <div className="rounded-md border bg-muted/50 p-3">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="animate-spin h-4 w-4" /> Generating insight...
          </div>
        ) : (
          <p className="text-sm">{insight}</p>
        )}
      </div>
    </div>
  )
}
