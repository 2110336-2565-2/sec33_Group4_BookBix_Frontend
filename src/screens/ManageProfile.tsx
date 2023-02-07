import React from 'react'
import { Button, Form } from 'react-bootstrap'
import photo from '../assets/images/react.svg'
// page for update user info firstname, lastname, sex, birthday, email and profile picture
export default function ManageProfile() {
  return (
    <div className="container-fluid text-light fill bg-dark ">
      <div className=" d-flex align-items-center justify-content-center pt-5">
        {/* <img className="col-md-6 img-fluid " src={photo} /> */}
        <Form className="row col-md-6 profile-manage pb-3 pt-3">
          <h1 className="d-flex align-items-center justify-content-center">
            <br></br>
            <span className="text-black fw-bold">Manage</span> Profile
          </h1>
          <Form.Group className="row mb-3 col-md-8 " controlId="formFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="Enter firstname" />
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formLastname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="Enter lastname" />
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formSex">
            <Form.Label>Sex</Form.Label>
            <Form.Select placeholder="Enter Sex">
              <option>Choose...</option>
              <option>Male</option>
              <option>Female</option>
              <option>LGBTQ+</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" placeholder="Enter Birthday" />
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="dark" type="submit" className="primary col-md-8 pb">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
