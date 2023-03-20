import { AuthDataInterface, RespondInterface } from '../interfaces/authentication.interface'

const URL = import.meta.env.VITE_API_URL

export async function registerRequest(authData: AuthDataInterface): Promise<RespondInterface> {
  const respondValidatePassword = validatePassword(authData)
  if (!respondValidatePassword.ok) return { ok: false, message: respondValidatePassword.message }
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
        userType: authData.userType,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      return { ok: false, message: data.message }
    }
    localStorage.setItem('user', JSON.stringify(authData.username))
    return { ok: true, message: 'Success Register' }
  } catch (error) {
    return { ok: false, message: "Couldn't register user" }
  }
}

function validatePassword(authData: AuthDataInterface): RespondInterface {
  if (!authData.email || !authData.username || !authData.password || !authData.confirmPassword || !authData.userType)
    return { ok: false, message: 'Please fill in all fields' }

  if (authData.password.length < 8) {
    return { ok: false, message: 'Your password must be at least 8 characters' }
  }
  if (authData.password.search(/[a-z]/i) < 0) {
    return { ok: false, message: 'Your password must contain at least one letter.' }
  }
  if (authData.password.search(/[0-9]/) < 0) {
    return { ok: false, message: 'Your password must contain at least one digit.' }
  }
  if (authData.password !== authData.confirmPassword)
    return { ok: false, message: 'Password and Confirm Password must be the same' }
  return { ok: true, message: '' }
}

export async function loginRequest(authData: AuthDataInterface): Promise<RespondInterface> {
  if (!authData.email || !authData.password) return { ok: false, message: 'Please fill in all fields' }

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
          return { ok: false, message: 'Invalid email or password' }
        default:
          return { ok: false, message: data.message }
      }
    }
    const newAuthData = { _id: data.user._id, role: data.user.role, username: data.user.username }
    localStorage.setItem('user', JSON.stringify(authData.username))
    return { ok: true, message: JSON.stringify(newAuthData) }
  } catch (error) {
    return { ok: false, message: 'Something went wrong, please try again later' }
  }
}
