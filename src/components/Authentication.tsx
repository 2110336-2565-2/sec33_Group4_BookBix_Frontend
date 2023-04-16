import React, { useState } from 'react'
import login_costume from '../assets/images/login-costume.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTokenContext } from '../hooks/CustomProvider'
import { UserEnum, AuthDataInterface, RespondInterface } from '../interfaces/authentication.interface'
import { registerRequest, loginRequest } from '../utils/authentication.utils'
import { RoutePath } from '../interfaces/route.interface'

const URL = import.meta.env.VITE_API_URL

export const IconContainer = () => {
  return (
    <>
      <h1 className="text-start d-inline bookbix-logo">BookBix</h1>
      <div className="login-left d-flex">
        <img src={login_costume} className="img-fluid" alt="costume-of-login-page" />
      </div>
    </>
  )
}

export const RegisterContainer = () => {
  const [authData, setAuthData] = useState<AuthDataInterface>({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    userType: undefined,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const respond: RespondInterface = await registerRequest(authData)
    if (!respond.ok) {
      setError(respond.message)
      return
    }
    setError(null)
    setSuccess(respond.message)
    setTimeout(function () {
      navigate(RoutePath.Login)
    }, 1000)
  }
  return (
    <>
      <div className="d-flex border rounded justify-content-between align-self-end switch-page-btn">
        <Button className="m-1 px-4 current-page-tag active" variant="light" style={{ color: '#db5461' }}>
          Register
        </Button>
        <Link to={RoutePath.Login} className="nav-link d-flex align-items-center">
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
            value={authData.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, username: e.target.value })
            }
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group className="form-group mb-1" controlId="registerEmail">
          <Form.Label className="fs-4">Email</Form.Label>
          <Form.Control
            type="email"
            value={authData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, email: e.target.value })}
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group className="form-group mb-1" controlId="registerPassword">
          <Form.Label className="fs-4">Password</Form.Label>
          <Form.Control
            type="password"
            value={authData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, password: e.target.value })
            }
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="form-group mb-3" controlId="confirmRegisterPassword">
          <Form.Label className="fs-4">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={authData.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, confirmPassword: e.target.value })
            }
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Form.Group
          className="form-group"
          controlId="registerType"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, userType: e.target.id })}
        >
          <div key="radio" className="mb-3 fs-5">
            <Form.Check inline label="Customer" name="type" type="radio" id={UserEnum.CUSTOMER} />
            <Form.Check inline label="Provider" name="type" type="radio" id={UserEnum.PROVIDER} />
          </div>
        </Form.Group>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <input type="submit" className="form-regis-btn mb-5" value="Register" />
      </Form>
    </>
  )
}

export const LoginContainer = () => {
  const [authData, setAuthData] = useState<AuthDataInterface>({
    email: undefined,
    password: undefined,
  })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setCurrentToken: setCurrentUser } = useTokenContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const respond: RespondInterface = await loginRequest(authData)
    if (respond.ok) {
      setCurrentUser(JSON.parse(respond.message))
      navigate(RoutePath.SearchPage)
    }
    setError(respond.message)
  }
  return (
    <>
      <div className="d-flex switch-page-btn border border-1 rounded justify-content-between align-self-end">
        <Link to={RoutePath.Register} className="nav-link d-flex align-items-center">
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
            value={authData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthData({ ...authData, email: e.target.value })}
            placeholder="Enter email"
          />
          <Form.Text className="ms-3 fs-7 text-white">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group className="form-group mb-3" controlId="formBasicPassword">
          <Form.Label className="fs-4">Password</Form.Label>
          <Form.Control
            type="password"
            value={authData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, password: e.target.value })
            }
            placeholder="Password"
          />
        </Form.Group>
        {error && <div className="alert alert-danger">{error}</div>}
        <p className="text-end mt-5 mb-5">
          <Link to={RoutePath.ResetPassword} className="text-decoration-none fw-bold text-white">
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
      const response = await fetch(`${URL}/auth/reset-password`, {
        method: 'POST',
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
      <Form
        className="d-inline-flex flex-column form col-lg-8 border border-0 rounded-5 p-5 m-3  justify-content-evenly"
        onSubmit={handleSubmit}
      >
        <div className="border border-1 rounded align-self-end switch-page-btn btn">
          <Link to={RoutePath.Login} className="nav-link d-flex align-items-center ">
            <div className="text-light ms-1 px-3">Back</div>
          </Link>
        </div>

        <div className="text-header align-self-center">
          <h1 className="my-2 fs-1 fw-normal">Forget Password</h1>
        </div>

        <Form.Group className="form-group mb-1 p-2" controlId="email">
          <Form.Label className="form-label fs-4 ps-2 mb-2">Email Address</Form.Label>
          <Form.Control
            className="rounded-5"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <p className="text-black ms-3">{error}</p>
        <Button className="rounded-5 form-change-btn fw-bolder mt-4 mb-auto" type="submit">
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
    const send: AuthDataInterface = {
      _id: window.location.pathname.split('/').pop(),
      password: password,
      confirmPassword: confirmPassword,
    }
    setError(null)
    try {
      const response = await fetch(`${URL}/auth/reset-password/${send._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          password,
          confirmPassword,
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
      <Form
        className="d-inline-flex flex-column form col-lg-8 border border-0 rounded-5 p-5 m-3 justify-content-evenly"
        onSubmit={handleSubmit}
      >
        <div className="border border-1 rounded align-self-end switch-page-btn btn">
          <Link to={RoutePath.Login} className="nav-link d-flex align-items-center ">
            <div className="text-light ms-1 px-3">Back</div>
          </Link>
        </div>

        <div className="text-header my-3 my-xl-5 align-self-center">
          <h1>Reset Password</h1>
        </div>

        <Form.Group className="form-group mb-1 p-2" controlId="changePassword">
          <Form.Label className="form-label fs-4 ms-2">Password</Form.Label>
          <Form.Control
            className="rounded-5"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group mb-1 p-2" controlId="confirmPassword">
          <Form.Label className="form-label fs-4 ms-2">Confirm Password</Form.Label>
          <Form.Control
            className="rounded-5"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <p className="text-mute">{error}</p>
        <Button className="btn my-4 rounded-5 form-change-btn mb-auto" type="submit">
          Reset Password
        </Button>
      </Form>
    </>
  )
}
