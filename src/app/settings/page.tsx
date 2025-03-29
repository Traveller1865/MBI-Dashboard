import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import UserProfile from "@/components/user-profile"

export const metadata: Metadata = {
  title: "Settings | Mynd Bodi Institute",
  description: "Manage your profile, devices, and app settings",
}

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <UserProfile />
    </DashboardLayout>
  )
}

