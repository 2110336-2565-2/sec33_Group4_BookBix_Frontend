import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { RowBooking, TicketBooking } from '../components/Booking'
import { BookingInterface } from '../interfaces/booking.interfaces'

const URL = import.meta.env.VITE_API_URL
const mockBookings: BookingInterface[] = [
  {
    id: 'b001',
    locationName: 'Luxury Suite at Grand Hotel',
    price: 350.0,
    period: {
      start: '15:00/2023-03-01',
      end: '11:00/2023-03-05',
    },
    status: 'confirmed',
  },
  {
    id: 'b002',
    locationName: 'Cozy Cabin in the Woods',
    price: 120.5,
    period: {
      start: '14:00/2023-03-10',
      end: '10:00/2023-03-14',
    },
    status: 'pending',
  },
  {
    id: '0000000003',
    locationName: 'Beachfront Villa',
    price: 750.0,
    period: {
      start: '12:00/2023-03-20',
      end: '10:00/2023-03-25',
    },
    status: 'canceled',
  },
  {
    id: 'b004',
    locationName: 'City Apartment with View',
    price: 180.0,
    period: {
      start: '16:00/2023-04-02',
      end: '10:00/2023-04-07',
    },
    status: 'confirmed',
  },
  {
    id: 'b005',
    locationName: 'Central park',
    price: 1800,
    period: {
      start: '16:00/2023-06-02',
      end: '10:00/2023-06-07',
    },
    status: 'confirmed',
  },
  {
    id: 'b005',
    locationName: 'Central park',
    price: 1800,
    period: {
      start: '16:00/2023-06-02',
      end: '10:00/2023-06-07',
    },
    status: 'confirmed',
  },
]

const BookingSummary: React.FC = () => {
  const [data, setData] = useState<BookingInterface[] | null>(mockBookings)
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
      setData(data)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  const renderBookings = () => {
    if (data) {
      return data.map((booking) => {
        return (
          <Row>
            <RowBooking
              key={booking.id}
              id={booking.id}
              locationName={booking.locationName}
              price={booking.price}
              period={booking.period}
              status={booking.status}
            />
            <TicketBooking
              key={booking.id}
              id={booking.id}
              locationName={booking.locationName}
              price={booking.price}
              period={booking.period}
              status={booking.status}
            />
          </Row>
        )
      })
    }
  }
  console.log(data)

  return (
    <Container fluid className="booking-summary fill bg-dark">
      <Row className="">
        <Col md="4">
          <h1 className="text-white page-title">Your bookings</h1>
        </Col>
      </Row>
      <Row className="booking-panel mt-4 mx-auto">
        <div className="d-none d-lg-block">
          <Row className="p-3 booking-panel-header d-flex flex-row">
            <Col md="3">
              <span>location</span>
            </Col>
            <Col md="1" className="d-xl-none">
              <span>period</span>
            </Col>
            <Col md="3" className="d-none d-xl-block period-header">
              <span>period</span>
            </Col>
            <Col md="2" lg="1" className="p-0 me-2 id-header">
              <span>booking_id</span>
            </Col>
            <Col md="2" lg="1" className="ms-4">
              <span>price</span>
            </Col>
            <Col md="1" className="status-header">
              <span>status</span>
            </Col>
            <Col md="1" className="ms-5">
              <span>action</span>
            </Col>
          </Row>
        </div>
        {renderBookings()}
      </Row>
    </Container>
  )
}

export default BookingSummary
