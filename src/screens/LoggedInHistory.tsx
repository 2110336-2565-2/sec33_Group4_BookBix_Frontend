import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HistoryInterface } from '../interfaces/history.interface'
import { HistoryTable } from '../components/CustomTable'
import { RoutePath } from '../interfaces/route.interface'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { AccessTokenInterface, UserEnum } from '../interfaces/authentication.interface'

const URL = import.meta.env.VITE_API_URL

const LoggedInHistory = () => {
  const [histories, setHistories] = useState<HistoryInterface[]>([])
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['access_token'])
  let accessToken: AccessTokenInterface

  const fetchUser = async () => {
    accessToken = jwt_decode(cookies.access_token)
    //Check if token is expired
    if (!accessToken) navigate(RoutePath.Login)
    // if (accessToken.type !== UserEnum.CUSTOMER) navigate(RoutePath.SearchPage)
    // const url = `${URL}/customers/${accessToken.id}/history`
    const url = `${URL}/${accessToken.type}s/${accessToken.id}/history`
    //Fetch user data
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      setHistories(data)
    } catch (error) {
      console.log('something went wrong')
      navigate(RoutePath.Login)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Container fluid className="history-page fill bg-dark">
      <Row>
        <h1 className="text-start bookbix-logo">BookBix</h1>
      </Row>
      <Row>
        <Col>
          <Container className="main-container rounded-4" fluid="lg">
            <Row className="pb-4">
              <Col>
                <h2 className="fw-bold p-1">Authentication History</h2>
              </Col>
              <Col xs="auto" md="auto">
                <Link to={RoutePath.SearchPage} className="nav-link rounded-3 back-btn">
                  <h5>Back</h5>
                </Link>
              </Col>
            </Row>
            <Row>
              <HistoryTable histories={histories} />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default LoggedInHistory
