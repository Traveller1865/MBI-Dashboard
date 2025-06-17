"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import RecordUploadDialog from "./records-upload-dialog"
import MedicalFileManager from "./medical-file-manager"

// Sample data for trend charts
const vitaminDData = [
  { date: "Jul 2024", value: 20 },
  { date: "Oct 2024", value: 22 },
  { date: "Jan 2025", value: 25 },
]

const cholesterolData = [
  { date: "Jul 2024", value: 145 },
  { date: "Oct 2024", value: 138 },
  { date: "Jan 2025", value: 130 },
]

interface LabTest {
  name: string
  value: string
  unit: string
  range: string
  status: "normal" | "low" | "high" | "borderline"
  date: string
}

interface LabPanel {
  name: string
  date: string
  tests: LabTest[]
}

export default function LabResultsModule() {
  const [openPanels, setOpenPanels] = useState<string[]>(["lipid-panel", "nutrition"])
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

  const labPanels: LabPanel[] = [
    {
      name: "Lipid Panel",
      date: "January 15, 2025",
      tests: [
        {
          name: "LDL Cholesterol",
          value: "130",
          unit: "mg/dL",
          range: "< 100",
          status: "borderline",
          date: "January 15, 2025",
        },
        {
          name: "HDL Cholesterol",
          value: "50",
          unit: "mg/dL",
          range: "> 40",
          status: "normal",
          date: "January 15, 2025",
        },
        {
          name: "Triglycerides",
          value: "120",
          unit: "mg/dL",
          range: "< 150",
          status: "normal",
          date: "January 15, 2025",
        },
        {
          name: "Total Cholesterol",
          value: "195",
          unit: "mg/dL",
          range: "< 200",
          status: "normal",
          date: "January 15, 2025",
        },
      ],
    },
    {
      name: "Blood Chemistry",
      date: "January 15, 2025",
      tests: [
        {
          name: "Glucose (Fasting)",
          value: "110",
          unit: "mg/dL",
          range: "70-99",
          status: "high",
          date: "January 15, 2025",
        },
        {
          name: "HbA1c",
          value: "5.8",
          unit: "%",
          range: "4.0-5.6",
          status: "borderline",
          date: "January 15, 2025",
        },
        {
          name: "Creatinine",
          value: "0.9",
          unit: "mg/dL",
          range: "0.6-1.2",
          status: "normal",
          date: "January 15, 2025",
        },
      ],
    },
    {
      name: "Complete Blood Count",
      date: "January 15, 2025",
      tests: [
        {
          name: "WBC Count",
          value: "7.2",
          unit: "x10^3/µL",
          range: "4.0-11.0",
          status: "normal",
          date: "January 15, 2025",
        },
        {
          name: "RBC Count",
          value: "4.8",
          unit: "x10^6/µL",
          range: "4.2-5.8",
          status: "normal",
          date: "January 15, 2025",
        },
        {
          name: "Hemoglobin",
          value: "14.2",
          unit: "g/dL",
          range: "12.0-16.0",
          status: "normal",
          date: "January 15, 2025",
        },
      ],
    },
    {
      name: "Nutrition",
      date: "January 15, 2025",
      tests: [
        {
          name: "Vitamin D",
          value: "25",
          unit: "ng/mL",
          range: "30-100",
          status: "low",
          date: "January 15, 2025",
        },
        {
          name: "Vitamin B12",
          value: "450",
          unit: "pg/mL",
          range: "200-900",
          status: "normal",
          date: "January 15, 2025",
        },
        {
          name: "Ferritin",
          value: "70",
          unit: "ng/mL",
          range: "20-250",
          status: "normal",
          date: "January 15, 2025",
        },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-500"
      case "low":
        return "bg-red-500"
      case "high":
        return "bg-red-500"
      case "borderline":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal"
      case "low":
        return "Low"
      case "high":
        return "High"
      case "borderline":
        return "Borderline"
      default:
        return "Unknown"
    }
  }

  const togglePanel = (panelName: string) => {
    if (openPanels.includes(panelName)) {
      setOpenPanels(openPanels.filter((p) => p !== panelName))
    } else {
      setOpenPanels([...openPanels, panelName])
    }
  }

  const handleAskAI = (test: LabTest) => {
    setSelectedTest(test)
    setChatOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">View and track your lab results over time</p>
        </div>
        <RecordUploadDialog />
      </div>

      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          <AlertTriangle className="mr-2 inline-block h-4 w-4 text-amber-500" />
          Note: This is for informational purposes. Always consult a healthcare professional about your lab results.
        </p>
      </div>

      <Tabs defaultValue="latest">
        <TabsList>
          <TabsTrigger value="latest">Latest Results</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="files">File Manager</TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
              <CardDescription>Latest lab results from January 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {labPanels.map((panel, index) => (
                  <div key={index} className="rounded-md border">
                    <div
                      className="flex cursor-pointer items-center justify-between p-4"
                      onClick={() => togglePanel(panel.name.toLowerCase().replace(/\s+/g, "-"))}
                    >
                      <div>
                        <h3 className="font-medium">{panel.name}</h3>
                        <p className="text-sm text-muted-foreground">{panel.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {panel.tests.some((test) => test.status === "low" || test.status === "high") && (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        {panel.tests.some((test) => test.status === "borderline") &&
                          !panel.tests.some((test) => test.status === "low" || test.status === "high") && (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          )}
                        {openPanels.includes(panel.name.toLowerCase().replace(/\s+/g, "-")) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>

                    {openPanels.includes(panel.name.toLowerCase().replace(/\s+/g, "-")) && (
                      <div className="border-t px-4 py-2">
                        <div className="space-y-2">
                          {panel.tests.map((test, testIndex) => (
                            <div
                              key={testIndex}
                              className="flex items-center justify-between border-b py-2 last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${getStatusColor(test.status)}`}></span>
                                <span className="text-sm font-medium">{test.name}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span
                                    className={`text-sm font-medium ${test.status !== "normal" ? "text-red-500" : ""}`}
                                  >
                                    {test.value} {test.unit}
                                  </span>
                                  <div className="text-xs text-muted-foreground">
                                    Range: {test.range} {test.unit}
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <TrendingUp className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>{test.name} Trend</DialogTitle>
                                        <DialogDescription>Historical values over time</DialogDescription>
                                      </DialogHeader>
                                      <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <LineChart
                                            data={test.name === "Vitamin D" ? vitaminDData : cholesterolData}
                                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                                          >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line
                                              type="monotone"
                                              dataKey="value"
                                              stroke="#8884d8"
                                              name={`${test.name} (${test.unit})`}
                                            />
                                          </LineChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleAskAI(test)}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lab History</CardTitle>
              <CardDescription>View your lab results history</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="jan-2025">
                  <AccordionTrigger>January 15, 2025</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {labPanels.map((panel, index) => (
                        <div key={index} className="rounded-md border p-4">
                          <h3 className="font-medium">{panel.name}</h3>
                          <div className="mt-2 space-y-2">
                            {panel.tests.map((test, testIndex) => (
                              <div
                                key={testIndex}
                                className="flex items-center justify-between border-b py-2 last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`h-2 w-2 rounded-full ${getStatusColor(test.status)}`}></span>
                                  <span className="text-sm">{test.name}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-medium">
                                    {test.value} {test.unit}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="oct-2024">
                  <AccordionTrigger>October 10, 2024</AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Lipid Panel</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between border-b py-2">
                          <span className="text-sm">LDL Cholesterol</span>
                          <span className="text-sm font-medium">138 mg/dL</span>
                        </div>
                        <div className="flex items-center justify-between border-b py-2">
                          <span className="text-sm">HDL Cholesterol</span>
                          <span className="text-sm font-medium">48 mg/dL</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-md border p-4">
                      <h3 className="font-medium">Nutrition</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between border-b py-2">
                          <span className="text-sm">Vitamin D</span>
                          <span className="text-sm font-medium">22 ng/mL</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm">Vitamin B12</span>
                          <span className="text-sm font-medium">430 pg/mL</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="jul-2024">
                  <AccordionTrigger>July 5, 2024</AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium">Lipid Panel</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between border-b py-2">
                          <span className="text-sm">LDL Cholesterol</span>
                          <span className="text-sm font-medium">145 mg/dL</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm">HDL Cholesterol</span>
                          <span className="text-sm font-medium">45 mg/dL</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-md border p-4">
                      <h3 className="font-medium">Nutrition</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm">Vitamin D</span>
                          <span className="text-sm font-medium">20 ng/mL</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lab Trends</CardTitle>
              <CardDescription>Track changes in your key lab values over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <h3 className="mb-2 font-medium">Vitamin D Trend</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vitaminDData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="Vitamin D (ng/mL)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current</p>
                      <p className="text-lg font-bold text-red-500">25 ng/mL</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Target</p>
                      <p className="text-lg font-bold">≥ 30 ng/mL</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Trend</p>
                      <p className="text-sm text-green-500">+25% in 6 months</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="mb-2 font-medium">LDL Cholesterol Trend</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cholesterolData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 200]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" name="LDL (mg/dL)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current</p>
                      <p className="text-lg font-bold text-yellow-500">130 mg/dL</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Target</p>
                      <p className="text-lg font-bold">&lt; 100 mg/dL</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Trend</p>
                      <p className="text-sm text-green-500">-10% in 6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="files" className="mt-4">
          <MedicalFileManager />
        </TabsContent>
      </Tabs>

      {selectedTest && (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>AI Explanation: {selectedTest.name}</DialogTitle>
              <DialogDescription>Information about your lab result</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedTest.name}</span>
                  <span className={`text-sm font-medium ${selectedTest.status !== "normal" ? "text-red-500" : ""}`}>
                    {selectedTest.value} {selectedTest.unit}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Range: {selectedTest.range} {selectedTest.unit} | Status: {getStatusText(selectedTest.status)}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  {selectedTest.name === "Vitamin D" ? (
                    <>
                      I see your Vitamin D is 25 ng/mL, which is below the normal range (30-100 ng/mL). Vitamin D is
                      important for:
                      <ul className="ml-5 mt-2 list-disc space-y-1">
                        <li>Bone health and calcium absorption</li>
                        <li>Immune system function</li>
                        <li>Mood regulation</li>
                      </ul>
                      <p className="mt-2">
                        Low levels can contribute to fatigue, bone pain, muscle weakness, and increased risk of
                        infections.
                      </p>
                    </>
                  ) : selectedTest.name === "LDL Cholesterol" ? (
                    <>
                      Your LDL Cholesterol is 130 mg/dL, which is borderline high (target is &lt;100 mg/dL). LDL is
                      often called "bad cholesterol" because it can build up in your artery walls and increase your risk
                      of heart disease.
                      <p className="mt-2">
                        Your level shows improvement from previous tests (down from 145 mg/dL), which is positive
                        progress!
                      </p>
                    </>
                  ) : selectedTest.name === "Glucose (Fasting)" ? (
                    <>
                      Your fasting glucose is 110 mg/dL, which is above the normal range (70-99 mg/dL). This could
                      indicate prediabetes if it's consistently high.
                      <p className="mt-2">
                        Elevated blood sugar can be influenced by diet, stress, and physical activity. It might help to
                        watch sugar intake and consider a follow-up test.
                      </p>
                    </>
                  ) : (
                    `Information about your ${selectedTest.name} test result and what it means for your health.`
                  )}
                </p>

                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">Recommendations:</p>
                  <ul className="ml-5 mt-1 list-disc text-sm">
                    {selectedTest.name === "Vitamin D" ? (
                      <>
                        <li>Consider a Vitamin D supplement (typically 1000-2000 IU daily)</li>
                        <li>Increase sun exposure (15-30 minutes several times a week)</li>
                        <li>Add Vitamin D rich foods to your diet (fatty fish, egg yolks, fortified foods)</li>
                        <li>Discuss with your healthcare provider at your next visit</li>
                      </>
                    ) : selectedTest.name === "LDL Cholesterol" ? (
                      <>
                        <li>Continue your current lifestyle improvements</li>
                        <li>Focus on heart-healthy foods (fruits, vegetables, whole grains)</li>
                        <li>Limit saturated fats and processed foods</li>
                        <li>Maintain regular physical activity</li>
                      </>
                    ) : selectedTest.name === "Glucose (Fasting)" ? (
                      <>
                        <li>Reduce intake of refined carbohydrates and sugars</li>
                        <li>Increase physical activity</li>
                        <li>Consider scheduling a follow-up test in 3 months</li>
                        <li>Discuss with your healthcare provider if levels remain elevated</li>
                      </>
                    ) : (
                      <li>Consult with your healthcare provider about these results</li>
                    )}
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground">
                  <Info className="mr-1 inline h-3 w-3" />
                  This information is educational and not a substitute for professional medical advice.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

