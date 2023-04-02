export interface locationInterface {
  _id: string
  name: string
  address: string
  description: string
  url: string
  images: string[]
  reviews: {
    username: string
    rating: number
    text: string
  }[]
  time: {
    open_time: string
    close_time: string
  }
  available_days: string[]
  price: number
  avg_rating: number
}
