import React from 'react'
import login_costume from '../assets/login-costume.svg'
import { Link } from 'react-router-dom'
import '../styles/_login.scss'

export default function Login() {
  return (
    // <div className=' '>
    <div className="container-fluid fill bg-dark">
      <div className="row fill">
        <div className="col-md-6 d-flex justify-content-center align-items-center d-none d-md-block">
          <h1 className="text-start d-inline bookbix-logo">Bookbix</h1>
          <div className="login-left">
            <img
              src={login_costume}
              className="img-fluid"
              alt="costume-of-login-page"
            />
          </div>
        </div>
        <div className="login-right col-md-6">
          <div className="login-header">
            <h1>
              Sign In to <span>Bookbix</span>
            </h1>
          </div>
          <form className="login-form col-md-8">
            <div className="form-group">
              <label className="fs-4" htmlFor="exampleInputEmail1">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small
                id="emailHelp"
                className="form-text ms-3  fs-7"
                style={{ color: 'white' }}
              >
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label className="fs-4" htmlFor="exampleInputPassword1">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <p className="text-end mt-5 mb-5">
              <a
                className="text-decoration-none fw-bold"
                style={{ color: 'white' }}
                href=""
              >
                forget password ?
              </a>
            </p>
          </form>
          <input type="submit" className="login-btn" value="Login" />
        </div>
      </div>
    </div>
  )
}
