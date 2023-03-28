import { ReviewInterface } from "./booking.interfaces"

export interface LocationInterface {
  _id: object
  name: string
  address?: string
  description?: string
  url?: string
  images?: string[]
  reviews?: ReviewInterface[]
  time?: {
    open_time: string
    close_time: string
  }
  available_days?: string[]
  price?: number
  avg_rating?: number
}