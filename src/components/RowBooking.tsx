import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { calculateDays, formatBookingPeriod } from '../utils/Time.utils'
import { ComponentType } from '../interfaces/booking.interfaces'
import { StatusSelector } from './StatusSelector'

const URL = import.meta.env.VITE_API_URL

export const RowBooking: React.FC<BookingInterface> = ({
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
      <Container className="booking my-2 text-white d-none d-lg-block">
        <Row className="p-3 flex-row align-items-center justify-content-between">
          <Col md="3">{locationName}</Col>
          <Col md="1" className="d-xl-none">
            {calculateDays(startTime!, endTime!)} hours
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
          <Col md="1" className="status-body">
            <StatusSelector
              status={status}
              component={ComponentType.PROGRESS_CIRCLE}
              locationId={locationId}
              providerId={provider_id}
              price={price}
            />
          </Col>
          <Col md="2" xl="1" className="action p-0">
            <StatusSelector
              status={status}
              component={ComponentType.ACTION_BUTTON}
              locationId={locationId}
              providerId={provider_id}
              price={price}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
