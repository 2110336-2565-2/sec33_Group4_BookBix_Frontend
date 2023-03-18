export enum UserType {
  PROVIDER = 'provider',
  CUSTOMER = 'customer',
}
export interface AuthDataInterface {
  _id?: string | undefined
  username?: string | undefined
  email?: string | undefined
  password?: string | undefined
  confirmPassword?: string | undefined
  role?: string | undefined
}
