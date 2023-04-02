import {
  GetLocationsByProviderRespondInterface,
  DeleteLocationRespondInterface,
} from '../interfaces/location.interfaces'

const URL = import.meta.env.VITE_API_URL

export async function fetchProviderLocations(providerID: string): Promise<GetLocationsByProviderRespondInterface> {
  try {
    const url = `${URL}/locations`
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

export async function deleteLocation(locationID: string | undefined): Promise<DeleteLocationRespondInterface> {
  try {
    const url = `${URL}/locations/${locationID}`
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
    return { ok: false, message: "Couldn't delete location" }
  }
}
