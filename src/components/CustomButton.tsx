import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ReviewModal, reviewRespondInterface } from './CustomModal'
import jwt_decode from 'jwt-decode'

export const ButtonReview: React.FC<{ locationId: string }> = ({ locationId }) => {
  const [show, setShow] = useState<boolean>(false)
  const [reviewRespond, setReviewRespond] = useState<reviewRespondInterface>({
    title: undefined,
    locationId: locationId,
    rating: 0,
    review: undefined,
  })

  const reviewButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    var token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGYzZDFlZTZhZDE1ZmI4N2JiOTZlZiIsImVtYWlsIjoia3V5YWlAbWFpbC5jb20iLCJ0eXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE2Nzg3MjAzNDcsImV4cCI6MTY3ODcyMDQwN30.FnR2QHtqnR0QfAumAtO1t_WRH5CRIe-1zx66e2Q6raM'
    var decodedHeader = jwt_decode(token)
    console.log(decodedHeader)

    setShow(true)
    console.log('Open', reviewRespond.locationId)
  }
  const handleCancel = () => {
    setShow(false)
    console.log('Close', reviewRespond.locationId)
  }
  const handleSubmit = () => {
    console.log('Submit', reviewRespond)
    setShow(false)
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
      />
    </>
  )
}
