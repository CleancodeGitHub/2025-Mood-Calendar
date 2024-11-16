export type Mood = 0 | 1 | 2 | 3 | 4

export interface MoodData {
  [key: string]: Mood | null
}

export interface MoodConfig {
  icon: any
  label: string
  color: string
}