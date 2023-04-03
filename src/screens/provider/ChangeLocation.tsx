import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { locationInterface } from '../../interfaces/location.interfaces'
import { useParams } from 'react-router-dom'
const url = import.meta.env.VITE_API_URL

export default function ManageLocation() {
  const dayInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [error, setError] = useState<string>('')
  const [location, setLocation] = useState<locationInterface>({
    id: '',
    name: '',
    address: '',
    description: '',
    url: '',
    available_days: [],
    time: {
      open_time: '',
      close_time: '',
    },
    images: [],
    price: 0,
  })
  //get location id from url/:id
  const { locationId } = useParams()

  const fetchLocation = async () => {
    try {
      const response = await fetch(`${url}/locations/${locationId}`)
      const data = await response.json()
      if (!response.ok) {
        setError('Something went wrong, please try again later')
        return
      }

      setLocation(data)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  // Set location information from database
  useEffect(() => {
    fetchLocation()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/locations/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      // Redirect the user to the homepage
      window.location.href = '/locations'
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  return (
    <div className="manage">
      <div className="container-fluid text-light bg-dark fill">
        <div className=" d-flex align-items-center justify-content-center pt-5">
          <Form className="row col-md-6 profile-manage py-3 mb-5" onSubmit={handleSubmit}>
            <h1 className="d-flex align-items-center justify-content-center">
              <br></br>
              <span className="text-black fw-bold">Manage</span> Location
            </h1>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, name: e.target.value })
                }}
                type="text"
                placeholder={location.name}
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
                placeholder={location.description}
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
                placeholder={location.address}
              />
            </Form.Group>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationURL">
              <Form.Label>Google Map URL</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, url: e.target.value })
                }}
                type="text"
                placeholder={location.url}
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
                  <div key={`${type}`} className="col-md-6">
                    <Form.Check
                      checked={location.available_days.includes(type)}
                      type="checkbox"
                      id={`${type}`}
                      label={`${type}`}
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
