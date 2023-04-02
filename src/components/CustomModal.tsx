import React, { Dispatch, SetStateAction, useState } from 'react'
import { Modal, Form, Button, Container, FloatingLabel, Row, Col } from 'react-bootstrap'
import { Rating } from '@mui/material'
import { DeleteLocationRespondInterface } from '../interfaces/location.interfaces'
import { deleteLocation } from '../utils/location.utils'
import { useNavigate } from 'react-router'

//Review Modal
interface ReviewModalInterface {
  show: boolean
  reviewRespond: reviewRespondInterface
  setReviewRespond: Dispatch<SetStateAction<reviewRespondInterface>>
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  handleCancel: () => void
  handleSubmit: () => void
}
export interface reviewRespondInterface {
  username: string | undefined
  title: string | undefined
  locationId: string
  rating: number | null
  review: string | undefined
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
export const ReviewModal: React.FC<ReviewModalInterface> = ({
  show,
  reviewRespond,
  setReviewRespond,
  error,
  setError,
  handleCancel,
  handleSubmit,
}) => {
  const [validated, setValidated] = useState(false)
  return (
    <Modal show={show} onHide={handleCancel} centered size="lg" className="reviewModal">
      <Modal.Header>
        <h2 className="fw-bold">Review Location</h2>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5 className="fw-bold">{exampleLocations[reviewRespond.locationId].locationName}</h5>
          <h6 className="fw-bold">{exampleLocations[reviewRespond.locationId].price} Bath</h6>
          <Rating
            value={reviewRespond.rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setReviewRespond({ ...reviewRespond, rating: newValue })
            }}
          />
        </div>
        <Container className="text-container">
          {/* <Form noValidate validated={validated}> */}
          <Form>
            <Form.Group controlId="reviewText" className="reviewText">
              <FloatingLabel controlId="floatingInput" label="Review Title" className="floatingLabel">
                <Form.Control
                  required
                  placeholder="Review Title"
                  type="text"
                  value={reviewRespond.title}
                  onChange={(e) => {
                    setReviewRespond({ ...reviewRespond, title: e.target.value })
                  }}
                />
              </FloatingLabel>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewRespond.review}
                onChange={(e) => {
                  setReviewRespond({ ...reviewRespond, review: e.target.value })
                }}
              />
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
      {error && <p className="error">{error}</p>}
    </Modal>
  )
}

// Delete Location Modal
interface DeleteLocationModal {
  show: boolean
  locationID: string | undefined
  name: string
  handleCancel: () => void
}
export const DeleteLocationModal: React.FC<DeleteLocationModal> = ({ show, handleCancel, locationID, name }) => {
  const navigate = useNavigate()
  const fetchDeleteLocation = async () => {
    const respond: DeleteLocationRespondInterface = await deleteLocation(locationID)
    if (respond.ok) {
      navigate(0)
    }
  }

  const handleDelete = () => {
    fetchDeleteLocation()
  }
  return (
    <Modal show={show} onHide={handleCancel} centered size="lg" className="deleteLocationModal ">
      <Modal.Header>
        <h2>Delete {name}</h2>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete {name}?</h5>
        <p>This action cannot be undone and all data associated with it will be permanently removed.</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="card-body px-sm-4 mb-2 pt-1 pb-0">
          <Row className="justify-content-end no-gutters">
            <Col className="col-auto">
              <Button className="btn-light text-muted" onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
            <Col className="col-auto">
              <Button className="btn-danger px-4" onClick={handleDelete}>
                Delete
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
