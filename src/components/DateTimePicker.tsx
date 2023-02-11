import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  disableTime?: string[][]
  disableDates?: number[]
  minTime?: string
  maxTime?: string
}

// ✅ Format using reusable function
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

// format as "YYYY-MM-DD"
function formatDate(date: Date | null) {
  return date
    ? [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-')
    : ''
}
// format as "hh:mm:ss"
function formatTime(date: Date | null) {
  return date
    ? [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
    : ''
}

const DateTimePicker: React.FC<Props> = ({
  disableTime = [[]],
  disableDates = [],
  minTime,
  maxTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [minHours, minMinutes] = minTime?.split(':') || [0, 0]
  const [maxHours, maxMinutes] = maxTime?.split(':') || [23, 59]

  // Check if the date is available such as weekend or holiday
  const isAvailiabledDate = (date: Date) => {
    // format disableDates -> index of the day
    const day = date.getDay()
    for (var disableDate of disableDates) {
      if (disableDate === day) {
        return false
      }
    }
    return true
  }
  console.log(formatDate(selectedDate))
  console.log(formatTime(selectedDate))
  // Check if the time is available such as booked time
  const isAvailiableTime = (date: Date) => {
    for (var booking of disableTime) {
      //format time -> HH:mm AM/PM AM, date -> yyyy-MM-dd
      const start_time: string = booking[0]
      const end_time: string = booking[1]
      const booked_date: string = booking[2]
      if (
        booked_date == formatDate(date) &&
        start_time <= formatTime(date) &&
        formatTime(date) <= end_time
      ) {
        return false
      }
    }
    return true
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => setSelectedDate(date)}
      filterDate={isAvailiabledDate}
      filterTime={isAvailiableTime}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      dateFormat="dd-MM-yyyy HH:mm"
      minTime={new Date(0, 0, 0, +minHours, +minMinutes)}
      maxTime={new Date(0, 0, 0, +maxHours, +maxMinutes)}
      isClearable
    />
  )
}

export default DateTimePicker
