"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell, X, Info, AlertTriangle, CheckCircle, Droplets, BedDouble, Activity } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "alert" | "insight" | "reminder" | "achievement"
  priority: "high" | "medium" | "low"
  title: string
  message: string
  actionText?: string
  actionUrl?: string
  icon?: React.ReactNode
  timestamp: Date
  read: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      priority: "high",
      title: "Low Hydration Alert",
      message: "Your hydration is 30% below your daily goal. Drink water to improve your readiness score.",
      actionText: "Log Water",
      actionUrl: "#",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "2",
      type: "insight",
      priority: "medium",
      title: "Sleep Pattern Insight",
      message: "Your deep sleep has decreased by 15% this week. Try going to bed 30 minutes earlier tonight.",
      actionText: "Sleep Tips",
      actionUrl: "#",
      icon: <BedDouble className="h-5 w-5 text-indigo-500" />,
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: false,
    },
    {
      id: "3",
      type: "achievement",
      priority: "low",
      title: "Activity Streak!",
      message: "You've hit your activity goal 5 days in a row! Keep it up for a new personal best.",
      actionText: "View Achievements",
      actionUrl: "#",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
    },
    {
      id: "4",
      type: "reminder",
      priority: "medium",
      title: "Journal Reminder",
      message: "You haven't logged your mood today. Taking a moment to reflect can help track your mental wellbeing.",
      actionText: "Log Now",
      actionUrl: "#",
      icon: <Info className="h-5 w-5 text-purple-500" />,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      read: true,
    },
  ])

  const [activeAlert, setActiveAlert] = useState<Notification | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  // Simulate receiving a new notification
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification: Notification = {
        id: "5",
        type: "insight",
        priority: "medium",
        title: "Recovery Opportunity",
        message: "Your HRV is trending down. Consider a light workout today instead of high intensity training.",
        actionText: "Adjust Workout",
        actionUrl: "#",
        icon: <Activity className="h-5 w-5 text-orange-500" />,
        timestamp: new Date(),
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev])
      setActiveAlert(newNotification)
      setShowAlert(true)

      // Auto-hide the alert after 5 seconds
      //const hideTimer = setTimeout(() => {
        //setShowAlert(false)
      //}, 5000)

      return () => clearTimeout(hideTimer)
    }, 10000) // Show new notification after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getIconForType = (type: string, customIcon?: React.ReactNode) => {
    if (customIcon) return customIcon

    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "insight":
        return <Info className="h-5 w-5 text-blue-500" />
      case "achievement":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  return (
    <>
      {/* Floating Alert for New Notifications */}
      {showAlert && activeAlert && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-right">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIconForType(activeAlert.type, activeAlert.icon)}
                  <CardTitle className="text-base">{activeAlert.title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAlert(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{activeAlert.message}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center justify-between">
                <span className="text-xs text-muted-foreground">{formatTimestamp(activeAlert.timestamp)}</span>
                {activeAlert.actionText && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={activeAlert.actionUrl || "#"}>{activeAlert.actionText}</a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Notification Center */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                variant="destructive"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Notifications</SheetTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
            <SheetDescription>Stay updated with personalized health insights and alerts</SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            <div className="mt-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="mb-2 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "transition-colors",
                      !notification.read && "border-l-4 border-l-blue-500 bg-muted/50",
                    )}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getIconForType(notification.type, notification.icon)}
                          <CardTitle className="text-base">{notification.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className={cn("text-xs", getPriorityColor(notification.priority))}>
                            {notification.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                              Mark as read
                            </Button>
                          )}
                          {notification.actionText && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={notification.actionUrl || "#"}>{notification.actionText}</a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}

