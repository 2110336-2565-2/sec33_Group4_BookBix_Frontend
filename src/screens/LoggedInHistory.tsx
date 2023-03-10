import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface HistoriesInterface {
  histories: HistoryInterface[]
}
interface HistoryInterface {
  date: Date
  deviceType: string
  email: string
  ipAddress: string
}

const LoggedInHistory = () => {
  const histories: HistoryInterface[] = [
    { date: new Date('2022-03-25'), deviceType: 'Mobile', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2022-01-25'), deviceType: 'Web', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
  ]

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
                <Link to="/" className="nav-link  border border-1 rounded-2 back-btn align-self-center">
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

const HistoryTable = ({ histories }: HistoriesInterface) => {
  return (
    <Table borderless responsive="md">
      <HistoryTableHeader />
      {histories.map((history) => {
        return (
          <HistoryTableBody
            key={history.date.toDateString()}
            date={history.date}
            deviceType={history.deviceType}
            email={history.email}
            ipAddress={history.ipAddress}
          />
        )
      })}
    </Table>
  )
}
const HistoryTableHeader = () => {
  const headerText = ['Lastest Login Update', 'Device Type', 'Email', 'IP Address']

  return (
    <thead className="table-dark">
      <tr>
        {headerText.map((header) => {
          return (
            <th key={header} scope="col">
              <h5 className="fw-bold">{header}</h5>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
const HistoryTableBody = ({ date, deviceType, email, ipAddress }: HistoryInterface) => {
  return (
    <tbody>
      <tr className="table-light">
        <td>
          <h5>{date.toDateString()}</h5>
        </td>
        <td>
          <h5>{deviceType}</h5>
        </td>
        <td>
          <h5>{email}</h5>
        </td>
        <td>
          <h5>{ipAddress}</h5>
        </td>
      </tr>
    </tbody>
  )
}
export default LoggedInHistory
