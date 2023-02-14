import React, { useState } from 'react'
import login_costume from '../assets/images/login-costume.svg'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

// const URL = `${process.env.BACKEND_SERVER_PORT}`
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
    if (!username || !email || !password || !confirmPassword || !type) {
      setError('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must be the same')
      return
    }
    setError(null)
    try {
      const url =
        type == 'Customer'
          ? `${URL}/customers/register`
          : `${URL}/providers/register`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
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
    <>
      <div className="d-flex border rounded justify-content-between align-self-end switch-page-btn">
        <Button
          className="m-1 px-4 current-page-tag active"
          variant="light"
          style={{ color: '#db5461' }}
        >
          Register
        </Button>
        <Link to="/login" className="nav-link d-flex align-items-center">
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
