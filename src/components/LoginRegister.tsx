import React, { useState } from 'react'
import login_costume from '../assets/images/login-costume.svg'
import { Link } from 'react-router-dom'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'

export const WebInform = () => {
  return (
    <>
      <h1 className="text-start d-inline bookbix-logo">BookBix</h1>
      <div className="login-left d-flex">
        <img
          src={login_costume}
          className="img-fluid"
          alt="costume-of-login-page"
        />
      </div>
    </>
  )
}

export const Registration = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(username, email, password, confirmPassword, type)
    // try {
    //   const response = await fetch(`${''}/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   })
    //   const data = await response.json()
    //   if (!response.ok) {
    //     setError(data.message)
    //     return
    //   }
    //   // Save the user information in local storage or in the state
    //   localStorage.setItem('user', JSON.stringify(data.user))
    //   // Redirect the user to the homepage
    //   window.location.href = '/home'
    // } catch (error) {
    //   setError('Something went wrong, please try again later')
    // }
  }
  return (
    <>
      <div className="d-flex border rounded justify-content-between align-self-end switch-page-btn">
        <Button
          className="m-1 px-4 current-page-tag active"
          variant="light"
          style={{ color: '#db5461' }}
        >
          Register
        </Button>
        <Link to="/login" className="text-link d-flex align-items-center">
          <div className="text-light ms-1 px-3">Login</div>
        </Link>
      </div>

      <div className="text-header">
        <h1>
          Sign Up to <span>BookBix</span>
        </h1>
      </div>

      <Form className="form col-md-8" onSubmit={handleSubmit}>
        <Form.Group className="form-group mb-1" controlId="registerUsername">
          <Form.Label className="fs-4">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group className="form-group mb-1" controlId="registerEmail">
          <Form.Label className="fs-4">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter Email"
          />
        </Form.Group>

        <Form.Group className="form-group mb-1" controlId="registerPassword">
          <Form.Label className="fs-4">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group
          className="form-group mb-3"
          controlId="confirmRegisterPassword"
        >
          <Form.Label className="fs-4">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Form.Group
          className="form-group"
          controlId="registerType"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setType(e.target.id)
          }
        >
          <div key="radio" className="mb-3 fs-5">
            <Form.Check
              inline
              label="Customer"
              name="type"
              type="radio"
              id="Customer"
            />
            <Form.Check
              inline
              label="Provider"
              name="type"
              type="radio"
              id="Provider"
            />
          </div>
        </Form.Group>

        {error && <div className="alert alert-danger">{error}</div>}
        <input type="submit" className="form-regis-btn" value="Register" />
      </Form>
    </>
  )
}

export const RegistrationV2 = () => {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Logo
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{' '}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
