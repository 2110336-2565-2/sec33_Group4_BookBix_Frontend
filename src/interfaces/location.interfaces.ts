import { ReviewInterface } from "./booking.interfaces"
import { TimeInterface } from './time.interfaces'

export interface LocationInterface {
  _id?: string
  name: string
  address?: string
  description?: string
  url?: string
  images?: string[]
  reviews?: ReviewInterface[]
  available_days?: string[]
  price?: number
  avg_rating?: number
  time: TimeInterface
}

export interface GetLocationsByProviderRespondInterface {
  ok: boolean
  message: LocationInterface[]
}

export interface DeleteLocationRespondInterface {
  ok: boolean
  message: string
}

export interface CreateLocationRespondInterface {
  ok: boolean
  message: string
}
