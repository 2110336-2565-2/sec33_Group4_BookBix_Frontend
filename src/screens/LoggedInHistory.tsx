import { Container, Row, Col, Table } from 'react-bootstrap'

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
          <Container className="main-container rounded-4">
            <Row className="pb-4">
              <Col>
                <h2 className="fw-bold p-1">Authentication History</h2>
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
    <Table borderless responsive="lg">
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
  return (
    <thead className="table-dark">
      <tr>
        <th scope="col">
          <h5 className="fw-bold">Lastest Login Update</h5>
        </th>
        <th scope="col">
          <h5 className="fw-bold">Device Type</h5>
        </th>
        <th scope="col">
          <h5 className="fw-bold">Email</h5>
        </th>
        <th scope="col">
          <h5 className="fw-bold">IP Address</h5>
        </th>
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
