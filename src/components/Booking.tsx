import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BookingInterface } from '../interfaces/booking.interfaces';

const Booking: React.FC<BookingInterface> = ({
    id = '',
    locationName = '',
    price= 0,
    period={
        start: '',
        end: ''
    },
    status = '',
}) => {
    return(
        <Container className="booking">
            <Row className="d-flex align-content-center">
                <Col>{locationName}</Col>                
                <Col>{period.start}{period.end}</Col>
                <Col >{id}</Col>
                <Col>{price}</Col>
                <Col>
                    {status}
                    <div className='progress-circle'>
                    </div>
                </Col>
                <Col className='action'></Col>
                { status === "pending"} ? <Col className='cancel-btn'>
                </Col>
            </Row>
        </Container>
    )
};

export default Booking;