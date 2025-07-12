'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
  date: string
  value: number
}

export const MoodTrendChart = ({ data }: { data: DataPoint[] }) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip
            formatter={(value) => {
              const moodMap: { [key: number]: string } = {
                1: 'Very Sad',
                2: 'Sad',
                3: 'Neutral',
                4: 'Happy',
                5: 'Very Happy',
              }
              return [moodMap[value as number], 'Mood']
            }}
          />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name="Mood" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}