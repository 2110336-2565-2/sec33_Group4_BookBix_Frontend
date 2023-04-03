import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ButtonReview } from './CustomButton'
import { StatusType, ComponentType, StatusSelectorInterface } from '../interfaces/booking.interfaces'
import { RoutePath } from '../interfaces/route.interface'
import { useTokenContext } from '../hooks/CustomProvider'

/**
 * Return various React.FC<StatusSelectorInterface> which is separated by component
 * @param status StatusType of booking
 * @param component ComponentType of component
 * @param locationId identifier of location
 * @returns ComponentType.PROGRESS_CIRCLE which is separated by ComponentType
 *          ComponentType.ACTION_BUTTON which is separated by ComponentType and locationId
 */
export const StatusSelector: React.FC<StatusSelectorInterface> = ({
  status,
  component,
  locationId,
  price,
}) => {
  const { currentToken } = useTokenContext()
  const [error, setError] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [takeReceipt, setTakeReceipt] = useState<boolean>(false)

  // fetch payment page with stripe API
  const fetchPaymentPage = async (
    location_id: string,
    price: number,
    takeReceipt: boolean,
  ) => {
    try {
      const url = `http://${URL}/stripe/create-checkout-session`

      const bodyData = {
        location_id: location_id,
        price: price,
        takeReceipt: takeReceipt,
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      }

      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          window.location.href = data.url
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const handlePayment = () => {
    if (takeReceipt) {
      fetchPaymentPage(locationId, price, true)
    } else fetchPaymentPage(locationId, price, false)
  }

  const handleShow = () => setShow(true)

  switch (component) {
    case ComponentType.PROGRESS_CIRCLE:
      return (
        <div className="progress-circle d-flex flex-column justify-content-center align-items-center">
          <div className={`status-text ${status}`}>{status}</div>
          <div className={`outer-progress-circle ${status}`}>
            <div className="inner-progress-circle"></div>
          </div>
        </div>
      )
    case ComponentType.ACTION_BUTTON:
      switch (status) {
        case StatusType.BUTTON_CANCEL:
          return <div></div>
        case StatusType.BUTTON_PENDING:
          return (
            <>
              <Button className={`action-btn ${status} text-dark`} onClick={handleShow}>
                Payment
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Are you sure you want to make the payment?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Would you like to take receipt ?"
                      onChange={(e) => {
                        setTakeReceipt(e.target.checked)
                      }}
                    />
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handlePayment}>
                    Continue to payment
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )
        case StatusType.BUTTON_CONFIRMED:
          return <ButtonReview locationId={locationId} />
        default:
          return <></>
      }
    default:
      return <></>
  }
}
