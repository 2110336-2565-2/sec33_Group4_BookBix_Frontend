import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../assets/scss/_manageProfile.scss'
import { useState } from 'react'
const url = import.meta.env.VITE_API_URL

// page for update user info firstname, lastname, sex, birthdate, email
export default function ManageProfile() {
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [sex, setSex] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/manage-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, sex, birthdate, email }),
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
    <div className="container-fluid text-light fill bg-dark ">
      <div className=" d-flex align-items-center justify-content-center pt-5">
        {/* <img className="col-md-6 img-fluid " src={photo} /> */}
        <Form
          className="row col-md-6 profile-manage pb-3 pt-3"
          onSubmit={handleSubmit}
        >
          <h1 className="d-flex align-items-center justify-content-center">
            <br></br>
            <span className="text-black fw-bold">Manage</span> Profile
          </h1>
          <Form.Group className="row mb-3 col-md-8 " controlId="formFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstname(e.target.value)
              }
              type="text"
              placeholder="Enter firstname"
            />
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formLastname">
            <Form.Label>Lirstname</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastname(e.target.value)
              }
              type="text"
              placeholder="Enter lastname"
            />
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formSex">
            <Form.Label>Sex</Form.Label>
            <Form.Select
              onChange={(e) => {
                setSex(e.target.value)
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

          <Form.Group className="row mb-3 col-md-8 " controlId="formBirthdate">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthdate(e.target.value)
              }
              type="date"
              placeholder="Enter Birthdate"
            />
          </Form.Group>

          <Form.Group className="row mb-3 col-md-8 " controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="Enter email"
            />
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
