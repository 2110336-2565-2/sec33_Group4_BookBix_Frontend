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
        <div className="col-md-6 login-left">
          {/* <h1 className="text-start d-inline bookbix-logo">Bookbix</h1> */}
          <img
            src={login_costume}
            className="img-fluid"
            alt="costume-of-login-page"
          />
        </div>
        <div className="login-right col-md-6">
          <div className="login-header">
            <h1>Sign in to <span>Bookbix</span></h1>
          </div>
          <form className="login-form col-md-8">
            <div className="login-form-content">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <a className='text-end'>forget password?</a>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      //{' '}
    </div>
  )
}
