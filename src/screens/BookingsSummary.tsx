import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Booking from '../components/Booking'
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
    id: 'b003',
    locationName: 'Beachfront Villa',
    price: 750.0,
    period: {
      start: '12:00/2023-03-20',
      end: '10:00/2023-03-25',
    },
    status: 'cancelled',
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
          <Booking
            key={booking.id}
            id={booking.id}
            locationName={booking.locationName}
            price={booking.price}
            period={booking.period}
            status={booking.status}
          />
        )
      })
    }
  }
  console.log(data)

  return (
    <Container fluid className="booking-summary fill bg-dark">
      <Row className="">
        <Col md="4">
            <h1 className='text-white'>Your bookings</h1>
        </Col>
      </Row>
      <Row className="booking-summary-panel">
        <div className='bookings-list text-white'>{renderBookings()}</div>
      </Row>
    </Container>
  )
}

export default BookingSummary
