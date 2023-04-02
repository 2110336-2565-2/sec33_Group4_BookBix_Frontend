import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { formatBookingPeriod } from '../utils/Time.utils'
import { ComponentType } from '../interfaces/booking.interfaces'
import { StatusSelector } from './StatusSelector'

import { Link } from 'react-router-dom'

const URL = import.meta.env.VITE_API_URL

export const TicketBooking: React.FC<BookingInterface> = ({
  id = '',
  provider_id = '',
  locationName = '',
  locationId = '',
  price = 0,
  period = {
    start: '',
    end: '',
  },
  status = '',
}) => {
  const { startTime, endTime }: { startTime: string[] | undefined; endTime: string[] | undefined } =
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
          <Col xs="5" sm="3">
            <StatusSelector
              status={status}
              component={ComponentType.PROGRESS_CIRCLE}
              locationId={locationId}
              providerId={provider_id}
              price={price}
            />
          </Col>
        </Row>
        <Row className="p-3 d-flex flex-nowrap justify-content-between">
          <Col xs="4" sm="4" className="d-none d-sm-block">
            <div className="d-flex flex-column row justify-content-center">
              <div className="text-start">{startTime![1]}</div>
              <div className="text-start">From &nbsp;{startTime![0]} &nbsp;To &nbsp;{endTime![0]}</div>
            </div>
          </Col>
          <Col xs="4" sm="3" className="text-start">
            Price {price} BAHT
          </Col>
          <Col xs="5" sm="3">
            <div className="ticket-action-btn">
              <StatusSelector
                status={status}
                component={ComponentType.ACTION_BUTTON}
                locationId={locationId}
                providerId={provider_id}
                price={price}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
