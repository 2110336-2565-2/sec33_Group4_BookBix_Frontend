import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useTokenContext } from '../hooks/CustomProvider'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { AccessTokenInterface, UserEnum } from '../interfaces/authentication.interface'
import { CustomerInterface } from '../interfaces/customer.interfaces'
const url = import.meta.env.VITE_API_URL

// page for update user info firstname, lastname, sex, birthdate, email
export default function ManageProfile() {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { currentToken, setCurrentToken } = useTokenContext()
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<CustomerInterface>({
    _id: '',
    firstname: '',
    lastname: '',
    sex: '',
    birthdate: '',
    email: '',
    username: '',
    password: '',
    device_history: [],
  })

  let accessToken: AccessTokenInterface

  useEffect(() => {
    try {
      accessToken = jwt_decode(cookies.access_token)
    } catch (error) {
      return
    }
    if (accessToken) {
      setCurrentToken(accessToken)
    }
  }, [])

  useEffect(() => {
    // fetch user info from database
    const fetchUser = async () => {
      const response = await fetch(`${url}/customers/${currentToken?.id}`)
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      // console.log(data)
      setUser(data)
    }
    fetchUser()
  }, [])
  console.log(user)

  // console.log(currentToken)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/customers/update/${currentToken?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      // Save the user information in local storage or in the state
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect the user to the homepage
      window.location.href = '/'
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  return (
    <div className="manage">
      <div className="container-fluid text-light fill bg-dark">
        <div className=" d-flex align-items-center justify-content-center pt-5">
          <Form className="row col-8 col-md-6 profile-manage py-5 mb-5" onSubmit={handleSubmit}>
            <h1 className="d-flex align-items-center justify-content-center">
              <br></br>
              <span className="text-black fw-bold">Manage</span> Profile
            </h1>
            <Form.Group className="row mb-3 col-md-8 " controlId="formFirstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                value={user?.firstname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, firstname: e.target.value })}
                type="text"
                placeholder="Enter firstname"
              />
            </Form.Group>
            <Form.Group className="row mb-3 col-md-8 " controlId="formLastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                value={user?.lastname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, lastname: e.target.value })}
                type="text"
                placeholder="Enter lastname"
              />
            </Form.Group>
            <Row className="col-md-8">
              <Col className="">
                <Form.Group className="row mb-3 col-md-8 " controlId="formSex">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    value={user?.sex}
                    onChange={(e) => {
                      setUser({ ...user, sex: e.target.value })
                    }}
                    aria-label="Default select example"
                    placeholder="Enter Sex"
                  >
                    <option value="">Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="">
                <Form.Group className="row mb-3 col-md-8 " controlId="formBirthdate">
                  <Form.Label>Birthdate</Form.Label>
                  <Form.Control
                    value={user?.birthdate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, birthdate: e.target.value })
                    }
                    type="date"
                    placeholder="Enter Birthdate"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="row mb-3 col-md-8 " controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={user?.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="dark" type="submit" className="primary col-8">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
