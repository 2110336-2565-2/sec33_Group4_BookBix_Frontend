import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
const url = import.meta.env.VITE_API_URL

interface Location {
  locationname: string
  address: string
  description: string
  openTime: string
  closeTime: string
  url: string
  availableDay: Array<string>
}

export default function ManageLocation() {
  const [error, setError] = useState<string>('')
  const [location, setLocation] = useState<Location>({
    locationname: '',
    address: '',
    description: '',
    openTime: '',
    closeTime: '',
    url: '',
    availableDay: [],
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`${url}/locations/manage-location`, {
        method: 'POST',
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
      // Save the user information in local storage or in the state
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect the user to the homepage
      window.location.href = '/home'
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  return (
    <div className="manage">
      <div className="container-fluid text-light bg-dark fill">
        <div className=" d-flex align-items-center justify-content-center pt-5 ">
          <Form
            className="row col-md-6 profile-manage pb-3 pt-3"
            onSubmit={handleSubmit}
          >
            <h1 className="d-flex align-items-center justify-content-center">
              <br></br>
              <span className="text-black fw-bold">Manage</span> Location
            </h1>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, locationname: e.target.value })
                }}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group
              className="row mb-3 col-md-8 "
              controlId="locationDescription"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, description: e.target.value })
                }}
                type="text"
                placeholder="Enter Description"
              />
            </Form.Group>

            <Form.Group
              className="row mb-3 col-md-8 "
              controlId="locationAddress"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, address: e.target.value })
                }}
                type="text"
                placeholder="Enter Address"
              />
            </Form.Group>
            <Form.Group className="row mb-3 col-md-8 " controlId="locationURL">
              <Form.Label>Google Map URL</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, url: e.target.value })
                }}
                type="text"
                placeholder="Enter URL"
              />
            </Form.Group>
            <Form.Group
              className="row mb-3 col-md-8 "
              controlId="locationOpenTime"
            >
              <Form.Label>Open Time</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, openTime: e.target.value })
                }}
                type="time"
              />
            </Form.Group>

            <Form.Group
              className="row mb-3 col-md-8 "
              controlId="locationCloseTime"
            >
              <Form.Label>Close Time</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLocation({ ...location, closeTime: e.target.value })
                }}
                type="time"
              />
            </Form.Group>
            <Form.Group className="col-md-8">
              <div className="row ">
                {[
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ].map((type) => (
                  <div key={`${type}`} className="col-md-6">
                    <Form.Check
                      // type={type}
                      id={`${type}`}
                      label={`${type}`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLocation({
                            ...location,
                            availableDay: [...location.availableDay, type],
                          })
                        } else {
                          setLocation({
                            ...location,
                            availableDay: location.availableDay.filter(
                              (day) => day !== type,
                            ),
                          })
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-center col-md-8 pb-3 pt-3">
              <Button
                variant="dark"
                type="submit"
                className="primary col-md-8 pb"
                size="lg"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
