import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { RowBooking} from '../components/RowBooking'
import { TicketBooking } from '../components/TicketBooking'
import { BookingInterface } from '../interfaces/booking.interfaces'

const URL = import.meta.env.VITE_API_URL
const mockBookings: BookingInterface[] = [
  {
    id: 'b000000001',
    locationName: 'Luxury Suite at Grand Hotel',
    price: 350.0,
    period: {
      start: '15:00/2023-03-01',
      end: '11:00/2023-03-05',
    },
    status: 'confirmed',
  },
  {
    id: 'b000000002',
    locationName: 'Cozy Cabin in the Woods',
    price: 120.5,
    period: {
      start: '14:00/2023-03-10',
      end: '10:00/2023-03-14',
    },
    status: 'pending',
  },
  {
    id: 'b000000003',
    locationName: 'Beachfront Villa',
    price: 750.0,
    period: {
      start: '12:00/2023-03-20',
      end: '10:00/2023-03-25',
    },
    status: 'canceled',
  },
  {
    id: 'b000000004',
    locationName: 'City Apartment with View',
    price: 180.0,
    period: {
      start: '16:00/2023-04-02',
      end: '10:00/2023-04-07',
    },
    status: 'confirmed',
  },
  {
    id: 'b000000005',
    locationName: 'Central park',
    price: 1800,
    period: {
      start: '16:00/2023-06-02',
      end: '10:00/2023-06-07',
    },
    status: 'confirmed',
  },
  {
    id: 'b000000006',
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
          <h2 className="text-white page-title fw-bold">Your bookings</h2>
        </Col>
      </Row>
      <Row className="booking-panel mt-4 mx-auto">
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
    <Container>
      <Row className="p-3 ms-1 flex-row align-items-center booking-summary-header justify-content-between ">
        <Col md="3" className='p-0'>
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
