import { parseISO, format } from 'date-fns'
import type { Energy, Mood } from '@/types/journal'
import { Battery, BatteryFull, BatteryLow, BatteryMedium, Frown, Meh, Smile } from 'lucide-react'
import type { JSX } from 'react'

export const formatDate = (dateString: string): string => {
  // TODO: i18n for date format
  return format(parseISO(dateString), 'EEEE, MMMM d')
}

export const getMoodEmoji = (mood: Mood): JSX.Element => {
  switch (mood) {
    case 'very-happy':
      return <Smile className="h-5 w-5 text-green-500" />
    case 'happy':
      return <Smile className="h-5 w-5 text-green-400" />
    case 'neutral':
      return <Meh className="h-5 w-5 text-amber-400" />
    case 'sad':
      return <Frown className="h-5 w-5 text-red-400" />
    case 'very-sad':
      return <Frown className="h-5 w-5 text-red-500" />
    default:
      return <Meh className="h-5 w-5" />
  }
}

export const getEnergyIcon = (energy: Energy): JSX.Element => {
  switch (energy) {
    case 'high':
      return <BatteryFull className="h-5 w-5 text-green-500" />
    case 'medium':
      return <BatteryMedium className="h-5 w-5 text-amber-400" />
    case 'low':
      return <BatteryLow className="h-5 w-5 text-red-400" />
    case 'very-low':
      return <Battery className="h-5 w-5 text-red-500" />
    default:
      return <BatteryMedium className="h-5 w-5" />
  }
}