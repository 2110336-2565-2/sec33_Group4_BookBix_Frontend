import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ReviewModal } from './CustomModal'

export const ButtonReview: React.FC<{ locationId: string }> = ({ locationId }) => {
  const [show, setShow] = useState(false)

  const reviewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShow(true)
    console.log('reviewHandler')
  }
  const handleCancel = () => setShow(false)
  const handleSubmit = () => setShow(false)

  console.log('locationId', locationId)
  return (
    <>
      <Button onClick={reviewHandler} className="action-btn confirmed text-dark">
        Review
      </Button>
      <ReviewModal show={show} locationId={locationId} handleCancel={handleCancel} handleSubmit={handleSubmit} />
    </>
  )
}
