export interface ReviewInterface {
  title?: string
  username: string
  rating?: number
  text?: string
  dateCreate: Date
}

export interface DatePickerInterface {
  disableTime?: string[][]
  disableDates?: number[]
  minTime?: string
  maxTime?: string
  selectedDate?: Date | null
  setSelectedDate?: (date: Date) => void 
}
