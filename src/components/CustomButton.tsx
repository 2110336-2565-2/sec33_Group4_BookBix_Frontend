import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { ReviewModal, reviewRespondInterface } from './CustomModal'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { AccessTokenInterface } from '../interfaces/cookie.interfaces'
import { ReviewRequestInterface } from '../interfaces/reviews.interfaces'

//For testing
const URL = 'http://localhost:3001'

export const ButtonReview: React.FC<{ locationId: string }> = ({ locationId }) => {
  const [show, setShow] = useState<boolean>(false)
  const [cookies, setCookie] = useCookies(['access_token'])
  const [reviewRespond, setReviewRespond] = useState<reviewRespondInterface>({
    username: undefined,
    title: undefined,
    locationId: locationId,
    rating: 0,
    review: undefined,
  })
  const [error, setError] = useState<string | null>(null)
  let accessToken: AccessTokenInterface

  useEffect(() => {
    if (reviewRespond.username === undefined) {
      accessToken = jwt_decode(cookies.access_token)
      setReviewRespond({ ...reviewRespond, username: accessToken.username })
    }
  }, [])

  const reviewButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShow(true)
    console.log('Open', reviewRespond.locationId)
  }
  const handleCancel = () => {
    setShow(false)
    console.log('Close', reviewRespond.locationId)
  }

  const handleSubmit = async () => {
    // console.log('Submit', reviewRespond)
    try {
      // const response = await fetch(`${URL}/locations/${reviewRespond.locationId}/reviews`, {
      const response = await fetch(`${URL}/locations/000000000004000000000004/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: reviewRespond.title,
          username: reviewRespond.username,
          rating: reviewRespond.rating,
          text: reviewRespond.review,
        } as ReviewRequestInterface),
      })
      // const data = await response.json()
      if (!response.ok) {
        setError('Something went wrong, please try again later')
        return
      }
      setShow(false)
    } catch (error) {
      console.log(error)
      setError('Something error, please try again later')
    }
    // console.log('Submit', reviewRespond)
  }

  return (
    <>
      <Button onClick={reviewButtonHandler} className="action-btn confirmed text-dark">
        Review
      </Button>
      <ReviewModal
        show={show}
        reviewRespond={reviewRespond}
        setReviewRespond={setReviewRespond}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
      />
    </>
  )
}
