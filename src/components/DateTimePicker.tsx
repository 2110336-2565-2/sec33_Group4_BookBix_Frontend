import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerInterface } from '../interfaces/booking.interfaces'
import { formatDate, formatTime } from '../utils/Time.utils'

const DateTimePicker: React.FC<DatePickerInterface> = ({
  disableTime = [[]],
  disableDates = [],
  minTime,
  maxTime,
  selectedDate,
  setSelectedDate = () => {},
}) => {
  // get current Hours
  const [minHours, minMinutes] = minTime?.split(':') || [0, 0]
  const [maxHours, maxMinutes] = maxTime?.split(':') || [23, 59]

  if(!disableTime){
    disableTime = [[]]
  }

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
      className="w-75"
      selected={selectedDate}
      onChange={(date: Date) => setSelectedDate(date)}
      filterDate={isAvailiabledDate}
      filterTime={isAvailiableTime}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      dateFormat="dd-MM-yyyy HH:mm"
      minDate={new Date()}
      minTime={new Date(0, 0, 0, +minHours, +minMinutes)}
      maxTime={new Date(0, 0, 0, +maxHours, +maxMinutes)}
      isClearable
    />
  )
}

export default DateTimePicker
