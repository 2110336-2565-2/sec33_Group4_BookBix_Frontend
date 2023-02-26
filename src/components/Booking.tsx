import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { formatBookingPeriod } from '../utils/Time.utils'

const Booking: React.FC<BookingInterface> = ({
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
    <Container className="booking m-2 text-white">
      <Row className="p-4 d-flex align-items-center">
        <Col md="3">{locationName}</Col>
        <Col md="3">
          <div className="d-flex flex-row justify-content-center">
            <div className='text-center'>
              {startTime![0]}<br/>
              {startTime![1]}
            </div>
            -
            <div className='text-center'>
              {endTime![0]}<br/>
              {endTime![1]}
            </div>
          </div>
        </Col>
        <Col md="1">{id}</Col>
        <Col md="1" className='text-center'>{price} THB</Col>
        <Col md="2" className='text-center'>
          {status}
          <div className="progress-circle"></div>
        </Col>
        <Col md="1" className="action"></Col>
        {status === 'pending'} ? <Col className="cancel-btn"></Col>
      </Row>
    </Container>
  )
}

export default Booking
