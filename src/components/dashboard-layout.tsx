"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Lightbulb, FileText, Target, BookOpen, Settings, Menu, Activity } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState("Sarah")

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/wellness-tracking",
      label: "Wellness Tracking",
      icon: Activity,
      active: pathname === "/wellness-tracking",
    },
    {
      href: "/ai-insights",
      label: "AI Insights",
      icon: Lightbulb,
      active: pathname === "/ai-insights",
    },
    {
      href: "/medical-records",
      label: "Medical Records",
      icon: FileText,
      active: pathname === "/medical-records",
    },
    {
      href: "/goals",
      label: "Goals",
      icon: Target,
      active: pathname === "/goals",
    },
    {
      href: "/journal",
      label: "Journal",
      icon: BookOpen,
      active: pathname === "/journal",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  // Close sheet when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const Sidebar = (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Mynd Bodi</span>
        </Link>
      </div>
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-56px)]">
          <div className="px-2 py-2">
            <nav className="grid gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      {isMobile ? (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static lg:h-[60px] lg:px-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              {Sidebar}
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl font-bold">Mynd Bodi</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Hello, {userName}</div>
              </div>
            </div>
          </div>
        </header>
      ) : null}
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-background md:block">{Sidebar}</aside>
        )}
        <main className={cn("flex-1", !isMobile && "md:pl-64")}>
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

