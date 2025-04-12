import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { AchievementsPanel } from "@/components/achievements-panel"

export const metadata: Metadata = {
  title: "Mynd Bodi Institute | Achievements",
  description: "Track your progress and earn rewards for healthy habits",
}

export default function AchievementsPage() {
  return (
    <DashboardLayout>
      <AchievementsPanel />
    </DashboardLayout>
  )
}

