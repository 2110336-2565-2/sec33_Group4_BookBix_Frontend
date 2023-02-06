import React from 'react'
import { Button, Form } from 'react-bootstrap'
import photo from '../assets/images/react.svg'
// page for update user info firstname, lastname, sex, birthday, email and profile picture
export default function ManageProfile() {
  return (
    <div className="container">
      <h1>Manage Profile</h1>
      <div className="row">
        <Form className="col-md-6">
          <Form.Group className="mb-3" controlId="formFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="Enter firstname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="Enter lastname" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSex">
            <Form.Label>Sex</Form.Label>
            <Form.Select placeholder="Enter Sex">
              <option>Choose...</option>
              <option>Male</option>
              <option>Female</option>
              <option>LGBTQ+</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" placeholder="Enter Birthday" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary " type="submit">
            Submit
          </Button>
        </Form>
        <img className="col-md-6" src={photo} />
      </div>
    </div>
  )
}
