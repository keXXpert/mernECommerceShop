import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { Rating } from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { listProductDetails } from '../redux/actions/productActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

interface ParamsType {
    id: string
}

export const ProductPage = () => {
    const { id } = useParams<ParamsType>()
    const product = useSelector((state: RootState) => state.productDetails.product)
    const error = useSelector((state: RootState) => state.productDetails.error)
    const loading = useSelector((state: RootState) => state.productDetails.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    // if (!product) return <div>Loading...</div>

    return (
        <>
            <Link className='btn  btn-light my-3' to='/'>Go Back</Link>
            {loading || !product ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : <Row>
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
            }
        </>
    )
}