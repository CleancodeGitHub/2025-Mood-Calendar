'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { moods } from "@/lib/constants"
import { Mood } from "@/lib/types"

interface MoodSelectorProps {
  activeMood: Mood | null
  onMoodSelect: (mood: Mood) => void
}

export function MoodSelector({ activeMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {moods.map((mood, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeMood === index ? "default" : "outline"}
                size="lg"
                onClick={() => onMoodSelect(index as Mood)}
                className="relative"
                style={{ 
                  backgroundColor: activeMood === index ? mood.color : undefined,
                  borderColor: mood.color,
                  color: activeMood === index ? 'white' : mood.color 
                }}
              >
                <mood.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{mood.label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}