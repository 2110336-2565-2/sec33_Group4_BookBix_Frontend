import React from 'react'
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap'

interface ReviewModalInterface {
  show: boolean
  locationId: string
  handleCancel: () => void
  handleSubmit: () => void
}
const exampleLocations = {
  l000000001: {
    locationName: 'Luxury Suite at Grand Hotel',
    price: 350.0,
    period: {
      start: '15:00/2023-03-01',
      end: '11:00/2023-03-05',
    },
    status: 'confirmed',
  },
  l000000002: {
    locationName: 'Cozy Cabin in the Woods',
    price: 120.5,
    period: {
      start: '14:00/2023-03-10',
      end: '10:00/2023-03-14',
    },
    status: 'pending',
  },
  l000000003: {
    locationName: 'Beachfront Villa',
    price: 750.0,
    period: {
      start: '12:00/2023-03-20',
      end: '10:00/2023-03-25',
    },
    status: 'canceled',
  },
  l000000004: {
    locationName: 'City Apartment with View',
    price: 180.0,
    period: {
      start: '16:00/2023-04-02',
      end: '10:00/2023-04-07',
    },
    status: 'confirmed',
  },
  l000000005: {
    locationName: 'Central park',
    price: 1800,
    period: {
      start: '16:00/2023-06-02',
      end: '10:00/2023-06-07',
    },
    status: 'confirmed',
  },
  l000000006: {
    locationName: 'Central park',
    price: 1800,
    period: {
      start: '16:00/2023-06-02',
      end: '10:00/2023-06-07',
    },
    status: 'confirmed',
  },
}
export const ReviewModal: React.FC<ReviewModalInterface> = ({ show, locationId, handleCancel, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleCancel} centered size="lg" className="reviewModal">
      <Modal.Header>
        <h2 className="fw-bold">Review Location</h2>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5 className="fw-bold">{exampleLocations[locationId].locationName}</h5>
          <h6 className="fw-bold">{exampleLocations[locationId].price} Bath</h6>
        </div>
        <Container className="text-container">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          <h5 className="fw-bold">CANCEL</h5>
        </Button>
        <Button onClick={handleSubmit}>
          <h5 className="fw-bold">SUBMIT</h5>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
