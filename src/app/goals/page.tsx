import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import GoalsTracker from "@/components/goals-tracker"

export const metadata: Metadata = {
  title: "Goals | Mynd Bodi Institute",
  description: "Set and track your health and wellness goals",
}

export default function GoalsPage() {
  return (
    <DashboardLayout>
      <GoalsTracker />
    </DashboardLayout>
  )
}

