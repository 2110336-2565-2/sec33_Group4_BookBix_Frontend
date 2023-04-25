import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { LocationInterface } from '../../interfaces/location.interfaces'
import { createLocation } from '../../utils/location.utils'
import { AccessTokenInterface } from '../../interfaces/authentication.interface'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const url = import.meta.env.VITE_API_URL

export default function CreateLocation() {
  const dayInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [error, setError] = useState('')
  const [location, setLocation] = useState<LocationInterface>({
    name: '',
    address: '',
    description: '',
    url: '',
    images: [
      'https://img.peerspace.com/image/upload/w_1200,c_limit/c_crop,g_custom,f_auto,q_auto,dpr_auto/l_PS-logo,g_south_east,x_20,y_20,w_175,o_75/uwn0cgiuddbkiwftrha7',
      'https://lh5.googleusercontent.com',
      'https://lh5.googleusercontent.com',
    ],
    time: {
      open_time: '',
      close_time: '',
    },
    available_days: [],
    price: 0,
  })
  const [cookies, setCookie] = useCookies(['access_token'])
  const navigate = useNavigate()
  const accessToken: AccessTokenInterface = jwt_decode(cookies.access_token)
  let providerId = accessToken.id

  const fetchCreateLocation = async () => {
    const response = await createLocation(location, providerId)
    setError(response.message)
    if (response.ok) {
      navigate('/locations')
      navigate(0)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchCreateLocation()
  }

  return (
    <div className="create container-fluid text-light bg-dark fill">
      <div className="d-flex align-items-center justify-content-center py-5">
        <Form className="row col-md-6 profile-manage justify-content-center" onSubmit={handleSubmit}>
          <h1 className="d-flex justify-content-center mt-3">
            <span className="text-black fw-bold">Create</span>Location
          </h1>

          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setLocation({ ...location, name: e.target.value })
              }}
              type="text"
              placeholder="Location Name"
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setLocation({ ...location, description: e.target.value })
              }}
              as="textarea"
              type="text"
              placeholder="Location Description"
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setLocation({ ...location, address: e.target.value })
              }}
              as="textarea"
              type="text"
              placeholder="Location Address"
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationURL">
            <Form.Label>Google Map URL</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setLocation({ ...location, url: e.target.value })
              }}
              type="url"
              placeholder="Location URL"
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setLocation({ ...location, price: parseInt(e.target.value) })
              }}
              type="number"
              placeholder="Location Price"
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationOpenTime">
            <Form.Label>Open Time</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setLocation({ ...location, time: { ...location.time, open_time: e.target.value } })
              }}
              defaultValue={location.time.open_time}
              type="time"
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3 col-md-8" controlId="locationCloseTime">
            <Form.Label>Close Time</Form.Label>
            <Form.Control
              required
              defaultValue={location.time.close_time}
              onChange={(e) => {
                setLocation({ ...location, time: { ...location.time, close_time: e.target.value } })
              }}
              type="time"
            />
          </Form.Group>
          <Form.Group as={Row} className="col-md-8">
            <Form.Label>Select available days for your location :</Form.Label>
            <div className="row">
              {dayInWeek.map((type) => (
                <Form.Check
                  key={type}
                  className="col-md-6"
                  type="checkbox"
                  id={type}
                  label={type}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLocation({
                        ...location,
                        available_days: [...location.available_days, type],
                      })
                    } else {
                      setLocation({
                        ...location,
                        available_days: location.available_days.filter((day) => day !== type),
                      })
                    }
                  }}
                />
              ))}
            </div>
          </Form.Group>

          {error && <Row className="col-md-10 mt-1 alert alert-danger">{error}</Row>}
          <div className="d-flex row justify-content-center col-md-8 pt-4 pb-5">
            <Button variant="dark" type="submit" className="primary col-md-8" size="lg">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
