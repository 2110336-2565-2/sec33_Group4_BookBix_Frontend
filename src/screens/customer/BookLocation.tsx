import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
// import required modules
import { EffectCoverflow, Pagination } from 'swiper'

import DateTimePicker from '../../components/DateTimePicker'
import Review from '../../components/Review'
import { calculateDays, formatDate, formatTime, getDisableDate } from '../../utils/Time.utils'
import { ReviewInterface } from '../../interfaces/booking.interfaces'
import { LocationInterface } from '../../interfaces/location.interfaces'
import { useTokenContext } from '../../hooks/CustomProvider'

const URL = import.meta.env.VITE_API_URL

const BookLocation: React.FC = () => {
  const { locationId } = useParams()
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [location, setLocation] = useState<LocationInterface | null>(null)
  const { currentToken: currentUser } = useTokenContext()
  const [error, setError] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [takeReceipt, setTakeReceipt] = useState<boolean>(false)

  const disableDate = getDisableDate(location?.available_days)
  // <[[booked start time,booked end time, booked dates]]> must get from booked times in database
  const [disableTimeSlots, setDisbleTimeSlots] = useState<String[][] | null>(null)
  // fetch booking time slot from backend endpoint
  const fetchBookingTimeSlot = async () => {
    try {
      const response = await fetch(`${URL}/locations/${locationId}/bookings`, {
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
      setDisbleTimeSlots(data)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  // fetch location data from backend endpoint
  const fetchLocation = async () => {
    try {
      const response = await fetch(`${URL}/locations/${locationId}`, {
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
      setLocation(data)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  // fetch booking time slot and location data when component mount
  useEffect(() => {
    fetchLocation()
    fetchBookingTimeSlot()
  }, [])

  // fetch payment page with stripe API
  const fetchPaymentPage = async (provider_id: string, location_id: string, duration: number, takeReceipt: boolean) => {
    try {
      const url = `${URL}/stripe/create-checkout-session`

      const bodyData = {
        provider_id: provider_id,
        location_id: location_id,
        duration: duration,
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

  // create handleSubmit function to send POST request with body of selected start date, end date, and location id
  const createBooking = async () => {
    try {
      const bodyData = {
        customer_email: currentUser?.id,
        location_id: locationId,
        start_date: selectedStartDate,
        duration: calculateDays(
          [formatTime(selectedStartDate), formatDate(selectedStartDate)],
          [formatTime(selectedEndDate), formatDate(selectedEndDate)],
        ),
      }
      const response = await fetch(`${URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      if (takeReceipt) {
        fetchPaymentPage(data.provider_id, data.location_id, data.duration, true)
      } else fetchPaymentPage(data.provider_id, data.location_id, data.duration, false)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
    if (formatDate(selectedStartDate) != formatDate(selectedEndDate)) {
      setError('Please select start and end dates on the same day.')
      return
    } else if (selectedStartDate == null || selectedEndDate == null) {
      setError('Please select start and end dates.')
      return
    } else {
      setError(null)
      return
    }
  }

  const renderReviews = (reviews: ReviewInterface[] | undefined) => {
    if (reviews) {
      return reviews.map((review: ReviewInterface, index: any) => {
        return (
          //Create Review from Review components
          <div key={index}>
            <Review
              title={review.title}
              username={review.username}
              rating={review.rating}
              text={review.text}
              dateCreated={review.dateCreated}
            />
            <hr />
          </div>
        )
      })
    }
  }

  const renderImages = (images: string[] | undefined) => {
    if (images) {
      return images.map((image: string, index: any) => {
        return (
          <SwiperSlide key={index}>
            <img src={image} />
          </SwiperSlide>
        )
      })
    }
  }

  return (
    <Container fluid className="location-booking fill bg-dark d-flex flex-column text-white">
      <Row className="align-self-center p-3 mt-4">
        <h1>{location?.name}</h1>
      </Row>
      <Row>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {renderImages(location?.images)}
        </Swiper>
      </Row>
      <Row className="d-flex booking-form">
        <Col lg="4">
          <h3 className="text-center mb-3">Time slot</h3>
          <div className="rounded bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            {location ? (
              <DateTimePickerForm
                disableDate={disableDate}
                disableTime={disableTimeSlots}
                selectedStartDate={selectedStartDate}
                setSelectedStartDate={setSelectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedEndDate={setSelectedEndDate}
                location={location}
              />
            ) : (
              <div></div>
            )}
          </div>
        </Col>
        <Col lg="4">
          <h3 className="text-center mb-3 information-long">Location information</h3>
          <h3 className="text-center mb-3 information-short">Location info.</h3>
          <div className="rounded bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            <p>{location?.address}</p>
            <p>{location?.description}</p>
            <div className="iframe-container">
              {location?.url ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: location.url,
                  }}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Col>
        <Col lg="4">
          <h3 className="text-center mb-3">Reviews</h3>
          <div className="rounded review-box bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            {location?.reviews ? renderReviews(location?.reviews) : <div></div>}
          </div>
        </Col>
      </Row>
      <div className="row d-flex flex-column">
        <Button className="col-md-4 mb-5 booking-btn p-2 align-self-center w-25" onClick={handleShow}>
          Booking
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
            <Modal.Title>Are you sure you want to create the booking and payment?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Would you like to take receipt after payment?"
                onChange={(e) => {
                  setTakeReceipt(e.target.checked)
                }}
              />
            </Form>
            {error && <div className="alert alert-danger mt-2 mb-0">{error}</div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {error ? (
              <Button variant="primary" disabled onClick={createBooking}>
                Continue to payment
              </Button>
            ) : (
              <Button variant="primary" onClick={createBooking}>
                Continue to payment
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  )
}

const DateTimePickerForm: React.FC<any> = ({
  disableDate,
  disableTime,
  location,
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
}) => {
  return (
    <Container>
      <div className="row mt-4">
        <h6 className="mb-2">From</h6>
        <DateTimePicker
          disableDates={disableDate}
          disableTime={disableTime}
          minTime={location.time.open_time}
          maxTime={location.time.close_time}
          selectedDate={selectedStartDate}
          setSelectedDate={setSelectedStartDate}
        />
      </div>
      <div className="row mt-5">
        <h6 className="mb-2">To</h6>
        <DateTimePicker
          disableDates={disableDate}
          disableTime={disableTime}
          minTime={location.time.open_time}
          maxTime={location.time.close_time}
          selectedDate={selectedEndDate}
          setSelectedDate={setSelectedEndDate}
        />
      </div>
      <div className="row mt-5">
        <h6>Price per hour: {location?.price} BAHT</h6>
      </div>
    </Container>
  )
}

export default BookLocation
