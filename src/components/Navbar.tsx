import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/CustomProvider'

export default function MyNavbar() {
  const { currentUser, setCurrentUser } = useUserContext()
  const direction = 'down-centered'
  const navigate = useNavigate()

  const handleLogout = () => {
    // Reset session
    sessionStorage.clear()

    // Reset user information
    setCurrentUser(null)

    // Reset cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // Redirect to home page after logout
    navigate('/')
  }

  return (
    <>
      <Navbar expand="lg" bg="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              <div className="bookbix-brand d-none d-lg-block"></div>
              <div className="d-flex flex-row w-auto mb-2">
                <h3 className="text-start logo text-white align-self-center mb-2">BookBix</h3>
                {currentUser?.role === 'customer' ? (
                  <h5 className="logo__role">CST</h5>
                ) : currentUser?.role === 'provider' ? (
                  <h5 className="logo__role">ORG</h5>
                ) : (
                  ''
                )}
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-3">
              <Link className="nav-link text-white" to="/">
                <h5 className="px-3 border-end d-none d-lg-block">Home</h5>
                <h5 className="d-lg-none">Home</h5>
              </Link>
              {!currentUser?.username && (
                <>
                  <Link className="nav-link text-white" to="/register">
                    <h5>Register</h5>
                  </Link>
                  <Link className="nav-link text-white" to="/login">
                    <h5>Login</h5>
                  </Link>
                </>
              )}
              {currentUser?.username && (
                <NavDropdown
                  key={direction}
                  id={`dropdown-button-drop-${direction}`}
                  drop={direction}
                  title={` Signed in as ${currentUser?.username}`}
                >
                  <NavDropdown.Item href="#action/3.1">
                    <Link className="nav-link" to="/profile-management">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  {currentUser?.role === 'customer' ? (
                    <NavDropdown.Item href="#action/3.1">
                      <Link className="nav-link" to="/me/bookings">
                        My Bookings
                      </Link>
                    </NavDropdown.Item>
                  ) : currentUser?.role === 'provider' ? (
                    <NavDropdown.Item href="#action/3.1">
                      <Link className="nav-link" to="/me/locations">
                        My locations
                      </Link>
                    </NavDropdown.Item>
                  ) : (
                    ''
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    {/* clear cookies with logout */}
                    <Link className="nav-link" to="/logout" onClick={() => handleLogout()}>
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}
