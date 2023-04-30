import { Navbar, Container, Nav, NavDropdown, Offcanvas, Form, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link, Outlet, redirect, useNavigate } from 'react-router-dom'
import { useTokenContext } from '../hooks/CustomProvider'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { AccessTokenInterface, UserEnum } from '../interfaces/authentication.interface'
import { RoutePath } from '../interfaces/route.interface'
import { NotificationInterface } from '../interfaces/customer.interfaces'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'

export default function MyNavbar() {
  const direction = 'down-centered'
  const navigate = useNavigate()
  let accessToken: AccessTokenInterface
  const { currentToken, setCurrentToken } = useTokenContext()
  const [cookies, setCookie] = useCookies(['access_token'])
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string>('')
  const [notifications, setNotifications] = useState<NotificationInterface>()
  const URL = import.meta.env.VITE_API_URL

  const handleLogout = () => {
    sessionStorage.clear()
    setCurrentToken(null)
    setCookie('access_token', '', { path: '/', expires: new Date(0) })
    navigate(RoutePath.SearchPage)
  }

  const putNotification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${URL}/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentToken?.id),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  const getNotification = async () => {
    try {
      const response = await fetch(`${URL}/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentToken?.id),
      })

      const currentNotification = await response.json()
      if (!response.ok) {
        setError(currentNotification.message)
        return
      }
      setNotifications(currentNotification)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(false)
    putNotification(e)
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    try {
      accessToken = jwt_decode(cookies.access_token)
      getNotification()
    } catch (error) {
      return
    }
    if (accessToken) {
      setCurrentToken(accessToken)
    }
  }, [])

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
                    <>
                      <NavDropdown.Item>
                        <div className="nav-link" onClick={() => navigate(RoutePath.Bookings)}>
                          My Bookings
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div className="nav-link" onClick={() => handleShow()}>
                          Notifications
                        </div>
                      </NavDropdown.Item>
                      <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title>Notifications</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <Form>
                            <Row className="d-flex align-items-center">
                              <Col>
                                <Form.Check.Label>
                                  <p>News & Promotions</p>
                                </Form.Check.Label>
                              </Col>
                              <Col>
                                <Form.Check
                                  checked={notifications?.subscription}
                                  type="switch"
                                  id="custom-switch"
                                  className="text-end"
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setNotifications({ ...notifications, subscription: !notifications?.subscription })
                                  }}
                                />
                              </Col>
                            </Row>
                          </Form>
                        </Offcanvas.Body>
                      </Offcanvas>
                    </>
                  ) : currentToken?.type === 'provider' ? (
                    <>
                      <NavDropdown.Item>
                        <div className="nav-link" onClick={() => navigate('/locations')}>
                          My locations
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div className="nav-link" onClick={() => navigate('/createPromotion')}>
                          Create Promotion
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div
                          className="nav-link"
                          onClick={async () => {
                            const response = await fetch(`${URL}/stripe/create-provider-account`, {
                              method: 'POST',
                              credentials: 'include',
                              headers: {
                                Cookie: cookies.access_token,
                                'Content-Type': 'application/json',
                              },
                            })
                            const data = await response.json()
                            if (!response.ok) {
                              alert('You are already verified a Stripe account')
                              return
                            } else {
                              window.location.href = data.accountLinkUrl
                            }
                          }}
                        >
                          Verify Account
                        </div>
                      </NavDropdown.Item>
                    </>
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
