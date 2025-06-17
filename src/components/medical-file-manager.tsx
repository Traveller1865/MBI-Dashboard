"use client"

import { useState, useEffect } from "react"
import RecordUploadDialog from "@/components/records-upload-dialog"
import { Button } from "@/components/ui/button"

interface StoredFile {
  id: string
  name: string
  date: string
  data: unknown
}

export default function MedicalFileManager() {
  const [files, setFiles] = useState<StoredFile[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("medicalFiles")
    if (stored) {
      try {
        setFiles(JSON.parse(stored))
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  const addFile = (data: unknown, name: string) => {
    const newFile: StoredFile = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString(),
      data,
    }
    const updated = [...files, newFile]
    setFiles(updated)
    localStorage.setItem("medicalFiles", JSON.stringify(updated))
  }

  const removeFile = (id: string) => {
    const updated = files.filter(f => f.id !== id)
    setFiles(updated)
    localStorage.setItem("medicalFiles", JSON.stringify(updated))
  }

  return (
    <div className="space-y-4">
      <RecordUploadDialog onRecord={addFile} />
      <div className="rounded-md border">
        {files.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">No files uploaded</p>
        ) : (
          <ul>
            {files.map(file => (
              <li
                key={file.id}
                className="flex items-center justify-between border-b p-3 last:border-0"
              >
                <span className="text-sm font-medium">{file.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{file.date}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFile(file.id)}
                  >
                    ✕
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}