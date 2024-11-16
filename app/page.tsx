'use client'

import React, { useState, useEffect } from 'react'
import { PieChart, Shuffle, RefreshCw, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MoodSelector } from '@/components/MoodSelector'
import { MonthCard } from '@/components/MonthCard'
import { StatsCard } from '@/components/StatsCard'
import { months } from '@/lib/constants'
import { getAllDays } from '@/lib/utils/date'
import { Mood, MoodData } from '@/lib/types'

export default function Home() {
  const currentYear = new Date().getFullYear()
  const [activeMood, setActiveMood] = useState<Mood | null>(null)
  const [calendar, setCalendar] = useState<MoodData>({})
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    const storedCalendar = localStorage.getItem(`moodCalendar${currentYear}`)
    if (storedCalendar) {
      setCalendar(JSON.parse(storedCalendar))
    }
  }, [currentYear])

  useEffect(() => {
    localStorage.setItem(`moodCalendar${currentYear}`, JSON.stringify(calendar))
  }, [calendar, currentYear])

  const handleMoodSelect = (mood: Mood) => {
    setActiveMood(activeMood === mood ? null : mood)
  }

  const handleDayClick = (date: string) => {
    if (activeMood !== null) {
      setCalendar(prev => ({ ...prev, [date]: activeMood }))
    }
  }

  const randomizeMoods = () => {
    const newCalendar: MoodData = {}
    getAllDays(currentYear).forEach(date => {
      newCalendar[date.toISOString().split('T')[0]] = Math.floor(Math.random() * 5) as Mood
    })
    setCalendar(newCalendar)
  }

  const clearMoods = () => {
    setCalendar({})
    setActiveMood(null)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(calendar, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mood-calendar-${currentYear}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">2025 Mood Calendar</CardTitle>
              <CardDescription className="text-lg">Track your daily emotions throughout the year</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowStats(!showStats)}>
                    <PieChart className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Statistics</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          {showStats && <StatsCard calendar={calendar} year={currentYear} />}
          <MoodSelector activeMood={activeMood} onMoodSelect={handleMoodSelect} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {months.map((month, monthIndex) => (
              <MonthCard
                key={month}
                month={month}
                monthIndex={monthIndex}
                year={currentYear}
                calendar={calendar}
                onDayClick={handleDayClick}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={randomizeMoods}>
            <Shuffle className="h-4 w-4 mr-2" />
            Randomize
          </Button>
          <Button variant="outline" size="sm" onClick={clearMoods}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
