import React, { useState } from 'react'
import { Button, Modal, Col, Container, Row } from 'react-bootstrap'
import { BookingInterface } from '../interfaces/booking.interfaces'
import { calculateDays, formatBookingPeriod } from '../utils/Time.utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { statusSelector } from '../utils/Booking.utils'

const URL = import.meta.env.VITE_API_URL

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
            {statusSelector(status, 'status-text')}
            <div className="progress-circle">{statusSelector(status, 'progress-circle')}</div>
          </Col>
          <Col md="2" xl="1" className="action p-0">
            {statusSelector(status, 'action-btn')}
          </Col>
        </Row>
      </Container>
      <FontAwesomeIcon
        icon={faTimes}
        className="cancel-btn align-self-center p-1 d-none d-lg-block"
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete the booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please make sure that you need to delete this booking.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
