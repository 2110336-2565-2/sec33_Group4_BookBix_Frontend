import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  WebInform,
  Registration,
  RegistrationV2,
} from '../components/LoginRegister'
//.env file
// const url = process.env.REACT_APP_API_URL

const Register: React.FC = () => {
  return (
    <Container fluid className="register fill bg-dark">
      <Row className="fill">
        <Col md="6" className="d-none d-md-flex flex-column ">
          <WebInform />
        </Col>
        <Col md="6" className="wrapper">
          <Registration />
        </Col>
      </Row>
    </Container>
  )
}

export default Register
