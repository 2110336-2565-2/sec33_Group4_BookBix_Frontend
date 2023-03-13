
/**
 * Pad a number to 2 digits with leading zeros
 * 
 * @param num - The number to pad
 * @returns The padded string
 * 
 */
export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}


/**
 * Format a date as a string in the format "YYYY-MM-DD"
 * @param date the date to format
 * @returns the formatted date as a string
 */
export function formatDate(date: Date | null) {
  return date
    ? [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-')
    : ''
}

/**
 * Format a date as a string in the format "hh:mm:ss"
 * @param date the date to format
 * @returns the formatted time as a string
 */
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