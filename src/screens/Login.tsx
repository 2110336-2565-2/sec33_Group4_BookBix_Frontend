import React, { useState } from 'react'
import login_costume from '../assets/login-costume.svg'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import '../styles/_login.scss'
//.env file
// const url = process.env.REACT_APP_API_URL


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${''}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      // Save the user information in local storage or in the state
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect the user to the homepage
      window.location.href = '/home';
    } catch (error) {
      setError('Something went wrong, please try again later');
    }
  };

  return (
    <div className="container-fluid fill bg-dark">
      <div className="row fill">
        <div className="col-md-6 d-flex justify-content-center align-items-center d-none d-md-block">
          <h1 className="text-start d-inline bookbix-logo">BookBix</h1>
          <div className="login-left">
            <img
              src={login_costume}
              className="img-fluid"
              alt="costume-of-login-page"
            />
          </div>
        </div>
        <div className="login-right col-md-6">
          <div className="d-flex switch-page-btn border border-1 rounded justify-content-between align-self-end">
            <Link to="/register" className="text-link d-flex align-items-center">
              <div className="text-light ms-1 px-3">register</div>
            </Link>
            <Button
              className="m-1 px-4 current-page-tag active" 
              variant="light"
              style={{ color: '#db5461' }}
            >
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
              <Form.Control type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter email" />
              <Form.Text className="ms-3 fs-7" style={{ color: 'white' }}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="form-group mb-3" controlId="formBasicPassword">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <p className="text-end mt-5 mb-5">
              <a
                className="text-decoration-none fw-bold"
                style={{ color: 'white' }}
                href=""
              >
                forget password ?
              </a>
            </p>
            <input type="submit" className="login-btn" value="Login" />
          </Form>    
        </div>
      </div>
    </div>
  )
}

export default Login;