import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MyNavbar() {
  return (
    <Navbar expand="lg" bg="light">
      <Container>
        <Navbar.Brand>
          <Link className="text-link" to="/">
            BookBix
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Link className="text-link" to="/profile">
                Profile
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="text-link" to="/register">
                Register
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
