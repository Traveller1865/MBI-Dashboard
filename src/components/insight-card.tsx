import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import { askGeminiWithContext } from "@/lib/gemini-service"

interface InsightCardProps {
  type: "risk" | "trend" | "suggestion" | "achievement" | "anomaly"
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  confidence?: number
}

export default function InsightCard({ type, title, description, icon: Icon, iconColor, confidence }: InsightCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1 ${iconColor} bg-opacity-20`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          {confidence && <div className="text-xs text-muted-foreground">Confidence: {confidence}%</div>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-1">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Details
          </Button>
          <Button variant="ghost" size="sm">
            Ask AI
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

