import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { IconContainer, RegisterContainer } from '../components/Authentication'

const Register: React.FC = () => {
  return (
    <Container fluid className="register fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <IconContainer />
        </Col>
        <Col md="6" className="wrapper">
          <RegisterContainer />
        </Col>
      </Row>
    </Container>
  )
}

export default Register
