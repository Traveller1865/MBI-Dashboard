import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import JournalTracker from "@/components/journal-tracker"

export const metadata: Metadata = {
  title: "Journal | Mynd Bodi Institute",
  description: "Track your mood, symptoms, and daily reflections",
}

export default function JournalPage() {
  return (
    <DashboardLayout>
      <JournalTracker />
    </DashboardLayout>
  )
}

