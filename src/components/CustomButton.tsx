import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ReviewModal } from './CustomModal'

export const ButtonReview: React.FC<{ locationId: string }> = ({ locationId }) => {
  const [show, setShow] = useState<boolean>(false)
  const [rating, setRating] = useState<number>(0)

  const reviewButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShow(true)
    console.log('reviewHandler')
    console.log(locationId)
  }
  const handleCancel = () => {
    console.log('Cancel Review')
    setShow(false)
  }
  const handleSubmit = () => {
    console.log('Sent Review')
    setShow(false)
  }

  return (
    <>
      <Button onClick={reviewButtonHandler} className="action-btn confirmed text-dark">
        Review
      </Button>
      <ReviewModal show={show} locationId={locationId} handleCancel={handleCancel} handleSubmit={handleSubmit} />
    </>
  )
}
