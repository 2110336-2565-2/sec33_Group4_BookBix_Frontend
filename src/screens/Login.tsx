import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import login_costume from '../assets/login-costume.svg'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    // <div className=' '>
    <div className="container-fluid fill bg-dark">
      <div className="row fill">
        <div className="col-md-6 d-flex">
          <h1 className="text-start ms-10 mt-10">Bookbix</h1>
          <div className="align-self-center">
            <img
              src={login_costume}
              className="img-fluid"
              alt="costume-of-login-page"
            />
          </div>
        </div>
        <div className="col-md-6 login-field d-flex flex-column justify-content-center align-items-center">
          <h1 className="p-10">Sign in to Bookbix</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <Button className="rounded-pill" variant="light" type="submit">
            Login
          </Button>
        </div>
      </div>
    </div>
    // </div>
  )
}
