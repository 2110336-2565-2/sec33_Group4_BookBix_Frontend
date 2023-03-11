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

// HH:mm,yyyy-MM-DD format [HH:mm,yyyy-MM-DD]
export function formatBookingPeriod(
  start: string | null,
  end: string | null,
  separator = '/',
) {
  var startTime = start?.split(separator)
  var endTime = end?.split(separator)
  return {startTime, endTime} 
}

// Calculate num of days between start and end [yyyy-MM-DD,yyyy-MM-DD]
export function calculateDays(
  start: string | null,
  end: string | null,
) {
  var startTime = start?.split('-')
  var endTime = end?.split('-')
  var startDay = new Date( parseInt(startTime![0]), parseInt(startTime![1]), parseInt(startTime![2]))
  var endDay = new Date(parseInt(endTime![0]), parseInt(endTime![1]), parseInt(endTime![2]))
  var days = (endDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)
  return days
}