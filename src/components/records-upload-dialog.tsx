"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface BloodTestData {
  ldl?: number
  hdl?: number
  vitaminD?: number
  [key: string]: number | undefined
}

interface RecordUploadDialogProps {
  onRecord?: (data: BloodTestData, fileName: string) => void
}

export default function RecordUploadDialog({ onRecord }: RecordUploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<BloodTestData | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = evt => {
      try {
        const text = String(evt.target?.result)
        const parsed = parseBloodTestFile(text)
        setData(parsed)
        if (onRecord) {
          onRecord(parsed, file.name)
        }
      } catch (error) {
        console.error("Failed to process file", error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Blood Test Record</DialogTitle>
          <DialogDescription>Select a JSON or CSV file of your results.</DialogDescription>
        </DialogHeader>
        <Input type="file" accept=".json,.csv" onChange={handleFileChange} />
        {data && (
          <pre className="mt-4 rounded bg-muted p-2 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </DialogContent>
    </Dialog>
  )
}

function parseBloodTestFile(text: string): BloodTestData {
  try {
    const json = JSON.parse(text)
    return mapToInternal(json)
  } catch {
    return parseCsv(text)
  }
}

function parseCsv(text: string): BloodTestData {
  const result: BloodTestData = {}
  text.split(/\r?\n/).forEach(line => {
    const [name, value] = line.split(/,/) // simple csv
    if (!name || !value) return
    const key = standardizeKey(name)
    const mapped = fieldMap[key]
    if (mapped) result[mapped] = parseFloat(value)
  })
  return result
}

function mapToInternal(obj: Record<string, unknown>): BloodTestData {
  const result: BloodTestData = {}
  for (const key in obj) {
    const mapped = fieldMap[standardizeKey(key)]
    if (mapped) {
      const value = obj[key]
      if (typeof value === "string" || typeof value === "number") {
        result[mapped] = parseFloat(value as string)
      }
    }
  }
  return result
}

const fieldMap: Record<string, keyof BloodTestData> = {
  ldlcholesterol: "ldl",
  hdlcholesterol: "hdl",
  vitamind: "vitaminD",
}

function standardizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z]/g, "")
}