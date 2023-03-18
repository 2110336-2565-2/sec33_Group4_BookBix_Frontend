import { AuthDataInterface } from '../interfaces/authentication.interface'

const URL = import.meta.env.VITE_API_URL

export async function registerRequest(authData: AuthDataInterface): Promise<string | null> {
  if (!authData.username || !authData.confirmPassword || !authData.email || !authData.password || !authData._id)
    return 'Please fill in all fields'
  if (authData.password !== authData.confirmPassword) return 'Password and Confirm Password must be the same'

  try {
    const url = `${URL}/auth/register`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        username: authData.username,
        email: authData.email,
        password: authData.password,
        userType: authData.role,
      }),
    })
    const data = await response.json()
    if (!data.ok) {
      return data.message
    }
    localStorage.setItem('user', JSON.stringify(authData.username))
    return null
  } catch (error) {
    return "Couldn't register user"
  }
}

export async function loginRequest(
  authData: AuthDataInterface,
  setAuthData: React.Dispatch<React.SetStateAction<AuthDataInterface>>,
): Promise<string | null> {
  if (!authData.email || !authData.password) return 'Please fill in all fields'

  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: authData.email, password: authData.password }),
    })
    const data = await response.json()
    if (!response.ok) {
      switch (response.status) {
        case 403:
          return 'Invalid email or password'
        default:
          return data.message
      }
    }
    setAuthData({ ...authData, _id: data.user._id, role: data.user.role, username: data.user.username })
    localStorage.setItem('user', JSON.stringify(authData.username))
    return null
  } catch (error) {
    return 'Something went wrong, please try again later'
  }
}
