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
