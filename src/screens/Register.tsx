import login_costume from '../assets/images/login-costume.svg'
import {
  Form,
  Button,
  Container,
  Stack,
  Image,
  Row,
  Col,
} from 'react-bootstrap'

export default function Register() {
  return (
    <Container fluid className="h-100 bg-dark text-light">
      <Row md={2} className="h-100">
        <Col className="justify-content-center align-content-center">
          <div>
            <Image className="w-75 " src={login_costume}></Image>
          </div>
        </Col>
        <Col className="bg-primary p-5">
          <h3>
            Sign Up to <span className="text-dark fw-bold">BookBix</span>
          </h3>
          <Form>
            <Form.Group className="mb-3 fs-4" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="example@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-3 fs-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              variant="light"
              type="submit"
              className="btn-primary btn-lg"
            >
              <span className="fw-bold">Submit</span>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
