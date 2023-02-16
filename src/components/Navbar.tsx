import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import {Dropdown} from 'react-bootstrap';
export default function MyNavbar() {
  return (
    
    <>
      <Navbar expand="lg"  className = "nav-bar">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/" >
              <p className = "bookbix-logo-org">BookBix<sup className = "sup-script">org</sup></p>
            </Link>
          </Navbar.Brand>
          <Dropdown className='dropdown' >
        <Dropdown.Toggle id="dropdown-autoclose-true">
          Sorawit
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
          <Link className="nav-link" to="/location-booking/:locationId">
            BookLocation
          </Link>
          </Dropdown.Item>

          <Dropdown.Item>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          </Dropdown.Item>
          
          <Dropdown.Item>
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
           {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
           </Navbar.Collapse> */}
         </Container>

       </Navbar>
       <Outlet />
     </>
  )
}