import { Card, CardGroup, Row, Col } from 'react-bootstrap'
import star from '../assets/images/star.png'
import { LocationInterface } from '../interfaces/location.interfaces'
import { mockup1 } from './mock_location'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SearchCard = ({ data }: { data: LocationInterface[] }) => {
  const LocationCard = () => {
    return (
      <Row className="g-4">
        {data.map((location, idx) => (
          <Card key={idx}>
            <Link to={`/location-booking/${location._id}`}>
              <Card.Img variant="top cropped-ofp" className="card-location-img" src={location.images[0]} />
            </Link>
            <Card.Body className="pb-0">
              <Card.Title>{location.name}</Card.Title>
            </Card.Body>
            <Card.Body className="pt-0">
              <Card.Text className="text-gray">{location.address?.split(',')[0]}</Card.Text>
            </Card.Body>
            <Card.Body>
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
