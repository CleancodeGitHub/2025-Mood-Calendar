'use client'

import { Card, CardContent } from "@/components/ui/card"
import { moods } from "@/lib/constants"
import { MoodData } from "@/lib/types"
import { getAllDays } from "@/lib/utils/date"

interface StatsCardProps {
  calendar: MoodData
  year: number
}

export function StatsCard({ calendar, year }: StatsCardProps) {
  const getMoodStats = () => {
    const stats = new Array(5).fill(0)
    Object.values(calendar).forEach(mood => {
      if (mood !== null) stats[mood]++
    })
    return stats
  }

  const getCompletionRate = () => {
    const totalDays = getAllDays(year).length
    const filledDays = Object.keys(calendar).length
    return Math.round((filledDays / totalDays) * 100)
  }

  return (
    <Card className="mb-6 bg-gray-50 dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Completion Rate</h3>
            <p className="text-2xl font-bold">{getCompletionRate()}%</p>
          </div>
          {moods.map((mood, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold" style={{ color: mood.color }}>{mood.label} Days</h3>
              <p className="text-2xl font-bold">{getMoodStats()[index]}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}