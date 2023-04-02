import { useState, useEffect } from 'react'
import { LocationCard, NewLocationCard } from '../../components/CustomCard'
import { locationInterface, GetLocationsByProviderRespondInterface } from '../../interfaces/location.interfaces'
import { Container } from 'react-bootstrap'
import { fetchProviderLocations } from '../../utils/location.utils'

export default function LocationsManage() {
  const [locations, setLocations] = useState<locationInterface[]>([])

  const fetchLocation = async () => {
    const respond: GetLocationsByProviderRespondInterface = await fetchProviderLocations('000000000004000000000000')
    setLocations([])
    if (respond.ok) {
      setLocations(respond.message)
    }
  }

  useEffect(() => {
    fetchLocation()
  }, [])

  const LocationCards = locations.map(
    ({ id, name, address, description, url, images, time, available_days, price, avg_rating }) => {
      return (
        <LocationCard
          key={id}
          id={id}
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
