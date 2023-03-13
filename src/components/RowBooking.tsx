import React, { useState } from 'react'
import { Button, Modal, Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { calculateDays, formatBookingPeriod } from '../utils/Time.utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { statusSelector } from '../utils/Booking.utils'
import { Link } from 'react-router-dom'

const URL = import.meta.env.VITE_API_URL

export const RowBooking: React.FC<BookingInterface> = ({
  id = '',
  locationName = '',
  locationId= '',
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
      <Container className="booking my-2 text-white d-none d-lg-block">
        <Row className="p-3 flex-row align-items-center justify-content-between">
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
          <Col md="2" lg="1" className="id-body w-auto">
            {id}
          </Col>
          <Col md="2" lg="1" className="text-center">
            {price} THB
          </Col>
          <Col md="1" className="d-flex flex-column status-body align-items-center">
            {statusSelector(status, 'status-text', locationId)}
            <div className="progress-circle">{statusSelector(status, 'progress-circle',locationId)}</div>
          </Col>
          <Col md="2" xl="1" className="action p-0">
            {statusSelector(status, 'action-btn',locationId)}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
