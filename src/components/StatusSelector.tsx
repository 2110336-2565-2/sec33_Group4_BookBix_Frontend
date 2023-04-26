import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ButtonReview } from './CustomButton'
import { StatusType, ComponentType, StatusSelectorInterface } from '../interfaces/booking.interfaces'
import { useTokenContext } from '../hooks/CustomProvider'
import { ToastContainer, toast} from 'react-toastify'

/**
 * Return various React.FC<StatusSelectorInterface> which is separated by component
 * @param status StatusType of booking
 * @param component ComponentType of component
 * @param locationId identifier of location
 * @returns ComponentType.PROGRESS_CIRCLE which is separated by ComponentType
 *          ComponentType.ACTION_BUTTON which is separated by ComponentType and locationId
 */
const URL = import.meta.env.VITE_API_URL

export const StatusSelector: React.FC<StatusSelectorInterface> = ({ status, component, locationId, bookingId, price }) => {
  const { currentToken } = useTokenContext()
  const [error, setError] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [takeReceipt, setTakeReceipt] = useState<boolean>(false)

  // fetch payment page with stripe API
  const fetchPaymentPage = async (location_id: string, duration: number, bookingId: string, takeReceipt: boolean) => {
    try {
      const url = `${URL}/stripe/create-checkout-session`

      const bodyData = {
        location_id: location_id,
        booking_id: bookingId,
        quantity: duration,
        takeReceipt: takeReceipt,
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      }

      const response = await toast.promise(fetch(url, requestOptions), {
        pending: 'Payment is pending',
        success: 'Payment resolved 👌',
        error: 'Payment rejected 🤯',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(`${data.message}, please reload and try again later`)
        return
      } else if (response.ok) {
        window.location.href = data.url
      }
    } catch (error) {
      setError('Something went wrong, please reload and try again later')
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const handlePayment = () => {
    if (takeReceipt) {
      fetchPaymentPage(locationId, price, bookingId, true)
    } else fetchPaymentPage(locationId, price, bookingId, false)
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
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
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
