"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User,
  Settings,
  Smartphone,
  Shield,
  Bell,
  Edit,
  Save,
  Trash2,
  Activity,
  Plus,
  Circle,
  RefreshCw,
  MoreHorizontal,
  Lightbulb,
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Target,
  BookOpen,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function UserProfile() {
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    height: "5'9\"",
    weight: "170 lbs",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
  })

  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: "1",
      name: "Apple Watch",
      type: "smartwatch",
      status: "connected",
      lastSync: "10 minutes ago",
    },
    {
      id: "2",
      name: "Oura Ring",
      type: "ring",
      status: "connected",
      lastSync: "25 minutes ago",
    },
    {
      id: "3",
      name: "Withings Scale",
      type: "scale",
      status: "connected",
      lastSync: "2 days ago",
    },
  ])

  const [healthGoals, setHealthGoals] = useState([
    "Improve cardiovascular fitness",
    "Reduce stress and anxiety",
    "Maintain healthy weight",
  ])

  const [baselineBiomarkers, setBaselineBiomarkers] = useState([
    { name: "LDL Cholesterol", value: "145 mg/dL", target: "<100 mg/dL", date: "Jul 5, 2024" },
    { name: "HDL Cholesterol", value: "45 mg/dL", target: ">40 mg/dL", date: "Jul 5, 2024" },
    { name: "Vitamin D", value: "20 ng/mL", target: "30-100 ng/mL", date: "Jul 5, 2024" },
    { name: "Resting Heart Rate", value: "75 bpm", target: "<70 bpm", date: "Jul 5, 2024" },
  ])

  const [onboardingProgress, setOnboardingProgress] = useState(80)

  const handleEditToggle = () => {
    setEditMode(!editMode)
  }

  const handleSaveProfile = () => {
    setEditMode(false)
    // In a real app, save changes to backend
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your profile, devices, and app settings</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Personal Profile</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={handleEditToggle}>
                  {editMode ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>Your personal information and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {editMode ? (
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                  ) : (
                    <div className="rounded-md border p-2">{userData.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {editMode ? (
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  ) : (
                    <div className="rounded-md border p-2">{userData.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {editMode ? (
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="rounded-md border p-2">{userData.phone}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  {editMode ? (
                    <Input
                      id="age"
                      type="number"
                      value={userData.age.toString()}
                      onChange={(e) => setUserData({ ...userData, age: Number.parseInt(e.target.value) })}
                    />
                  ) : (
                    <div className="rounded-md border p-2">{userData.age}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  {editMode ? (
                    <Select
                      defaultValue={userData.gender}
                      onValueChange={(value) => setUserData({ ...userData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Non-binary">Non-binary</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="rounded-md border p-2">{userData.gender}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  {editMode ? (
                    <Input
                      id="height"
                      value={userData.height}
                      onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                    />
                  ) : (
                    <div className="rounded-md border p-2">{userData.height}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  {editMode ? (
                    <Input
                      id="weight"
                      value={userData.weight}
                      onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    />
                  ) : (
                    <div className="rounded-md border p-2">{userData.weight}</div>
                  )}
                </div>
              </div>
            </CardContent>
            {editMode && (
              <CardFooter>
                <div className="flex w-full justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <CardTitle>Health Goals & Interests</CardTitle>
              </div>
              <CardDescription>Your primary health goals and focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Health Goals</Label>
                  <div className="space-y-2">
                    {healthGoals.map((goal, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-2">
                        <span>{goal}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Goal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <CardTitle>Baseline Biomarkers</CardTitle>
              </div>
              <CardDescription>Your baseline health metrics for tracking progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 border-b bg-muted p-2 text-sm font-medium">
                    <div>Biomarker</div>
                    <div>Baseline</div>
                    <div>Target</div>
                    <div>Date</div>
                  </div>
                  {baselineBiomarkers.map((biomarker, index) => (
                    <div key={index} className="grid grid-cols-4 border-b p-2 text-sm last:border-0">
                      <div>{biomarker.name}</div>
                      <div>{biomarker.value}</div>
                      <div>{biomarker.target}</div>
                      <div>{biomarker.date}</div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Update Baseline Metrics
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <CardTitle>Onboarding Progress</CardTitle>
              </div>
              <CardDescription>Complete your profile setup to get the most out of the app</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm">{onboardingProgress}%</span>
                  </div>
                  <Progress value={onboardingProgress} className="h-2" />
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="mb-2 font-medium">Remaining Steps:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Connect wearable device</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Set health goals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Complete baseline lab panel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Set up daily journal</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                <CardTitle>Connected Devices</CardTitle>
              </div>
              <CardDescription>Manage your connected wearables and health devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{device.name}</h3>
                        <p className="text-sm text-muted-foreground">Last sync: {device.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Connected</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">Connect New Device</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                <CardTitle>Data Sync Settings</CardTitle>
              </div>
              <CardDescription>Configure how and when your devices sync data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Sync</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync data from connected devices</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sync Frequency</Label>
                    <p className="text-sm text-muted-foreground">How often to check for new data</p>
                  </div>
                  <Select defaultValue="hourly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="manual">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Background Sync</Label>
                    <p className="text-sm text-muted-foreground">Sync data even when app is closed</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button variant="outline" className="w-full">
                  Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Notification Types</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      <Label htmlFor="insights" className="text-sm">
                        AI Insights
                      </Label>
                    </div>
                    <Switch id="insights" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <Label htmlFor="alerts" className="text-sm">
                        Health Alerts
                      </Label>
                    </div>
                    <Switch id="alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <Label htmlFor="goals" className="text-sm">
                        Goal Reminders
                      </Label>
                    </div>
                    <Switch id="goals" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <Label htmlFor="journal" className="text-sm">
                        Journal Reminders
                      </Label>
                    </div>
                    <Switch id="journal" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <Label htmlFor="labs" className="text-sm">
                        Lab Results
                      </Label>
                    </div>
                    <Switch id="labs" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time" className="text-sm">
                        Start Time
                      </Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger id="start-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time" className="text-sm">
                        End Time
                      </Label>
                      <Select defaultValue="07:00">
                        <SelectTrigger id="end-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>Control how your data is used and shared</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Sharing with AI</Label>
                    <p className="text-sm text-muted-foreground">Allow AI to analyze your health data for insights</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Anonymous Data Contribution</Label>
                    <p className="text-sm text-muted-foreground">Contribute anonymized data to improve the platform</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base">Data Access</Label>
                  <p className="text-sm text-muted-foreground">Control which data types are used by the app</p>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="wearable-data" className="text-sm">
                        Wearable Data
                      </Label>
                      <Switch id="wearable-data" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="lab-data" className="text-sm">
                        Lab Results
                      </Label>
                      <Switch id="lab-data" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="journal-data" className="text-sm">
                        Journal Entries
                      </Label>
                      <Switch id="journal-data" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="location-data" className="text-sm">
                        Location Data
                      </Label>
                      <Switch id="location-data" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <CardTitle>Data Export & Deletion</CardTitle>
              </div>
              <CardDescription>Export or delete your personal data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>

                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

