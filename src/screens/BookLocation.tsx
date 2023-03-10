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

import DateTimePicker from '../components/DateTimePicker'
import Review from '../components/Review'
import { formatDate, formatTime, getDisableDate } from '../utils/Time.utils'
import { ReviewInterface } from '../interfaces/booking.interfaces'

const URL = import.meta.env.VITE_API_URL

const mockdata = {
  _id: Object('000000000004000000000004'),
  name: 'Central Park',
  address: 'New York, NY 10022',
  description: 'A large urban park in the heart of New York City',
  url: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.066385305769!2d-73.96777208496323!3d40.78255467932428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sth!4v1675496921164!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  images: [
    'https://ohny.org/wp-content/uploads/2022/09/Harry_Gillen_via_Unsplash.jpeg',
    'https://mymodernmet.com/wp/wp-content/uploads/2020/12/central-park-new-york-city-frederick-law-olmsted-2.jpg',
    'https://www.planetware.com/photos-large/USNY/new-york-city-central-park-1.jpg',
  ],
  reviews: [
    {
      title: "It's a great place to relax",
      username: 'JaneDoe',
      rating: 4.5,
      text: 'Beautiful park, lots of green spaces and a great place to relax.',
      dateCreate: new Date('2021-10-10'),
    },
    {
      title: 'Good for a walk',
      username: 'JohnDoe',
      rating: 5.0,
      text: "One of the best parks I've ever been to. So much to do and see!",
      dateCreate: new Date('2021-11-10'),
    },
  ],
  time: {
    open_time: '09:00',
    close_time: '18:00',
  },
  available_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
}

const BookLocation: React.FC = () => {
  const { locationId } = useParams()
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [location, setLocation] = useState<any>(mockdata)
  const [error, setError] = useState<string | null>(null)
  const disableDate = getDisableDate(location.available_days)
  // <[[booked start time,booked end time, booked dates]]> must get from booked times in database
  // mock data

  // [["13:00", "15:00", "2/13/2023"]]
  const [disableTimeSlots, setDisbleTimeSlots] = useState<String[][] | null>([
    ['13:00', '15:00', '2023-02-13'],
    ['09:00', '10:00', '2023-02-14'],
  ])

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

  //fetch booking time slot and location data when component mount
  useEffect(() => {
    fetchBookingTimeSlot()
    fetchLocation()
  }, [])

  // create handleSubmit function to send POST request with body of selected start date, end date, and location id

  const handleSubmit = async () => {
    const startDate = formatDate(selectedStartDate)
    const endDate = formatDate(selectedEndDate)
    const startTime = formatTime(selectedStartDate)
    const endTime = formatTime(selectedEndDate)

    try {
      const url = 'http://localhost:3001/stripe/create-checkout-session'

      const data = {
        priceId: 'price_1Mh6ShLx9QcUn2bQSje143ye',
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log(data)
          window.location.href = data.url
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }
  const renderReviews = (reviews: ReviewInterface[]) => {
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

  return (
    <Container fluid className="location-booking fill bg-dark d-flex flex-column text-white">
      <Row className="align-self-center p-3 mt-4">
        <h1>{location.name}</h1>
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
          {location.images.map((image: string, index: any) => {
            return (
              <SwiperSlide>
                <img src={image} />
              </SwiperSlide>
            )
          })}
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
            <p>{location.address}</p>
            <p>{location.description}</p>
            <div className="iframe-container">
              <div
                dangerouslySetInnerHTML={{
                  __html: location.url,
                }}
              />
            </div>
          </div>
        </Col>
        <Col md="4">
          <h3 className="text-center">Reviews</h3>
          <div className="rounded review-box bg-light bg-opacity-25 p-3 h-75 overflow-auto">
            {renderReviews(location.reviews)}
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
