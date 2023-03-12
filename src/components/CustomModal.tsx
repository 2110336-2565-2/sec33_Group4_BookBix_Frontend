import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

interface ReviewModalInterface {
  show: boolean
  locationId: string
  handleCancel: () => void
  handleSubmit: () => void
}

export const ReviewModal: React.FC<ReviewModalInterface> = ({ show, locationId, handleCancel, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header>
        <h2 className="fw-bold">Review Location</h2>
      </Modal.Header>
      <Modal.Body>
        <h6>{locationId} do not have any toilet for me to use toilet that. Staff have have beaty and the breast</h6>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          CANCEL
        </Button>
        <Button onClick={handleSubmit}>SUBMIT</Button>
      </Modal.Footer>
    </Modal>
  )
}
