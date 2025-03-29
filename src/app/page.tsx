import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import HomeOverview from "@/components/home-overview"

export const metadata: Metadata = {
  title: "Mynd Bodi Institute | Wellness Dashboard",
  description: "Your comprehensive health dashboard with personalized insights",
}

export default function Home() {
  return (
    <DashboardLayout>
      <HomeOverview />
    </DashboardLayout>
  )
}

