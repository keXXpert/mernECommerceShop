import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { IProduct } from '../types/common'
import { Rating } from '../components/Rating'
import axios from 'axios'

interface ParamsType {
    id: string
}

export const ProductPage = () => {
    const { id } = useParams<ParamsType>()
    const [product, setProduct] = useState<IProduct | null>(null)

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`/api/products/${id}`)
            if (data) setProduct(data)
        }

        fetchProduct()
    }, [id])

    if (!product) return <div>Loading...</div>

    return (
        <>
            <Link className='btn  btn-light my-3' to='/'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} reviews={product.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Price: ${product.price}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Description: {product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                </Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                </Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={!product.countInStock}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}