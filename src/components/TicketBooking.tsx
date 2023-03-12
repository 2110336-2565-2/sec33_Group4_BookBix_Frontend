import React, { useState } from 'react'
import { Button, Modal, Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { formatBookingPeriod } from '../utils/Time.utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { StatusSelector, ComponentType } from '../utils/Booking.utils'
import { Link } from 'react-router-dom'

const URL = import.meta.env.VITE_API_URL

export const TicketBooking: React.FC<BookingInterface> = ({
  id = '',
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
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
    handleClose()
  }

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
            <StatusSelector status={status} component={ComponentType.PROGRESS_CIRCLE} locationId={locationId} />
          </Col>
        </Row>
        <Row className="p-3 d-flex flex-nowrap justify-content-between">
          <Col xs="4" sm="4" className="d-none d-sm-block">
            <div className="d-flex flex-column row justify-content-center">
              <div className="text-start">From &nbsp;{startTime![1]}</div>
              <div className="text-start">To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{endTime![1]}</div>
            </div>
          </Col>
          <Col xs="4" sm="3" className="text-start">
            Price {price} THB
          </Col>
          <Col xs="5" sm="3">
            <div className="ticket-action-btn">
              <StatusSelector status={status} component={ComponentType.ACTION_BUTTON} locationId={locationId} />
            </div>
          </Col>
        </Row>
      </Container>
      <FontAwesomeIcon icon={faTimes} className="cancel-btn mt-4 d-lg-none p-1 ms-1" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete the booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please make sure that you need to delete this booking.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to={`/user/bookings`}>
            <Button variant="danger" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
