import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { IconContainer, LoginContainer } from '../components/LoginRegister'
// .env file

const Login: React.FC = () => {
  return (
    <Container fluid className="login fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <IconContainer />
        </Col>
        <Col md="6" className="wrapper">
          <LoginContainer />
        </Col>
      </Row>
    </Container>
  )
}

export default Login
