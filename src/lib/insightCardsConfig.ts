import {
    Heart,
    BedDouble,
    Footprints,
    Droplets,
    AlertTriangle,
    MessageSquare,
    Send,
    Zap,
    Award,
    LucideIcon,
  } from "lucide-react"

export const insightCardsConfig : Array<{
  type: "risk" | "trend" | "suggestion" | "achievement" | "anomaly";
  title: string;
  prompt: string;
  icon: LucideIcon;
  iconColor: string;
  confidence?: number;
}> = [
    {
      type: "risk",
      title: "Stress Impact",
      prompt: "What is the stress impact? Tell me in 3 sentences.",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      confidence: 80,
    },
    {
      type: "suggestion",
      title: "Earlier Bedtime",
      prompt: "Why should I go to bed earlier? Tell me in 3 sentences",
      icon: BedDouble,
      iconColor: "text-blue-500",
    },
    {
      type: "trend",
      title: "Hydration Trend",
      prompt: "What is my hydration trend? Tell me in 3 sentences",
      icon: Droplets,
      iconColor: "text-cyan-500",
    },
    {
      type: "achievement",
      title: "Step Goal Streak",
      prompt: "What is my step goal streak? Tell me in 3 sentences",
      icon: Footprints,
      iconColor: "text-green-500",
    },
    {
      type: "risk",
      title: "Vitamin D Alert",
      prompt: "What is my vitamin D alert? Tell me in 3 sentences",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      confidence: 95,
  },
    {
      type: "trend",
      title: "Heart Rate Improving",
      prompt: "What is my heart rate trend? Tell me in 3 sentences",
      icon: Heart,
      iconColor: "text-green-500",
    },
    {
      type: "suggestion",
      title: "Increase Protein Intake",
      prompt: "Why should I increase my protein intake? Tell me in 3 sentences",
      icon: Zap,
      iconColor: "text-purple-500",
    },
    {
      type: "achievement",
      title: "Meditation Consistency",
      prompt: "What is my meditation consistency? Tell me in 3 sentences",
      icon: Award,
      iconColor: "text-amber-500",
    },
  ]
