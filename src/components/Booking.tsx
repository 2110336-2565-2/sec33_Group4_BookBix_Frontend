import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { calculateDays, formatBookingPeriod } from '../utils/Time.utils'

const URL = import.meta.env.VITE_API_URL

function statusSelector(status: string, component: string) {
  switch (component) {
    case 'progress-circle':
      return (
        <div className={`outer-progress-circle ${status}`}>
          <div className="inner-progress-circle"></div>
        </div>
      )
    case 'status-text':
      return <div className={`status-text ${status}`}>{status}</div>
    case 'action-btn':
      if (status === 'canceled') {
        return <div></div>
      }
      return (
        <Button className={`action-btn ${status} text-dark text-center`}>
          {status === 'pending' ? 'Payment' : 'Review'}
        </Button>
      )
    default:
      return ''
  }
}

const handleDelete = (id: string) => {
  console.log('delete')

  fetch(`${URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export const RowBooking: React.FC<BookingInterface> = ({
  id = '',
  locationName = '',
  price = 0,
  period = {
    start: '',
    end: '',
  },
  status = '',
}) => {
  const {
    startTime,
    endTime,
  }: { startTime: string[] | undefined; endTime: string[] | undefined } =
    formatBookingPeriod(period.start, period.end)

  return (
    <div className="booking-outside d-flex">
      <Container className="booking my-2 text-white d-none d-lg-block">
        <Row className="p-3 d-flex flex-row flex-nowrap overflow-scroll align-items-center">
          <Col md="3">{locationName}</Col>
          <Col md="1" className="d-xl-none">
            {calculateDays(startTime![1], endTime![1])} days
          </Col>
          <Col md="3" className="d-none d-xl-block">
            <div className="d-flex flex-row flex-nowrap justify-content-center">
              <div className="text-center">
                {startTime![0]}
                <br />
                {startTime![1]}
              </div>
              -
              <div className="text-center">
                {endTime![0]}
                <br />
                {endTime![1]}
              </div>
            </div>
          </Col>
          <Col md="2" lg="1" className="me-1 id-body">
            {id}
          </Col>
          <Col md="2" lg="1" className="text-center ms-5">
            {price} THB
          </Col>
          <Col
            md="1"
            className="d-flex flex-column status-body align-items-center"
          >
            {statusSelector(status, 'status-text')}
            <div className="progress-circle">
              {statusSelector(status, 'progress-circle')}
            </div>
          </Col>
          <Col md="1" className="action ms-5">
            {statusSelector(status, 'action-btn')}
          </Col>
        </Row>
      </Container>
      <div
        className="cancel-btn mt-3 d-none d-lg-block"
        onClick={() => handleDelete(id)}
      ></div>
    </div>
  )
}

export const TicketBooking: React.FC<BookingInterface> = ({
  id = '',
  locationName = '',
  price = 0,
  period = {
    start: '',
    end: '',
  },
  status = '',
}) => {
  const {
    startTime,
    endTime,
  }: { startTime: string[] | undefined; endTime: string[] | undefined } =
    formatBookingPeriod(period.start, period.end)

  return (
    <div className="booking-outside d-flex">
      <Container className="booking my-3 text-white d-lg-none overflow-scroll">
        <Row className="p-3 d-flex flex-nowrap justify-content-between">
          <Col xs="4" sm="4">
            {locationName}
          </Col>
          <Col xs="2" sm="3" className="d-none d-sm-block">
            booking_id
            <br />
            {id}
          </Col>
          <Col
            xs="5"
            sm="3"
            className="d-flex flex-column status-body align-items-center"
          >
            {statusSelector(status, 'status-text')}
            <div className="progress-circle">
              {statusSelector(status, 'progress-circle')}
            </div>
          </Col>
        </Row>
        <Row className="p-3 d-flex flex-nowrap justify-content-between">
          <Col xs="4" sm="4" className="d-none d-sm-block">
            <div className="d-flex flex-column row justify-content-center">
              <div className="text-start">From &nbsp;{startTime![1]}</div>
              <div className="text-start">
                To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{endTime![1]}
              </div>
            </div>
          </Col>
          <Col xs="4" sm="3" className="">
            Price {price} THB
          </Col>
          <Col xs="4" sm="3">
            <div className="ticket-action-btn w-50">
              {statusSelector(status, 'action-btn')}
            </div>
          </Col>
          <Col xs="1"></Col>
        </Row>
      </Container>
      <div
        className="cancel-btn mt-4 d-lg-none"
        onClick={() => handleDelete(id)}
      ></div>
    </div>
  )
}
