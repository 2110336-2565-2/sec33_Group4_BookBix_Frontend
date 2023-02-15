import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { WebInform, ResetPasswordForm } from '../components/LoginRegister'

const ResetPassword = () => {
  return (
    <Container fluid className="reset-password fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <WebInform />
        </Col>
        <Col
          md="6"
          className="wrapper d-flex flex-column align-items-center justify-content-center"
        >
          <ResetPasswordForm />
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword
