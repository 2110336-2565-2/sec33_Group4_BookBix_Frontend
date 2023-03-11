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

export interface BookingInterface {
  id: string
  locationName: string
  locationId: string
  price: number
  period: {
    start: string // 00:00/2021-01-01
    end: string // 00:00/2021-01-01
  }
  status: string
}