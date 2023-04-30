import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { ReviewModal, reviewRespondInterface } from './CustomModal'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { AccessTokenInterface } from '../interfaces/authentication.interface'
import { ReviewInterface } from '../interfaces/reviews.interfaces'

//For testing
const URL = import.meta.env.VITE_API_URL

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
  }
  const handleCancel = () => {
    setShow(false)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${URL}/locations/${reviewRespond.locationId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: reviewRespond.title,
          username: reviewRespond.username,
          rating: reviewRespond.rating,
          text: reviewRespond.review,
        } as ReviewInterface),
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
