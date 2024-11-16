import { Smile, Meh, Frown, Angry } from 'lucide-react'
import { MoodConfig } from './types'

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export const moods: MoodConfig[] = [
  { icon: Smile, label: 'Great', color: '#2d6b5f' },
  { icon: Smile, label: 'Good', color: '#72e3a6' },
  { icon: Meh, label: 'Okay', color: '#dff4c7' },
  { icon: Frown, label: 'Bad', color: '#edbf98' },
  { icon: Angry, label: 'Awful', color: '#ea3d36' }
]

export const defaultColor = '#e2e8f0'