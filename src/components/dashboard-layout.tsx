"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { NotificationSystem } from "@/components/notification-system"
import { Home, BarChart3, FileText, Settings, Menu, Target, Sparkles, Award } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  label?: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Wellness Tracking",
      href: "/wellness-tracking",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "AI Insights",
      href: "/ai-insights",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "Medical Records",
      href: "/medical-records",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Goals",
      href: "/goals",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Journal",
      href: "/journal",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Achievements",
      href: "/achievements",
      icon: <Award className="h-5 w-5" />,
      label: "New",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile header */}
      {isMobile && (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/images/mbi-logo.svg"
                    alt="Mynd Bodi Institute"
                    width={100}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <ScrollArea className="flex-1">
                <nav className="flex flex-col gap-2 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      )}
                    >
                      {item.icon}
                      {item.title}
                      {item.label && (
                        <span className="ml-auto rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/mbi-logo.svg"
              alt="Mynd Bodi Institute"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <NotificationSystem />
          </div>
        </header>
      )}

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        {!isMobile && (
          <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background md:flex">
            <div className="flex h-auto items-center justify-center border-b py-4">
              <Link href="/" className="flex items-center justify-center py-2">
                <Image
                  src="/images/mbi-logo.svg"
                  alt="Mynd Bodi Institute"
                  width={120}
                  height={30}
                  className="h-30 w-auto py-2"
                />
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <nav className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.icon}
                    {item.title}
                    {item.label && (
                      <span className="ml-auto rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                        {item.label}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </aside>
        )}

        <main className="flex flex-1 flex-col md:pl-64">
          {/* Desktop header */}
          {!isMobile && (
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
              <div className="ml-auto flex items-center gap-4">
                <NotificationSystem />
              </div>
            </header>
          )}
          <div className="flex-1 space-y-4 p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

