import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { HistoryInterface } from '../interfaces/history.interface'
import { HistoryTable } from '../components/CustomTable'

const LoggedInHistory = () => {
  const { customerId } = useParams()
  const [histories, setHistories] = useState<HistoryInterface[]>([])
  const navigate = useNavigate()
  const URL = `${import.meta.env.VITE_API_URL}/customers/${customerId}/history`

  const fetchUser = async () => {
    try {
      const response = await fetch(URL, {
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
      navigate('/login')
    }
  }
  useEffect(() => {
    // fetchUser()
    setHistories([
      {
        device: 'POSTMAN - POSTMAN DESKTOP',
        ip: '111.11.0.1',
        date: '11/03/2023 21:11:25',
      },
      {
        device: 'POSTMAN - POSTMAN DESKTOP',
        ip: '111.11.0.1',
        date: '11/03/2023 21:11:27',
      },
      {
        device: 'POSTMAN - POSTMAN DESKTOP',
        ip: '111.11.0.1',
        date: '11/03/2023 21:11:31',
      },
    ])
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
                <Link to="/" className="nav-link rounded-3 back-btn">
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
