import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { WebInform, ChangePasswordForm } from '../components/LoginRegister'

const ChangePassword = () => {
  return (
    <Container fluid className="change-password fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <WebInform />
        </Col>
        <Col
          md="6"
          className="wrapper d-flex flex-column align-items-center justify-content-center"
        >
          <ChangePasswordForm />
        </Col>
      </Row>
    </Container>
  )
}

export default ChangePassword
