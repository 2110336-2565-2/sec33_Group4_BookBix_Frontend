import { Card, CardGroup, Row, Col } from 'react-bootstrap'
import star from '../assets/images/star.png'
import { locations } from '../interfaces/location.interfaces'
import { mockup1 } from './mock_location'

export const SearchCard = () => {
  const LocationCard = () => {
    return (
      <Row className="g-4">
        {mockup1.map((location, idx) => (
          <Card>
            <a href="/location-booking/:locationId">
              <Card.Img variant="top cropped-ofp" className="card-location-img" src={location.images[0]} />
            </a>
            <Card.Body className="pb-0">
              <Card.Title>{location.name}</Card.Title>
            </Card.Body>
            <Card.Body className="pt-0">
              <Card.Text className="text-gray">{location.address.split(',')[0]}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className=""></Card.Text>
              <Card.Text className="bottom-card">
                Price: {location.price}/hour, Rating: {location.avg_rating} ⭐️
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    )
  }
  //   return with location card
  return <LocationCard />
}
