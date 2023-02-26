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
