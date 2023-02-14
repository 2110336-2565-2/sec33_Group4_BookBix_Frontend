import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

export default function MyNavbar() {
  return (
    <>
      <Navbar expand="lg" bg="light">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              BookBix
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}
