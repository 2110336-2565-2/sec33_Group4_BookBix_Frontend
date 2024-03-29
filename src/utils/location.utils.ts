import {
  GetLocationsByProviderRespondInterface,
  DeleteLocationRespondInterface,
  CreateLocationRespondInterface,
  LocationInterface,
} from '../interfaces/location.interfaces'

const URL = import.meta.env.VITE_API_URL

//API Request
export async function fetchProviderLocations(providerId: string): Promise<GetLocationsByProviderRespondInterface> {
  try {
    const url = `${URL}/providers/locations/${providerId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log('error', data)
      return { ok: false, message: [] }
    }
    return { ok: true, message: data }
  } catch (error) {
    console.log(error)
    return { ok: false, message: [] }
  }
}

export async function deleteLocation(locationId: string | undefined): Promise<DeleteLocationRespondInterface> {
  try {
    const url = `${URL}/locations/${locationId}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      return { ok: false, message: 'Error Delete' }
    }
    return { ok: true, message: data }
  } catch (error) {
    return { ok: false, message: 'Something went wrong please try again later' }
  }
}

export async function createLocation(
  location: LocationInterface,
  providerId: string,
): Promise<CreateLocationRespondInterface> {
  const validation = validateLocation(location)
  if (!validation.ok) return validation
  try {
    const url = `${URL}/locations/`
    const body = JSON.stringify({ providerId: providerId, ...location })
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: body,
    })
    const data = await response.json()
    if (!response.ok) {
      return { ok: false, message: 'Cannot Create Location' }
    }
    return { ok: true, message: data }
  } catch (error) {
    return { ok: false, message: 'Something went wrong please try again later' }
  }
}

//Function
function validateLocation(location: LocationInterface): CreateLocationRespondInterface {
  //Validate Time
  const open_time = location.time.open_time.split(':')
  const close_time = location.time.close_time.split(':')
  if (open_time[0] > close_time[0]) return { ok: false, message: 'incorrect format' }
  if (open_time[0] === close_time[0] && open_time[1] >= close_time[1]) return { ok: false, message: 'incorrect format' }
  //Validate Available Days
  if (location.available_days?.length === 0) return { ok: false, message: 'please select at least 1 available days' }
  return { ok: true, message: 'data is validate' }
}
