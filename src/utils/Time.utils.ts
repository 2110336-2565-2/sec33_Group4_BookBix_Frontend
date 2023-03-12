// ✅ Format using reusable function
export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

// format as "YYYY-MM-DD"
export function formatDate(date: Date | null) {
  return date
    ? [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-')
    : ''
}
// format as "hh:mm:ss"
export function formatTime(date: Date | null) {
  return date
    ? [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
    : ''
}

/**
   * Return format: [0-7]
   * @param available_days - array of available days
   * @returns array of unavailable days
   */
export const getDisableDate = (available_days: string[]) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const disableDate = []
  for (let i = 0; i < days.length; i++) {
    if (!available_days.includes(days[i])) {
      disableDate.push(i)
    }
  }
  return disableDate
}