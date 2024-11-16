export function getAllDays(year: number): Date[] {
  const firstDay = new Date(year, 0, 1)
  const lastDay = new Date(year, 11, 31)
  const days = []
  let currentDay = firstDay
  while (currentDay <= lastDay) {
    days.push(new Date(currentDay))
    currentDay.setDate(currentDay.getDate() + 1)
  }
  return days
}

export function getDaysInMonth(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days: (Date | null)[] = []

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null)
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  return days
}