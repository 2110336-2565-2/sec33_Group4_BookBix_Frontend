import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { locationInterface } from '../../interfaces/location.interfaces'
const url = import.meta.env.VITE_API_URL

export default function CreateLocation() {
  const dayInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [error, setError] = useState<string>('')
  const [location, setLocation] = useState<locationInterface>({
    name: '',
    address: '',
    description: '',
    url: '',
    images: ['xx', 'xx'],
    time: {
      open_time: '',
      close_time: '',
    },
    available_days: [],
    price: 0,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (location.time.open_time > location.time.close_time) {
      setError('Open time must be before close time')
      return
    }
    try {
      const response = await fetch(`${url}/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(location),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  return (
    <div className="create">
      <div className="container-fluid text-light bg-dark fill">
        <div className=" d-flex align-items-center justify-content-center pt-5">
          <Form className="row col-md-6 profile-manage py-3 mb-5" onSubmit={handleSubmit}>
            <h1 className="d-flex align-items-center justify-content-center">
              <br></br>
              <span className="text-black fw-bold">Create</span>Location
            </h1>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, name: e.target.value })
                }}
                type="text"
                placeholder="Location Name"
              />
            </Form.Group>

            <Form.Group className="row mb-3 col-md-8 " controlId="locationDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, description: e.target.value })
                }}
                as="textarea"
                type="text"
                placeholder="Location Description"
              />
            </Form.Group>

            <Form.Group className="row mb-3 col-md-8 " controlId="locationAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, address: e.target.value })
                }}
                as="textarea"
                type="text"
                placeholder="Location Address"
              />
            </Form.Group>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationURL">
              <Form.Label>Google Map URL</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, url: e.target.value })
                }}
                type="text"
                placeholder="Location URL"
              />
            </Form.Group>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationURL">
              <Form.Label>Price</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, price: parseInt(e.target.value) })
                }}
                type="number"
                placeholder="Location Price"
              />
            </Form.Group>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationOpenTime">
              <Form.Label>Open Time</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, time: { ...location.time, open_time: e.target.value } })
                }}
                defaultValue={location.time.open_time}
                type="time"
              />
            </Form.Group>

            <Form.Group className="row mb-3 col-md-8 " controlId="locationCloseTime">
              <Form.Label>Close Time</Form.Label>
              <Form.Control
                defaultValue={location.time.close_time}
                onChange={(e) => {
                  setLocation({ ...location, time: { ...location.time, close_time: e.target.value } })
                }}
                type="time"
              />
            </Form.Group>
            <Form.Group className="col-md-8">
              <label>Select available days for your location :</label>
              <div className="row ">
                {dayInWeek.map((type) => (
                  <div key={type} className="col-md-6">
                    <Form.Check
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
                  </div>
                ))}
              </div>
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex align-items-center justify-content-center col-md-8 pb-3 pt-3">
              <Button variant="dark" type="submit" className="primary col-md-8 pb" size="lg">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
