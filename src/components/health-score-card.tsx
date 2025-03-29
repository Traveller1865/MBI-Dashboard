"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Gauge } from "lucide-react"

const data = [
  { name: "Health Score", value: 82 },
  { name: "Remaining", value: 18 },
]

const COLORS = ["#4f46e5", "#e5e7eb"]

export default function HealthScoreCard() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Overall Health Score</CardTitle>
        </div>
        <CardDescription>Aggregated from all health metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative h-[140px] w-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">82</span>
              <span className="text-xs text-muted-foreground">out of 100</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-md bg-muted p-2">
            <p className="text-xs font-medium">Last Week</p>
            <p className="text-sm font-bold">78</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-xs font-medium">Change</p>
            <p className="text-sm font-bold text-green-500">+4</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

