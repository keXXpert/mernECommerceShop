// import React from 'react'

import { Col, Container, Row } from "react-bootstrap"

export const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; keXXpert eCommerce
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}