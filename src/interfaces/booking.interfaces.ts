export interface ReviewInterface {
  title?: string
  username: string
  rating?: number
  text?: string
  dateCreated?: Date
}

export interface DatePickerInterface {
  disableTime?: string[][]
  disableDates?: number[]
  minTime?: string
  maxTime?: string
  selectedDate?: Date | null
  setSelectedDate?: (date: Date) => void
}
/**
 * BookingInterface - interface of each booking
 * start - start date of booking in format: 00:00/2021-01-01
 * end - end date of booking in format: 00:00/2021-01-01
 */
export interface BookingInterface {
  id: string
  provider_id: string
  locationName: string
  locationId: string
  price: number
  period: {
    start: string
    end: string
  }
  status: string
}

export enum StatusType {
  BUTTON_PENDING = 'pending',
  BUTTON_CANCEL = 'canceled',
  BUTTON_CONFIRMED = 'confirmed',
}
export enum ComponentType {
  PROGRESS_CIRCLE = 'progress-circle',
  ACTION_BUTTON = 'action-btn',
}
export interface StatusSelectorInterface {
  status: string
  component: string
  locationId: string
  providerId: string
  price: number
}
