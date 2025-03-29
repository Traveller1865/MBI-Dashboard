import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import WellnessTrackingOverview from "@/components/wellness-tracking-overview"

export const metadata: Metadata = {
  title: "Mynd Bodi Institute | Wellness Tracking",
  description: "Comprehensive wellness tracking and health score analysis",
}

export default function WellnessTrackingPage() {
  return (
    <DashboardLayout>
      <WellnessTrackingOverview />
    </DashboardLayout>
  )
}

