import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { IconContainer, ForgetPasswordRequest } from '../components/LoginRegister'

const ForgetPassword = () => {
  return (
    <Container fluid className="change-password fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <IconContainer />
        </Col>
        <Col md="6" className="wrapper d-flex flex-column align-items-center justify-content-center">
          <ForgetPasswordRequest />
        </Col>
      </Row>
    </Container>
  )
}

export default ForgetPassword
