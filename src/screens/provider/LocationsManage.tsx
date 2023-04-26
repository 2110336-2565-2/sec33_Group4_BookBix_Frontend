import { useState, useEffect } from 'react'
import { LocationCard, NewLocationCard } from '../../components/CustomCard'
import { LocationInterface, GetLocationsByProviderRespondInterface } from '../../interfaces/location.interfaces'
import { Container } from 'react-bootstrap'
import { fetchProviderLocations } from '../../utils/location.utils'
import { AccessTokenInterface } from '../../interfaces/authentication.interface'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'

export default function LocationsManage() {
  const [locations, setLocations] = useState<LocationInterface[]>([])
  const [cookies, setCookie] = useCookies(['access_token'])

  const fetchLocation = async () => {
    const accessToken: AccessTokenInterface = jwt_decode(cookies.access_token)
    const providerId = accessToken.id
    const respond: GetLocationsByProviderRespondInterface = await fetchProviderLocations(providerId)
    setLocations([])
    if (respond.ok) {
      setLocations(respond.message)
    }
  }

  useEffect(() => {
    fetchLocation()
  }, [])

  const LocationCards = locations.map(
    ({ _id, name, address, description, url, images, time, available_days, price, avg_rating }) => {
      return (
        <LocationCard
          key={_id}
          _id={_id}
          name={name}
          address={address}
          description={description}
          url={url}
          images={images}
          time={time}
          available_days={available_days}
          price={price}
          avg_rating={avg_rating}
        />
      )
    },
  )

  return (
    <>
      <section className="location-manage bg-dark">
        <Container className="py-1">
          <h1 className="h1 text-center fw-bold text-uppercase" id="header">
            Your locations
          </h1>
          {LocationCards}
          <NewLocationCard />
        </Container>
      </section>
    </>
  )
}
