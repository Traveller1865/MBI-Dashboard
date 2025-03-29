import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import AiInsightsPanel from "@/components/ai-insights-panel"

export const metadata: Metadata = {
  title: "AI Insights | Mynd Bodi Institute",
  description: "AI-powered health insights and recommendations",
}

export default function AiInsightsPage() {
  return (
    <DashboardLayout>
      <AiInsightsPanel />
    </DashboardLayout>
  )
}

