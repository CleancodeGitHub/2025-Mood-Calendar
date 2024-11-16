'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { weekDays, moods, defaultColor } from "@/lib/constants"
import { getDaysInMonth } from "@/lib/utils/date"
import { MoodData } from "@/lib/types"

interface MonthCardProps {
  month: string
  monthIndex: number
  year: number
  calendar: MoodData
  onDayClick: (date: string) => void
}

export function MonthCard({ month, monthIndex, year, calendar, onDayClick }: MonthCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="p-3">
        <CardTitle className="text-lg font-medium">{month}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day[0]}
            </div>
          ))}
          {getDaysInMonth(year, monthIndex).map((date, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-8 h-8 p-0 transition-all ${date ? 'hover:scale-110' : ''}`}
                    style={{
                      visibility: date ? 'visible' : 'hidden',
                      backgroundColor: date
                        ? calendar[date.toISOString().split('T')[0]]
                          ? moods[calendar[date.toISOString().split('T')[0]]!].color
                          : defaultColor
                        : 'transparent'
                    }}
                    onClick={() => date && onDayClick(date.toISOString().split('T')[0])}
                  >
                    <span className="text-xs">
                      {date && date.getDate()}
                    </span>
                  </Button>
                </TooltipTrigger>
                {date && (
                  <TooltipContent>
                    {calendar[date.toISOString().split('T')[0]] !== undefined
                      ? moods[calendar[date.toISOString().split('T')[0]]!].label
                      : 'No mood set'}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}