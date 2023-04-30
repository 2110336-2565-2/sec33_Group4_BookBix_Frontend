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
  return date ? [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') : ''
}

/**
 * Format a date as a string in the format "hh:mm"
 * @param date the date to format
 * @returns the formatted time as a string
 */
export function formatTime(date: Date | null) {
  return date ? [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':') : ''
}

/**
 * Return format: [0-7]
 * @param available_days - array of available days
 * @returns array of unavailable days
 */
export const getDisableDate = (available_days: string[] | undefined): number[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const disableDate = []
  if(available_days)
    for (let i = 0; i < days.length; i++) {
      if (!available_days.includes(days[i])) {
        disableDate.push(i)
      }
    }
  return disableDate
}

/**
 * Format a booking period as a string in the format "HH:mm,yyyy-MM-DD"
 * @param start the start date of the booking
 * @param end the end date of the booking
 * @param separator the separator character to use between time and date (default '/')
 * @returns an object with the start time and end time as string arrays
 */
export function formatBookingPeriod(start: string | null, end: string | null, separator = '/') {
  var startTime = start?.split(separator)
  var endTime = end?.split(separator)
  return { startTime, endTime }
}

/**
 * Calculate the number of days between two dates
 * @param start the start date of the booking in format of [HH:mm, yyyy-mm-DD]
 * @param end the end date of the booking in format of [HH:mm, yyyy-mm-DD]
 * @returns the number of hours between the two dates
 */
export function calculateDays(start: string[] | null, end: string[] | null) {
  var startTime = start![0]
  var endTime = end![0]
  var startDate = start![1]?.split('-')
  var endDate = end![1]?.split('-')
  var startDateTime = new Date(parseInt(startDate![0]), parseInt(startDate![1])-1, parseInt(startDate![2]), parseInt(startTime!.split(':')[0]), parseInt(startTime!.split(':')[1]))
  var endDateTime = new Date(parseInt(endDate![0]), parseInt(endDate![1])-1, parseInt(endDate![2]), parseInt(endTime!.split(':')[0]), parseInt(endTime!.split(':')[1]))
  var milliseconds = endDateTime.getTime() - startDateTime.getTime()
  var seconds = milliseconds / 1000
  var minutes = seconds / 60
  var hours = minutes / 60
  return hours
}

