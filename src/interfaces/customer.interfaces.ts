export interface CustomerInterface {
  _id: string
  firstname?: string
  lastname?: string
  sex?: string
  birthdate?: string
  username?: string
  password?: string
  email?: string
  date_created?: Date
  device_history?: string[]
}

export interface NotificationInterface {
  subscription: boolean
}