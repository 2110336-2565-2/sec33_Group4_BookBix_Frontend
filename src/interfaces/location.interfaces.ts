import { ReviewInterface } from './reviews.interfaces'
import { TimeInterface } from './time.interfaces'

export interface locationInterface {
  _id?: string
  name: string
  address: string
  description: string
  url: string
  images: string[]
  reviews?: ReviewInterface[]
  time: TimeInterface
  available_days: string[]
  price: number
  avg_rating?: number
}

export interface GetLocationsByProviderRespondInterface {
  ok: boolean
  message: locationInterface[]
}

export interface DeleteLocationRespondInterface {
  ok: boolean
  message: string
}

export interface CreateLocationRespondInterface {
  ok: boolean
  message: string
}
