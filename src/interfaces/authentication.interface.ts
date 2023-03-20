export enum UserEnum {
  PROVIDER = 'provider',
  CUSTOMER = 'customer',
}
export interface AuthDataInterface {
  _id?: string | undefined
  username?: string | undefined
  email?: string | undefined
  password?: string | undefined
  confirmPassword?: string | undefined
  userType?: string | undefined
}

export interface RespondInterface {
  ok: boolean
  message: string
}
export interface AccessTokenInterface {
  id: string
  username: string
  type: UserEnum
  iat: number
  exp: number
}
