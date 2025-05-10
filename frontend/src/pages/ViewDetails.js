import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons'; // Import ArrowLeft from react-bootstrap-icons

const ViewDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Default car data in case direct navigation occurs
    const defaultCar = {
        id: 1,
        category: 'Luxury',
        rating: 4.6,
        name: 'Audi A4',
        type: 'Sedan',
        price: 76,
        transmission: 'Manual',
        fuel: 'Petrol',
        ac: false,
        seats: 5,
        image: 'https://example.com/audi-a4.jpg',
        description: 'The Audi A4 combines luxury and performance with its refined interior and powerful engine options.',
        features: ['Leather seats', 'Premium sound system', 'Navigation', 'Bluetooth connectivity'],
    };

    // Get car data from location state or use default
    const car = location.state?.car || defaultCar;

    return (
        <Container className="my-5">
            <Button variant="light" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft className="me-2" /> Back to Results
            </Button>

            <Row>
                <Col lg={6} className="mb-4">
                    <Card>
                        <Card.Img
                            variant="top"
                            src={car.image}
                            alt={car.name}
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <Badge bg="secondary" className="mb-2">{car.category}</Badge>
                                    <Card.Title as="h2">{car.name} <small className="text-muted">{car.type}</small></Card.Title>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="text-warning me-2">★ {car.rating}</span>
                                        <span className="text-muted">(120 reviews)</span>
                                    </div>
                                </div>
                                <h3 className="text-primary">${car.price} <small className="text-muted">/ day</small></h3>
                            </div>

                            <ListGroup variant="flush" className="mb-4">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Transmission</span>
                                    <span>{car.transmission}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Fuel Type</span>
                                    <span>{car.fuel}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Air Conditioning</span>
                                    <span>{car.ac ? 'Yes' : 'No'}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Seats</span>
                                    <span>{car.seats}</span>
                                </ListGroup.Item>
                            </ListGroup>

                            <Card.Text className="mb-4">
                                {car.description}
                            </Card.Text>

                            <h5 className="mb-3">Features</h5>
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                {car.features.map((feature, index) => (
                                    <Badge key={index} bg="light" text="dark" className="px-3 py-2">
                                        {feature}
                                    </Badge>
                                ))}
                            </div>

                            <Button variant="primary" size="lg" className="w-100 py-3">
                                Rent Now
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Additional sections can be added here */}
            <Row className="mt-5">
                <Col>
                    <h4 className="mb-4">Similar Vehicles</h4>
                    <Row>
                        <Col md={6} lg={3}>
                            <Card className="h-100">
                                <Card.Img variant="top" src="https://example.com/bmw-3-series.jpg" />
                                <Card.Body>
                                    <Card.Title>BMW 3 Series</Card.Title>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-warning">★ 4.7</span>
                                        <span className="text-primary">$82/day</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3}>
                            <Card className="h-100">
                                <Card.Img variant="top" src="https://example.com/mercedes-c-class.jpg" />
                                <Card.Body>
                                    <Card.Title>Mercedes C-Class</Card.Title>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-warning">★ 4.8</span>
                                        <span className="text-primary">$88/day</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Add more similar vehicles */}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewDetails;