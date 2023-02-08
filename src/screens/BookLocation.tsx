import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const mockdata = {
  _id: Object('000000000004000000000004'),
  name: 'Central Park',
  address: 'New York, NY 10022',
  description: 'A large urban park in the heart of New York City',
  url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.066385305769!2d-73.96777208496323!3d40.78255467932428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sth!4v1675496921164!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  images: [
    'https://ohny.org/wp-content/uploads/2022/09/Harry_Gillen_via_Unsplash.jpeg',
    'https://mymodernmet.com/wp/wp-content/uploads/2020/12/central-park-new-york-city-frederick-law-olmsted-2.jpg',
    'https://www.planetware.com/photos-large/USNY/new-york-city-central-park-1.jpg',
  ],
  reviews: [
    {
      username: 'JaneDoe',
      rating: 4.5,
      text: 'Beautiful park, lots of green spaces and a great place to relax.',
    },
    {
      username: 'JohnDoe',
      rating: 5.0,
      text: "One of the best parks I've ever been to. So much to do and see!",
    },
  ],
}

const BookLocation: React.FC = () => {
  const { locationId } = useParams()
  const [location, setLocation] = useState<any>(mockdata)

  const fetchLocation = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/locations/${locationId}`,
    )
    const data = await response.json()
  }

  return (
    <div className="container-fluid min-vh-100 bg-dark text-white d-flex flex-column">
      <div className="row align-self-center p-3">
        <h1>{location.name}</h1>
      </div>
      <div className="row">
        {location.images.map((image: string) => {
          return (
            <div className="col-md-4 mh-100">
              <img src={image} className=" rounded mx-auto d-block w-100" />
            </div>
          )
        })}
      </div>
      <div className="row">
        <div className="col-md-4">
          <h2>Time slot</h2>
          From
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select your start time
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">9:00</Dropdown.Item>
              <Dropdown.Item href="#/action-2">10:00</Dropdown.Item>
              <Dropdown.Item href="#/action-3">11:00</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          To
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select your finish time
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">9:00</Dropdown.Item>
              <Dropdown.Item href="#/action-2">10:00</Dropdown.Item>
              <Dropdown.Item href="#/action-3">11:00</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-md-4">
          <h2>Location information</h2>
          <div className="bg-light bg-opacity-25">
            <p>{location.address}</p>
            <p>{location.description}</p>
          </div>
        </div>
        <div className="col-md-4">
          <h2>Reviews</h2>
          <div className="bg-light bg-opacity-25">
            {location.reviews.map((review: any) => {
              return (
                <div className="d-flex">
                  {review.username}
                  {review.text}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="row d-flex flex-column">
        <button className="col-md-4 btn-md align-self-center"> Booking </button>
      </div>
    </div>
  )
}

export default BookLocation
