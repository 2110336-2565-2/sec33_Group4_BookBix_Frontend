import { locationInterface } from '../interfaces/location.interfaces'

const LocationCard: React.FC<locationInterface> = ({
  name,
  address,
  description,
  url,
  images,
  time,
  available_days,
  price,
}) => {
  return (
    <>
      <div>
        <h4>{name}</h4>
        <h4>{address}</h4>
        <h4>{description}</h4>
        <h4>{url}</h4>
        <h4>{images}</h4>
        <h4>{time.open_time}</h4>
        <h4>{time.close_time}</h4>
        <h4>{available_days}</h4>
        <h4>{price}</h4>
      </div>
    </>
  )
}

export default LocationCard
