import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import LabResultsModule from "@/components/lab-results-module"

export const metadata: Metadata = {
  title: "Medical Records | Mynd Bodi Institute",
  description: "View and track your lab results and medical records",
}

export default function MedicalRecordsPage() {
  return (
    <DashboardLayout>
      <LabResultsModule />
    </DashboardLayout>
  )
}

