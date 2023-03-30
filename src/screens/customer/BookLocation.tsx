import React, { useEffect, useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
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
  const { currentToken: currentUser} = useTokenContext()
  const [error, setError] = useState<string | null>(null)

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
        body: JSON.stringify({ locationId }),
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
        body: JSON.stringify({ locationId }),
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
    fetchBookingTimeSlot()
    fetchLocation()
  }, [])

  // fetch payment page with stripe API
  const fetchPaymentPage = async (customer_id: string, provider_id: string, location_id: string, price: number) => {
    try {
      const url = `http://${URL}/stripe/create-checkout-session`

      const bodyData = {
        customer_id: customer_id,
        provider_id: provider_id,
        location_id: location_id,
        price: price
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

  const createBooking = async () => {
    try {
      const bodyData = {
        customer_email: currentUser?.id,
        location_id: locationId,
        start_date: selectedStartDate,
        duration: calculateDays(formatDate(selectedStartDate),formatDate(selectedEndDate))
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
      setLocation(data)
      fetchPaymentPage(data.customer_id, data.provider_id, data.location_id, data.price)
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  // create handleSubmit function to send POST request with body of selected start date, end date, and location id
  const handleSubmit = async () => {
    createBooking()
  }

  const renderReviews = (reviews: ReviewInterface[] | undefined) => {
    if (reviews) {
      return reviews.map((review: ReviewInterface) => {
        return (
          //Create Review from Review components
          <div>
            <Review
              title={review.title}
              username={review.username}
              rating={review.rating}
              text={review.text}
              dateCreate={review.dateCreate}
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
          <SwiperSlide>
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
      <Row className="d-flex mx-auto">
        <Col md="4">
          <h3 className="text-center">Time slot</h3>
          <div className="rounded bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            <DateTimePickerForm
              disableDate={disableDate}
              disableTime={disableTimeSlots}
              selectedStartDate={selectedStartDate}
              setSelectedStartDate={setSelectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedEndDate={setSelectedEndDate}
              location={location}
            />
          </div>
        </Col>
        <Col md="4">
          <h3 className="text-center d-none d-xl-block">Location information</h3>
          <h3 className="text-center d-xl-none">Location info.</h3>
          <div className="rounded bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            <p>{location?.address}</p>
            <p>{location?.description}</p>
            <div className="iframe-container">
              {location?.url ? (
                <div></div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: location!.url as string,
                  }}
                />
              )}
            </div>
          </div>
        </Col>
        <Col md="4">
          <h3 className="text-center">Reviews</h3>
          <div className="rounded review-box bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            {location?.reviews ? <div></div> : renderReviews(location?.reviews)}
          </div>
        </Col>
      </Row>
      <div className="row d-flex flex-column">
        <button onClick={() => handleSubmit()} className="col-md-4 mb-5 booking-btn p-2 align-self-center">
          Booking
        </button>
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
        <p>From</p>
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
        <p>To</p>
        <DateTimePicker
          disableDates={disableDate}
          disableTime={disableTime}
          minTime={location.time.open_time}
          maxTime={location.time.close_time}
          selectedDate={selectedEndDate}
          setSelectedDate={setSelectedEndDate}
        />
      </div>
    </Container>
  )
}

export default BookLocation
