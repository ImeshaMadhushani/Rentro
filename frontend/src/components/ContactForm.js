import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        acceptTerms: false
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you would send the data to your backend here
            console.log('Form submitted:', formData);

            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: 'Failed to submit form. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Container className="my-5 d-flex justify-content-center">
                <Card className="text-center p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
                    <FaCheckCircle className="text-success mb-3" size={60} />
                    <h2 className="mb-3">Thank You!</h2>
                    <p className="mb-4">Your message has been sent successfully. We'll get back to you soon.</p>
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            setSubmitted(false);
                            setFormData({
                                name: '',
                                email: '',
                                message: '',
                                acceptTerms: false
                            });
                        }}
                    >
                        Send Another Message
                    </Button>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Contact Us</h2>
                                <p className="text-muted">Have questions or feedback? We'd love to hear from you.</p>
                            </div>

                            {errors.submit && (
                                <Alert variant="danger" className="mb-4">
                                    {errors.submit}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-4" controlId="formName">
                                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        isInvalid={!!errors.name}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        isInvalid={!!errors.email}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formMessage">
                                    <Form.Label className="fw-semibold">Your Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Type your message here..."
                                        isInvalid={!!errors.message}
                                        style={{ resize: 'none' }}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formTerms">
                                    <Form.Check
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        label={
                                            <span>
                                                I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                                            </span>
                                        }
                                        isInvalid={!!errors.acceptTerms}
                                    />
                                    {errors.acceptTerms && (
                                        <div className="text-danger small mt-1">{errors.acceptTerms}</div>
                                    )}
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="py-2 fw-semibold"
                                    >
                                        {isSubmitting ? (
                                            <span>Sending...</span>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="me-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactForm;