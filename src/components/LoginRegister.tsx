import React, { useState } from 'react'
import login_costume from '../assets/images/login-costume.svg'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const URL = import.meta.env.VITE_API_URL
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
        <input type="submit" className="form-regis-btn mb-5" value="Register" />
      </Form>
    </>
  )
}

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return setError('Please fill in all fields')

    try {
      const response = await fetch(`${URL}/customers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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
      <div className="d-flex switch-page-btn border border-1 rounded justify-content-between align-self-end">
        <Link to="/register" className="nav-link d-flex align-items-center">
          <div className="text-light ms-1 px-3">Register</div>
        </Link>
        <Button className="m-1 px-4 current-page-tag active" variant="light">
          Login
        </Button>
      </div>
      <div className="login-header">
        <h1>
          Sign In to <span>BookBix</span>
        </h1>
      </div>
      <Form className="login-form col-md-8" onSubmit={handleSubmit}>
        <Form.Group className="form-group mb-3" controlId="formBasicEmail">
          <Form.Label className="fs-4">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
          />
          <Form.Text className="ms-3 fs-7 text-white">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="form-group mb-3" controlId="formBasicPassword">
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
        {error && <div className="alert alert-danger">{error}</div>}
        <p className="text-end mt-5 mb-5">
          <Link
            to="../forgetpassword"
            className="text-decoration-none fw-bold text-white"
          >
            forget password ?
          </Link>
        </p>
        <input type="submit" className="login-btn mb-5" value="Login" />
      </Form>
    </>
  )
}

export const ForgetPasswordRequest = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${URL}/resetpassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          email,
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
      window.location.href = '/login'
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  return (
    <>
      <div className="border rounded-3 align-self-end mt-5 back-btn px-2 py-1">
        <Link to="/login" className="nav-link">
          <h2 className="px-3">Back</h2>
        </Link>
      </div>

      <div className="text-header ">
        <h1 className="fs-1 fw-bolder">Change Password</h1>
      </div>

      <Form
        className="form col-md-8 w-75 border border-0 rounded p-5 my-2"
        onSubmit={handleSubmit}
      >
        <Form.Group className="form-group mb-1 p-2" controlId="email">
          <Form.Label className="form-label fs-3 mb-2">
            Email Address
          </Form.Label>
          <Form.Control
            className="rounded-5"
            type="email"
            placeholder="Enter your password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <p className="text-danger ms-3">{error}</p>
        <Button
          className="btn my-4 rounded-5 form-change-btn w-100 fw-bolder"
          type="submit"
        >
          Send Reset Code
        </Button>
      </Form>
    </>
  )
}

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must be the same')
      return
    }
    setError(null)
    try {
      const response = await fetch(`${URL}/users/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
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
      window.location.href = '/'
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  return (
    <>
      <div className="border rounded-3 align-self-end mt-5 back-btn px-2 py-1">
        <Link to="/login" className="nav-link">
          <h2 className="px-3">Back</h2>
        </Link>
      </div>

      <div className="text-header mt-lg-auto mb-lg-5">
        <h1>Reset Password</h1>
      </div>

      <Form
        className="form col-md-8 mb-lg-auto mt-lg-5"
        onSubmit={handleSubmit}
      >
        <Form.Group className="form-group mb-1 p-2" controlId="changePassword">
          <Form.Label className="form-label fs-4">Password</Form.Label>
          <Form.Control
            className="rounded-5"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group mb-1 p-2" controlId="confirmPassword">
          <Form.Label className="form-label fs-4">Confirm Password</Form.Label>
          <Form.Control
            className="rounded-5"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <p className="text-mute">{error}</p>
        <Button className="btn my-4 rounded-5 form-change-btn" type="submit">
          Reset Password
        </Button>
      </Form>
    </>
  )
}
