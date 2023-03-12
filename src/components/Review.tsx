import React from 'react'
import { Rating } from '@mui/material'
import { ReviewInterface } from '../interfaces/booking.interfaces'


const Review: React.FC<ReviewInterface> = ({
  title = '',
  username,
  rating = 0,
  text = '',
  dateCreate,
}) => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-sm-8 col-md-12 col-lg-8">
          <p>{title}</p>
        </div>
        <div className="col-sm-4 col-lg-4">
          <p>{username}</p>
        </div>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="col-sm-7 col-md-12 col-lg-7">
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
        </div>
        <div className="col-sm-5 col-lg-5">
          <p>{dateCreate.toDateString()}</p>
        </div>
      </div>
      <div className="row">
        <p className='d-none d-lg-block'>{text}</p>
      </div>
    </div>
  )
}

export default Review
