import React from 'react'
import { Rating } from '@mui/material'
import { ReviewInterface } from '../interfaces/booking.interfaces'
import { Container, Row, Col } from 'react-bootstrap'


const Review: React.FC<ReviewInterface> = ({
  title = '',
  username,
  rating = 0,
  text = '',
  dateCreated,
}) => {
  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <Col sm="8">
          <p>{title}</p>
        </Col>
        <Col sm="4" className='text-center'>
          <p>{username}</p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col sm="7">
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
        </Col>
        <Col sm="5" className='text-center'>
          <p>{dateCreated?.toLocaleString()}</p>
        </Col>
      </Row>
      <Row>
        <p className='d-none d-sm-block'>{text}</p>
      </Row>
    </Container>
  )
}

export default Review
