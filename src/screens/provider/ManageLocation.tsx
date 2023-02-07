import React from 'react'
import { Button, Form } from 'react-bootstrap'

export default function ManageLocation() {
  return (
    <div className="container-fluid text-light fill bg-dark ">
      <div className=" d-flex align-items-center justify-content-center pt-5 ">
        {/* <img className="col-md-6 img-fluid " src={photo} /> */}
        <Form className="row col-md-6 profile-manage pb-3 pt-3">
          <h1 className="d-flex align-items-center justify-content-center">
            <br></br>
            <span className="text-black fw-bold">Manage</span> Location
          </h1>
          <Form.Group className="row mb-3 col-md-8 " controlId="locationName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group
            className="row mb-3 col-md-8 "
            controlId="locationDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Description" />
          </Form.Group>

          <Form.Group
            className="row mb-3 col-md-8 "
            controlId="locationAddress"
          >
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" />
          </Form.Group>
          <Form.Group
            className="row mb-3 col-md-8 "
            controlId="locationOpenTime"
          >
            <Form.Label>Open Time</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
          <Form.Group className="row mb-3 col-md-8 " controlId="locationURL">
            <Form.Label>Google Map URL</Form.Label>
            <Form.Control type="text" placeholder="Enter URL" />
          </Form.Group>

          <Form.Group
            className="row mb-3 col-md-8 "
            controlId="locationCloseTime"
          >
            <Form.Label>Close Time</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
          <Form.Group
            className="row mb-3 col-md-8 "
            controlId="locationAvailableDays"
          >
            {/* can choose multiple days */}
            <div className="row">
              <Form.Label>Select Available Days</Form.Label>
              <Form.Check
                type="checkbox"
                id="locationOpenMonday"
                label="Monday"
                className="col-sm-3"
              />
              <Form.Check
                type="checkbox"
                id="locationOpenTuesday"
                label="Tuesday"
                className="col-sm-3"
              />
              <Form.Check
                type="checkbox"
                id="locationOpenWednesday"
                label="Wednesday"
                className="col-sm-3"
              />
              <Form.Check
                type="checkbox"
                id="locationOpenThursday"
                label="Thursday"
                className="col-sm-3"
              />
              <Form.Check
                type="checkbox"
                id="locationOpenFriday"
                label="Friday"
                className="col-sm-3"
              />
              <Form.Check
                type="checkbox"
                id="locationOpenSaturday"
                label="Saturday"
                className="col-sm-3"
              />
              <Form.Check
                type="checkbox"
                id="locationOpenSunday"
                label="Sunday"
                className="col-sm-3"
              />
            </div>
          </Form.Group>
          <Button variant="dark" type="submit" className="primary col-md-8 pb">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
