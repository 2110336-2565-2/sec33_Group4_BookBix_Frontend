import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { RowBooking } from '../../components/RowBooking'
import { TicketBooking } from '../../components/TicketBooking'
import { BookingInterface } from '../../interfaces/booking.interfaces'

const URL = import.meta.env.VITE_API_URL

const BookingSummary: React.FC = () => {
  const [bookings, setBookings] = useState<BookingInterface[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = async () => {
    // fetch bookings from backend
    try {
      const response = await fetch(`${URL}/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      setBookings(data)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

   //fetch bookings data when component mount
   useEffect(() => {
    fetchBookings()
  }, [])

  const renderBookings = () => {
    if (bookings) {
      return bookings.map((booking) => {
        return (
          <Row key={booking.id}>
            <RowBooking
              key={'R' + booking.id}
              id={booking.id}
              provider_id={booking.provider_id}
              locationName={booking.locationName}
              locationId={booking.locationId}
              price={booking.price}
              period={booking.period}
              status={booking.status}
            />
            <TicketBooking
              key={'T' + booking.id}
              id={booking.id}
              provider_id={booking.provider_id}
              locationName={booking.locationName}
              locationId={booking.locationId}
              price={booking.price}
              period={booking.period}
              status={booking.status}
            />
          </Row>
        )
      })
    }
  }

  return (
    <Container fluid className="booking-summary fill bg-dark">
      <Row>
        <Col md="4">
          <h2 className="text-white page-title fw-bold">Your bookings</h2>
        </Col>
      </Row>
      <Row className="booking-panel mt-4 mx-auto justify-content-center">
        <div className="d-none d-lg-block">
          <BookingsSummaryHeader />
        </div>
        {renderBookings()}
      </Row>
    </Container>
  )
}

const BookingsSummaryHeader: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Row className="p-3 flex-row align-items-center booking-summary-header justify-content-between ">
        <Col md="3" className="ps-2 ">
          <h5 className="fw-semiBold">location</h5>
        </Col>
        <Col md="1" className="d-xl-none w-auto p-0">
          <h5 className="fw-semiBold">period</h5>
        </Col>
        <Col md="3" className="d-none d-xl-block p-0 text-center">
          <h5 className="fw-semiBold">period</h5>
        </Col>
        <Col md="2" className="d-xl-none text-center p-0">
          <h5 className="fw-semiBold">id</h5>
        </Col>
        <Col md="2" lg="1" className="d-none d-xl-block id-header w-auto">
          <h5 className="fw-semiBold">bookingId</h5>
        </Col>
        <Col md="2" lg="1" className="text-center">
          <h5 className="fw-semiBold">price</h5>
        </Col>
        <Col md="1" className="status-header text-center w-auto">
          <h5 className="fw-semiBold">status</h5>
        </Col>
        <Col md="2" xl="1" className="text-center">
          <h5 className="fw-semiBold">action</h5>
        </Col>
      </Row>
    </Container>
  )
}

export default BookingSummary
