import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { WebInform, LoginForm } from '../components/LoginRegister'
// .env file

const Login: React.FC = () => {
  
  return (
    <Container fluid className="login fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <WebInform />
        </Col>
        <Col md="6" className="wrapper">
            <LoginForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Login
