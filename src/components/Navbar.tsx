import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTokenContext } from '../hooks/CustomProvider'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { AccessTokenInterface, UserEnum } from '../interfaces/authentication.interface'
import { RoutePath } from '../interfaces/route.interface'

export default function MyNavbar() {
  const { currentToken, setCurrentToken } = useTokenContext()
  const direction = 'down-centered'
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['access_token'])
  let accessToken: AccessTokenInterface

  useEffect(() => {
    try {
      accessToken = jwt_decode(cookies.access_token)
    } catch (error) {
      return
    }
    if (accessToken) {
      setCurrentToken(accessToken)
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
    setCurrentToken(null)
    setCookie('access_token', '', { path: '/', expires: new Date(0) })
    navigate(RoutePath.SearchPage)
  }

  return (
    <>
      <Navbar expand="lg" bg="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav-link" to={RoutePath.SearchPage}>
              <div className="bookbix-brand d-none d-lg-block"></div>
              <div className="d-flex flex-row w-auto mb-2">
                <h3 className="text-start logo text-white align-self-center mb-2">BookBix</h3>
                {currentToken?.type === UserEnum.CUSTOMER ? (
                  <h5 className="logo__role">CST</h5>
                ) : currentToken?.type === UserEnum.PROVIDER ? (
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
              <Link className="nav-link text-white" to={RoutePath.SearchPage}>
                <h5 className="px-3 border-end d-none d-lg-block">Home</h5>
                <h5 className="d-lg-none">Home</h5>
              </Link>
              {!currentToken?.username && (
                <>
                  <Link className="nav-link text-white" to={RoutePath.Register}>
                    <h5>Register</h5>
                  </Link>
                  <Link className="nav-link text-white" to={RoutePath.Login}>
                    <h5>Login</h5>
                  </Link>
                </>
              )}
              {currentToken?.username && (
                <NavDropdown
                  key={direction}
                  id={`dropdown-button-drop-${direction}`}
                  drop={direction}
                  title={` Signed in as ${currentToken?.username}`}
                >
                  <NavDropdown.Item>
                    <div className="nav-link" onClick={() => navigate(RoutePath.ManageProfile)}>
                      Profile
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="nav-link" onClick={() => navigate(RoutePath.LoggedInHistory)}>
                      Logged-in history
                    </div>
                  </NavDropdown.Item>
                  {currentToken?.type === 'customer' ? (
                    <NavDropdown.Item>
                      <div className="nav-link" onClick={() => navigate(RoutePath.Bookings)}>
                        My Bookings
                      </div>
                    </NavDropdown.Item>
                  ) : currentToken?.type === 'provider' ? (
                    <NavDropdown.Item>
                      <div className="nav-link" onClick={() => navigate(RoutePath.ManageLocation)}>
                        My locations
                      </div>
                    </NavDropdown.Item>
                  ) : (
                    ''
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <div className="nav-link" onClick={() => handleLogout()}>
                      Logout
                    </div>
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
