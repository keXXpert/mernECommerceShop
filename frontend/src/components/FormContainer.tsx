import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface FormContainerPropsType {
    children: React.ReactNode
}

export const FormContainer = ({ children }: FormContainerPropsType) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}