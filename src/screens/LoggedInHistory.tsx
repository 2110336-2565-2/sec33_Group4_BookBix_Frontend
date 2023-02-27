import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

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
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
    { date: new Date('2021-08-21'), deviceType: 'Ipad', email: 'nick@mail.com', ipAddress: '162.1.1.1' },
  ]

  return (
    <Container fluid className="fill bg-dark">
      <Row className="p-3">
        <Col>
          <h1 className="text-start d-inline bookbix-logo">BookBix</h1>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col>
          <Container className="bg-white px-4 py-5 border rounded-3">
            <Container>
              <h4 className="fw-bold">Authentication History</h4>
            </Container>
            <Container>
              <HistoryTable histories={histories} />
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

const HistoryTable = ({ histories }: HistoriesInterface) => {
  return (
    <table className="table table-striped">
      <HistoryTableHeader />
      {histories.map((history) => {
        return (
          <HistoryTableBody
            date={history.date}
            deviceType={history.deviceType}
            email={history.email}
            ipAddress={history.ipAddress}
          />
        )
      })}
    </table>
  )
}
const HistoryTableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col">Lastest Login Update</th>
        <th scope="col">Device Type</th>
        <th scope="col">Email</th>
        <th scope="col">IP Address</th>
      </tr>
    </thead>
  )
}
const HistoryTableBody = ({ date, deviceType, email, ipAddress }: HistoryInterface) => {
  return (
    <tbody>
      <tr>
        <td>{date.toDateString()}</td>
        <td>{deviceType}</td>
        <td>{email}</td>
        <td>{ipAddress}</td>
      </tr>
    </tbody>
  )
}
export default LoggedInHistory
